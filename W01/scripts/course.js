const courseContainer = document.querySelector("#course-container");
const totalCredits = document.querySelector("#total-credits");

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
            <p>${course.completed ? "Completed ✓" : "Not Completed"}</p>
        `;

        courseContainer.appendChild(courseCard);
    });

    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}

document.querySelector("#all-courses").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    const wddCourses = courses.filter(
        course => course.subject === "WDD"
    );

    displayCourses(wddCourses);
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    const cseCourses = courses.filter(
        course => course.subject === "CSE"
    );

    displayCourses(cseCourses);
});

displayCourses(courses);