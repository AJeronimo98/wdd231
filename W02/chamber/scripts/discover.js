import { places } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");

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

        <button type="button">Learn More</button>
    `;

    discoverGrid.appendChild(card);
});