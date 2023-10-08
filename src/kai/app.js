new Vue({
   el: '#app',
   data: {
      stations: [],
      search: ''
   },
   created() {
      fetch('https://booking.kai.id/api/stations2')
         .then(response => response.json())
         .then(data => {
            this.stations = data;
         });
   },
   computed: {
      filteredStations() {
         return this.stations.filter(station =>
            station.name.toUpperCase().includes(this.search.toUpperCase())
         );
      }
   }
});