export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  for (const [key, value] of Object.entries(cookies)) {
    if (key != "app_version" && key != "accessToken") {
      setCookie(event, key, value, {
        httpOnly: true, // Prevent client-side access
        secure: true, // Secure flag (only for HTTPS)
        sameSite: "strict", // Prevent CSRF attacks
        path: "/", // Make the cookie accessible across the entire site
        maxAge: 60 * 60 * 24 * 7, // 7 days expiration
      });
    }
  }
  // Example: Set a secure session cookie globally
  setCookie(event, "session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Continue processing the request
});
