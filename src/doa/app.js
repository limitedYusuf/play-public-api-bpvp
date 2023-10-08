new Vue({
   el: '#app',
   data: {
      doas: []
   },
   created() {
      fetch('proxy.php')
         .then(response => response.json())
         .then(data => {
            this.doas = data;
         });
   }
});