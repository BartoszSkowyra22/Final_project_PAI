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
function sprawdz() {
    var ok = true;
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
        document.getElementById("nazw_error").style.display = "inline";
    } else {
        document.getElementById("nazw_error").style.display = "none";
    }

    if (!wiek) {
        ok=false;
        document.getElementById("wiek_error").style.display = "inline";
    } else {
        document.getElementById("wiek_error").style.display = "none";
    }

    if (!email) {
        ok=false;
        document.getElementById("email_error").style.display = "inline";
    } else {
        document.getElementById("email_error").style.display = "none";
    }

    if (!jezyki) {
        ok=false;
        document.getElementById("produkt_error").style.display = "inline";
    } else {
        document.getElementById("produkt_error").style.display = "none";
    }

    if (!sposobPlatnosci) {
        ok=false;
        document.getElementById("zaplata_error").style.display = "inline";
    } else {
        document.getElementById("zaplata_error").style.display = "none";
    }

    //Okienko alert
    let wybraneProdukty = showCheckedValues('languageCheckbox');
    let parametrSposobuPlatnosci = showCheckedValues('platnosc');

    let data = "Następujące dane zostaną wysłane:\n";
    data += "Nazwisko : " + document.getElementById('nameField').value + "\n";
    data += "Wiek: " + document.getElementById('ageField').value + "\n";
    data += "Kraj: " + document.getElementById('countryField').value + "\n";
    data += "Email: " + document.getElementById('emailField').value + "\n";
    data += "Wybrane produkty: " + wybraneProdukty + "\n";
    data += "Sposób zapłaty: " + parametrSposobuPlatnosci + "\n";

    if (window.confirm(data)) {
        return ok;
    } else {
        return false;
    }
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
