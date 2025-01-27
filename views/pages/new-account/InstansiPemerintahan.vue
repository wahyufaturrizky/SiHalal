<template>
  <v-card-text>
    <p class="text-h5 font-weight-bold">{{ t("new-gov-data.title") }}</p>
    <v-form ref="governorForm" @submit.prevent="onSubmit">
      <VRow>
        <VCol cols="12" class="mb-0 pb-0">
          <p class="text-h6 font-weight-bold">
            {{ t("new-gov-data.subtitle-1") }}
          </p>
        </VCol>
        <VCol cols="12" md="6">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-1") }}
          </div>
          <VTextField
            v-model="formSubmit.business_actor_name"
            placeholder="Masukkan Nama Pelaku Usaha"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-2") }}
          </div>
          <VTextField
            v-model="formSubmit.nik"
            placeholder="Masukkan Nomor KTP/NIK"
            :rules="[
              requiredValidator,
              integerValidator,
              lengthValidator(formSubmit.nik, 16),
            ]"
            @input="onlyAcceptNumber"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-3") }}
          </div>
          <VTextField
            v-model="formSubmit.phone"
            placeholder="Masukkan Nomor Telepon"
            :rules="[
              requiredValidator,
              integerValidator,
              phoneNumberIdValidator,
            ]"
            require
          />
        </VCol>
        <VCol cols="12" md="6">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-4") }}
          </div>
          <VTextField
            v-model="formSubmit.email"
            placeholder="Masukkan Email"
            :rules="[requiredValidator, emailValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-5") }}
          </div>
          <VTextField
            v-model="formSubmit.address"
            placeholder="Masukkan Alamat"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-6") }}
          </div>
          <VSelect
            :items="province"
            item-value="code"
            item-title="name"
            v-model="formSubmit.province_code"
            :rules="[requiredValidator]"
            require
            v-on:update:model-value="getDistrict"
            placeholder="Pilih Provinsi"
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-7") }}
          </div>
          <VSelect
            :items="district"
            item-value="code"
            item-title="name"
            v-model="formSubmit.city_code"
            :rules="[requiredValidator]"
            v-on:update:model-value="getSubDistrict"
            require
            placeholder="Pilih Kabupaten/Kota"
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-8") }}
          </div>
          <VSelect
            v-model="formSubmit.sub_district_code"
            :items="subDistrict"
            item-value="code"
            item-title="name"
            :rules="[requiredValidator]"
            require
            placeholder="Pilih Kecamatan"
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-9") }}
          </div>
          <VTextField
            v-model="formSubmit.village"
            placeholder="Masukkan Kelurahan/Desa"
            :rules="[requiredValidator]"
            require
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub1-attr-10") }}
          </div>
          <VTextField
            v-model="formSubmit.postal_code"
            placeholder="Masukkan Kode Pos"
            :rules="[requiredValidator, integerValidator]"
            require
            @input="onlyAcceptNumber"
          />
        </VCol>
        <VCol cols="12" class="mb-0 pb-0">
          <p class="text-h6 font-weight-bold">
            {{ t("new-gov-data.subtitle-2") }}
          </p>
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub2-attr-1") }}
          </div>
          <VSelect
            v-model="formSubmit.business_type"
            :items="badanUsaha"
            item-value="code"
            item-title="name"
            :rules="[requiredValidator]"
            require
            placeholder="Pilih Jenis Badan Usaha"
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub2-attr-2") }}
          </div>
          <VSelect
            v-model="formSubmit.business_scale"
            :items="skalaUsaha"
            item-value="code"
            item-title="name"
            :rules="[requiredValidator]"
            require
            placeholder="Pilih Jenis Skala Usaha"
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub2-attr-3") }}
          </div>
          <VTextField
            v-model="formSubmit.venture_capital"
            placeholder="Masukkan Modal Usaha"
            :rules="[requiredValidator, integerValidator]"
            require
            @input="onlyAcceptNumber"
          />
        </VCol>
        <VCol cols="12">
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1">
            {{ t("new-gov-data.sub2-attr-4") }}
          </div>
          <VSelect
            v-model="formSubmit.kbli"
            :items="kbli"
            item-title="judul_kbli"
            item-value="kbli"
            :rules="[requiredValidator]"
            require
            placeholder="Pilih KBLI"
          />
        </VCol>
      </VRow>
      <VRow class="flex-row-reverse">
        <VCol cols="12" md="auto">
          <VBtn block type="submit" :disabled="buttonClicked">
            {{ t("new-gov-data.btn-2") }}
          </VBtn>
        </VCol>
        <VCol cols="12" md="auto">
          <VBtn
            block
            variant="outlined"
            type="reset"
            @click="stepStore.goToStep(1)"
          >
            {{ t("new-gov-data.btn-1") }}
          </VBtn>
        </VCol>
      </VRow>
    </v-form>
  </v-card-text>
</template>

<script lang="ts" setup>
import { emailValidator, integerValidator, requiredValidator } from "#imports";
import type {
  MasterBadanUsaha,
  MasterDistrict,
  MasterProvince,
  MasterSubDistrict,
} from "@/server/interface/master.iface";
import { NewAccountGovernment } from "@/server/interface/new-account.iface";
import onlyAcceptNumber from "@/utils/onlyAcceptNumber";
import { useI18n } from "vue-i18n";
import { VForm } from "vuetify/components";
const stepStore = useMyNewAccountStepStore();

const authUserStore = useMyAuthUserStore();
const { t } = useI18n();

const backToForm = () => {
  stepStore.goToStep(1);
  formSubmit.value = {
    business_actor_name: "",
    nik: "",
    phone: "",
    email: "",
    address: "",
    province_code: null,
    city_code: null,
    sub_district_code: null,
    village: null,
    postal_code: "",
    business_type: null,
    business_scale: null,
    venture_capital: 0,
    kbli: null,
  };
};
const province = ref();
const district = ref();
const subDistrict = ref();
const badanUsaha = ref();
const skalaUsaha = ref();
const kbli = ref();
onMounted(async () => {
  const response: MasterProvince[] = await $api("/master/province", {
    method: "get",
  });
  const response2: MasterBadanUsaha[] = await $api("/master/business-entity", {
    method: "get",
  });
  const response3: MasterBadanUsaha[] = await $api("/master/kbli", {
    method: "get",
  });
  const response4: MasterBadanUsaha[] = await $api(
    "/master/business-entity-scale",
    {
      method: "get",
    }
  );
  province.value = response;
  badanUsaha.value = response2;
  kbli.value = response3;
  skalaUsaha.value = response4;
});
const getDistrict = async (item: string) => {
  formSubmit.value.city_code = null;
  formSubmit.value.sub_district_code = null;
  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: item,
    },
  });
  district.value = response;
};
const getSubDistrict = async (item: string) => {
  formSubmit.value.sub_district_code = null;
  const response: MasterSubDistrict[] = await $api("/master/subdistrict", {
    method: "post",
    body: {
      district: item,
    },
  });
  subDistrict.value = response;
};
const formSubmit = ref<NewAccountGovernment>({
  business_actor_name: "",
  nik: "",
  phone: "",
  email: "",
  address: "",
  province_code: null,
  city_code: null,
  sub_district_code: null,
  village: null,
  postal_code: "",
  business_type: "",
  business_scale: null,
  venture_capital: 0,
  kbli: null,
});
const governorForm = ref<VForm>();
const buttonClicked = ref(false);
// const errorStatus = ref("")

const onSubmit = async () => {
  buttonClicked.value = true;
  governorForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) submitGovernor();
    else buttonClicked.value = false;
  });
};

const submitGovernor = async () => {
  buttonClicked.value = true;
  formSubmit.value.venture_capital = parseInt(
    formSubmit.value.venture_capital.toString()
  );
  const res = await $api("/new-account/business-actor/government", {
    method: "post",
    body: formSubmit.value,
  });
  console.log("RESPONSE : ", res);
  if (res.code != 2000) {
    useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
    buttonClicked.value = false;
    return;
  }
  // useAuth().signOut();
  authUserStore.resetUser();
  useSnackbar().sendSnackbar("Data Pelaku Usaha Berhasil Disimpan", "success");
  navigateTo("/");
  // window.location.href = "/login";
};
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
