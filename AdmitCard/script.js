// 1. Define the paths for all your pages
const pagePaths = {
    dashboard: "../Dashboard/index.html",
    assignment: "../Assignment/index.html",
    payment: "../Payment/index.html",
    registered: "../RegisteredCourse/index.html",
    attendence: "../Attendence/index.html",
    lecture: "../LectureNote/index.html",
    result: "../Result/index.html",
    faculty: "../FacultyInformation/index.html",
    admit: "index.html", // Current page
    class: "../ClassDetails/index.html"
};

// 2. Get the Student ID from the current URL
const params = new URLSearchParams(window.location.search);
const studentId = params.get('id');

// 3. Initialize the page
function initPage() {
    
    // Security check: If no ID is in the URL, redirect to Login
    if (!studentId) {
        window.location.href = "../Login/index.html"; 
        return;
    }

    // 4. Update all navigation links to include the ID
    const navLinks = document.querySelectorAll('[data-target]');

    navLinks.forEach(link => {
        const key = link.getAttribute('data-target');
        const basePath = pagePaths[key];

        if (basePath) {
            // Set the href to: ../Path/index.html?id=12345
            link.href = `${basePath}?id=${studentId}`;
        }
    });
}

// Run the function
initPage();