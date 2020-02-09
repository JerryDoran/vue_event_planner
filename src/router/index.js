import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import Events from '@/components/events/Events.vue';
import CreateEvent from '@/components/events/CreateEvent.vue';
import Profile from '@/components/user/Profile.vue';
import Signup from '@/components/user/Signup.vue';
import Signin from '@/components/user/Signin.vue';
import Event from '@/components/events/Event.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
  },

  {
    path: '/event/new',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/events/:id',
    name: 'Event',
    props: true,
    component: Event
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
