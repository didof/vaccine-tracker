import { Store } from 'vuex'
import somministrations from './data/somministrations'
import map from './map'

const createStore = () =>
  new Store({
    modules: { map, somministrations },
  })

export default createStore
