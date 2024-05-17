<template>
  <div>
    <form>
      <label>
        Имя:
        <input type="text" placeholder="Имя" required v-model="name" />
      </label>
      <label>
        Возраст
        <input type="text" placeholder="Возраст" v-model="age" />
      </label>
      <input type="button" value="cancel" @click="cancel()" />
      <input type="submit" value="save" @click.prevent="save(name, age)" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { ref, watch, computed } from 'vue'

const store = useUsersStore()

const name = defineModel<string>('name', { default: '' })
const age = defineModel<number>('age', { default: null })

watch(
  () => store.currentEdit,
  (newValue) => {
    if (newValue) {
      name.value = newValue.name
      age.value = newValue.age
    } else {
      name.value = ''
      age.value = 0
    }
  }
)

function save(name: string, age: number) {
  store.currentEdit.name = name
  store.currentEdit.age = age
  store.saveChanges()
}

function cancel() {
  store.discardChanges()
}
</script>

<style scoped></style>
