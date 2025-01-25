<template>
  <VWindow
    v-model="domesticWindow"
    :touch="false"
    style="max-inline-size: 90dvw"
  >
    <VWindowItem :value="1" style="min-inline-size: 30dvw">
      <v-form ref="nibForm" @submit.prevent="onSubmitNib">
        <v-card-text>
          <p class="text-h5 font-weight-bold">
            {{ t("new-domestic-nib.title") }}
          </p>
          <VRow>
            <VCol cols="12">
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              ></div>
              <VTextField
                v-model="nib"
                :placeholder="t('new-domestic-nib.attr-1')"
                :rules="[requiredValidator, integerValidator]"
                :error="!!nibError"
                :error-messages="nibError"
                require
              />
            </VCol>
          </VRow>
          <VRow class="flex-row-reverse">
            <VCol cols="12" md="auto">
              <VBtn block type="submit" :disabled="buttonClicked">
                {{ t("new-domestic-nib.btn-2") }}
              </VBtn>
            </VCol>
            <VCol cols="12" md="auto">
              <VBtn
                block
                variant="outlined"
                type="reset"
                @click="stepStore.goToStep(1)"
              >
                {{ t("new-domestic-nib.btn-1") }}
              </VBtn>
            </VCol>
          </VRow>
        </v-card-text>
      </v-form>
    </VWindowItem>
    <VWindowItem :value="2" style="min-inline-size: 50dvw">
      <v-card-text>
        <p class="text-h5 font-weight-bold">
          {{ t("new-domestic-nib-data.title") }}
        </p>
        <VRow>
          <VCol cols="4"> {{ t("new-domestic-nib-data.attr-1") }} </VCol>
          <VCol cols="8"> : {{ domesticForm?.nib }} </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("new-domestic-nib-data.attr-2") }} </VCol>
          <VCol cols="8"> : {{ domesticForm?.company_name }} </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("new-domestic-nib-data.attr-3") }} </VCol>
          <VCol cols="8">
            {{ domesticForm?.address }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("new-domestic-nib-data.attr-4") }} </VCol>
          <VCol cols="8"> : {{ domesticForm?.npwp }} </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("new-domestic-nib-data.attr-5") }} </VCol>
          <VCol cols="8">
            :
            <span :class="`${registeredNib?.status ? 'text-error' : ''}`">{{
              registeredNib?.status ? registeredNib.message : "-"
            }}</span>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("new-domestic-nib-data.attr-6") }} </VCol>
          <VCol cols="8">
            : {{ nibData?.pelaku_usaha.flag_umk == "Y" ? "UMK" : "Non UMK" }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> {{ t("new-domestic-nib-data.attr-7") }} </VCol>
          <VCol cols="8">
            : {{ IDRupiah.format(domesticForm?.authorized_capital) }}
          </VCol>
        </VRow>
        <VDivider class="my-5" />
        <p class="text-h5 font-weight-bold">
          {{ t("new-domestic-nib-data.subtitle") }}
        </p>
        <VRow>
          <VDataTable
            :headers="headers"
            :items="daftarUsaha"
            :items-per-page="5"
          >
            <template #item.index="{ index }">
              <span class="text-h6">{{ index + 1 }}</span>
            </template>
            <template #item.kbli="{ item }">
              <span class="text-h6">{{ item.kbli }}</span>
            </template>
            <template #item.namausaha="{ item }">
              <span class="text-h6">{{ item.namausaha }}</span>
            </template>
            <template #item.alamat="{ item }">
              <span class="text-h6">{{ item.alamat }}</span>
            </template>
            <template #item.modalusaha="{ item }">
              <span class="text-h6">{{
                IDRupiah.format(item.modalUsaha)
              }}</span>
            </template>
          </VDataTable>
        </VRow>
        <VRow class="flex-row-reverse">
          <VCol cols="12" md="auto">
            <v-form @submit.prevent="submitDalamNegeri">
              <VBtn block type="submit" :disabled="buttonClicked2">
                {{ t("new-domestic-nib-data.btn-2") }}
              </VBtn>
            </v-form>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn block variant="outlined" type="reset" @click="form2Back">
              {{ t("new-domestic-nib-data.btn-1") }}
            </VBtn>
          </VCol>
        </VRow>
      </v-card-text>
    </VWindowItem>
  </VWindow>
</template>

<script lang="ts" setup>
import { requiredValidator } from "#imports";
import type {
  AlamatNib,
  NewAccountDomestic,
} from "@/server/interface/new-account.iface";
import {
  type NIB,
  type NIBData,
  type RegisteredNib,
} from "@/server/interface/nib.iface";
import { useI18n } from "vue-i18n";
import type { VForm } from "vuetify/components";
const { t } = useI18n();

const nib = ref("");
const nibData = ref<NIBData>();
const nibAlamat = ref<AlamatNib>();
const registeredNib = ref<RegisteredNib>();
const buttonClicked = ref(false);
const buttonClicked2 = ref(false);
const nibForm = ref<VForm>();
const domesticForm = ref<NewAccountDomestic>();
const statusNib = ref("");

const nibError = ref("");

const authUserStore = useMyAuthUserStore();

const resetForm2 = () => {
  nibData.value = undefined;
  nibAlamat.value = undefined;
  statusNib.value = "";
  buttonClicked2.value = false;
  nibForm.value = undefined;
  nib.value = "";
};
const form2Back = () => {
  domesticWindow.value = 1;
  buttonClicked.value = false;
  resetForm2();
};
const onSubmitNib = async () => {
  // sendSnackbar("error bang", "success");
  buttonClicked.value = true;
  nibForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      checkNib();
    } else {
      buttonClicked.value = false;
    }
  });
};
const submitDalamNegeri = async () => {
  buttonClicked2.value = true;
  const res = await $api("/new-account/business-actor/domestic", {
    method: "post",
    body: domesticForm.value,
  });
  if (res.code == 4001) {
    statusNib.value = res.errors.list_error.join(", ");
    return;
  }
  // useAuth().signOut();
  authUserStore.resetUser();
  useSnackbar().sendSnackbar("Data Pelaku Usaha Berhasil Disimpan", "success");
  navigateTo("/");
};
const daftarUsaha = ref();

const checkNib = async () => {
  nibError.value = "";

  const res: NIB = await $api("/new-account/nib", {
    method: "post",
    body: { nib: nib.value },
  });
  if (res.code != 4000) {
    nibData.value = res.data;
    nibAlamat.value = await getAddress(
      nibData.value.pelaku_usaha.daerah_id_user_proses
    );
    daftarUsaha.value = nibData.value.pelaku_usaha.DataProyek.map((data) => {
      return {
        kbli: data.kbli,
        namausaha: data.business_name,
        address: data.address,
        modalUsaha: data.investment_amount,
      };
    });
    domesticForm.value = {
      nib: nibData.value.pelaku_usaha.nib,
      date_release_nib: nibData.value.pelaku_usaha.date_release_nib,
      company_name: nibData.value.pelaku_usaha.company_name,
      address: `${nibData.value.pelaku_usaha.address} - ${getAddressString(
        nibAlamat.value
      )}`,
      status_nib: nibData.value.pelaku_usaha.status_nib,
      npwp: nibData.value.pelaku_usaha.npwp,
      business_actor_category:
        nibData.value.pelaku_usaha.business_actor_category,
      authorized_capital: nibData.value.pelaku_usaha.authorized_capital,
      data_proyek: daftarUsaha.value,
    };
    registeredNib.value = res.registered_nib;
    if (registeredNib.value.status) {
      buttonClicked2.value = true;
    }
    buttonClicked.value = false;

    domesticWindow.value = 2;
  } else {
    nibError.value = `${t("new-domestic-nib-data.msg-error")}`;
    // useSnackbar().sendSnackbar("NIB tidak ditemukan", "error");
  }
  buttonClicked.value = false;
};
const getAddress = async (daerahId: string) => {
  const res: AlamatNib = await $api("/new-account/address-nib", {
    method: "post",
    body: {
      daerahId,
    },
  });
  return res;
};
const getAddressString = (alamatNib: AlamatNib) => {
  return `${alamatNib.kecamatan} ${alamatNib.kabupaten} ${alamatNib.provinsi}`;
};

const stepStore = useMyNewAccountStepStore();
const domesticWindow = ref(1);
const headers = [
  { title: `${t("new-domestic-nib-data.th-1")}`, key: "index" },
  { title: `${t("new-domestic-nib-data.th-2")}`, key: "kbli" },
  { title: `${t("new-domestic-nib-data.th-3")}`, key: "namausaha" },
  { title: `${t("new-domestic-nib-data.th-4")}`, key: "address" },
  { title: `${t("new-domestic-nib-data.th-5")}`, key: "modalusaha" },
];
let IDRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
