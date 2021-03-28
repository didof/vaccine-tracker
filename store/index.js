import { Store } from 'vuex'
import data from './data'

const createStore = () =>
  new Store({
    modules: { data },
  })

export default createStore
