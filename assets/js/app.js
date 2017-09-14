function initMap() {
  
  var menuEscondido = document.getElementById('menu-vertical');
  hamburguer.addEventListener("click",function(){
      event.preventDefault();
      if(menuEscondido.style.display != "block"){
          menuEscondido.style.display="block";
      }
      else{
          menuEscondido.style.display="none";
      }
  });

  var laboratorialima = {lat: -12.1191427, lng: -77.0340046};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: laboratorialima
  });

var funcionError = function(error){
  alert("tenemos un problema para encontrar la ubicación");
}
var  latitud, longitud, miUbicacion;
var funcionExito = function(posicion){
  latitud= posicion.coords.latitude;
  longitud = posicion.coords.longitude;

    map.setZoom(18);
    map.setCenter({lat: latitud, lng: longitud});
   miUbicacion =  new google.maps.Marker({
    position: {lat: latitud, lng: longitud},
    map: map,
  });
}

function buscar(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
  }
}

var inputPartida = document.getElementById("punto-partida");
var inputDestino = document.getElementById("punto-destino");

new google.maps.places.Autocomplete(inputPartida);
new google.maps.places.Autocomplete(inputDestino);

var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;

var tarifa = document.getElementById("costo");

var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
  directionsService.route({
    origin: inputPartida.value,
    destination: inputDestino.value,
    travelMode:'DRIVING'
   }, function (response, status){
        if(status==='OK'){
          var distancia = Number((response.routes[0].legs[0].distance.text.replace("km", "")).replace(",","."));
          tarifa.classList.remove("none");
          var costo = distancia*1.75;
          if(costo<4){
            tarifa.innerHTML = "S/. 4"
          }

          tarifa.innerHTML = "S/. " + parseInt(costo);

          console.log(response.routes[0].legs[0].distance.text);

          directionsDisplay.setDirections(response);
        }
        else{
          window.alert("no encontramos una ruta.")
        }
  });
}

directionsDisplay.setMap(map);

var trazarRuta = function(){
  miUbicacion.setMap(null);
  calculateAndDisplayRoute(directionsService, directionsDisplay);
};
window.addEventListener("load",buscar);
document.getElementById("trazar-ruta").addEventListener("click", trazarRuta)

}