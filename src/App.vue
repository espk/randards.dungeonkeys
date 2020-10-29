<template>
  <div id="app">
    <div class="group">
      <div class="contol-area">
        <DungeonKeys msg="Dungeon Keys"/>
      </div>
    </div>
    
  </div>
</template>

<script>
import DungeonKeys from './components/DungeonKeys.vue'

export default {
  name: 'App',
  components: {
    DungeonKeys
  }
}
</script>

<style>


</style>
