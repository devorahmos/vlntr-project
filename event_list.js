const container = document.querySelector(".event-wrapper");

function formatDate(date) {
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} @ ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}

function getOrganizerById(id, organizersArr) {
    return organizersArr.find(
        (org) => org.id == id
    );
}

function displayTags(tagsArr) {
    let tagsHTML = "";
    
    for (let tag of tagsArr) {
        tagsHTML += `<p class="tags">${tag}</p>`;
    }

    return tagsHTML;
}

function displayEventsList(eventsArr, organizersArr) {
    for (let event of eventsArr) {

        const timeString = formatDate(new Date(event.date));
        
        container.innerHTML += `<div class="event shadow">
                                    <div class="event-left d-flex flex-column">
                                        <div class="d-flex flex-column">
                                            <div class="event-title d-flex">${event.eventName}</div>
                                            <div class="event-subtitle d-flex">${getOrganizerById(event.organizerId, organizersArr).name}</div>
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

    let eventElements = document.querySelectorAll(".event");
    console.log(eventElements)

}

async function loadEventList() {
    try {
        const eventsResponse = await fetch("https://64b517e8f3dbab5a95c6afd3.mockapi.io/events/");
        const eventsArr = await eventsResponse.json();

        const organizersResponse = await fetch("https://64b517e8f3dbab5a95c6afd3.mockapi.io/organizers/");
        const organizersArr = await organizersResponse.json();

        displayEventsList(eventsArr, organizersArr);
    } catch (error) {
        console.log(error);
    }
}

///////// End of functions

window.onload = loadEventList;