const headingElement = document.querySelector("#event-header");
const imgElement = document.querySelector("#event-image");
const tagsDiv = document.querySelector("#tags");
const locationElement = document.querySelector("#location");
const timeElement = document.querySelector("#time");
const descriptionElement = document.querySelector("#description");
const orgDetailsElement = document.querySelector("#about-organization");

let id;
let eventsArr;
let eventObject;
let organizerArr;
let orgObject;

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

function getOrganizerById(id) {
    return organizerArr.find(
        (org) => org.id === id
    );
}

async function loadEventInfo() {
    try {
        const eventsResponse = await fetch("./json/events.json");
        eventsArr = await eventsResponse.json();

        const organizersResponse = await fetch("./json/organizers.json");
        organizerArr = await organizersResponse.json();

        eventObject = eventsArr[id];
        orgObject = getOrganizerById(eventObject.organizerId);

    } catch (e) {

    }

    displayInfo();
}

function displayInfo() {
    headingElement.innetText = "Heading";
    
    // let timeString = formatDate(new Date(eventObject.date));

    // headingElement.innetText = eventObject.eventName;
    // locationElement.innetText = eventObject.location;
    // timeElement.innerHTML = timeString;
    // descriptionElement.innetText = eventObject.description;
    // orgDetailsElement.innetText = orgObject.name;

}

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    id = params.get("id");
    loadEventInfo();
}