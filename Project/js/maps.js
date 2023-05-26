
function getLocation() {

        var wspolrzedne = new google.maps.LatLng(51.28343219940128, 22.57151409797255);
        var opcjeMapy = {
            zoom: 15,
            center: wspolrzedne,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var mapa = new
        google.maps.Map(document.getElementById("mapka"), opcjeMapy);
    }

