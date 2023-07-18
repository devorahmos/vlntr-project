//search input item

const searchInput = document.querySelector('.search');


function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const eventElements = document.querySelectorAll('.event');
  const filteredEvents = filterEvents(eventElements, searchTerm);
  displayFilteredEvents(eventElements, filteredEvents);
}

function filterEvents(eventElements, searchTerm) {
  return Array.from(eventElements).filter((eventElement) => {
    const eventTitle = eventElement.querySelector('.event-title');
    const eventSubtitle = eventElement.querySelector('.event-subtitle');
    const tagsInput = eventElement.querySelector('.tags-input');
    const addressInput = eventElement.querySelector('.address');
    const dateInput = eventElement.querySelector('.date');

    return (
      eventTitle.textContent.toLowerCase().includes(searchTerm) ||
      eventSubtitle.textContent.toLowerCase().includes(searchTerm) ||
      tagsInput.textContent.toLowerCase().includes(searchTerm) ||
      addressInput.textContent.toLowerCase().includes(searchTerm) ||
      dateInput.textContent.toLowerCase().includes(searchTerm)
    );
  });
}

function displayFilteredEvents(eventElements, filteredEvents) {
  eventElements.forEach((eventElement) => {
    if (filteredEvents.includes(eventElement)) {
      eventElement.style.display = 'flex';
    } else {
      eventElement.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', handleSearch);


//checkbox

const selectAllCheckbox = document.getElementById("selectAll");

function toggleCheckboxes() {
  const checkboxes = document.querySelectorAll(
    '.dropdown-menu input[type="checkbox"]'
  );

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = selectAllCheckbox.checked;
  }
}

selectAllCheckbox.addEventListener("click", toggleCheckboxes);
