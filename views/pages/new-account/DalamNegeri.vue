<template>
  <VWindow v-model="domesticWindow" :touch="false" style="max-width: 90dvw">
    <VWindowItem :value="1" style="min-width: 30dvw">
      <v-form ref="nibForm" @submit.prevent="onSubmitNib">
        <v-card-text>
          <p class="text-h5 font-weight-bold">Form Profil perusahaan</p>
          <VRow>
            <VCol cols="12">
              <div
                class="text-subtitle-1 font-weight-bold text-high-emphasis mb-1"
              >
                Nomor Induk Berusaha
              </div>
              <VTextField
                v-model="nib"
                placeholder="Masukkan Nomor Induk Berusaha"
                :rules="[requiredValidator, integerValidator]"
                require
              />
            </VCol>
          </VRow>
          <VRow class="flex-row-reverse">
            <VCol cols="12" md="auto">
              <VBtn block type="submit"> Kirim </VBtn>
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
        </v-card-text>
      </v-form>
    </VWindowItem>
    <VWindowItem :value="2" style="min-width: 50dvw">
      <v-card-text>
        <p class="text-h5 font-weight-bold">Data Nomor Induk Berusaha</p>
        <VRow>
          <VCol cols="4"> Nomor Induk Bersama </VCol>
          <VCol cols="8"> : {{ nibData?.nib }} </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Nama Perusahaan </VCol>
          <VCol cols="8"> : {{ nibData?.nama_perseroan }} </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Alamat </VCol>
          <VCol cols="8">
            : {{ nibData?.alamat_perseroan }} -
            {{ nibAlamat ? getAddressString(nibAlamat) : "" }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> NPWP </VCol>
          <VCol cols="8"> : {{ nibData?.npwp_perseroan }} </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Status NIB </VCol>
          <VCol cols="8">
            :
            <span :class="`${statusNib == '' ? '' : 'text-error'}`">{{
              statusNib == "" ? "-" : statusNib
            }}</span>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Kategori Pelaku Usaha </VCol>
          <VCol cols="8">
            : {{ nibData?.flag_umk == "Y" ? "UMK" : "Non UMK" }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="4"> Modal Dasar </VCol>
          <VCol cols="8">
            : {{ IDRupiah.format(nibData?.total_modal_dasar) }}
          </VCol>
        </VRow>
        <VDivider class="my-5" />
        <p class="text-h5 font-weight-bold">Daftar Usaha/Kegiatan</p>
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
                Kirim
              </VBtn>
            </v-form>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn block variant="outlined" type="reset" @click="form2Back">
              Kembali
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
import type NIB from "@/server/interface/nib.iface";
import type { DataNib } from "@/server/interface/nib.iface";
import type { VForm } from "vuetify/components";
const nib = ref("");
const nibData = ref<DataNib>();
const nibAlamat = ref<AlamatNib>();
const buttonClicked = ref(false);
const buttonClicked2 = ref(false);
const nibForm = ref<VForm>();
const domesticForm = ref<NewAccountDomestic>();
const statusNib = ref("");

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
    if (isValid) checkNib();
    else buttonClicked.value = false;
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
  useAuth().signOut();
  useSnackbar().sendSnackbar("Data Pelaku Usaha Berhasil Disimpan", "success");
  navigateTo("/login");
};
const daftarUsaha = ref();

const checkNib = async () => {
  const res: NIB = await $api("/new-account/nib", {
    method: "post",
    body: { nib: nib.value },
  });
  if (res.data.pelaku_usaha.responinqueryNIB.kode != 400) {
    nibData.value = res.data.pelaku_usaha.responinqueryNIB.dataNIB;
    nibAlamat.value = await getAddress(nibData.value?.daerah_id_user_proses);
    daftarUsaha.value = await Promise.all(
      nibData.value.data_proyek.map(async (data) => {
        const address = await getAddress(
          data.data_lokasi_proyek[0].proyek_daerah_id
        );
        return {
          kbli: data.kbli,
          namausaha: data.uraian_usaha,
          address:
            data.data_lokasi_proyek.length != 0
              ? `${
                  data.data_lokasi_proyek[0].alamat_usaha
                } -  ${getAddressString(address)}`
              : "",
          modalUsaha: data.jumlah_investasi,
        };
      })
    );
    domesticForm.value = {
      nib: nibData.value.nib,
      date_release_nib: nibData.value.tgl_terbit_nib,
      company_name: nibData.value.nama_perseroan,
      address: getAddressString(nibAlamat.value),
      status_nib: nibData.value.status_nib,
      npwp: nibData.value.npwp_perseroan,
      business_actor_category: nibData.value.flag_umk,
      authorized_capital: nibData.value.total_modal_dasar,
      data_proyek: [
        {
          kbli: daftarUsaha.value.kbli,
          business_name: daftarUsaha.value.namausaha,
          address: daftarUsaha.value.address,
          authorized_capital: daftarUsaha.value.modalUsaha,
        },
      ],
    };
    domesticWindow.value = 2;
  } else {
    useSnackbar().sendSnackbar("NIB tidak ditemukan", "error");
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
  { title: "No", key: "index" },
  { title: "KBLI", key: "kbli" },
  { title: "Nama Usaha", key: "namausaha" },
  { title: "Alamat", key: "address" },
  { title: "Modal Usaha", key: "modalusaha" },
];
let IDRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
