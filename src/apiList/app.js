new Vue({
   data: {
      apiEntries: []
   },
   mounted() {
      fetch('https://api.publicapis.org/entries')
         .then(response => response.json())
         .then(data => {
            this.apiEntries = data.entries;
         })
         .catch(error => {
            console.error('Error fetching data: ', error);
         });
   },
});

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkMode.matches) {
   document.body.classList.add('dark');
}