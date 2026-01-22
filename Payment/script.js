// 1. Define paths relative to the current folder (Payment)
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

// 2. Get Student ID from the current URL
const params = new URLSearchParams(window.location.search);
const studentId = params.get('id');

// 3. Initialize the Page
function initPage() {
    // Security Check: If no ID is found, redirect to login
    if (!studentId) {
        window.location.href = "../Login/index.html"; 
        return;
    }

    // Activate the navigation links
    setupNavigation();
}

// 4. Setup Link Logic
function setupNavigation() {
    // Select all elements with 'data-target'
    const navItems = document.querySelectorAll('[data-target]');

    navItems.forEach(item => {
        const targetKey = item.getAttribute('data-target');
        const basePath = pagePaths[targetKey];

        if (basePath) {
            // Append the Student ID to the URL
            const finalUrl = `${basePath}?id=${studentId}`;

            // If it's an <a> tag, update the href
            if (item.tagName === 'A') {
                item.href = finalUrl;
            } 
            // If it's a button or other element, add a click listener
            else {
                item.addEventListener('click', () => {
                    window.location.href = finalUrl;
                });
            }
        }
    });
}

// Run the initialization
initPage();