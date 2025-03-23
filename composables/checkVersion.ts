export const useCheckVersion = () => {
  const config = useRuntimeConfig();
  const currentVersion = config.public.appVersion;
  const versionKey = "app_version";

  if (process.client) {
    const storedVersion = useCookie<string>("app_version", {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    if (!storedVersion.value) {
      console.log("[App] No version cookie found, setting it now.");
      storedVersion.value = currentVersion;
      return;
    }

    if (storedVersion.value !== currentVersion) {
      console.log(
        `[App] Version changed (${storedVersion.value} → ${currentVersion}), reloading...`
      );
      storedVersion.value = currentVersion;
      window.location.href = window.location.pathname + "?v=" + currentVersion;
    } else {
      console.log("[App] Version is up to date:", storedVersion.value);
    }
  }
};
