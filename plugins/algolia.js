
import algoliasearch from 'algoliasearch/lite';
import { createInstantSearch } from 'vue-instantsearch';

//inject instance into component
export default ( { app } , inject) => {

  const searchClient = algoliasearch(
    '69SS116S6F',
    '87819ce485100e349c38162ea1c597c5'
  )

  const { instantsearch } = createInstantSearch({
    searchClient,
    indexName: 'instant_search'
  })

  inject('instantsearch', instantsearch);
}
