export default defineEventHandler(async (event) => {
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
