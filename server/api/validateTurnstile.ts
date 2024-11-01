export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided.",
    });
  }

  return await verifyTurnstileToken(
    body.token || body["cf-turnstile-response"]
  );
});
