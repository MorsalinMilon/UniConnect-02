// 1. Define paths relative to the current folder (RegisteredCourse)
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

// 2. Get Student ID from URL
const params = new URLSearchParams(window.location.search);
const studentId = params.get('id');

// 3. Initialize Page
function initPage() {
    // Security check
    if (!studentId) {
        document.getElementById('semester-title').textContent = "Error";
        document.getElementById('course-list').innerHTML = 
            '<p class="error-msg">No Student ID found in URL.</p>';
        return;
    }

    // Setup Navigation
    setupNavigation();
    
    // Load Course Data
    loadData();
}

// 4. Setup Navigation Links
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

// 5. Fetch and Render Data
async function loadData() {
    try {
        const titleElement = document.getElementById('semester-title');
        const listElement = document.getElementById('course-list');
        
        // Fetch both JSON files
        const [allCoursesRes, studentInfoRes] = await Promise.all([
            fetch('/../AllCourse.json'),
            fetch('/../StudentInfo.json')
        ]);

        if (!allCoursesRes.ok || !studentInfoRes.ok) throw new Error("Failed to load data files.");

        const allCourses = await allCoursesRes.json();
        const studentData = await studentInfoRes.json();

        let currentSemester = null;
        let studentName = "";

        // Check if student exists
        if (studentData[studentId]) {
            currentSemester = studentData[studentId].semester;
            studentName = studentData[studentId].name;
        } else {
            throw new Error("Student ID not found in database.");
        }

        // Update Header
        titleElement.textContent = `Registered Courses - ${studentName} (${currentSemester})`;

        // Get Courses
        const semesterCourses = allCourses[currentSemester];

        if (!semesterCourses) {
            listElement.innerHTML = `<p class="no-data">No course data found for ${currentSemester}.</p>`;
            return;
        }

        renderCourses(semesterCourses);

    } catch (error) {
        console.error(error);
        document.getElementById('course-list').innerHTML = `<p class="error-msg">Error loading courses: ${error.message}</p>`;
    }
}

// 6. Render Cards
function renderCourses(courses) {
    const listElement = document.getElementById('course-list');
    listElement.innerHTML = ''; 

    for (const [courseCode, details] of Object.entries(courses)) {
        
        const card = document.createElement('div');
        card.className = 'course-card';
        
        // --- FIXED LOGIC FOR FACULTY OBJECT ---
        let facultyHtml = '';
        const facultyData = details.faculty;

        // Check if facultyData is an Object (New Format: { "A": "Name", "B": "Name" })
        if (facultyData && typeof facultyData === 'object' && !Array.isArray(facultyData)) {
            const sections = Object.entries(facultyData);
            
            if (sections.length > 0) {
                // Map through sections (A, B, C...)
                const sectionLinks = sections.map(([section, name]) => {
                    if (name === "TBA") {
                        return `<div style="margin-top: 2px;">Sec ${section}: <span class="tba-text">TBA</span></div>`;
                    }
                    return `
                        <div style="margin-top: 2px;">
                            Sec ${section}: 
                            <a href="../FacultyInformation/FacultyDetails/index.html?id=${studentId}&FACULTY=${encodeURIComponent(name)}" class="faculty-link" title="View Profile">
                                ${name}
                            </a>
                        </div>`;
                });
                facultyHtml = sectionLinks.join('');
            } else {
                facultyHtml = `<span class="tba-text">TBA</span>`;
            }
        } 
        // Fallback for String (Old Format) just in case
        else if (typeof facultyData === 'string' && facultyData !== "TBA") {
             facultyHtml = `
                <a href="../FacultyInformation/index.html?id=${studentId}&name=${encodeURIComponent(facultyData)}" class="faculty-link" title="View Profile">
                    ${facultyData} ↗
                </a>`;
        } 
        else {
            facultyHtml = `<span class="tba-text">TBA</span>`;
        }
        // --------------------------------------

        // Logic for Attendance Link
        const attendanceLink = `../Attendence/index.html?id=${studentId}&courseCode=${encodeURIComponent(courseCode)}`;

        card.innerHTML = `
            <div>
                <div class="course-header">
                    <span class="course-code">${courseCode}</span>
                    <span class="course-credit">${details.credit} Cr</span>
                </div>
                <h3 class="course-name">${details.courseName}</h3>
                
                <div class="faculty-info">
                    <div style="margin-bottom: 4px;"><strong>Faculty:</strong></div>
                    ${facultyHtml}
                </div>
            </div>
            
            <div class="action-area">
                <a href="${attendanceLink}" class="attendance-btn">
                    Check Attendance
                </a>
            </div>
        `;
        
        listElement.appendChild(card);
    }
}

// Run Initialization
initPage();