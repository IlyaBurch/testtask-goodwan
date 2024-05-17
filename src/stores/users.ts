import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Users } from '@/interfaces'

export const useUsersStore = defineStore('users', () => {
  const users = ref<Users[]>([
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 }
  ])

  const currentEdit = ref<Users>({ id: 0, name: '', age: 0 })
  const cachedUser = ref<Users>({ id: 0, name: '', age: 0 })

  function edit(user: Users) {
    currentEdit.value = { ...user }
    cachedUser.value = { ...user }
  }

  function saveChanges() {
    const index: number = users.value.findIndex((u) => u.id === currentEdit.value?.id)

    if (index !== -1 && currentEdit.value) {
      users.value[index] = currentEdit.value
    }
  }

  function resetUser(user: Users | null) {
    user = currentEdit.value
    return user
  }

  function discardChanges() {
    currentEdit.value = cachedUser.value
  }
  return { users, saveChanges, currentEdit, cachedUser, resetUser, edit, discardChanges }
})
