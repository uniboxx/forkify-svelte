import { mount } from 'svelte';
import App from './App.svelte';
import './sass/main.scss';

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
