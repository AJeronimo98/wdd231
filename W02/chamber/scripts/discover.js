import { places } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

// Generate the discover cards
places.forEach((place, index) => {
    const card = document.createElement("article");

    card.classList.add("discover-card");
    card.classList.add(`card-${index + 1}`);

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="${place.image}"
                alt="${place.name}"
                loading="lazy"
                width="300"
                height="200">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button type="button">
            Learn More
        </button>
    `;

    discoverGrid.appendChild(card);
});


// Last visit message
const lastVisit = localStorage.getItem("discoverLastVisit");
const currentTime = Date.now();
const oneDay = 24 * 60 * 60 * 1000;

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const elapsedTime = currentTime - Number(lastVisit);

    if (elapsedTime < oneDay) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else {

        const days = Math.floor(elapsedTime / oneDay);

        visitMessage.textContent =
            `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
}


// Save the current visit
localStorage.setItem("discoverLastVisit", currentTime);