<template>
  <div id="app">
    <ul>
      <li v-for="(sort, index) in sorts" :key="index">
        <router-link :to="sort.path">
          {{ sort.name }}
        </router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sorts: [
        {
          name: "冒泡排序",
          path: "/bubble-sort"
        }
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
li {
  display: inline-block;
}

.generate-data {
  position: fixed;
  right: 20px;
  top: 20px;
  /* width: 300px; */
}
.datav {
  height: 300px;
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
  align-items: flex-end;
  position: relative;
  justify-content: center;
}
.datav-item {
  width: 30px;
  color: hsl(0, 0%, 21%);
  background: hsl(204, 86%, 53%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  transition: left 0.2s;
}
.datav-item.cur {
  background-color: hsl(171, 100%, 41%);
}
.datav-item.ok {
  background-color: hsl(48, 100%, 67%);
}
</style>
