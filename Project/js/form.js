
//Sekcje eventListener
window.addEventListener("load", () => {
    loadDesktopForm();
});
window.addEventListener("resize", () => {
    loadDesktopForm();
});
window.addEventListener("load", () => {
    showDataAdministrationPanel();
});

//Ładowanie formularza
function loadDesktopForm(){
    let windowWidth = $(window).width();
    if(windowWidth > 1200){
        $("#formularz").load("contactFormDesktop.html");
    } else {
        $("#formularz").load("contactFormMobile.html");
    }
}

//Walidacja danych
function sprawdzPole(pole_id,obiektRegex) {
    let obiektPole = document.getElementById(pole_id);
    return obiektRegex.test(obiektPole.value);
}

function sprawdz_radio(nazwa_radio){
    let obiekt = document.getElementsByName(nazwa_radio);
    for (let i = 0; i<obiekt.length;i++) {
        let wybrany=obiekt[i].checked;
        if (wybrany) return true;
    }
    return false;
}

function sprawdz_box(box_name) {
    let checked = [];
    let inputElements = document.getElementsByName(box_name);
    for (let i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            checked.push(inputElements[i].value);
        }
    }
    return checked.length !== 0;
}

function showCheckedValues(elementName) {
    let tableOfCheckboxes = document.getElementsByName(elementName);
    let tableOfChecked = [];
    for (let i = 0; i < tableOfCheckboxes.length; i++) {
        if (tableOfCheckboxes[i].checked) {
            tableOfChecked.push(tableOfCheckboxes[i].value);
        }
    }
    return tableOfChecked;
}

function sprawdz() {
    let ok = true;
    let obiektNazw = /^[a-zA-Z]{2,20}$/;
    let obiektemail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    let obiektWiek= /^[1-9][0-9]{1,2}$/;

    let nazwa = sprawdzPole('nameField', obiektNazw);
    let wiek = sprawdzPole('ageField', obiektWiek);
    let email = sprawdzPole('emailField', obiektemail);
    let jezyki = sprawdz_box('languageCheckbox');
    let sposobPlatnosci = sprawdz_radio('platnosc');

    if (!nazwa) {
        ok=false;
        document.getElementById("nazw_error").style.visibility = "visible";
    } else {
        document.getElementById("nazw_error").style.visibility = "hidden";
    }

    if (!wiek) {
        ok=false;
        document.getElementById("wiek_error").style.visibility = "visible";
    } else {
        document.getElementById("wiek_error").style.visibility = "hidden";
    }

    if (!email) {
        ok=false;
        document.getElementById("email_error").style.visibility = "visible";
    } else {
        document.getElementById("email_error").style.visibility = "hidden";
    }

    if (!jezyki) {
        ok=false;
        document.getElementById("produkt_error").style.visibility = "visible";
    } else {
        document.getElementById("produkt_error").style.visibility = "hidden";
    }

    if (!sposobPlatnosci) {
        ok=false;
        document.getElementById("zaplata_error").style.visibility = "visible";
    } else {
        document.getElementById("zaplata_error").style.visibility = "hidden";
    }

    if(ok){
        grapDataFromForm();
    }
}

//Funkcja pobierająca dane z formualrza
function grapDataFromForm(){
    // Zaincjalizowanie licznika, jezeli nie istnieje
    if(!localStorage.getItem("dataRow")){
        localStorage.setItem("dataRow", 0);
    }

    // Pobranie danych z formularza
    let clientName = document.getElementById('nameField').value;
    let clientAge = document.getElementById('ageField').value;
    let clientCountry = document.getElementById('countryField').value;
    let clientEmail = document.getElementById('emailField').value;
    let clientPackage = showCheckedValues('languageCheckbox');
    let clientPayment = showCheckedValues('platnosc');

    let client = {name:clientName, age:clientAge, country:clientCountry, email:clientEmail, pack:clientPackage, payment:clientPayment};
    let clientObjectJson = JSON.stringify(client);

    // Utworzenie nowego rekordu w localStorage
    let row = localStorage.getItem("dataRow");
    row++;
    let clientRow = "Client"+row;
    localStorage.setItem(clientRow,clientObjectJson);
    localStorage.setItem("dataRow",row);
    alert("Wysłano");
    document.querySelector("form").reset();
}

// Usunięcie dnaych z localStorage
function clearValuesLocalstorage(){
    if (window.confirm("Czy na pewno chcesz usunąć wszystkie dane?")){
       clearlocalStorage();
       location.reload();
    } else {
        return false;
    }
}

//Usunięcie wszystkich danych z localStorage
function clearlocalStorage(){
    let row = localStorage.getItem("dataRow");

    for (let i = 1; i <= row; i++) {
        let clientRow = "Client"+i;
        localStorage.removeItem(clientRow);
    }
    localStorage.setItem("dataRow", 0);
}

//Ładowanie danych w panelu administracyjnym
function showDataAdministrationPanel(){
    let row = localStorage.getItem("dataRow");

    for (let i = 1; i <= row; i++) {
        let clientRow = "Client"+i;
        let currentClientJson = localStorage.getItem(clientRow);
        let currentClient = JSON.parse(currentClientJson);
        document.querySelector("tbody").innerHTML +=
            "<tr class=\"editLabel" + i + "\">" +
            "<td>"+i+"</td>" +
            "<td>"+currentClient.name+"</td>" +
            "<td>"+currentClient.age+"</td>" +
            "<td>"+currentClient.country+"</td>" +
            "<td>"+currentClient.email+"</td>" +
            "<td>"+currentClient.pack+"</td>" +
            "<td>"+currentClient.payment+"</td>" +
            "<td><button onclick=\"editClient(" + i + ")\">Edytuj</button></td>" +
            "</tr>";
    }
}

//Edycja danych klienta
function editClient(number){
    let clientRow = "Client"+number;
    let rowClass = ".editLabel"+number;

        let currentClientJson = localStorage.getItem(clientRow);
        let currentClient = JSON.parse(currentClientJson);
        document.querySelector(rowClass).innerHTML =
            "<tr class=\"wiersz" + number + "\">" +
            "<td>"+number+"</td>" +
            "<td><form><input type=\"text\" name=\"name\" id=\"nameField\"></td>" +
            "<td><input type=\"number\" name=\"age\" id=\"ageField\"></td>" +
            "<td><input type=\"text\" name=\"country\" id=\"countryField\"></td>" +
            "<td><input type=\"email\" name=\"email\" id=\"emailField\"></td>" +
            "<td><input type=\"text\" name=\"pack\" id=\"packField\"></td>" +
            "<td><input type=\"text\" name=\"payment\" id=\"paymentField\"></form></td>" +
            "<td><button onclick=\"saveClient(" + number + ")\">Zapisz</button></td>" +
            "</tr>";

        document.getElementById("nameField").value = currentClient.name;
        document.getElementById("ageField").value = currentClient.age;
        document.getElementById("countryField").value = currentClient.country;
        document.getElementById("emailField").value = currentClient.email;
        document.getElementById("packField").value = currentClient.pack.toString();
        document.getElementById("paymentField").value = currentClient.payment.toString();
}

//Zapisanie danych po edycji
function saveClient(number){
    let clientRow = "Client"+number;
    let rowClass = ".editLabel"+number;

    let clientName = document.getElementById('nameField').value;
    let clientAge = document.getElementById('ageField').value;
    let clientCountry = document.getElementById('countryField').value;
    let clientEmail = document.getElementById('emailField').value;
    let clientPackage = document.getElementById('packField').value;
    let clientPayment = document.getElementById('paymentField').value;

    localStorage.removeItem(clientRow);

    let client = {name:clientName, age:clientAge, country:clientCountry, email:clientEmail, pack:clientPackage, payment:clientPayment};
    let clientObjectJson = JSON.stringify(client);
    localStorage.setItem(clientRow,clientObjectJson);

    let currentClientJson = localStorage.getItem(clientRow);
    let currentClient = JSON.parse(currentClientJson);
    document.querySelector(rowClass).innerHTML =
        "<tr class=\"editLabel" + number + "\">" +
        "<td>"+number+"</td>" +
        "<td>"+currentClient.name+"</td>" +
        "<td>"+currentClient.age+"</td>" +
        "<td>"+currentClient.country+"</td>" +
        "<td>"+currentClient.email+"</td>" +
        "<td>"+currentClient.pack+"</td>" +
        "<td>"+currentClient.payment+"</td>" +
        "<td><button onclick=\"editClient(" + number + ")\">Edytuj</button></td>" +
        "</tr>";
}







