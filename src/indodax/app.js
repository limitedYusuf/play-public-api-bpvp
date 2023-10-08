new Vue({
   el: '#app',
   data: {
      loading: true,
      tickers: {}
   },
   methods: {
      fetchData() {
         const apiUrl = 'https://indodax.com/api/ticker_all';

         fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
               this.tickers = data.tickers;
               this.loading = false;
            })
            .catch(error => {
               console.error('Error fetching data:', error);
               this.loading = false;
            });
      }
   },
   mounted() {
      this.fetchData();
   }
});