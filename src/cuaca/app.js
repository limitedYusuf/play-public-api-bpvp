const app = new Vue({
   el: '#app',
   data: {
      city: '',
      weatherData: null,
      airData: null,
   },
   methods: {
      async searchWeather() {
         try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=hayoo-bikin-sendiri-lah&units=metric`);
            const data = await response.json();
            this.weatherData = data;

            const airPollutionResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=hayoo-bikin-sendiri-lah`);
            const airPollutionData = await airPollutionResponse.json();

            this.airData = airPollutionData.list[0];

            document.body.className = '';

            switch (this.weatherData.weather[0].main) {
               case 'Clear':
                  document.body.classList.add('clear');
                  break;
               case 'Clouds':
                  document.body.classList.add('clouds');
                  break;
               case 'Rain':
                  document.body.classList.add('rain');
                  break;
               case 'Drizzle':
                  document.body.classList.add('drizzle');
                  break;
               case 'Snow':
                  document.body.classList.add('snow');
                  break;
               case 'Mist':
                  document.body.classList.add('mist');
                  break;
               case 'Fog':
                  document.body.classList.add('fog');
                  break;
               case 'Thunderstorm':
                  document.body.classList.add('thunderstorm');
                  break;
               default:
                  document.body.className = '';
                  break;
            }
         } catch (error) {
            console.error('Error:', error);
         }
      },
      getAirQuality(aqi) {
         switch (aqi) {
            case 1:
               return 'Baik';
            case 2:
               return 'Cukup Baik';
            case 3:
               return 'Sedang';
            case 4:
               return 'Buruk';
            case 5:
               return 'Sangat Buruk';
            default:
               return 'Tidak Diketahui';
         }
      },
   },
});