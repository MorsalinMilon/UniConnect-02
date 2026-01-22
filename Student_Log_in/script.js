const form = document.getElementById("loginForm");
const output = document.getElementById("output");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const myId = document.getElementById("id").value.trim();
    const myPassword = document.getElementById("password").value.trim();

    // Fetch the JSON file containing student data
    fetch('/../StudentInfo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load student data.");
            }
            return response.json();
        })
        .then(studentData => {
            // Check if the entered ID exists in the JSON object
            if (studentData.hasOwnProperty(myId)) {
                
                const student = studentData[myId];

                // Check if the password matches the 'code' in the JSON
                if (student.code === myPassword) {
                    output.textContent = "Log in Successful!";
                    output.style.color = "green";
                    
                    // Redirect to dashboard with the ID in the URL
                    // Example: ../Dashboard/index.html?id=242071046
                    setTimeout(() => {
                        window.location.href = `../Dashboard/index.html?id=${myId}`;
                    }, 1000); // Small delay to show success message
                    
                } else {
                    output.textContent = "Wrong password! Try again.";
                    output.style.color = "red";
                }

            } else {
                output.textContent = "Invalid ID! User not found.";
                output.style.color = "red";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            output.textContent = "System Error: Please ensure you are running this on a local server.";
            output.style.color = "orange";
        });
});