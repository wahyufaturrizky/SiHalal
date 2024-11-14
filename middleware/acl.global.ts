export default defineNuxtRouteMiddleware(async (to) => {
  /*
   * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
   * Examples of public routes are, 404, under maintenance, etc.
   */
  if (to.meta.public) return;

  const { status } = useAuth();
  const isLoggedIn = status.value === "authenticated";

  /*
  If user is logged in and is trying to access login like page, redirect to home
  else allow visiting the page
  (WARN: Don't allow executing further by return statement because next code will check for permissions)
  */
  if (to.meta.unauthenticatedOnly) {
    if (isLoggedIn) return navigateTo("/");
    else return undefined;
  }
  // console.log(!canNavigate(to) && to.matched.length);
  if (!isLoggedIn) {
    return navigateTo({ name: "login" });
  }

  const { getSession } = useMyAuthUserStore();
  const user = await getSession();
  // if (to.path === "/verifikasi-user" && !user.value?.is_verified) {
  // return navigateTo({
  //   path: "/verifikasi-user",
  //   query: { id: user.value?.id, email: user.value?.email },
  // });
  // }
  if (to.path === "/register") {
    if (isLoggedIn) {
      return navigateTo("/");
    }
  } else if (!isLoggedIn) {
    return navigateTo("/register");
  }

  if (to.path === "/verifikasi-user") {
    if (user.value?.is_verified) {
      return navigateTo("/");
    }
  } else if (!user.value?.is_verified) {
    return navigateTo("/login");
  }

  if (to.path === "/login/new-account") {
    if (!user.value?.new_user) {
      return navigateTo("/");
    }
  } else if (user.value?.new_user) {
    return navigateTo("/login/new-account");
  }

  // if (!canNavigate(to) && to.matched.length) {
  //   /* eslint-disable indent */
  //   return navigateTo(
  //     isLoggedIn
  //       ? { name: "not-authorized" }
  //       : {
  //           name: "login",
  //           query: {
  //             ...to.query,
  //             to: to.fullPath !== "/" ? to.path : undefined,
  //           },
  //         }
  //   );
  //   /* eslint-enable indent */
  // }
});
