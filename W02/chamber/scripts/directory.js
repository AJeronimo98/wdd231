/* ========================================
   DIRECTORY PAGE JAVASCRIPT
======================================== */


/* ========================================
   SELECT ELEMENTS
======================================== */

const membersContainer =
    document.querySelector("#members");

const gridButton =
    document.querySelector("#grid-button");

const listButton =
    document.querySelector("#list-button");

const menuButton =
    document.querySelector("#menu-button");

const navigation =
    document.querySelector("#navigation");


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
            isOpen
                ? "✕"
                : "☰";

    });

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
                `HTTP error: ${response.status}`
            );

        }

        const data =
            await response.json();

        displayMembers(data.members);

    }

    catch (error) {

        console.error(
            "Error loading member data:",
            error
        );

        membersContainer.innerHTML = `
            <p class="error">
                We were unable to load the business directory.
                Please try again later.
            </p>
        `;

    }

}


/* ========================================
   DISPLAY MEMBERS
======================================== */

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card =
            document.createElement("article");

        card.className =
            "member-card";


        card.innerHTML = `

            <img
                class="member-image"
                src="images/${member.image}"
                alt="${member.name} business image"
                loading="lazy"
                width="600"
                height="400"
            >


            <div class="member-info">

                <h3>
                    ${member.name}
                </h3>


                <p class="member-description">
                    ${member.description}
                </p>


                <p class="member-detail">

                    <strong>
                        Address:
                    </strong>

                    ${member.address}

                </p>


                <p class="member-detail">

                    <strong>
                        Phone:
                    </strong>

                    ${member.phone}

                </p>


                <span class="membership ${getMembershipClass(member.membership)}">

                    ${getMembershipName(member.membership)}

                </span>


                <a
                    class="website-link"
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">

                    Visit Website

                </a>

            </div>

        `;


        membersContainer.appendChild(card);

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
   GRID BUTTON
======================================== */

gridButton.addEventListener(
    "click",
    () => {

        membersContainer.classList.remove(
            "list"
        );

        membersContainer.classList.add(
            "grid"
        );


        gridButton.classList.add(
            "active-button"
        );

        listButton.classList.remove(
            "active-button"
        );

    }
);


/* ========================================
   LIST BUTTON
======================================== */

listButton.addEventListener(
    "click",
    () => {

        membersContainer.classList.remove(
            "grid"
        );

        membersContainer.classList.add(
            "list"
        );


        listButton.classList.add(
            "active-button"
        );

        gridButton.classList.remove(
            "active-button"
        );

    }
);


/* ========================================
   FOOTER YEAR
======================================== */

document.querySelector(
    "#currentyear"
).textContent =
    new Date().getFullYear();


/* ========================================
   LAST MODIFIED
======================================== */

document.querySelector(
    "#lastmodified"
).textContent =
    document.lastModified;


/* ========================================
   LOAD DIRECTORY
======================================== */

getMembers();