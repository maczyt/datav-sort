<template>
  <div class="container">
    <a :disabled="isShowData" class="button is-primary" @click="handleGenerate">生成随机数据</a>
    <a class="button is-primary" @click="isShowModal = true">演示</a>

    <div v-show="isShowData" class="notification is-info generate-data">
      <button class="delete" @click="isShowData = !isShowData"></button>
      <p>原始数据: {{showSortData}} </p>
      <p v-if="isStart">排序数据: {{`[${newData.join()}]`}}</p>
    </div>

    <div :class="{ 'is-active': isShowModal }" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <div class="card-content">
            <div class="datav">
              <div 
                ref="datav-items"
                :style="{ 'height': `${item}%`, left: `${index * 30 + (index + 1) * 10}px` }"
                :key="index" class="datav-item" 
                v-for="(item, index) in sortData">
                {{ item }}
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <a :disabled="isStart" class="button is-primary" @click="handleStart">开始</a>
            </p>
          </footer>
        </div>
      </div>
      <button 
        class="modal-close is-large" aria-label="close" 
        @click="isShowModal = false; isStart = false;"></button>
    </div>
    
  </div>
</template>

<script>
import utils from "@/assets/js/utils";
import sort from "./sort";

export default {
  data() {
    return {
      isShowData: false,
      sortData: [],
      isShowModal: false,
      isStart: false,

      newData: []
    };
  },
  computed: {
    showSortData() {
      return `[${this.sortData.join()}]`;
    }
  },
  mixins: [{ methods: { sort } }],
  methods: {
    handleGenerate() {
      if (this.isShowData) return;
      this.sortData = utils.generateData(15);
      this.isShowData = true;
    },
    async setMin(i) {
      const htmls = this.$refs["datav-items"];
      htmls.forEach(html => {
        html.classList.remove("min");
      });
      htmls[i].classList.add("min");
      await utils.wait(200);
    },

    async select(i, j) {
      const htmls = this.$refs["datav-items"];
      const left_i = htmls[i].offsetLeft;
      const left_j = htmls[j].offsetLeft;

      htmls[i].style.left = left_j + "px";
      htmls[j].style.left = left_i + "px";
      await utils.wait(200);
      htmls[j].classList.add("ok");
      await utils.wait(500);
      [htmls[i], htmls[j]] = [htmls[j], htmls[i]];
    },

    async next(i) {
      const htmls = this.$refs["datav-items"];
      try {
        htmls[i - 1].classList.remove("cur");
      } catch (e) {}
      htmls[i].classList.add("cur");
      await utils.wait(500);
    },

    async handleStart(event) {
      if (event.target.getAttribute("disabled")) {
        return;
      }
      this.isStart = true;
      const newData = this.sortData.slice(0); // fix 数组改变导致vnode重渲染
      await this.sort(newData, this.frameAnimate, this.okAnimate);
      this.newData = newData;
    }
  }
};
</script>

<style scoped>
.datav-item {
  transition: background 0.2s, left 0.2s;
}
.datav-item.min {
  background-color: hsl(348, 100%, 61%);
}
.datav-item.cur {
  background-color: hsl(171, 100%, 41%);
}
.datav-item.ok {
  background-color: hsl(48, 100%, 67%);
}
</style>
