// 1. Navigation Paths
const pagePaths = {
    dashboard: "../Dashboard/index.html",
    assignment: "../Assignment/index.html",
    payment: "../Payment/index.html",
    registered: "../RegisteredCourse/index.html",
    attendence: "../Attendence/index.html",
    lecture: "../LectureNote/index.html",
    result: "../Result/index.html",
    faculty: "../FacultyInformation/index.html",
    admit: "../AdmitCard/index.html",
    class: "../ClassDetails/index.html"
};

// 2. Get Student ID
const params = new URLSearchParams(window.location.search);
const studentId = params.get('id');

// Global variable to store fetched data
let allFacultyData = [];

// 3. Initialize Page
function initPage() {
    // If no ID, redirect (Optional, remove if this page is public)
    if (!studentId) {
       // window.location.href = "../Login/index.html"; 
       // return;
    }

    setupNavigation();
    loadFacultyData();
}

// 4. Setup Navigation Links
function setupNavigation() {
    const navItems = document.querySelectorAll('[data-target]');

    navItems.forEach(item => {
        const targetKey = item.getAttribute('data-target');
        const basePath = pagePaths[targetKey];

        if (basePath) {
            // Append ID if it exists
            const finalUrl = studentId ? `${basePath}?id=${studentId}` : basePath;

            if (item.tagName === 'A') {
                item.href = finalUrl;
            } else {
                item.addEventListener('click', () => {
                    window.location.href = finalUrl;
                });
            }
        }
    });
}

// 5. Fetch Faculty Data from JSON
function loadFacultyData() {
    // Assuming FacultyData.json is in the same folder. 
    // If it is outside, use '../FacultyData.json'
    fetch('/../facultyData.json') 
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            allFacultyData = data; // Store data globally
            displayFaculty(allFacultyData); // Render initial list
        })
        .catch(error => {
            console.error("Error loading faculty data:", error);
            document.getElementById("faculty-container").innerHTML = 
                `<p style="text-align:center; color:red;">Error loading directory. Please try again later.</p>`;
        });
}

// 6. Render Faculty Cards
function displayFaculty(facultyList) {
    const container = document.getElementById("faculty-container");
    container.innerHTML = "";
    
    if (facultyList.length === 0) {
        container.innerHTML = `<p style="text-align:center; width:100%; color:red;">No faculty found matching your search.</p>`;
        return;
    }
    
    facultyList.forEach((faculty) => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        // Construct the link for details page
        // We go up one level (..) then into FacultyDetails
        const detailsLink = `FacultyDetails/index.html?id=${studentId || ''}&FACULTY=${faculty.initial}`;

        card.innerHTML = `
            <h1>${faculty.name} (${faculty.initial})</h1>
            <h2>${faculty.designation || 'Faculty Member'}</h2>
            <h3>Email: ${faculty.email}</h3>
            <h3>Contact: ${faculty.phone || 'N/A'}</h3>
            <a href="${detailsLink}">See details</a>
        `;
        container.appendChild(card);
    });
}

// 7. Search Functionality
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase(); 

    const filteredFaculty = allFacultyData.filter((faculty) => {
        // Safe check in case fields are missing
        const name = faculty.name ? faculty.name.toLowerCase() : "";
        const initial = faculty.initial ? faculty.initial.toLowerCase() : "";
        
        return name.includes(searchTerm) || initial.includes(searchTerm);
    });

    displayFaculty(filteredFaculty);
});

// Run Initialization
initPage();