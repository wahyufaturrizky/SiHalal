<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  itemsstatus: {
    type: Array,
  },
  datsof: {
    type: Array,
  },
});

const loadingDownloadExcel = ref(false);

const emit = defineEmits<{
  (event: "formvalue", value: any): void;
}>();

const { itemsstatus, datsof } = props;

const form = ref({
  no_daftar: null,
  nama_pu: null,
  merek_dagang: null,
  kode_fac: null,
  jenis: null,
  status: null,
});

const downloadExcel = async () => {
  loadingDownloadExcel.value = true;

  try {
    const { no_daftar, merek_dagang, kode_fac, status } = form.value;

    const response: any = await $api("/inquiry/download", {
      method: "get",
      params: {
        no_daftar,
        merek_dagang,
        kode_fac,
        status,
      },
    });

    if (response) {
      downloadFileExcel(response);
      loadingDownloadExcel.value = false;
    } else {
      loadingDownloadExcel.value = false;
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDownloadExcel.value = false;
  }
};

const typePengajuanOptions = ["Reguler", "Self Declare"];

const viewResults = () => {
  emit("formvalue", form.value);
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <div class="d-flex mb-3 mt-3 justify-space-between align-center">
        <div class="text-h4 font-weight-bold">Filter</div>
        <VBtn color="primary" @click="viewResults"> Cari </VBtn>
      </div>
    </VCardTitle>
    <VCardText>
      <VRow>
        <VCol cols="12" sm="4">
          <VTextField v-model="form.no_daftar" label="Nomor Pendaftaran" />
        </VCol>
        <VCol cols="12" sm="4">
          <VTextField v-model="form.nama_pu" label="Nama Pelaku Usaha" />
        </VCol>
        <!-- <VCol cols="12" sm="4">
          <VTextField v-model="form.merek_dagang" label="Merek Dagang" />
        </VCol> -->
        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.status"
            placeholder="Pilih Status Permohonanan"
            :items="itemsstatus"
            item-title="name"
            item-value="code"
          />
        </VCol>
        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.jenis"
            placeholder="Pilih Tipe pengajuan"
            :items="typePengajuanOptions"
          />
        </VCol>

        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.kode_fac"
            placeholder="Pilih sumber pembiayaan"
            :items="datsof"
            item-title="name"
            item-value="code"
          />
        </VCol>

        <VCol cols="12" sm="4">
          <VBtn
            :loading="loadingDownloadExcel"
            @click="downloadExcel"
            variant="flat"
            >Download Excel</VBtn
          >
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.v-card-title {
  color: #3f51b5;
}
</style>
