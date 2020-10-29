<template>
  <div class="grid">
    <div class="weekly-affixes">{{ getCurrentAffixes() }}</div>
    <ul class="keys">
      <li
        v-for="key in keys"
        v-bind:key="key.id"
        draggable=""
        @dragstart="onDrag($event, key)"
      >
        <span
          class="character-name"
          v-bind:class="key.mapping.characterClass.replace(' ', '-').toLowerCase()"
          >{{ key.mapping.replacement }}</span
        >
        {{ key.dungeonName }} {{ key.keyLevel }}
      </li>
    </ul>
    <div class="team-group">
      <div class="team" v-for="team in teams" v-bind:key="team">
        <h3>Team {{ team }}</h3>
        <div class="team-tank" @drop="onDrop($event, team, 'tank')" @dragover.prevent @dragenter.prevent>
          <DungeonTeamMember v-bind:dungeon-team-member="getAsignee(team, 'tank')">&nbsp;</DungeonTeamMember>
        </div>
        <div class="team-heal" @drop="onDrop($event, team, 'heal')" @dragover.prevent @dragenter.prevent>
          <DungeonTeamMember v-bind:dungeon-team-member="getAsignee(team, 'heal')">&nbsp;</DungeonTeamMember>
        </div>
        <div class="team-dps" @drop="onDrop($event, team, 'dps1')" @dragover.prevent @dragenter.prevent>
          <DungeonTeamMember v-bind:dungeon-team-member="getAsignee(team, 'dps1')">&nbsp;</DungeonTeamMember>
        </div>
        <div class="team-dps" @drop="onDrop($event, team, 'dps2')" @dragover.prevent @dragenter.prevent>
          <DungeonTeamMember v-bind:dungeon-team-member="getAsignee(team, 'dps2')">&nbsp;</DungeonTeamMember>
        </div>
        <div class="team-dps" @drop="onDrop($event, team, 'dps3')" @dragover.prevent @dragenter.prevent>
          <DungeonTeamMember v-bind:dungeon-team-member="getAsignee(team, 'dps3')">&nbsp;</DungeonTeamMember>
        </div>
      </div>
      <button @click='addTeam()'>Add a Team</button>
    </div>
  </div>
</template>

<script>
import store from "../data/store";
import DungeonTeamMember from "./DungeonTeamMember"
import { mapState } from "vuex";

export default {
  name: "DungeonKeys",
  components: {
    DungeonTeamMember: DungeonTeamMember
  },

  store,
  computed: mapState(["keys", "lookups", "teams"]),
  methods: {
    getCharacterClassStyle: function (key) {
      var lookup = this.lookups.find((l) => l.nickname === key.characterName);
      return lookup === undefined
        ? ""
        : lookup.characterClass.replace(" ", "-").toLowerCase();
    },
    getCurrentAffixes: function () {
      return this.keys[0] ? this.keys[0].affixes : "";
    },
    onDrag: function (event, key) {
      event.dataTransfer.setData("keyId", key.id)
    },
    onDrop: function(event, team, role) {
      const keyId = event.dataTransfer.getData('keyId')
      const payload = { id: keyId, team: team, role: role }
      
      this.$store.commit("clearTeamRole", payload)
      this.$store.commit("updateTeam", payload)
    },
    getAsignee(team, role) {
      let key = this.keys.find(k => k.team === team && k.role === role)
      return (key === undefined) ? {} : key
    },
    addTeam() {
      this.$store.commit("addTeam")
    }
  },
  mounted: function () {
    this.$store.dispatch("getAllKeys");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
ul {
  text-align: left;
  font-size: 24px;
  margin: 10px 0;
  padding: 0;
}
ul li {
  margin: 4px 0;
  padding: 2px 6px;
  list-style: none;
  background-color: #1a1a1a;
}
.grid {
  display: grid;
  grid-template-areas: 
    "header header"
    "keys teams";
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
}
.keys {
  grid-area: keys ;
}
.team-group {
  margin-left: 20px;
  text-align: left;
  grid-area: teams;
}
.team-group button {
  background-color: #111;
  color: #ddd;
  border: 1px solid #333;
  padding: 8px;
  margin-top: 14px;
  font-size: 16px;
  border-radius: 8px;
}
.team h3 {
  padding: 5px 5px 5px 10px;
  font-size: 18px;
  font-weight: normal;
  border: 1px solid #333;
  background: #0a0a0a;
  margin: 14px 0 0 0;
}
.team-tank, .team-heal, .team-dps {
  padding: 3px 3px 3px 44px;
  font-size: 24px;
  border: 1px solid #333;
  background: #1a1a1a;
}
.team-tank::before, .team-heal::before, .team-dps::before {
  position: absolute;
  content: '';
  background-size: 160px;
  background-repeat: no-repeat;
  width: 36px;
  height: 36px;
  opacity: 0.7;
  border-right: 1px solid #333;
  margin: -3px 0 0 -44px;
}
.team-tank::before {
  background-image: url("../assets/role_icons-transparent.png");
  background-position: -3px -46px;
}
.team-heal::before {
  background-image: url("../assets/role_icons-transparent.png");
  background-position: -45px -3px;
}
.team-dps::before {
  background-image: url("../assets/role_icons-transparent.png");
  background-position: -46px -45px;
}
.weekly-affixes {
  margin: 20px 0;
  text-align: left;
  font-size: 36px;
  color: #999;
  grid-area: header;
  height: 40px;
}

span.character-name {
  display: inline-block;
  width: 140px;
}

</style>
