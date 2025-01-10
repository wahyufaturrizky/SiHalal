import type { SessionData } from "#auth";
import { defineStore } from "pinia";
export const useMyAuthUserStore = defineStore("myAuthUserStore", () => {
  const user = ref<void | SessionData | null>(null);
  const role = ref<void | SessionData | null>(null);
  const auth = useAuth();
  async function getSession() {
    if (user.value == null) {
      user.value = await auth.getSession();
      if (user.value && process.client) {
        localStorage.setItem("authUser", JSON.stringify(user.value));
      }
    }
    return user;
  }

  function resetUser() {
    user.value = null;
    // if (process.client) {
    //   // Hapus dari localStorage jika di sisi klien
    //   localStorage.removeItem("authUser");
    // }
  }

  function loadUserFromLocalStorage() {
    if (process.client) {
      // Pastikan hanya berjalan di browser
      const storedData = localStorage.getItem("authUser");
      if (storedData) {
        try {
          user.value = JSON.parse(storedData);
        } catch (error) {
          console.error("Error parsing JSON from localStorage", error);
        }
      }
    }
  }
  loadUserFromLocalStorage();

  function canAccess(roles: string | string[]) {
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return user.value?.roles.some((data) => roleArray.includes(data.name));
  }

  // id: "myAuthUserStore",
  // state: () => ({
  //   user: null as void | SessionData | null,
  //   auth: useAuth(),
  // }),
  // actions: {
  //   async getSession() {
  //     if (this.user == null) {
  //       this.setUser(await this.auth.getSession());
  //     }
  //     return this.user;
  //   },
  //   async setUser(data: any) {
  //     this.user = data;
  //   },
  // },
  return { user, getSession, resetUser, canAccess };
});
