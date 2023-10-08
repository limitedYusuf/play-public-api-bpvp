new Vue({
   el: '#app',
   data: {
      timezones: []
   },
   created() {
      fetch('https://timeapi.mininxd.my.id/')
         .then(response => response.json())
         .then(data => {
            this.timezones = data.wib.concat(data.wita, data.wit);
         });
   }
});