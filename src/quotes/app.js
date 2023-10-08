new Vue({
   el: '#app',
   data: {
      quotes: [],
      selectedAnime: '',
      animeList: []
   },
   methods: {
      fetchQuotesByAnime() {
         if (this.selectedAnime !== '') {
            fetch(`https://katanime.vercel.app/api/getbyanime?anime=${this.selectedAnime}&page=1`)
               .then(response => response.json())
               .then(data => {
                  this.quotes = data.result;
               });
         } else {
            this.quotes = [];
         }
      }
   },
   mounted() {
      fetch('https://katanime.vercel.app/api/getlistanime')
         .then(response => response.json())
         .then(data => {
            this.animeList = data.result;
         });

      fetch('https://katanime.vercel.app/api/getrandom')
         .then(response => response.json())
         .then(data => {
            this.quotes = data.result;
         });
   }
});