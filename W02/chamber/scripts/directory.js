const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");


async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members.json");
        }

        const data = await response.json();

        displayMembers(data.members);

    } catch (error) {

        console.error(error);

        membersContainer.innerHTML = `
            <p class="error">
                Unable to load the business directory.
            </p>
        `;
    }
}


function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");

        card.className = "member-card";

        card.innerHTML = `
            <img
                class="member-image"
                src="images/${member.image}"
                alt="${member.name}"
                loading="lazy"
                width="600"
                height="400"
            >

            <div class="member-info">

                <h3>${member.name}</h3>

                <p class="member-description">
                    ${member.description}
                </p>

                <p class="member-detail">
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p class="member-detail">
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <span class="membership ${membershipClass(member.membership)}">
                    ${membershipName(member.membership)}
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


function membershipName(level) {

    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}


function membershipClass(level) {

    if (level === 3) {
        return "gold";
    }

    if (level === 2) {
        return "silver";
    }

    return "member";
}


/* =========================
   GRID
========================= */

gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");

    gridButton.classList.add("active-button");
    listButton.classList.remove("active-button");
});


/* =========================
   LIST
========================= */

listButton.addEventListener("click", () => {

    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");

    listButton.classList.add("active-button");
    gridButton.classList.remove("active-button");
});


getMembers();