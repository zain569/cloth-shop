let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let registerBtn = document.getElementById("registerBtn");

//errror handling for password mismatch
let nameError = document.getElementById("nameerror");
let emailError = document.getElementById("emailerror");
let passwordError = document.getElementById("passworderror");
let confirmPasswordError = document.getElementById("confirm-passworderror");

// ✅ Email validation regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

registerBtn.addEventListener("click", function(event){
    event.preventDefault();
    let valid = true;
    
    // Validate username
    if (username.value.trim() === "") {
        nameError.textContent = "Please enter a valid username";
        valid = false;
    } else {
        nameError.textContent = "";
    }

    // Validate email
    if (email.value.trim() === "") {
        emailError.textContent = "Please enter a valid email";
        valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Enter a valid email (e.g. user@example.com)";
        valid = false;
    } else {
        emailError.textContent = "";
    }

    // Validate password
    if (password.value.trim() === "") {
        passwordError.textContent = "Please enter a valid password";
        valid = false;
    } else {
        passwordError.textContent = "";
    }

    // Validate confirm password
    if (confirmPassword.value.trim() === "") {
        confirmPasswordError.textContent = "Please confirm your password";
        valid = false;
    } else {
        confirmPasswordError.textContent = "";
    }

    // Check if passwords match
    if (password.value.trim() !== "" && confirmPassword.value.trim() !== "" && password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        valid = false;
    } else if (password.value === confirmPassword.value) {
        confirmPasswordError.textContent = "";
    }

    if (valid) {
        // Submit the form or perform the desired action
        console.log("Form submitted successfully");

        //saved data to local storage
        localStorage.setItem("username", username.value.trim());
        localStorage.setItem("email", email.value.trim());
        localStorage.setItem("password", password.value.trim());

        window.location.href = "login.html"; // Redirect to login page after successful registration
    }
});
