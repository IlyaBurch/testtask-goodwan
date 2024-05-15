<template>
  <div>
    <form>
      <label>
        Имя:
        <input type='text' placeholder='Имя' v-model="name"/>
      </label>
      <label>
        Возраст
        <input type='text' placeholder='Возраст' v-model="age"/>
      </label>
      <input type='button' value='cancel' @click='cancel()'/>
      <input type='submit' value='save' @click='save()' />
    </form>

  </div>
</template>

<script setup lang="ts">
import {useUsersStore} from '@/stores/users';
import { ref, watch } from 'vue';

const store = useUsersStore();

const name = defineModel('name');
const age = defineModel('age');
const pattern = ref(false);

watch(
  () => store.currentEdit,
  (newValue) => {
    if (newValue) {
      name.value = newValue.name;
      age.value = newValue.age;
    } else {
      name.value = '';
      age.value = 0;
    }
  }
);

function save() {
  event.preventDefault();
  store.currentEdit.name = name.value;
  store.currentEdit.age = age.value;
  store.saveChanges();
}

function cancel() {
  store.discardChanges();
};

</script>

<style scoped>
</style>