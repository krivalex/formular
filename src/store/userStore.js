import { defineStore } from 'pinia'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useUserStore = defineStore('main', {
  state: () => ({
    user: null,
    user_id: null,
  }),
  getters: {},
  actions: {
    getUser() {
      const data = JSON.parse(localStorage.getItem('user'))
      if (data) {
        this.user = data
        this.user_id = data.uid
      }
      return this.user
    },
    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user))
      this.user_id = user.uid
      return this.user
    },
  },
})
