/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import keys from "./keys"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keys: [],
    teams: [],
    keySchedule: [
      { rotationWeek: 1, affixes: "Tyrannical, Storming, Raging" },
      { rotationWeek: 2, affixes: "Fortified, Entangling, Bolstering" },
      { rotationWeek: 3, affixes: "Tyrannical, Incorporeal, Spiteful" },
      { rotationWeek: 4, affixes: "Fortified, Afflicted, Raging" },
      { rotationWeek: 5, affixes: "Tyrannical,, ??, ??" },
      { rotationWeek: 6, affixes: "Fortified, ??, ??" },
      { rotationWeek: 7, affixes: "Tyrannical, ??, ??" },
      { rotationWeek: 8, affixes: "Fortified, ??, ??" },
      { rotationWeek: 9, affixes: "Tyrannical, ??, ??" },
      { rotationWeek: 10, affixes: "Fortified, ??, ??" },
    ],
    currentAffixes: {}
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
    setAffixes(state, payload) {
      state.currentAffixes = payload.data;
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
      //localStorage.dungeonTeams = state.teams
    },
    updateTeam(state, payload) {
      var key = state.keys.find(k => k.id === payload.id)
      key.team = payload.team
      key.role = payload.role 

      //localStorage.dungeonTeams = state.teams
    },
    getSavedTeams(state) {
      //if (localStorage.dungeonTeams) { state.teams = localStorage.dungeonTeams}
      
    }
  },


  actions: {
    getAllKeys(context) {
      context.commit('clearData')

      keys.getAffixesForCurrentWeek()
        .then(result => {
          context.commit('setAffixes', result)
        })
        .catch(error => {
          console.log(error)
        })
    

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