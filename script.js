var app = angular.module("myApp", []);



app.controller("myCtrl", function($scope,$http) {
     var lat,long;
     var url = "http://api.weatherstack.com/current?access_key=65650ae6a77f12583d709123dc8bbd25&query=";
        function IconGen(desc) {
                    var desc = desc.toLowerCase();
                    switch (desc) {
                      case 'drizzle':
                          return "#ffa726";
                      case 'haze':
                          return "#42a5f5";                                 
                      case 'rain':
                          return "#26a69a";                   
                      case 'snow':
                          return "#00acc1"; 
                      case 'clear':
                          return "#9ccc65"; 
                      case 'thunderstom':
                          return "#ab47bc"; 
                      default:
                          return "#5c6bc0"; 
                    }

             };
     if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
             
             url += position.coords.latitude + "," + position.coords.longitude;
             $http.get(url).then(function(response){
               console.log(response.data)
                  $scope.city = response.data.location.name;
                  $scope.country = response.data.location.country;
                  $scope.weather = response.data.current.weather_descriptions[0];
                  $scope.temp = response.data.current.temperature;
                  $scope.icon = response.data.current.weather_icons[0];
                  var color = IconGen($scope.weather);
                  $scope.style ={"background-color":color};
                  $scope.$apply();
               
          });
     })

}});