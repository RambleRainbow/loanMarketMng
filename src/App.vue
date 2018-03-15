<template>
  <div id="app">
    <mu-appbar class="appbar">{{pageTitle}}</mu-appbar>
    <router-view class="router-view"/>
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">

      <mu-bottom-nav-item value="home" title="首页" icon="home"/>
      <mu-bottom-nav-item value="query" title="查询" icon="search"/>
      <mu-bottom-nav-item value="statistic" title="统计" icon="insert_chart"/>
      <mu-bottom-nav-item value="setting" title="设置" icon="settings"/>
    </mu-bottom-nav>
  </div>
</template>

<script>

  //import MuBottomNav from "../node_modules/muse-ui/src/bottomNav/bottomNav.vue";

  export default {
    //components: {MuBottomNav},
    name: 'app',
    data() {
      return {
        navDefs: {
          "home": {title: "首页", icon: "home", route: "/Borrow"},
          "query": {title: "查询", icon: "search", route: "/query"},
          "statistic": {title: "统计", icon: "insert_chart", route: "/statistic"},
          "setting": {title: "设置", icon: "settings", route: "/settings"}
        },
        bottomNav: 'home',
        pageTitle: '首页'
      }
    },
    methods: {
      handleChange(val) {
        this.bottomNav = val;
        this.pageTitle = this.navDefs[val].title;
        this.$router.replace(this.navDefs[val].route);
      }
    }
  }
</script>

<style>

  .router-view {
    height: calc(100% - 56px * 2);
    padding: 10px;
  }

  .appbar {
    text-align: center;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
</style>
