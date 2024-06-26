<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Google Maps</title>
	<style>
		
	 body{
		display: flex;
		height: 100vh;
		width: 100%;
		margin: 0px;
		align-items: center;
		align-content: center;
		justify-content: center;
	 }




		#DIV_MAPA
		{
			width:100%;
			height:999px;
		}
	</style>
</head>
<body>

	<div id="DIV_MAPA">  </div>

</body>

<script>

LAT = 0
LON = 0

function showPosition(position) 
{
    LAT = position.coords.latitude;
    LON = position.coords.longitude;
      
}

function CRIAR_MAPA() {

	if (navigator.geolocation) 
      {
        navigator.geolocation.watchPosition(showPosition);
		try{
			LAT = position.coords.latitude;
      		LON = position.coords.longitude;
		}
		catch(erro)
		{
			LAT = -26.301092346646033 // Caso não tenha GPS escolha um local padrão
			LON = -48.84090402018955 //CEDUP LOCATION 
		}
      } 
      else 
      { 
        document.write("Seu navegador não suporta Geolocalização.");
      }


		var PROPRIEDADES= {
		center:new google.maps.LatLng(LAT,LON),
		zoom:20,
		mapTypeId: google.maps.MapTypeId.HYBRID};	
		var map = new google.maps.Map(document.getElementById("DIV_MAPA"),PROPRIEDADES);


		<?php
		include("conecta.php");
		$comando = $pdo->prepare("SELECT * FROM locais");
		$resultado = $comando->execute();
		$n = 0;
		while ($linha = $comando->fetch()) 
		{
			//Retirando caracteres especiais
			$local = $linha["LOCAL"];
			$local = preg_replace('/[^\p{L}\p{N}\s]/u','',$local);
			$local = preg_replace('/\r/u', '', $local);





			$lat = $linha["LATITUDE"];
			$lon = $linha["LONGITUDE"];


			$n = $n +1;
			echo("
				var MARCADOR$n = {lat:$lat,lng:$lon};
				var icone_marcador$n = new google.maps.Marker({position: MARCADOR$n,
				animation:google.maps.Animation.BOUNCE,
				icon:{url:'marcador.png',scaledSize: new google.maps.Size(30, 30)},});
				icone_marcador$n.setMap(map);
			

				var info$n = new google.maps.InfoWindow({content:'<b> $local </b>'});
				icone_marcador$n.addListener('click', function(){
					info$n.open(map, icone_marcador$n);
				});
			
			");
		}

		?>	
}
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXlg-UheeFvXNuGdat0w-R5L0cVxoTr34&callback=CRIAR_MAPA">
</script>

</html>