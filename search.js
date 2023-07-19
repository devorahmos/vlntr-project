const searchInput = document.querySelector(".search");
const searchDate = document.querySelector("#date");

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const eventElements = document.querySelectorAll(".event");
  const filteredEvents = filterEvents(eventElements, searchTerm);
  displayFilteredEvents(eventElements, filteredEvents);
}

function filterEvents(eventElements, searchTerm) {
  return Array.from(eventElements).filter((eventElement) => {
    const eventTitle = eventElement.querySelector(".event-title");
    const eventSubtitle = eventElement.querySelector(".event-subtitle");
    const tagsContent = eventElement.querySelector(".tags-input");
    const addressContent = eventElement.querySelector(".address");
    const dateContent = eventElement.querySelector(".date");

    return (
      eventTitle.textContent.toLowerCase().includes(searchTerm) ||
      eventSubtitle.textContent.toLowerCase().includes(searchTerm) ||
      tagsContent.textContent.toLowerCase().includes(searchTerm) ||
      addressContent.textContent.toLowerCase().includes(searchTerm) ||
      dateContent.textContent.toLowerCase().includes(searchTerm)
    );
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

//date input

function filterDate() {
  const dateInput = searchDate.value;
  const eventElements = document.querySelectorAll(".event");
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

searchInput.addEventListener("input", handleSearch);
searchDate.addEventListener("input", filterDate);

//checkbox

function handleTagFilter() {
  const checkboxes = document.querySelectorAll(".checkbox-item");
  const eventElements = document.querySelectorAll(".event");

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

const checkboxes = document.querySelectorAll(".checkbox-item");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", handleTagFilter);
});

const selectAllCheckbox = document.getElementById("selectAll");

function toggleCheckboxes() {
  const checkboxes = document.querySelectorAll(
    '.dropdown-menu input[type="checkbox"]'
  );

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = selectAllCheckbox.checked;
  }
}

selectAllCheckbox.addEventListener("click", toggleCheckboxes);
