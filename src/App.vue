<template>
  <div id="app">
    <header id="header">
      <div id="header-outer" class="outer row">
        <div id="header-title" class="inner">
          <h1 id="logo-wrap">randards.com</h1>
          <h2 id="subtitle-wrap">do you meet randy's standards?</h2>
        </div>
        <div id="header-app-title" class="inner">
          <h2>Dungeon Keys</h2>
        </div>
      </div>
    </header>
    <div class="application row">
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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ddd;
}

body {
  font-family: "Lato", sans-serif;
  background: #222;
  color: #ddd;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Lustria", serif;
}


#header {
  height: 60px;
  border-bottom: 1px solid #333;
}
#header:before,
#header:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 20px;
}
#header:before {
  top: 0;
  background: -webkit-linear-gradient(rgba(0, 0, 0, 0.2), transparent);
  background: -moz-linear-gradient(rgba(0, 0, 0, 0.2), transparent);
  background: -ms-linear-gradient(rgba(0, 0, 0, 0.2), transparent);
  background: linear-gradient(rgba(0, 0, 0, 0.2), transparent);
}
#header:after {
  top: 40px;
  background: -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  background: -moz-linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  background: -ms-linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
}
#header-outer {
  height: 100%;
  position: relative;
}
#header-inner {
  position: relative;
  overflow: hidden;
}

#header-title {
  height: 40px;
  position: absolute;
}
#header-title h1,
#header-title h1 a {
  font-family: "Orbitron", sans-serif;
  font-weight: normal;
  color: #9482c9;
  margin-top: 4px;
}
#header-title h2,
#header-title h2 a {
  font-family: "Noticia Text", serif;
  font-style: italic;
  font-weight: normal;
  font-size: 11px;
  color: #999;
  margin-top: -30px;
  margin-left: 92px;
}
#header-app-title {
  height: 40px;
  float: right;
}
#header-app-title h2 {
  font-family: "Permanent Marker", sans-serif;
  font-weight: normal;
  font-size: 32px;
  color: #0070de;
  margin: 0;
  text-align: right;
}
#header-app-title h3 {
  font-family: "Permanent Marker", sans-serif;
  font-weight: normal;
  font-size: 16px;
  color: #fff;
  margin-top: -16px;
  text-align: right;
}

.pull-right {
  float: right;
}
.row {
  width: 980px;
  margin: 0 auto;
  padding: 0 20px;
}

</style>
