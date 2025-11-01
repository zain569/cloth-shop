// login.js

// Input elements (unique IDs)
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const registerBtnL = document.getElementById("registerBtn");

// Error display elements
const emailErrorL = document.getElementById("emailError");
const passwordErrorL = document.getElementById("passwordError");
const generalError = document.getElementById("generalError");
let deleteAccountBtn = document.getElementById("delete-account");

// Delete account button handler
deleteAccountBtn.addEventListener("click", function () {
   if (confirm("Are you sure you want to delete your account?")) {
       // Clear stored credentials
       localStorage.removeItem("email");
       localStorage.removeItem("password");
       sessionStorage.removeItem("loggedInUser");
        alert("Your account has been deleted.");
   }
});

// Email validation regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Try to read stored credentials from localStorage (support common key variations)
function getStoredCredentials() {
  // try lowercase keys first, then TitleCase keys
  const email1 = localStorage.getItem("email");
  const pass1  = localStorage.getItem("password");

  const email2 = localStorage.getItem("Email");
  const pass2  = localStorage.getItem("Password");

  return {
    email: email1 || email2 || null,
    password: pass1 || pass2 || null
  };
}

// navigate to registration page
registerBtnL.addEventListener("click", function () {
  window.location.href = "registration.html";
});

// login button handler
loginBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Clear old errors
  emailErrorL.textContent = "";
  passwordErrorL.textContent = "";
  generalError.textContent = "";

  const emailVal = emailInput.value.trim();
  const passVal = passwordInput.value.trim();

  let valid = true;

  // Validate email
  if (emailVal === "") {
    emailErrorL.textContent = "Please enter your email.";
    valid = false;
  } else if (!emailPattern.test(emailVal)) {
    emailErrorL.textContent = "Enter a valid email (e.g. user@example.com).";
    valid = false;
  }

  // Validate password
  if (passVal === "") {
    passwordErrorL.textContent = "Please enter your password.";
    valid = false;
  }

  if (!valid) return; // stop if invalid

  // Get stored credentials
  const stored = getStoredCredentials();

  // If no stored credentials found
  if (!stored.email || !stored.password) {
    generalError.textContent = "No registered account found. Please register first.";
    return;
  }

  // Compare
  if (emailVal === stored.email && passVal === stored.password) {
    // success
    // Optionally set a logged-in flag in localStorage/sessionStorage
    sessionStorage.setItem("loggedInUser", emailVal); // optional
    // redirect
    window.location.href = "index.html";
  } else {
    // invalid credentials
    generalError.textContent = "Invalid email or password. Please try again.";
  }
});
