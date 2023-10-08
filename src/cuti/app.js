new Vue({
   el: '#app',
   data: {
      holidays: []
   },
   created() {
      fetch('https://dayoffapi.vercel.app/api')
         .then(response => response.json())
         .then(data => {
            this.holidays = data;
         });
   }
});