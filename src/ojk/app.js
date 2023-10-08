new Vue({
   el: '#app',
   data: {
      activeTab: 'app',
      isLoadingApp: false,
      isLoadingIllegal: false,
      isLoadingProduct: false
   },
   methods: {
      showTab(tabName) {
         this.activeTab = tabName;
         this.isLoadingApp = false;
         this.isLoadingIllegal = false;
         this.isLoadingProduct = false;

         setTimeout(() => {
            if (tabName === 'app') {
               this.isLoadingApp = true;
            } else if (tabName === 'illegal') {
               this.isLoadingIllegal = true;
            } else if (tabName === 'product') {
               this.isLoadingProduct = true;
            }

            this.loadData(tabName);
         }, 2000);
      },
      loadData(tabName) {
         axios.get(`https://ojk-invest-api.vercel.app/api/${tabName}s`)
            .then(response => {
               const data = response.data.data[`${tabName}s`];
               this.clearTab(`${tabName}Tab`);
               this.renderData(data, tabName);
            })
            .catch(error => {
               console.error(`Error fetching ${tabName} data:`, error);
            })
            .finally(() => {
               if (tabName === 'app') {
                  this.isLoadingApp = false;
               } else if (tabName === 'illegal') {
                  this.isLoadingIllegal = false;
               } else if (tabName === 'product') {
                  this.isLoadingProduct = false;
               }
            });
      },
      clearTab(tabId) {
         const tab = document.getElementById(tabId);
         while (tab.firstChild) {
            tab.removeChild(tab.firstChild);
         }
      },
      renderData(data, tabName) {
         const tabId = `${tabName}Tab`;
         const tab = document.getElementById(tabId);
         data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card p-4 bg-white rounded shadow';
            card.innerHTML = `
         <h2 class="text-lg font-semibold">${item.name}</h2>
         ${tabName === 'app' ? `<p class="text-gray-600">Owner: ${item.owner}</p>` : ''}
         ${tabName === 'illegal' ? `<p class="text-gray-600">Entity Type: ${item.entity_type}</p>` : ''}
         ${tabName === 'product' ? `<p class="text-gray-600">Type: ${item.type}</p>` : ''}
         ${tabName === 'app' ? `<a href="${item.url}" target="_blank" class="text-blue-500 hover:underline">Link</a>` : ''}
      `;
            tab.appendChild(card);
         });
      }
   },
   created() {
      this.loadData(this.activeTab);
   }
});