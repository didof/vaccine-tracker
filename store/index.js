import { Store } from 'vuex'

import map from './map'
import administrations from './data/administrations'
import somministrations from './data/somministrations'

const createStore = () =>
  new Store({
    modules: {
      map,
      administrations,
      somministrations,
    },
  })

export default createStore
