document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();  // Prevent form from submitting to handle it via JavaScript

    // Collect form data
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("confirmPassword", document.getElementById("confirmPassword").value);
    formData.append("profilePic", document.getElementById("profilePic").files[0]);

    try {
        // Send form data to the backend
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error during registration');
        }

        const result = await response.json();
        alert("User registered successfully!");
    } catch (error) {
        console.error("Error:", error);
        alert("Error during registration.");
    }
});
