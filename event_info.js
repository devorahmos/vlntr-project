const headingElement = document.querySelector("#title");
const orgNameElement = document.querySelector("#name");
const imgElement = document.querySelector("#image");
const tagsDiv = document.querySelector("#tags");
const locationElement = document.querySelector("#address");
const timeElement = document.querySelector("#date");
const descriptionElement = document.querySelector("#description");
const orgDetailsElement = document.querySelector("#about-us");
const imageElement = document.querySelector("#image");

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatDate(date) {
    return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} @ ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}

function getEventById(id, eventsArr) {
    return eventsArr.find((event) => event.id == id);
}

function getOrganizerById(id, organizersArr) {
    return organizersArr.find((org) => org.id == id);
}

function getTagsHTML(tagsArr) {
    let tagsHTML = "";

    for (let tag of tagsArr) {
        tagsHTML += `<p class="tags">${tag}</p>`;
    }

    return tagsHTML;
}

function displayInfo(eventObject, orgObject) {
    headingElement.innerText = eventObject.eventName;
    orgNameElement.innerText = orgObject.name;
    imageElement.src = eventObject.image;
    locationElement.innerText = eventObject.location;
    timeElement.innerHTML = formatDate(new Date(eventObject.date));
    descriptionElement.innerText = eventObject.description;
    orgDetailsElement.innerText = orgObject.description;
    tagsDiv.innerHTML = getTagsHTML(eventObject.tags);

}

async function loadEventInfo(id) {  
    try {
        const eventsResponse = await fetch("./json/events.json");
        const eventsArr = await eventsResponse.json();

        const organizersResponse = await fetch("./json/organizers.json");
        const organizersArr = await organizersResponse.json();

        const eventObject = getEventById(id, eventsArr);
        const orgObject = getOrganizerById(eventObject.organizerId, organizersArr);

        displayInfo(eventObject, orgObject);
    } catch (e) {
        console.log(e);
    }
}

async function fetchEventFromAPI(id) {
    try {
        const apiEventResponse = await fetch(`https://64b517e8f3dbab5a95c6afd3.mockapi.io/events/${id}`);
        const eventObject = await apiEventResponse.json();

        const apiOrgResponse = await fetch(`https://64b517e8f3dbab5a95c6afd3.mockapi.io/organizers/${eventObject.organizerId}`);
        const orgObject = await apiOrgResponse.json();

        displayInfo(eventObject, orgObject);
    } catch (error) {
        console.log(error);
    }
}

//////End of functions

window.onload = () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("e");
    fetchEventFromAPI(id);
}

