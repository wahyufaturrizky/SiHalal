<script setup lang="ts">
import RegistrasiFasilitatorTable from "@/components/fasilitator/registrasi-fasilitator-table.vue";
import type { FacilitatorProfile } from "@/server/api/facilitate/profile/index.post";
import type {
  MasterDistrict,
  MasterSubDistrict,
} from "@/server/interface/master.iface";
import type { VForm } from "vuetify/components/VForm";
const closeDefault = 0;
interface FasilitatorProfileData {
  id_fac_header: string;
  nama: string;
  alamat: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kode_pos: string;
  kontak_person: string;
  no_hp: string;
  email: string;
  tgl_daftar: string;
  jenis_fasilitator: string;
}
const getDistrict = async (kode: string) => {
  formProfile.value.kota_code = null;
  formProfile.value.kecamatan_code = null;
  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: kode,
    },
  });
  district.value = response;
};
const getSubDistrict = async (kode: string) => {
  formProfile.value.kecamatan_code = null;
  const response: MasterSubDistrict[] = await $api("/master/subdistrict", {
    method: "post",
    body: {
      district: kode,
    },
  });
  subDistrict.value = response;
};
const fasilitator = ref<FasilitatorProfileData>();
const formProfile = ref<FacilitatorProfile>({
  nama: "",
  alamat: "",
  jenis_fasilitator: null,
  provinsi_code: null,
  kota_code: null,
  kecamatan_code: null,
  kode_pos: "",
  email: "",
  kontak_person: "",
  no_hp: "",
});

const getProfile = async () => {
  try {
    const response = await $api("/facilitate/profile", {
      method: "get",
    });
    console.log(response.data);
    if (response.code != 4000) {
      fasilitator.value = response.data.fasilitator;
      await getDistrict(fasilitator.value?.provinsi);
      await getSubDistrict(fasilitator.value?.kabupaten);
      formProfile.value = {
        nama: fasilitator.value?.nama != "" ? fasilitator.value?.nama : "",
        alamat:
          fasilitator.value?.alamat != "" ? fasilitator.value?.alamat : "",
        jenis_fasilitator:
          fasilitator.value?.jenis_fasilitator != ""
            ? fasilitator.value?.jenis_fasilitator
            : null,
        provinsi_code:
          fasilitator.value?.provinsi != ""
            ? fasilitator.value?.provinsi
            : null,
        kota_code:
          fasilitator.value?.kabupaten != ""
            ? fasilitator.value?.kabupaten
            : null,
        kecamatan_code:
          fasilitator.value?.kecamatan != ""
            ? fasilitator.value?.kecamatan
            : null,
        kode_pos:
          fasilitator.value?.kode_pos != "" ? fasilitator.value?.kode_pos : "",
        email: fasilitator.value?.email != "" ? fasilitator.value?.email : "",
        kontak_person:
          fasilitator.value?.kontak_person != ""
            ? fasilitator.value?.kontak_person
            : "",
        no_hp: fasilitator.value?.no_hp != "" ? fasilitator.value?.no_hp : "",
      };

      return;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const refProfileForm = ref<VForm>();
const province = ref();
const district = ref();
const subDistrict = ref();
const getProvince = async () => {
  const response = await $api("/master/province", {
    method: "get",
  });
  province.value = response;
};
const buttonClicked = ref(false);
const onSubmit = async () => {
  buttonClicked.value = true;
  refProfileForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) submitProfile();
    else buttonClicked.value = false;
  });
};
const submitProfile = async () => {
  buttonClicked.value = true;
  try {
    const res = await $api("/facilitate/profile", {
      method: "post",
      body: formProfile.value,
    });
    console.log("RESPONSE : ", res);
    if (res.code != 2000) {
      useSnackbar().sendSnackbar("Ada kesalahan!", "error");
      buttonClicked.value = false;
      return;
    }
    buttonClicked.value = false;
    await getProfile();
    useSnackbar().sendSnackbar(
      "Data Pelaku Usaha Berhasil Disimpan",
      "success"
    );
  } catch (error) {
    buttonClicked.value = false;
    useSnackbar().sendSnackbar("Ada kesalahan!", "error");
  }
  // window.location.href = "/login";
};
onMounted(async () => {
  await Promise.allSettled([getProfile(), getProvince()]);
});
</script>

<template>
  <VRow>
    <VCol :cols="6"><h2>Profile Pendaftar</h2></VCol>
    <VCol :cols="6" style="display: flex; justify-content: flex-end"
      ><VBtn @click="onSubmit" :disabled="buttonClicked"
        >Simpan Perubahan</VBtn
      ></VCol
    >
  </VRow>
  <VRow>
    <VCol class="v-col-12">
      <ExpandCard title="Data Profile" class="mb-6 pb-6">
        <VRow>
          <VCol class="v-col-12">
            <VForm ref="refProfileForm">
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Nama Fasilitator"></VLabel>
                    <VTextField
                      v-model="formProfile.nama"
                      placeholder="Masukkan Nama Fasilitator"
                      :rules="[requiredValidator]"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Alamat"></VLabel>
                    <VTextField
                      v-model="formProfile.alamat"
                      :rules="[requiredValidator]"
                      placeholder="Masukkan Alamat"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Jenis Fasilitator"></VLabel>
                    <VSelect
                      v-model="formProfile.jenis_fasilitator"
                      :rules="[requiredValidator]"
                      placeholder="Pilih Jenis Fasilitator"
                      :items="['Nasional', 'Provinsi', 'Kabupaten / Kota']"
                    />
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Provinsi"></VLabel>
                    <VSelect
                      :rules="[requiredValidator]"
                      require
                      v-on:update:model-value="getDistrict"
                      placeholder="Pilih Provinsi"
                      v-model="formProfile.provinsi_code"
                      :items="province"
                      item-value="code"
                      item-title="name"
                    />
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Kabupaten/Kota"></VLabel>
                    <VSelect
                      :items="district"
                      item-value="code"
                      item-title="name"
                      v-model="formProfile.kota_code"
                      :rules="[requiredValidator]"
                      v-on:update:model-value="getSubDistrict"
                      require
                      placeholder="Pilih Kabupaten/Kota"
                    />
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Kecamatan"></VLabel>
                    <VSelect
                      v-model="formProfile.kecamatan_code"
                      :items="subDistrict"
                      item-value="code"
                      item-title="name"
                      :rules="[requiredValidator]"
                      require
                      placeholder="Pilih Kecamatan"
                    />
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Kodepos"></VLabel>
                    <VTextField
                      v-model="formProfile.kode_pos"
                      :rules="[requiredValidator, integerValidator]"
                      @input="onlyAcceptNumber"
                      placeholder="Masukkan Kode Pos"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Email"></VLabel>
                    <VTextField
                      v-model="formProfile.email"
                      :rules="[requiredValidator, emailValidator]"
                      placeholder="Masukkan Email"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VDivider></VDivider>
                </VCol>
              </VRow>
              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Nama Penanggung Jawab"></VLabel>
                    <VTextField
                      v-model="formProfile.kontak_person"
                      :rules="[requiredValidator]"
                      placeholder="Masukkan Nama Penanggung Jawab"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>

              <VRow>
                <VCol :cols="12">
                  <VItemGroup>
                    <VLabel text="Nomor Kontak PIC Dinas"></VLabel>
                    <VTextField
                      v-model="formProfile.no_hp"
                      :rules="[requiredValidator, phoneNumberIdValidator]"
                      placeholder="Masukkan Kontak PIC Dinas"
                      density="compact"
                    ></VTextField>
                  </VItemGroup>
                </VCol>
              </VRow>
            </VForm>
          </VCol>
        </VRow>
        <!-- <ProfileFasilitatorForm/> -->
      </ExpandCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol class="v-col-12">
      <VExpansionPanels v-model="closeDefault">
        <VExpansionPanel>
          <VExpansionPanelTitle><h3>Data Registrasi</h3></VExpansionPanelTitle>
          <VExpansionPanelText>
            <RegistrasiFasilitatorTable></RegistrasiFasilitatorTable>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
</template>
