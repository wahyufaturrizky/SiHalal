import type { SessionData } from "#auth";
import { defineStore } from "pinia";
export const useMyAuthUserStore = defineStore("myAuthUserStore", () => {
  const user = ref<void | SessionData | null>(null);
  const role = ref<void | SessionData | null>(null);
  const auth = useAuth();
  async function getSession() {
    if (user.value == null) {
      user.value = await auth.getSession();
    }
    return user;
  }

  function resetUser() {
    user.value = null;
  }

  function toPath(str: string) {
    return (str.charAt(0) === "/" ? str.substring(1) : str).replace(/\//g, "-");
  }

  function getMenuVertical() {
    let userMenu = {};
    let roles = [];
    user.value?.roles.sort((a, b) => a.code.localeCompare(b.code));
    user.value?.roles.forEach((role) => {
      roles.push(role.name);
      role.permissions.forEach((permission) => {
        if (permission.group == "api") return;

        const key = permission.id;

        if (!userMenu[key]) {
          userMenu[key] = {
            id: permission.id,
            group: permission.group,
            name: permission.name,
            child: [],
          };
        }
        userMenu[key].child.push(...permission.child);
      });
    });
    const combinedPermission = Object.values(userMenu);
    let menuList = [];
    combinedPermission.forEach((data) => {
      if (data.group === "heading") {
        menuList.push({
          heading: data.name,
          roles: roles,
        });
      }
      if (data.child.length >= 1) {
        data.child.forEach((j) => {
          menuList.push({
            title: j.name,
            to: j.url == "/" ? "index" : toPath(j.url),
            icon: { icon: j.icon },
            roles: roles,
          });
        });
      }
    });
    return menuList;
  }
  function getMenuHorizontal() {
    let userMenu = {};
    let roles = [];
    user.value?.roles.sort((a, b) => a.code.localeCompare(b.code));
    user.value?.roles.forEach((role) => {
      roles.push(role.name);
      role.permissions.forEach((permission) => {
        if (permission.group == "api") return;

        const key = permission.id;

        if (!userMenu[key]) {
          userMenu[key] = {
            title: permission.name,
            icon: { icon: "ri-more-line" },
            roles,
            children: [],
          };
        }
        userMenu[key].children.push(
          ...permission.child.map((data) => {
            return {
              title: data.name,
              to: data.url == "/" ? "index" : toPath(data.url),
              icon: { icon: data.icon },
              roles,
            };
          })
        );
      });
    });

    const combinedPermission = Object.values(userMenu);
    return combinedPermission;
  }

  function canAccess(roles: string | string[]) {
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return user.value?.roles.some((data) => roleArray.includes(data.name));
  }

  return {
    user,
    getSession,
    resetUser,
    canAccess,
    getMenuVertical,
    getMenuHorizontal,
  };
});
