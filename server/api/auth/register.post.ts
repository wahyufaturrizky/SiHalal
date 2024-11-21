const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  // console.log("EVENT ", event);

  const { data, error } = await $fetch<any>(
    `${runtimeConfig.authBaseUrl}/api/v1/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  // .catch((err: NuxtError) => {
  //   // console.error("error reset passwd => ", err.data);

  //   // const response = JSON.parse(JSON.stringify(err.data));

  //   const msgDefault = "Password is wrong x";

  //   // if (err.statusCode == 4001) {
  //   //   if (response?.code == 4001) msgDefault = response?.message;
  //   // }

  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: msgDefault,
  //   });
  // });

  // console.log(data, "ini data");

  return data || error || null;
});
