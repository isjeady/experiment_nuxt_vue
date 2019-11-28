<template>
    <div class="container py-20">
      <ais-instant-search-ssr> 
        <div class="mb-10">
            <div class="flex justify-between items-end mb-6">
                <h1 class="text-2xl text-gray-700 leading-tight">
                  Search
                </h1>
            </div>
            <ais-search-box placeholder="Scrivi cosa cercare..." />
        </div>

        <ais-state-results>
          <div slot-scope="{ query, hits }">
            <!-- {{ hits.length }} -->
            
            <div v-if="hits.length">
              <ais-stats>
                  <h1 class="text-md mb-10 text-gray-700" slot-scope="{ hitsPerPage, nbPages, nbHits, page, processingTimeMS, query }">
                    Page {{ page + 1 }} of {{ nbPages }} with {{ hitsPerPage }} hits per page  -
                    {{ nbHits }} hits retrieved in {{ processingTimeMS }}ms for <q>{{ query }}</q>
                  </h1>
              </ais-stats>
              <ais-hits>
                <div slot="item" slot-scope="{ item, index }">
                  {{ index }} - {{ item }}
                </div>
              </ais-hits>
            </div>

            <p v-if="!hits.length">
              No results found for the query: <q>{{ query }}</q>
            </p>

          </div>
        </ais-state-results>

      </ais-instant-search-ssr> 
    </div>
</template>

<script>
	import {
      AisInstantSearchSsr,AisHits,AisSearchBox,AisStateResults,AisStats
  } from 'vue-instantsearch';
  
  
  export default {
    components : {
      AisInstantSearchSsr,
      AisSearchBox,
      AisStateResults,
      AisStats,
      AisHits
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
          //query : 'samsung',
          hitsPerPage : 10
        }).then(() => ({
          algoliaState: instantsearch.getState()
        }))
    },
	}
</script>


<style>

</style>
