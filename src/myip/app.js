new Vue({
   el: '#app',
   data: {
      ipAddress: {}
   },
   created() {
      fetch('https://myip.api.akuari.my.id/myip')
         .then(response => response.json())
         .then(data => {
            this.ipAddress = data.result;
         });
   }
});