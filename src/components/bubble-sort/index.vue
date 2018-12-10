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
            <!-- <p class="card-footer-item">
              <a class="button is-primary" @click="handleGenerate">暂停</a>
            </p> -->
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
  methods: {
    handleGenerate() {
      if (this.isShowData) return;
      this.sortData = utils.generateData(15);
      this.isShowData = true;
    },
    async handleStart(event) {
      if (event.target.getAttribute("disabled")) {
        return;
      }
      this.isStart = true;
      const newData = this.sortData.slice(0); // fix 数组改变导致vnode重渲染
      await sort(newData, this.frameAnimate, this.okAnimate);
      this.newData = newData;
    },
    async frameAnimate(data, i, j) {
      const htmls = this.$refs["datav-items"];
      if (htmls) {
        htmls[i].classList.add("cur");
        htmls[j].classList.add("cur");
        await utils.wait(50);

        if (data[i] > data[j]) {
          const left_i = htmls[i].offsetLeft;
          const left_j = htmls[j].offsetLeft;

          htmls[i].style.left = left_j + "px";
          htmls[j].style.left = left_i + "px";
          await utils.wait(200);
          [htmls[i], htmls[j]] = [htmls[j], htmls[i]];
        }

        // await utils.wait(1000);
        await utils.wait(500);
        htmls[i].classList.remove("cur");
        htmls[j].classList.remove("cur");
      }
    },

    async okAnimate(i) {
      const htmls = this.$refs["datav-items"];
      htmls[i].classList.add("ok");
      await utils.wait(50);
    }
  }
};
</script>

