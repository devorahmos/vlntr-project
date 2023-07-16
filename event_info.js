const headingElement = document.querySelector("#title");
const orgNameElement = document.querySelector("#name");
const imgElement = document.querySelector("#image");
const tagsDiv = document.querySelector("#tags");
const locationElement = document.querySelector("#address");
const timeElement = document.querySelector("#date");
const descriptionElement = document.querySelector("#description");
const orgDetailsElement = document.querySelector("#about-us");

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let id;
let eventsArr;
let eventObject;
let organizerArr;
let orgObject;

function formatDate(date) {
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} @ ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}

function getEventById(id) {
    return eventsArr.find((event) => event.id == id);
}

function getOrganizerById(id) {
    return organizerArr.find((org) => org.id == id);
}

function displayTags(tagsArr) {
    let tagsHTML = "";

    for (let i of tagsArr) {
        tagsHTML += `<p class="tags">${i}</p>`;
    }

    return tagsHTML;
}

async function loadEventInfo() {
    try {
        const eventsResponse = await fetch("./json/events.json");
        eventsArr = await eventsResponse.json();

        const organizersResponse = await fetch("./json/organizers.json");
        organizerArr = await organizersResponse.json();

        eventObject = getEventById(id);
        orgObject = getOrganizerById(eventObject.organizerId);

    } catch (e) {
        console.log(e);
    }

    displayInfo();
}

function getTagsHTML(tagsArr) {
    let tagsHTML = "";

    for (let i of tagsArr) {
        tagsHTML += `<p class="tags">${i}</p>`;
    }

    return tagsHTML;
}

function displayInfo() {


    let timeString = formatDate(new Date(eventObject.date));

    headingElement.innerText = eventObject.eventName;
    locationElement.innerText = eventObject.location;
    timeElement.innerHTML = timeString;
    descriptionElement.innerText = eventObject.description;
    orgDetailsElement.innerText = orgObject.description;

    tagsDiv.innerHTML = getTagsHTML(eventObject.tags);

}


window.onload = () => {

    const params = new URLSearchParams(window.location.search);
    id = params.get("e");
    loadEventInfo();
}

