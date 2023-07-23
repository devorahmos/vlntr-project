const params = new URLSearchParams(window.location.search);
const id = params.get("org");

const form = document.querySelector("#addForm");
const eventsContainer = document.querySelector("#event-container");
const modalAlert = document.querySelector("#myModal");

///// List Display Functions:

function formatDate(date) {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} @ ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}

function displayTags(tagsArr) {
  let tagsHTML = "";

  for (let tag of tagsArr) {
    tagsHTML += `<p class="tags">${tag}</p>`;
  }

  return tagsHTML;
}

function displayEvent(event) {
  const timeString = formatDate(new Date(event.date));

  eventsContainer.innerHTML += `<div class="event shadow">
                                <div class="event-left d-flex flex-column">
                                    <div class="d-flex flex-column">
                                        <div class="event-title d-flex">${event.eventName}</div>
                                        <div class="tags-input d-flex gap-2 mt-1">
                                            ${displayTags(event.tags)}
                                        </div>
                                    </div>
                                    <div class="location d-flex mt-3">
                                        <div class="d-flex align-items-center gap-1">
                                            <img src="./Images/Location.svg" alt="location-icon" class="border-0"/>
                                            <div class="address">${event.location}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="event-middle d-flex">
                                    <div class="date d-flex flex-column">
                                        <div>${timeString}</div>
                                    </div>
                                </div>
                                <div class="event-right d-flex flex-column">
                                    <div class="text-center flex-grow-1">
                                        <img src="${event.image}" class="rounded" alt="..." />
                                    </div>
                                    <a href="./event_info.html?e=${event.id}" class="see-more">See more</a>
                                </div>
                              </div>`;
}

function displayEventsList(eventsArr) {

  for (let event of eventsArr) {
    displayEvent(event);
  }
}

async function fetchEventsByOrgId(orgId) {
  try {
    const eventsResponse = await fetch(`https://64b517e8f3dbab5a95c6afd3.mockapi.io/events`);
    const eventsArr = await eventsResponse.json();

    const eventsOfOrg = eventsArr.filter((current) => current.organizerId == orgId);

    displayEventsList(eventsOfOrg);
  } catch (error) {
    console.log(error);
  }
}

async function fetchOrganizers() {
  try {
    const orgsResponse = await fetch(`https://64b517e8f3dbab5a95c6afd3.mockapi.io/organizers`);
    const orgsArr = await orgsResponse.json();

    const orgsDropdown = document.querySelector("#orgs-menu-list");

    for (let org of orgsArr){
      orgsDropdown.innerHTML += `<li><button class="dropdown-item" type="button" id="${org.id}">${org.name}</button></li>`;
    }

  } catch (error) {
    console.log(error);
  }
}

///// Form functions:

function afterSend(newAddedEvent) {
  // modalAlert.classList.add("show");
  form.reset();
  displayEvent(newAddedEvent); //TODO: Try to solve the modal bug.
}

async function addEvent(event) {
  event.preventDefault();

  const newEventObject = {
    eventName: document.querySelector("#host-name").value,
    organizerId: id,
    date: document.querySelector("#host-date").value,
    location: document.querySelector("#host-location").value, description: document.querySelector("#host-description").value,
    tags: document.querySelector("#host-tags").value.split(",")
  };

  try {
    const response = await fetch(
      "https://64b517e8f3dbab5a95c6afd3.mockapi.io/events",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEventObject),
      }
    );

    const result = await response.json();

    afterSend(result);
  } catch (error) {
    console.log(error);
  }
}

window.onload = () => {
  fetchOrganizers();
  fetchEventsByOrgId(id);

  form.addEventListener("submit", addEvent);
};