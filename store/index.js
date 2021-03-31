import { Store } from 'vuex'

import map from './map'
import administrations from './data/administrations'
import somministrations from './data/somministrations'
import registry from './data/registry'

const createStore = () =>
  new Store({
    modules: {
      map,
      administrations,
      somministrations,
      registry,
    },
  })

export default createStore
