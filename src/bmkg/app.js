new Vue({
   el: '#app',
   data: {
      locations: [],
      filteredLocations: [],
      uniqueProvinces: [],
      selectedLocationId: null,
      weatherData: []
   },
   mounted() {
      fetch('https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json')
         .then(response => response.json())
         .then(data => {
            this.locations = data;
            this.filteredLocations = data;

            this.uniqueProvinces = [...new Set(data.map(location => location.propinsi))];
         })
         .catch(error => {
            console.error('Error fetching data:', error);
         });
   },
   methods: {
      filterByProvinsi(provinsi) {
         this.filteredLocations = this.locations.filter(location => location.propinsi === provinsi);
      },
      formatProvinsi(provinsi) {
         return provinsi.replace(/([a-z])([A-Z])/g, '$1 $2');
      },
      showWeather(locationId) {
         this.selectedLocationId = locationId;
         fetch(`https://ibnux.github.io/BMKG-importer/cuaca/${locationId}.json`)
            .then(response => response.json())
            .then(data => {
               this.weatherData = data;
            })
            .catch(error => {
               console.error('Error fetching weather data:', error);
            });
      }
   }
});