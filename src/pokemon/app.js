new Vue({
   el: '#app',
   data: {
      pokemons: [],
      searchQuery: '',
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 20,
      selectedPokemon: null,
   },
   computed: {
      totalPages() {
         return Math.ceil(this.filteredPokemons.length / this.itemsPerPage);
      },
      currentPokemons() {
         const start = (this.currentPage - 1) * this.itemsPerPage;
         const end = start + this.itemsPerPage;
         return this.filteredPokemons.slice(start, end);
      },
      filteredPokemons() {
         return this.pokemons.filter(pokemon => {
            return pokemon.name.toLowerCase().startsWith(this.searchQuery.toLowerCase());
         });
      },
   },
   methods: {
      closeModal() {
         this.selectedPokemon = null;
      },
      isValidUrl(url) {
         const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
         return urlPattern.test(url);
      },
      showPokemonDetail(pokemon) {
         fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
               this.selectedPokemon = {
                  name: pokemon.name,
                  sprites: Object.values(pokemonData.sprites || {}).filter(sprite => sprite !== null && sprite !== undefined),
                  stats: {},
               };

               if (pokemonData.stats) {
                  pokemonData.stats.forEach(stat => {
                     const statName = stat.stat.name;
                     this.selectedPokemon.stats[statName] = stat.base_stat;
                  });
               }
            })
            .catch(error => {
               console.error('Terjadi kesalahan saat mengambil data Pokemon:', error);
            });
      },
      filterPokemonByLetter(letter) {
         this.searchQuery = letter;
         this.isLoading = true;
      },
      fetchPokemons() {
         let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';

         fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
               const pokemonPromises = data.results.map(result => {
                  return {
                     name: result.name,
                     image: '',
                     loading: true,
                  };
               });

               const requests = data.results.map((result, index) => {
                  return fetch(result.url)
                     .then(response => response.json())
                     .then(pokemonData => {
                        const updatedPokemon = {
                           url: result.url,
                           name: pokemonData.name,
                           image: pokemonData.sprites.front_default,
                           loading: false,
                        };
                        this.$set(this.pokemons, index, updatedPokemon);
                     });
               });

               const allPromises = [...pokemonPromises, ...requests];

               return Promise.all(allPromises);
            })
            .then(() => {
               this.isLoading = false;
            })
            .catch(error => {
               console.error('Terjadi kesalahan:', error);
            });
      },
      nextPage() {
         if (this.currentPage < this.totalPages) {
            this.currentPage++;
         }
      },
      previousPage() {
         if (this.currentPage > 1) {
            this.currentPage--;
         }
      },
   },
   watch: {
      searchQuery: function (newSearchQuery) {
         this.currentPage = 1;
         this.fetchPokemons();
      },
   },
   mounted() {
      this.fetchPokemons();
   },
});