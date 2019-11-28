<template>
    <div class="container py-20">
      <ais-instant-search-ssr> 
        <div class="mb-10">
            <div class="flex justify-between items-end mb-6">
                <h1 class="text-2xl text-gray-700 leading-tight">
                  Search
                </h1>
                <client-only>
                  <ais-powered-by />
                </client-only>
            </div>
            <ais-search-box 
              placeholder="Scrivi cosa cercare..." 
              :class-names="{
                  'ais-SearchBox' : 'w-full',
                  'ais-SearchBox-input' : 'border-b-2 border-green-500 rounded w-full p-4 text-lg',
                  'ais-SearchBox-submit' : 'hidden',
                  'ais-SearchBox-resetIcon' : 'hidden',
                  'ais-SearchBox-reset' : 'hidden'
              }"
            />

        </div>

        <ais-state-results>
          <div slot-scope="{ query, hits }">
            <!-- {{ hits.length }} -->
            
            <div v-if="hits.length">
              <ais-stats :class-names="{ 'ais-Stats' : 'mb-4 text-gray-400 text-xs'}">
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

            <p v-if="!hits.length" class="mb-4 text-gray-600 text-md">
              No results found for the query: <q>{{ query }}</q>
            </p>

          </div>
        </ais-state-results>

      </ais-instant-search-ssr> 
    </div>
</template>

<script>
	import {
      AisInstantSearchSsr,AisHits,AisSearchBox,AisStateResults,AisStats,AisPoweredBy
  } from 'vue-instantsearch';
  
  
  export default {
    components : {
      AisInstantSearchSsr,
      AisSearchBox,
      AisStateResults,
      AisStats,
      AisPoweredBy,
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
