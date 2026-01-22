// 1. Get Parameters from URL
const params = new URLSearchParams(window.location.search);

// --- FIX: Changed 'FACULTY' to 'name' to match the link from the previous page ---
const facultyInitial = params.get("FACULTY"); 
const studentId = params.get("id"); 
const container = document.getElementById("container");

// 2. Main Function to Load Data
async function init() {
    try {
        if (!facultyInitial) {
            container.innerHTML = "<p class='error'>No faculty specified in URL.</p>";
            return;
        }

        // Fetch the JSON file
        // Ensure this path points correctly to where your json file is located relative to this html file.
        // If the HTML is in "FacultyDetails" folder, and JSON is 2 levels up:
        const response = await fetch('../../facultyData.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Find the faculty member matching the initial (e.g., "MOH")
        const faculty = data.find(item => item.initial === facultyInitial);

        if (faculty) {
            displayFaculty(faculty);
        } else {
            container.innerHTML = `<p class='error'>Faculty member with initial "${facultyInitial}" not found.</p>`;
        }

    } catch (error) {
        console.error("Error loading faculty details:", error);
        container.innerHTML = "<p class='error'>Error loading data. Please try again later.</p>";
    }
}

// 3. Render Function
function displayFaculty(faculty) {
    container.innerHTML = ""; // Clear loading message

    // Create the Course List HTML
    let coursesListHTML = '';
    if (faculty.courses && faculty.courses.length > 0) {
        coursesListHTML = `<ul class="course-list">`;
        faculty.courses.forEach(course => {
            coursesListHTML += `<li>${course}</li>`;
        });
        coursesListHTML += `</ul>`;
    } else {
        coursesListHTML = '<p>No active courses.</p>';
    }

    // Create the Card
    const card = document.createElement("div");
    card.classList.add("card");

    // Construct the HTML
    card.innerHTML = `
        <div class="card-header">
            <h1>${faculty.name}</h1>
            <span class="badge">${faculty.initial}</span>
        </div>
        
        <div class="card-body">
            <h2 class="designation">${faculty.designation}</h2>
            
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">Email:</span>
                    <a href="mailto:${faculty.email}">${faculty.email}</a>
                </div>
                <div class="info-item">
                    <span class="label">Contact:</span>
                    <span>${faculty.phone || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="label">Office Room:</span>
                    <span>${faculty.officeRoom || 'N/A'}</span>
                </div>
                <div class="info-item">
                    <span class="label">Consultation:</span>
                    <span style="white-space: pre-line">${faculty.consultationHour || 'N/A'}</span>
                </div>
            </div>

            <div class="schedule-box">
                <p><strong>Weekend:</strong> ${faculty.weekend || 'N/A'}</p>
                <p><strong>Home Office:</strong> ${faculty.homeOffice || 'N/A'}</p>
            </div>

            <div class="courses-section">
                <h3>Courses Attempting</h3>
                ${coursesListHTML}
            </div>
        </div>
    `;

    container.appendChild(card);
}

// Run the initialization
init();