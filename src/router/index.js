import Vue from 'vue';
import Router from 'vue-router';

const BubbleSort = () => import('@/components/bubble-sort');
const SelectSort = () => import('@/components/select-sort');

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/bubble-sort',
    component: BubbleSort,
  }, {
    path: '/select-sort',
    component: SelectSort
  }],
});
