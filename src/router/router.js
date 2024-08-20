import { Router } from '@vaadin/router';

const router = new Router(document.querySelector('#outlet'));
router.setRoutes([
  { path: '/', component: 'poke-home' },
  { path: '/pokemon/evolutions/:name', component: 'evolution-page' },
  { path: '/pokemon/:name/edit', component: 'poke-edit' },
  { path: '(.*)', component: 'poke-home' }
]);

export { router };
