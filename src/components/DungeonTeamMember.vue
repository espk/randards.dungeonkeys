<template>
  <span draggable=""
        @dragstart="onDrag($event, DungeonTeamMember)">
    <span class="character-name" v-bind:class="teamMemberCharacterClassStyle">&nbsp;{{ teamMemberDiplayed }}</span> 
    <span>&nbsp;{{ DungeonTeamMember.dungeonName }} {{ DungeonTeamMember.keyLevel}}</span>
  </span>
</template>

<script>
export default {
  name: "DungeonTeamMember",
  props: { 
    DungeonTeamMember: Object
  },
  computed: {
    teamMemberDiplayed: function() {
      return (this.DungeonTeamMember && this.DungeonTeamMember.mapping) ? this.DungeonTeamMember.mapping.replacement : ''
    },
    teamMemberCharacterClassStyle: function() {
      return (this.DungeonTeamMember && this.DungeonTeamMember.mapping) ? this.DungeonTeamMember.mapping.characterClass.replace(" ", "-").toLowerCase() : ''
    }
  },
  methods: {
    onDrag: function(event, key) {
      this.$parent.onDrag(event, key)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
