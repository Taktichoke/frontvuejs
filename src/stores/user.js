import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const dialog = ref(false)
  const id = ref(-1)
  const fname = ref('')
  const lname = ref('')
  const username = ref('')
  const lastId = ref(3)
  const users = ref([
    {
      id: 1,
      fname: 'Karn',
      lname: 'Yong',
      username: 'karn.yong@melivecode.com'
    },
    {
      id: 2,
      fname: 'Ivy',
      lname: 'Cal',
      username: 'ivy.cal@melivecode.com'
    }
  ])

  const saveUser = () => {
    if (id.value < 0) {
      users.value.push({
        id: lastId.value++,
        fname: fname.value,
        lname: lname.value,
        username: username.value
      })
    } else {
      const user = users.value.findIndex((item) => item.id === id.value)
      users.value[user].fname = fname.value
      users.value[user].lname = lname.value
      users.value[user].username = username.value
    }
    dialog.value = false
    clearUser()
  }

  const editUser = (idUser) => {
    const user = users.value.findIndex((item) => item.id === idUser)
    id.value = users.value[user].id
    fname.value = users.value[user].fname
    lname.value = users.value[user].lname
    username.value = users.value[user].username
  }

  const deleteUser = (idUser) => {
    const user = users.value.findIndex((item) => item.id === idUser)
    users.value.splice(user, 1)
  }

  const clearUser = () => {
    id.value = -1
    fname.value = ''
    lname.value = ''
    username.value = ''
  }

  return { dialog, fname, lname, username, users, saveUser, clearUser, editUser, deleteUser }
})
