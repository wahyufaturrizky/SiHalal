<script lang="ts" setup>
interface PenanggungJawab {
  email_pj: string;
  nama_pj: string;
  no_kontak_pj: string;
}
const props = defineProps<{data : PenanggungJawab}>();
const dataPenanggung = ref(props.data)
watchEffect(() => {
      dataPenanggung.value = props.data
    });
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
              : {{ dataPenanggung.nama_pj }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nomor Kontak
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataPenanggung.no_kontak_pj }}</VListItemSubtitle>
          </VListItem>
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Email
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataPenanggung.email_pj }}</VListItemSubtitle>
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
