let eventsArr;
let organizerArr;
const container = document.querySelector(".event-wrapper");

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatDate(date) {
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}<br>${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}

function getOrganizerById(id) {
    return organizerArr.find(
        (org) => org.id === id
    );
}

function displayTags(tagsArr) {
    let tagsHTML = "";

    for (let i of tagsArr) {
        tagsHTML += `<p class="tags">${i}</p>`;
    }

    return tagsHTML;
}

async function loadEventList() {
    try {
        const eventsResponse = await fetch("./json/events.json");
        eventsArr = await eventsResponse.json();

        const organizersResponse = await fetch("./json/organizers.json");
        organizerArr = await organizersResponse.json();

    } catch (e) {

    }

    displayEventsList();
}

function displayEventsList() {
    for (let current of eventsArr) {

        let timeString = formatDate(new Date(current.date));

        container.innerHTML += `<div class="event shadow">
                                    <div class="event-left d-flex flex-column">
                                        <div class="d-flex flex-column">
                                            <div class="event-title d-flex">${current.eventName}</div>
                                            <div class="event-subtitle d-flex">${getOrganizerById(current.organizerId).name}</div>
                                            <div class="d-flex gap-2 mt-1">
                                                ${displayTags(current.tags)}
                                            </div>
                                        </div>
                                        <div class="location d-flex mt-3">
                                            <div class="d-flex align-items-center gap-1">
                                                <img src="./Images/Location.svg" alt="location-icon" class="border-0"/>
                                                <div class="address">${current.location}</div>
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
                                            <img src="https://placehold.co/100x100" class="rounded" alt="..." />
                                        </div>
                                        <a href="./event_info.html?e=${current.id}" class="see-more">. . .</a>
                                    </div>
                                </div>`;
    }
}

///////// End of functions

window.onload = loadEventList;