
import algoliasearch from 'algoliasearch/lite';
import { createInstantSearch } from 'vue-instantsearch';

//inject instance into component
export default ( { app } , inject) => {

  const searchClient = algoliasearch(
    'B1G2GM9NG0',
    'aadef574be1f9252bb48d4ea09b5cfe5'
  )

  const { instantsearch } = createInstantSearch({
    searchClient,
    indexName: 'demo_ecommerce'
  })

  inject('instantsearch', instantsearch);
}
