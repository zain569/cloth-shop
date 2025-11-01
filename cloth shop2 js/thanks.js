document.getElementById("order-name").innerText = localStorage.getItem("First Name") + " " + localStorage.getItem("Last Name");
document.getElementById("order-email").innerText = localStorage.getItem("Email");
document.getElementById("order-phone").innerText = localStorage.getItem("Phone Number");
document.getElementById("order-address").innerText = localStorage.getItem("Province") + ", " + localStorage.getItem("City") + ", " + localStorage.getItem("Address");
document.getElementById("order-gender").innerText = localStorage.getItem("Gender");

let home = document.getElementById('home');

home.addEventListener('click', function() {
    window.location.href = 'index.html';
    localStorage.removeItem("Email");
    localStorage.removeItem("First Name");
    localStorage.removeItem("Last Name");
    localStorage.removeItem("Phone Number");
    localStorage.removeItem("Province");
    localStorage.removeItem("City");
    localStorage.removeItem("Address");
    localStorage.removeItem("Gender");
});
