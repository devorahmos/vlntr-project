let eventsArr;
let organizerArr;
const container = document.querySelector(".event-wrapper");

function getOrganizerById(id) {
    return organizerArr.find(() => this.id === id);
}

function displayTags(tagsArr) {
    let tagsHTML = "";

    for (let i of tagsArr) {
        tagsHTML += `<p class="tags">${i}</p>`;
    }

    return tagsHTML;
}

async function loadEventList(){
    try{
        let eventsResponse = await fetch("./json/events.json");
        eventsArr = await eventsResponse.json();
    
        let organizersResponse = await fetch("./json/organizers.json");
        organizerArr = await organizersResponse.json();

        console.log(eventsArr);
        console.log(organizerArr);
    }catch(e){

    }

    displayEventsList();
}

function displayEventsList() {
    for (let i = 0; i < eventsArr.length; i++) {
        let tagsList = eventsArr[i].tags;
        container.innerHTML += `<div class="event shadow">
                                    <div class="event-left d-flex flex-column">
                                        <div class="d-flex flex-column">
                                            <div class="event-title d-flex">${eventsArr[i].eventName}</div>
                                            <div class="event-subtitle d-flex">organizer</div>
                                            <div class="d-flex gap-2 mt-1">
                                                ${displayTags(eventsArr[i].tags)}
                                            </div>
                                        </div>
                                        <div class="location d-flex mt-3">
                                            <div class="d-flex align-items-center gap-1">
                                                <img src="./Images/Location.svg" alt="location-icon" class="border-0"/>
                                                <div class="address">${eventsArr[i].location}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="event-middle d-flex">
                                        <div class="date d-flex flex-column">
                                            <div>${new Date(eventsArr[i].date)}</div>
                                        </div>
                                    </div>
                                    <div class="event-right d-flex flex-column">
                                        <div class="text-center flex-grow-1">
                                            <img src="${eventsArr[i].image}" class="rounded" alt="..." />
                                        </div>
                                        <a href="./event_info.html?e=${eventsArr[i].id}" class="see-more">. . .</a>
                                    </div>
                                </div>`;
    }
}

///////// End of functions

// getDataFromJson();

window.onload = loadEventList;