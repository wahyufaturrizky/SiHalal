<script lang="ts" setup>
interface Penyelia {
  nama: string
  no_kontak: string
  no_ktp: string
  no_sertifikat: string
  no_sk: string
  tgl_sertifikat: string
  tgl_sk: string
}
const props = defineProps<{data : Penyelia[]}>();

const penyeliaTableData = ref<Penyelia[]>(props.data);
watchEffect(() => {
  penyeliaTableData.value = props.data
})


const penyeliaTableHeader = [
  { title: "No", key: "index" },
  { title: "Nama", key: "nama" },
  { title: "No. KTP", key: "no_ktp" },
  { title: "Unduh", key: "unduh" },
  { title: "No/Tgl Sertif Penyelia Halal", key: "no_sertifikat" },
  { title: "No/Tgl SK", key: "no_sk" },
  { title: "No. Kontak", key: "no_kontak" },
]
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VDataTable
          :headers="penyeliaTableHeader"
          :items="penyeliaTableData"
        >
          <template #item.index="{ index }">
            {{ index + 1 }}
          </template>
        </VDataTable>
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
