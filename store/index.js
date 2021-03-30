import { Store } from 'vuex'

import map from './map'
import administration from './data/administration'
import somministrations from './data/somministrations'

const createStore = () =>
  new Store({
    modules: { map, administration, somministrations },
  })

export default createStore
