// 1. Define the paths for your pages here. 
// If you need to change a link later, you only change it here.
const pagePaths = {
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

// 2. Get the Student ID from the current URL
const params = new URLSearchParams(window.location.search);
const studentId = params.get('id');

// 3. Select DOM elements
const studentNameEl = document.getElementById("studentName");
const dashboardLink = document.getElementById("onboard");

// Function to initialize the page
function initDashboard() {
    
    // If no ID is found in URL, redirect to login or show error
    if (!studentId) {
        window.location.href = "../Login/index.html"; 
        return;
    }

    // Update Dashboard link to include the current ID (so clicking it doesn't log you out)
    dashboardLink.href = `?id=${studentId}`;

    // 4. Fetch Student Data from JSON
    fetch('/../StudentInfo.json')
        .then(response => response.json())
        .then(data => {
            // Check if student exists in the JSON
            if (data.hasOwnProperty(studentId)) {
                // Update the Name
                studentNameEl.textContent = data[studentId].name;
            } else {
                studentNameEl.textContent = "Unknown Student";
                console.error("Student ID not found in JSON database.");
            }
        })
        .catch(error => {
            console.error("Error loading student data:", error);
            studentNameEl.textContent = "Error Loading Data";
        });

    // 5. Activate all Links and Buttons
    setupNavigation();
}

function setupNavigation() {
    // Select all elements (<a> and <button>) that have a data-target attribute
    const navItems = document.querySelectorAll('[data-target]');

    navItems.forEach(item => {
        const targetKey = item.getAttribute('data-target');
        const basePath = pagePaths[targetKey];

        if (basePath) {
            // Construct the final URL with the ID
            const finalUrl = `${basePath}?id=${studentId}`;

            // If it's an anchor tag <a>, set the href
            if (item.tagName === 'A') {
                item.href = finalUrl;
            } 
            // If it's a button, add a click event
            else {
                item.addEventListener('click', () => {
                    window.location.href = finalUrl;
                });
            }
        }
    });
}

// Run the initialization
initDashboard();