const searchInput = document.querySelector(".search");
const searchDate = document.querySelector("#date");
const searchCity = document.querySelector("#city");
let eventElements;

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  eventElements = document.querySelectorAll(".event");
  const filteredEvents = filterEvents(eventElements, searchTerm);
  displayFilteredEvents(eventElements, filteredEvents);
}

function filterEvents(eventElements, searchTerm) {
  const regex = new RegExp(searchTerm, "i");
  return Array.from(eventElements).filter((eventElement) => {
    const eventContent = eventElement.textContent.toLowerCase();
    const matches = eventContent.match(regex);
    return matches !== null;
  });
}

function displayFilteredEvents(eventElements, filteredEvents) {
  eventElements.forEach((eventElement) => {
    if (filteredEvents.includes(eventElement)) {
      eventElement.style.display = "flex";
    } else {
      eventElement.style.display = "none";
    }
  });
}

function filterDate() {
  const dateInput = searchDate.value;
  eventElements = document.querySelectorAll(".event");
  const filteredEvents = Array.from(eventElements).filter((eventElement) => {
    const dateContent = eventElement.querySelector(".date");
    const eventDate = new Date(dateContent.textContent.trim());

    return (
      eventDate.getFullYear() === Number(dateInput.split("-")[0]) &&
      eventDate.getMonth() === Number(dateInput.split("-")[1]) - 1 &&
      eventDate.getDate() === Number(dateInput.split("-")[2])
    );
  });

  displayFilteredEvents(eventElements, filteredEvents);
}

function filterCity() {
  const cityInput = searchCity.value.trim().toLowerCase();
  eventElements = document.querySelectorAll(".event");
    const filteredEvents = Array.from(eventElements).filter((eventElement) => {
      const addressElement = eventElement.querySelector(".address");
      const addressValue = addressElement.textContent.toLowerCase();
      const addressParts = addressValue.split(",");
      const cityName = addressParts[addressParts.length - 1].trim().toLowerCase();
      return cityName.includes(cityInput);
    });

    displayFilteredEvents(eventElements, filteredEvents);
  }



function handleTagFilter() {
  const checkboxes = document.querySelectorAll(".checkbox-item");
  eventElements = document.querySelectorAll(".event");
  const selectedTags = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const filteredEvents = Array.from(eventElements).filter((eventElement) => {
    const tagsContent = eventElement.querySelector(".tags-input");
    const tags = Array.from(tagsContent.querySelectorAll(".tags")).map(
      (tag) => tag.textContent
    );

    return selectedTags.every((tag) => tags.includes(tag));
  });

  displayFilteredEvents(eventElements, filteredEvents);
}

function toggleCheckboxes() {
  const checkboxes = document.querySelectorAll(".checkbox-item");

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = selectAllCheckbox.checked;
  }
}

const checkboxes = document.querySelectorAll(".checkbox-item");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", handleTagFilter);
});

const selectAllCheckbox = document.getElementById("selectAll");
selectAllCheckbox.addEventListener("click", toggleCheckboxes);

searchInput.addEventListener("input", handleSearch);
searchDate.addEventListener("input", filterDate);
searchCity.addEventListener("input", filterCity);
