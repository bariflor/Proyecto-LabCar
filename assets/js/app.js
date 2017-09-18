function initMap() {
	//creando un nuevo mapa
	var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 5,
		center: laboratoriaLima,
		// mapTypeControl: false,// los 3 se agrego-veremos si hay cambio
		// zoomControl: false,
		// streetViewControl: false
	});
	var markadorLaboratoria = new google.maps.Marker({
			position: laboratoriaLima,
			map: map
	});
}

$(".button-collapse").sideNav();