import type { SessionData } from "#auth";
import { defineStore } from "pinia";
export const useMyAuthUserStore = defineStore("myAuthUserStore", () => {
  const user = ref<void | SessionData | null>(null);
  const auth = useAuth();
  async function getSession() {
    if (user.value == null) {
      user.value = await auth.getSession();
    }
    return user;
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
  return { user, getSession };
});
