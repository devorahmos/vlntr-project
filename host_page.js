const form = document.querySelector("#add-event-form");
const eventsContainer = document.querySelector("#events-of-organizer");

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

function displayEventsList(eventsArr, id) {
  

  for (let event of eventsArr) {

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
}

async function fetchEventsByOrgId(id) {
  try {
    const eventsResponse = await fetch(`https://64b517e8f3dbab5a95c6afd3.mockapi.io/events`);
    const eventsArr = await eventsResponse.json();

    // console.log(eventsArr);

    displayEventsList(eventsArr);
  } catch (error) {
    console.log(error);
  }
}

///// Form functions:

async function addEvent(event) {
  event.preventDefault();

  const newEventObject = {
    eventName: document.querySelector("#event-title").value,
    description: document.querySelector("#description").value,
    organizerId: 1, //TODO: find how to make it as the current org
    location: document.querySelector("#location").value,
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
    console.log(result);

    event.preventDefault();
  } catch (error) {
    console.log(error);
    event.preventDefault();
  }
}

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("org");
  fetchEventsByOrgId(id);
};

form.addEventListener("submit", addEvent);
