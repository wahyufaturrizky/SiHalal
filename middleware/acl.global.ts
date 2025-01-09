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
  const isVerified = user.value?.is_verified;
  const isPelakuUsaha = user.value?.roles.some(
    (role) => role.name == "Pelaku Usaha"
  );
  const isNewUser = user.value?.new_user;

  if (isLoggedIn && to.path === "/register") {
    return navigateTo("/");
  }
  if (!isLoggedIn && to.path !== "/register") {
    return navigateTo("/");
  }

  if (!isVerified && to.path !== "/verifikasi-user") {
    return navigateTo("/verifikasi-user");
  }
  if (isVerified && to.path === "/verifikasi-user") {
    return;
  }

  if (
    isVerified &&
    isNewUser &&
    isPelakuUsaha &&
    to.path !== "/login/new-account"
  ) {
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
