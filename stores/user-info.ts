import { defineStore } from 'pinia';

export const useUserInfoStore = defineStore('user', {
  id: 'userInfoStore',
  state: () => ({
    email: '',
    id: '',
    is_verified: false,
    name: '',
    otp: '',
    phone_number: '',
  }),
  getters: {
  },
  actions: {
    setUserData(userData: {
      email: string
      id: string
      is_verified: boolean
      name: string
      otp: string
      phone_number: string
    }) {
      this.email = userData.email
      this.id = userData.id
      this.is_verified = userData.is_verified
      this.name = userData.name
      this.otp = userData.otp
      this.phone_number = userData.phone_number
    },
    clearUserData() {
      this.email = ''
      this.id = ''
      this.is_verified = null
      this.name = ''
      this.otp = ''
      this.phone_number = ''
    },
  },
});
