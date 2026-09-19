const API_KEY = "bc004250ecec324b4a7670a1a00965df";

const latitude = 17.0732;
const longitude = -96.7266;


/* =========================
   WEATHER
========================= */

async function getWeather() {

    const currentContainer = document.querySelector("#current-weather");
    const forecastContainer = document.querySelector("#forecast");

    try {

        const currentURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentURL),
            fetch(forecastURL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather information could not be loaded.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {

        console.error(error);

        currentContainer.innerHTML = `
            <p class="weather-error">
                Weather information is currently unavailable.
            </p>
        `;

        forecastContainer.innerHTML = "";
    }
}


function displayCurrentWeather(data) {

    const container = document.querySelector("#current-weather");

    container.innerHTML = `
        <p>Oaxaca de Juárez, Oaxaca</p>

        <p class="current-temperature">
            ${Math.round(data.main.temp)}°C
        </p>

        <p class="current-description">
            ${data.weather[0].description}
        </p>

        <p>
            Feels like ${Math.round(data.main.feels_like)}°C
        </p>
    `;
}


function displayForecast(data) {

    const container = document.querySelector("#forecast");

    const timezone = data.city.timezone;

    const groupedDays = {};

    data.list.forEach(item => {

        const localDate = new Date(
            (item.dt + timezone) * 1000
        );

        const dateKey = localDate.toISOString().split("T")[0];

        if (!groupedDays[dateKey]) {
            groupedDays[dateKey] = [];
        }

        groupedDays[dateKey].push(item);
    });


    const today = new Date(
        (Date.now() / 1000 + timezone) * 1000
    );

    const todayKey = today.toISOString().split("T")[0];


    const futureDays = Object.keys(groupedDays)
        .filter(day => day > todayKey)
        .slice(0, 3);


    container.innerHTML = "";


    futureDays.forEach(day => {

        const items = groupedDays[day];

        const forecast = items.reduce((closest, item) => {

            const itemDate = new Date(
                (item.dt + timezone) * 1000
            );

            const hour = itemDate.getUTCHours();

            const closestHour = new Date(
                (closest.dt + timezone) * 1000
            ).getUTCHours();

            return Math.abs(hour - 12) < Math.abs(closestHour - 12)
                ? item
                : closest;

        });


        const date = new Date(
            `${day}T12:00:00`
        );


        const card = document.createElement("article");

        card.className = "forecast-card";

        card.innerHTML = `
            <h3>
                ${date.toLocaleDateString("en-US", {
                    weekday: "long"
                })}
            </h3>

            <p>
                ${Math.round(forecast.main.temp)}°C
            </p>

            <p>
                ${forecast.weather[0].description}
            </p>
        `;

        container.appendChild(card);
    });
}


/* =========================
   SPOTLIGHTS
========================= */

async function getSpotlights() {

    const container = document.querySelector("#spotlights");

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const data = await response.json();

        const qualifiedMembers = data.members.filter(
            member => member.membership === 2 || member.membership === 3
        );


        const shuffled = [...qualifiedMembers];

        for (let i = shuffled.length - 1; i > 0; i--) {

            const randomIndex = Math.floor(
                Math.random() * (i + 1)
            );

            [shuffled[i], shuffled[randomIndex]] =
                [shuffled[randomIndex], shuffled[i]];
        }


        const selectedMembers = shuffled.slice(0, 3);

        container.innerHTML = "";


        selectedMembers.forEach(member => {

            const card = document.createElement("article");

            card.className = "spotlight-card";

            card.innerHTML = `
                <img
                    class="spotlight-logo"
                    src="images/${member.logo}"
                    alt="${member.name} logo"
                    loading="lazy"
                    width="600"
                    height="400"
                >

                <h3>${member.name}</h3>

                <span class="spotlight-membership ${
                    member.membership === 3 ? "gold" : "silver"
                }">
                    ${member.membership === 3
                        ? "Gold Member"
                        : "Silver Member"}
                </span>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <a
                    class="website-link"
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <p class="error">
                Business spotlights are currently unavailable.
            </p>
        `;
    }
}


getWeather();
getSpotlights();