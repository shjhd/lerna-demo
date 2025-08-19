import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'amfe-flexible';
import { Swipe, SwipeItem, Field, Button, Cell } from 'vant';
// 引入vxe-table
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import 'vant/lib/index.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VXETable);
app.use(Swipe);
app.use(SwipeItem);
app.use(Field);
app.use(Button);
app.use(Cell);

// 应用挂载后开始监控
app.mount('#app');
