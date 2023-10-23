new Vue({
   el: '#app',
   data: {
      email: '',
      result: null
   },
   methods: {
      checkEmail() {
         if (this.email) {
            fetch(`https://emailverification.whoisxmlapi.com/api/v1?apiKey=YOUR_API_KEY&emailAddress=${this.email}`)
               .then(response => response.json())
               .then(data => {
                  this.result = data;
               })
               .catch(error => {
                  console.error('Gagal: ', error);
               });
         }
      }
   }
});