// 1. Define paths relative to the current folder (LectureNote)
const pagePaths = {
    dashboard: "../Dashboard/index.html", // Added this link
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

// 2. Get Student ID from URL
const params = new URLSearchParams(window.location.search);
const studentId = params.get('id');

// 3. Initialize
function initPage() {
    // Security Check: If no ID, send back to login
    if (!studentId) {
        // Assuming Login is two levels up or similar, adjust if needed
        window.location.href = "../Login/index.html"; 
        return;
    }

    // Setup the navigation links
    setupNavigation();
}

function setupNavigation() {
    const navItems = document.querySelectorAll('[data-target]');

    navItems.forEach(item => {
        const targetKey = item.getAttribute('data-target');
        const basePath = pagePaths[targetKey];

        if (basePath) {
            const finalUrl = `${basePath}?id=${studentId}`;

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

// Run
initPage();