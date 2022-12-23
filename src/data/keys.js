import axios from '../../node_modules/axios'
import config from './config'


export default {
  apiRoot: config.apiRoot,

  getAffixesForCurrentWeek() {
    return axios.get(this.apiRoot + '/api/affixes')
  },

  getAllKeysForCurrentWeek() {
    return axios.get(this.apiRoot + '/api/keys')
  },

  getAllCharacterLookups() {
    return axios.get(this.apiRoot + '/api/characters/lookups')
  }
  
}