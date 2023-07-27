const throwError = () => {
  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
  });
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.secret) throwError();

  const config = useRuntimeConfig();
  if (body.secret !== config.hasuraSecret) throwError();

  return { message: "success" };
});
