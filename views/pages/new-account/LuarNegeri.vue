<template>
  <v-card-text>
    <p class="text-h5 font-weight-bold">Company Profile Form</p>
    <v-form ref="refVForm" @submit.prevent="onSubmit">
      <VRow>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            Company Name
          </div>
          <VTextField
            v-model="form.company_name"
            placeholder="Insert Company name"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            Address
          </div>
          <VTextField
            v-model="form.address"
            placeholder="Address"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            City
          </div>
          <VTextField
            v-model="form.city"
            placeholder="Insert City"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            Province
          </div>
          <VTextField
            v-model="form.province"
            placeholder="Insert Province"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            Country
          </div>
          <VSelect
            :items="country"
            v-model="form.country"
            :rules="[requiredValidator]"
            require
            placeholder="Insert Country"
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            Postal Code
          </div>
          <VTextField
            v-model="form.postal_code"
            placeholder="Insert Postal Code"
            :rules="[requiredValidator, integerValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            Phone Number
          </div>
          <VTextField
            v-model="form.phone"
            placeholder="Insert Phone Number"
            :rules="[requiredValidator, integerValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            Email
          </div>
          <VTextField
            v-model="form.email"
            placeholder="Insert Email"
            :rules="[requiredValidator, emailValidator]"
            require
          />
        </VCol>
      </VRow>
      <VRow class="flex-row-reverse">
        <VCol cols="12" md="auto">
          <VBtn block type="submit" :disabled="buttonClicked"> Kirim </VBtn>
        </VCol>
        <VCol cols="12" md="auto">
          <VBtn
            block
            variant="outlined"
            type="reset"
            @click="stepStore.goToStep(1)"
          >
            Kembali
          </VBtn>
        </VCol>
      </VRow>
    </v-form>
  </v-card-text>
</template>

<script lang="ts" setup>
import { emailValidator, integerValidator, requiredValidator } from "#imports";
import type MasterCountry from "@/server/interface/master.iface";
import NewAccountForeign from "@/server/interface/new-account.iface";
import type { VForm } from "vuetify/components";

const form = ref<NewAccountForeign>({
  company_name: "",
  address: "",
  city: "",
  province: "",
  country: null,
  postal_code: "",
  phone: "",
  email: "",
});
const buttonClicked = ref(false);
const refVForm = ref<VForm>();
const stepStore = useMyNewAccountStepStore();
const country = ref();

const authUserStore = useMyAuthUserStore()

onMounted(async () => {
  const response: MasterCountry[] = await $api("/master/country", {
    method: "get",
  });
  country.value = response.map((item) => item.name);
});

const onSubmit = async () => {
  // sendSnackbar("error bang", "success");
  buttonClicked.value = true;
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) submitForm();
    else buttonClicked.value = false;
  });
};
const submitForm = async () => {
  const res = await $api("/new-account/business-actor/foreign-country", {
    method: "post",
    body: form.value,
  });

  console.log("SUBMIT BUSSINESS ACTOR : FOREIGN COUNTRY ", res)

  if (res) {
    // useAuth().signOut();
    authUserStore.resetUser()
    useSnackbar().sendSnackbar(
      "Bussiness Actor data save successfully. Please relogin",
      "success"
    );
    navigateTo("/")
  } else {
    useSnackbar().sendSnackbar(
      "Bussiness Actor data save unsuccessfully",
      "error"
    );
  }
  buttonClicked.value = false;
};
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
