export default defineEventHandler(async (event) => {
  setCookie(event, "accessToken", "", {
    maxAge: 0,
  });
  setCookie(event, "roles", "", {
    maxAge: 0,
  });
});
