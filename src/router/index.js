import Vue from 'vue';
import Router from 'vue-router';

const BubbleSort = () => import('@/components/bubble-sort');

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/bubble-sort',
    component: BubbleSort,
  }],
});
