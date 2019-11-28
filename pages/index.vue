<template>
    <div class="container py-20">
      <ais-instant-search-ssr> 
        <div class="mb-10">
            <div class="flex justify-between items-end mb-6">
                <h1 class="text-2xl text-gray-700 leading-tight">
                  Search
                </h1>
            </div>
        </div>
      </ais-instant-search-ssr> 
    </div>
</template>

<script>
	import {
      AisInstantSearchSsr
  } from 'vue-instantsearch';
  
  
  export default {
    components : {
      AisInstantSearchSsr
    },
		mounted(){
      console.log('Mounted');
      console.log(this.$instantsearch);
    },
    provide(){
      return {
        $_ais : this.$instantsearch
      }
    },
    data(){
      return {
        algoliaState : null
      }
    },
    beforeMount() {
      // Nuxt merges `asyncData` and `data` on the client
      this.$instantsearch.hydrate(this.algoliaState);
    },
    asyncData({ app }) {
        const instantsearch = app.$instantsearch;
        
        return instantsearch.findResultsState({
          query : 'samsung',
          hitsPerPage : 10
        }).then(() => ({
          algoliaState: instantsearch.getState()
        }))
    },
	}
</script>


<style>

</style>
