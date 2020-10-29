/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import keys from "./keys"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keys: [],
    teams: []
  },

  mutations: {
    clearData(state) {
      while (state.keys.length > 0) {
        state.keys.pop()
      }
    },
    clearTeamRole(state, payload) {
      var matches = state.keys.filter(k => k.team === payload.team && k.role === payload.role)
      matches.forEach(k => { k.team = null; k.role = '' })
    },
    addKey(state, payload) {
      state.keys.push({...payload, team: null, role: '' })
    },
    sortKeys(state) {
      state.keys.sort((keyA, keyB) => {
        // Sort by key level first
        if (keyA.keyLevel !== keyB.keyLevel) {
          return keyB.keyLevel - keyA.keyLevel
        }
        // Then alphabetically by dungeon name
        if (keyA.dungeonName.toLowerCase() < keyB.dungeonName.toLowerCase()) {
          return -1;
        }
        if (keyA.dungeonName.toLowerCase() > keyB.dungeonName.toLowerCase()) {
          return 1;
        }
        return 0;
      })
    },
    addTeam(state) {
      state.teams.push(state.teams.length + 1)
    },
    updateTeam(state, payload) {
      var key = state.keys.find(k => k.id === payload.id)
      key.team = payload.team
      key.role = payload.role 
    }
  },


  actions: {
    getAllKeys(context) {
      context.commit('clearData')

      keys.getAllKeysForCurrentWeek()
        .then(result => {
          result.data.forEach(key => context.commit('addKey', key))
          context.commit('sortKeys')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})