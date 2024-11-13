import { createMongoAbility } from "@casl/ability";
import { abilitiesPlugin } from "@casl/vue";

export default defineNuxtPlugin((nuxtApp) => {
  // const userAbilityRules = useCookie<Rule[]>("roles");
  const userAbilityRules = [{ action: "manage", subject: "Pelaku Usaha" }];

  const initialAbility = createMongoAbility(userAbilityRules ?? []);

  nuxtApp.vueApp.use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true,
  });
});
