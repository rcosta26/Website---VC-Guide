
var map;
var infowindow;
var tipo;

var esmad = { lat:41.3662488,lng: -8.7405654};
var centroVC = { lat: 41.352214, lng: -8.748167 };
var centroPV = { lat: 41.380389,lng: -8.760903 };
var local = centroVC;


var outputfiltro = "";

        // ir ao local storage buscar o ultimo filtro usado neste browser para começar o mapa com ele.
        
            outputfiltro=localStorage.getItem(localStorage.key(0));
            console.log(outputfiltro);
            tipo=outputfiltro;
            



$(document).ready(function () {
    $('input[type=radio][name=tipo]').change(function () {
        tipo = this.value;
        initMap();
        if (typeof(Storage) !== "undefined") {
            // Guarda o filtro durante a sessao
        localStorage.setItem('filtro', tipo);
        console.log(localStorage.getItem('filtro'));
        } else {
     alert("Sem Suporte para storage")
        }
        

    });
    $('input[type=radio][name=local]').change(function () {
        if (this.value == 1) {
            local=esmad;
            
        }
        if (this.value == 2) {
            local=centroPV;
        }
        if (this.value==0){
            local=centroVC;
        }
        initMap();




    });
});
// iniciar mapa
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: local,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: local,
        radius: 2000,
        type: tipo
    }, callback);
}
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}
// criar marcadores
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        console.log(place);
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            place.vicinity + '</div>');
        infowindow.open(map, this);
    });
}
