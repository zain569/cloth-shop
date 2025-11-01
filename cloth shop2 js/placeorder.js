let submit = document.getElementById('submit');
let form = document.getElementById('form');

// Input fields
let Name = document.getElementById("name");
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let phoneNo = document.getElementById('phoneNo');
let address1 = document.getElementById('address1');
let province = document.getElementById("province");
let city = document.getElementById("city");
let gender = document.querySelector('input[name="gender"]:checked');

// Error fields
let nameError = document.getElementById('nameerror');
let lnameerror = document.getElementById('lnameerror');
let emailError = document.getElementById('emailError');
let phoneError = document.getElementById('phoneError');
let addresserror = document.getElementById('addresserror');
let provinceerror = document.getElementById('provinceerror');
let cityerror = document.getElementById('cityerror');
let gendererror = document.getElementById('gendererror');

// ✅ Email validation regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ✅ Pakistani phone number regex (03xx-xxxxxxx or 03xxxxxxxxx)
const phonePattern = /^03[0-9]{9}$/;

// ✅ Submit button click event
form.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submit.click();
    }
});

submit.addEventListener("click", function (e) {
    e.preventDefault();

    let valid = true; // flag to track overall validation

    // ---- Name validation ----
    if (Name.value.trim() === "") {
        nameError.textContent = "Please enter your first name.";
        valid = false;
    } else {
        nameError.textContent = "";
    }

    // ---- Last name validation ----
    if (lname.value.trim() === "") {
        lnameerror.textContent = "Please enter your last name.";
        valid = false;
    } else {
        lnameerror.textContent = "";
    }

    // ---- Email validation ----
    if (email.value.trim() === "") {
        emailError.textContent = "Please enter your email.";
        valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Enter a valid email (e.g. abc@gmail.com).";
        valid = false;
    } else {
        emailError.textContent = "";
    }

    // ---- Phone validation ----
    if (phoneNo.value.trim() === "") {
        phoneError.textContent = "Please enter your phone number.";
        valid = false;
    } else if (!phonePattern.test(phoneNo.value.trim())) {
        phoneError.textContent = "Enter a valid Pakistani number (e.g. 03001234567).";
        valid = false;
    } else {
        phoneError.textContent = "";
    }

    // ---- Address validation ----
    if (address1.value.trim() === "") {
        addresserror.textContent = "Please enter your address.";
        valid = false;
    } else {
        addresserror.textContent = "";
    }

    // ---- Province validation ----
    if (province.value === "" || province.value === "Select Province") {
        provinceerror.textContent = "Please select a province.";
        valid = false;
    } else {
        provinceerror.textContent = "";
    }

    // ---- City validation ----
    if (city.value === "" || city.value === "Select City") {
        cityerror.textContent = "Please select a city.";
        valid = false;
    } else {
        cityerror.textContent = "";
    }

    // ---- Gender validation ----
    gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        gendererror.textContent = "Please select gender.";
        valid = false;
    } else {
        gendererror.textContent = "";
    }

    // ✅ If all valid, store data and redirect
    if (valid) {
        localStorage.setItem("First Name", Name.value.trim());
        localStorage.setItem("Last Name", lname.value.trim());
        localStorage.setItem("Email", email.value.trim());
        localStorage.setItem("Phone Number", phoneNo.value.trim());
        localStorage.setItem("Address", address1.value.trim());
        localStorage.setItem("Province", province.value);
        localStorage.setItem("City", city.value);
        localStorage.setItem("Gender", gender.value);

        window.location.href = "thanks.html";
    }
});

let cuty = document.getElementById("city")

province.addEventListener("change", function() {
    if(province.value === "punjab") {
        cuty.innerHTML = "<option value=''>--Select city--</option><option value='Lahore'>Lahore</option><option value='Islamabad'>Islamabad</option><option value='Faisalabad'>Faisalabad</option><option value='Rawalpindi'>Rawalpindi</option><option value='Gujranwala'>Gujranwala</option><option value='Multan'>Multan</option><option value='Sialkot'>Sialkot</option><option value='Sargodha'>Sargodha</option><option value='Sheikhupura'>Sheikhupura</option><option value='Sahiwal'>Sahiwal</option><option value='Bahawalpur'>Bahawalpur</option><option value='Dera Ghazi Khan'>Dera Ghazi Khan</option><option value='Jhang'>Jhang</option><option value='Gujrat'>Gujrat</option><option value='Mandi Bahauddin'>Mandi Bahauddin</option><option value='Narowal'>Narowal</option><option value='Kasur'>Kasur</option><option value='Okara'>Okara</option><option value='Pakpattan'>Pakpattan</option><option value='Bhakkar'>Bhakkar</option><option value='Khanewal'>Khanewal</option><option value='Rahim Yar Khan'>Rahim Yar Khan</option><option value='Layyah'>Layyah</option><option value='Lodhran'>Lodhran</option><option value='Vehari'>Vehari</option><option value='Chakwal'>Chakwal</option><option value='Attock'>Attock</option><option value='Hafizabad'>Hafizabad</option><option value='Toba Tek Singh'>Toba Tek Singh</option><option value='Mianwali'>Mianwali</option><option value='Sadiqabad'>Sadiqabad</option>";
    } if (province.value === "sindh") {
  cuty.innerHTML = `
    <option value=''>--Select city--</option>
    <option value='Karachi'>Karachi</option>
    <option value='Hyderabad'>Hyderabad</option>
    <option value='Sukkur'>Sukkur</option>
    <option value='Larkana'>Larkana</option>
    <option value='Mirpurkhas'>Mirpurkhas</option>
    <option value='Shaheed Benazirabad (Nawabshah)'>Shaheed Benazirabad (Nawabshah)</option>
    <option value='Badin'>Badin</option>
    <option value='Thatta'>Thatta</option>
    <option value='Dadu'>Dadu</option>
    <option value='Jamshoro'>Jamshoro</option>
    <option value='Sanghar'>Sanghar</option>
    <option value='Shikarpur'>Shikarpur</option>
    <option value='Jacobabad'>Jacobabad</option>
    <option value='Kashmore'>Kashmore</option>
    <option value='Umerkot'>Umerkot</option>
    <option value='Mithi'>Mithi</option>
    <option value='Benazirabad'>Benazirabad</option>
    <option value='Qambar'>Qambar</option>`;
    } if (province.value === "KPK") {
  cuty.innerHTML = `
      <option value=''>--Select city--</option>
      <option value="Peshawar">Peshawar</option>
      <option value="Mardan">Mardan</option>
      <option value="Swat (Mingora)">Swat (Mingora)</option>
      <option value="Abbottabad">Abbottabad</option>
      <option value="Kohat">Kohat</option>
      <option value="Dera Ismail Khan">Dera Ismail Khan</option>
      <option value="Bannu">Bannu</option>
      <option value="Haripur">Haripur</option>
      <option value="Charsadda">Charsadda</option>
      <option value="Nowshera">Nowshera</option>
      <option value="Mansehra">Mansehra</option>
      <option value="Swabi">Swabi</option>
      <option value="Lakki Marwat">Lakki Marwat</option>
      <option value="Karak">Karak</option>
      <option value="Hangu">Hangu</option>
      <option value="Tank">Tank</option>
      <option value="Lower Dir">Lower Dir</option>
      <option value="Upper Dir">Upper Dir</option>`
    } if (province.value === "Balochistan") {
      cuty.innerHTML = `
        <option value=''>--Select city--</option>
        <option value="Quetta">Quetta</option>
        <option value="Gwadar">Gwadar</option>
        <option value="Turbat">Turbat</option>
        <option value="Khuzdar">Khuzdar</option>
        <option value="Sibi">Sibi</option>
        <option value="Zhob">Zhob</option>
        <option value="Chaman">Chaman</option>
        <option value="Kharan">Kharan</option>
        <option value="Panjgur">Panjgur</option>
        <option value="Loralai">Loralai</option>
        <option value="Noshki">Noshki</option>
      `
    } if (province.value === "Gilgit-Baltistan") {
      cuty.innerHTML = `
      <option value=''>--Select city--</option>
      <option value="Gilgit">Gilgit</option>
      <option value="Skardu">Skardu</option>
      <option value="Hunza (Karimabad)">Hunza (Karimabad)</option>
      <option value="Ghizer">Ghizer</option>
      <option value="Astore">Astore</option>
      <option value="Diamer">Diamer</option>
      <option value="Ghanche">Ghanche</option>`
    } if (province.value === "Azad Jammu & Kashmir") {
      cuty.innerHTML = `
      <option value=''>--Select city--</option>
      <option value="Muzaffarabad">Muzaffarabad</option>
      <option value="Mirpur">Mirpur</option>
      <option value="Kotli">Kotli</option>
      <option value="Rawalakot (Poonch)">Rawalakot (Poonch)</option>
      <option value="Bagh">Bagh</option>`
    } if (province.value === "Federally Administered / Tribal Areas (merged)") {
      cuty.innerHTML = `
      <option value=''>--Select city--</option> 
      <option value="Waziristan (South)">South Waziristan</option>
      <option value="Waziristan (North)">North Waziristan</option>
      <option value="Kurram">Kurram</option>
      <option value="Bajaur">Bajaur</option>
      <option value="Khyber">Khyber</option>
      <option value="Orakzai">Orakzai</option>`
    }

})