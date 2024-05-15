<template>
  <ul class='list'>
    <li class='li' v-for="user in users" :key="user.id" @click="store.edit(user)">
      <span>Имя:{{user.name}}</span>
      <span>Возраст:{{user.age}}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {useUsersStore} from '@/stores/users';
import { ref, computed } from 'vue';

const store = useUsersStore();

const users = computed(() => store.users);
</script>

<style scoped>
.list{
  display: flex;
  flex-direction: column;
  background: grey;
  border: 1px solid black;
}
.li{
  background: white;
  border: 1px solid grey;
}
</style>