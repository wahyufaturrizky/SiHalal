<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { data } = props || {};
const { importer, hcb, hcn, profile } = data || {};

const dataDetail = {
  name: "Sumayah",
  contact: "081234567899",
  email: "rasarasaa@gmail.com"
};

const selectedFilters = ref({
  fasilitas: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lembaga: 'Semua',
  pendamping: 'Semua',
  kabupaten: 'Semua',
  skalaUsaha: 'Semua',
  jenisPengajuan: 'Semua',
  fac: 'Semua'
})
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VList>
          <!-- Personal Information -->
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium"> Name </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataDetail?.name }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nomor Kontak
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.contact }}</VListItemSubtitle>
          </VListItem>
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Email
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.email }}</VListItemSubtitle>
          </VListItem>
        </VList>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.v-list-item-subtitle {
  white-space: nowrap; /* Prevents breaking into multiple lines */
}

.v-list-item-title {
  min-inline-size: 300px;
}
</style>
