const form = document.querySelector("#add-event-form");

async function addEvent(event) {
    event.preventDefault();
    
    const newEventObject = {
        eventName: document.querySelector("#event-title").value,
        description: document.querySelector("#description").value,
        organizerId: 1, //TODO: find how to make it as the current org
        location: document.querySelector("#location").value,
    };

    // console.log(newEventObject);
    // console.log(JSON.stringify(newEventObject));


    try{
        const response = await fetch("https://64b517e8f3dbab5a95c6afd3.mockapi.io/events", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newEventObject)
        });

        const result = await response.json();
        console.log(result);

        event.preventDefault();
    } catch (error) {
        console.log(error);
        event.preventDefault();
    }
}

// function logDetails(event){
//     const newEventObject = {
//         eventName: document.querySelector("#event-title").value,
//         description: document.querySelector("#description").value,
//         organizerId: 1, //TODO: find how to make it as the current org
//         location: document.querySelector("#location").value,
//     };

//     console.log(newEventObject);
//     event.preventDefault();
// }

form.addEventListener("submit", addEvent);
