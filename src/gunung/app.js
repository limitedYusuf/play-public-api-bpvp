new Vue({
   el: '#app',
   data: {
      volcanoes: []
   },
   created() {
      fetch('https://indonesia-public-static-api.vercel.app/api/volcanoes')
         .then(response => response.json())
         .then(data => {
            this.volcanoes = data;
         });
   }
});