import { Store } from 'vuex'
import somministrations from './data/somministrations'

const createStore = () =>
  new Store({
    modules: { somministrations },
  })

export default createStore
