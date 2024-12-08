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

const emit = defineEmits<{
  (event: "formvalue", value: any): void;
}>();

const { itemsstatus, datsof } = props;

const form = ref({
  no_daftar: null,
  nama_pu: null,
  merek_dagang: null,
  statusPermohonan: null,
  kode_fac: null,
  jenis: null,
  status: null,
});

const typePengajuanOptions = ["Reguler", "Self Declare"];
const layarExcelOptions = ["1excel", "2layar"];

const viewResults = () => {
  console.log(form.value);
  emit("formvalue", form.value);
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <div class="d-flex mb-3 mt-3 justify-space-between align-center">
        <span class="text-h4 font-weight-bold">Filter</span>
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
        <VCol cols="12" sm="4">
          <VTextField v-model="form.merek_dagang" label="Merek Dagang" />
        </VCol>
        <VCol cols="12" sm="4">
          <VSelect
            v-model="form.statusPermohonan"
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
          <VSelect
            v-model="form.status"
            placeholder="Pilih Layer/ Excel"
            :items="layarExcelOptions"
          />
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
