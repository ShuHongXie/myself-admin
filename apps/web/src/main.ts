import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { locales } from '@myself/locales';

console.log(locales);

createApp(App).mount('#app');
