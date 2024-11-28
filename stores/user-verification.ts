import { defineStore } from 'pinia';

export const useUserVerificationStore = defineStore({
  id: 'userVerificationStore',
  state: () => ({
    email: '',
    id: '',
    phone_number: '',
  }),
  getters: {
  },
  actions: {
    setUserData(userData: {
      email: string
      id: string
      phone_number: string
    }) {
      this.email = userData.email
      this.id = userData.id
      this.phone_number = userData.phone_number
    },
    clearUserData() {
      this.email = ''
      this.id = ''
      this.phone_number = ''
    },
  },
});
