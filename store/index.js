import { Store } from 'vuex'
import urls from './urls'

const createStore = () =>
  new Store({
    modules: { urls },
  })

export default createStore
