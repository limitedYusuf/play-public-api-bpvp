new Vue({
   el: '#app',
   data: {
      heroes: []
   },
   created() {
      fetch('https://indonesia-public-static-api.vercel.app/api/heroes')
         .then(response => response.json())
         .then(data => {
            this.heroes = data;
         });
   }
});