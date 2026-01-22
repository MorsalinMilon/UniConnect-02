const facultyData = [
    {
        name: "Dr. Rahman",
        department: "Computer Science",
        email: "rahman@university.edu"
    },
    {
        name: "Prof. Ayesha",
        department: "Physics",
        email: "ayesha@university.edu"
    },
    {
        name: "Mr. Karim",
        department: "Mathematics",
        email: "karim@university.edu"
    }
];

const container = document.getElementById("faculty-container");

facultyData.forEach(faculty => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${faculty.name}</h3>
        <p><strong>Department:</strong> ${faculty.department}</p>
        <p><strong>Email:</strong> ${faculty.email}</p>
    `;

    container.appendChild(card);
});
