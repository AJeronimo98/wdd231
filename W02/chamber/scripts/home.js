/* ========================================
   HOME PAGE JAVASCRIPT
======================================== */


/* ========================================
   SELECT ELEMENTS
======================================== */

const menuButton =
    document.querySelector("#menu-button");

const navigation =
    document.querySelector("#navigation");

const weatherContainer =
    document.querySelector("#weather");

const spotlightsContainer =
    document.querySelector("#spotlights");


/* ========================================
   MOBILE NAVIGATION
======================================== */

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuButton.textContent =
            isOpen ? "✕" : "☰";

    });

}


/* ========================================
   FOOTER
======================================== */

const currentYear =
    document.querySelector("#currentyear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


const lastModified =
    document.querySelector("#lastmodified");

if (lastModified) {

    lastModified.textContent =
        document.lastModified;

}


/* ========================================
   OPENWEATHERMAP
======================================== */

/*
   IMPORTANT:
   Replace the value below with your
   OpenWeatherMap API key.
*/

const API_KEY =
    "YOUR_API_KEY";


const CITY =
    "Oaxaca de Juarez";


const CURRENT_WEATHER_URL =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=en`;


const FORECAST_URL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(CITY)}&appid=${API_KEY}&units=metric&lang=en`;


/* ========================================
   GET CURRENT WEATHER
======================================== */

async function getCurrentWeather() {

    const response =
        await fetch(CURRENT_WEATHER_URL);

    if (!response.ok) {

        throw new Error(
            `Current weather error: ${response.status}`
        );

    }

    return await response.json();

}


/* ========================================
   GET FORECAST
======================================== */

async function getForecast() {

    const response =
        await fetch(FORECAST_URL);

    if (!response.ok) {

        throw new Error(
            `Forecast error: ${response.status}`
        );

    }

    return await response.json();

}


/* ========================================
   DISPLAY WEATHER
======================================== */

async function displayWeather() {

    try {

        const current =
            await getCurrentWeather();

        const forecast =
            await getForecast();


        const temperature =
            Math.round(current.main.temp);


        const description =
            current.weather[0].description;


        const iconCode =
            current.weather[0].icon;


        const iconURL =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


        const threeDayForecast =
            getThreeDayForecast(
                forecast.list
            );


        weatherContainer.innerHTML = `

            <div class="weather-current">

                <img
                    src="${iconURL}"
                    alt="${description}"
                    width="80"
                    height="80"
                >

                <div>

                    <h3>
                        ${temperature}°C
                    </h3>

                    <p>
                        ${description}
                    </p>

                    <p>
                        Oaxaca de Juárez
                    </p>

                </div>

            </div>


            <h3>
                Three-Day Forecast
            </h3>


            <div class="forecast-container">

                ${threeDayForecast.map(day => `

                    <article class="forecast-card">

                        <h3>
                            ${day.label}
                        </h3>

                        <p>
                            Temperature:
                            ${day.temperature}°C
                        </p>

                        <p>
                            ${day.description}
                        </p>

                    </article>

                `).join("")}

            </div>

        `;

    }

    catch (error) {

        console.error(
            "Weather error:",
            error
        );

        weatherContainer.innerHTML = `

            <p class="error">
                Weather information is currently unavailable.
            </p>

        `;

    }

}


/* ========================================
   GET THREE DAY FORECAST
======================================== */

function getThreeDayForecast(list) {

    const days = {};


    list.forEach(item => {

        const date =
            new Date(item.dt * 1000);


        const dateKey =
            date.toLocaleDateString(
                "en-CA"
            );


        if (!days[dateKey]) {

            days[dateKey] = {

                label:
                    date.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short",
                            month: "short",
                            day: "numeric"
                        }
                    ),

                temperature:
                    Math.round(
                        item.main.temp
                    ),

                description:
                    item.weather[0].description

            };

        }

    });


    return Object.values(days)
        .slice(1, 4);

}


/* ========================================
   GET MEMBERS
======================================== */

async function getMembers() {

    try {

        const response =
            await fetch("data/members.json");


        if (!response.ok) {

            throw new Error(
                `Members error: ${response.status}`
            );

        }


        const data =
            await response.json();


        /* GOLD + SILVER ONLY */

        const eligibleMembers =
            data.members.filter(
                member =>
                    member.membership === 2 ||
                    member.membership === 3
            );


        /* RANDOM 3 */

        const selectedMembers =
            getRandomMembers(
                eligibleMembers,
                3
            );


        displaySpotlights(
            selectedMembers
        );

    }

    catch (error) {

        console.error(
            "Spotlight error:",
            error
        );


        spotlightsContainer.innerHTML = `

            <p class="error">
                Business spotlights are currently unavailable.
            </p>

        `;

    }

}


/* ========================================
   RANDOM MEMBERS
======================================== */

function getRandomMembers(
    members,
    count
) {

    const shuffled =
        [...members].sort(
            () => Math.random() - 0.5
        );


    return shuffled.slice(
        0,
        count
    );

}


/* ========================================
   DISPLAY SPOTLIGHTS
======================================== */

function displaySpotlights(members) {

    spotlightsContainer.innerHTML = "";


    members.forEach(member => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "spotlight-card";


        card.innerHTML = `

            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
                width="180"
                height="100"
            >


            <h3>
                ${member.name}
            </h3>


            <span class="membership ${
                getMembershipClass(
                    member.membership
                )
            }">

                ${getMembershipName(
                    member.membership
                )}

            </span>


            <p>
                <strong>
                    Phone:
                </strong>

                ${member.phone}
            </p>


            <p>
                <strong>
                    Address:
                </strong>

                ${member.address}
            </p>


            <a
                href="${member.website}"
                target="_blank"
                rel="noopener noreferrer">

                Visit Website

            </a>

        `;


        spotlightsContainer.appendChild(
            card
        );

    });

}


/* ========================================
   MEMBERSHIP NAME
======================================== */

function getMembershipName(level) {

    switch (level) {

        case 3:
            return "Gold Member";

        case 2:
            return "Silver Member";

        default:
            return "Member";

    }

}


/* ========================================
   MEMBERSHIP CLASS
======================================== */

function getMembershipClass(level) {

    switch (level) {

        case 3:
            return "gold";

        case 2:
            return "silver";

        default:
            return "member";

    }

}


/* ========================================
   START HOME PAGE
======================================== */

if (weatherContainer) {

    displayWeather();

}


if (spotlightsContainer) {

    getMembers();

} 


