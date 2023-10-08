new Vue({
   el: '#app',
   data: {
      publishers: []
   },
   created() {
      fetch('https://indonesia-public-static-api.vercel.app/api/publishers')
         .then(response => response.json())
         .then(data => {
            this.publishers = data;
         });
   }
});