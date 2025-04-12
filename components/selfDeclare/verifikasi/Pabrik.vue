<script lang="ts" setup>
interface Pabrik {
  id_pabrik: string;
  id_reg: string;
  id_fas: string;
  fasil_id: string;
  nama: string;
  kab_kota: string;
  provinsi: string;
  negara: string;
  kode_pos: string;
  alamat: string;
  status_milik: string;
}
const pabrikTableHeader = [
  { title: "No", key: "id" },
  { title: "Nama Pabrik", key: "nama" },
  { title: "Alamat", key: "alamat" },
  { title: "Status", key: "status_milik" },
];
const props = defineProps<{ data: Pabrik[] }>();

const pabrikTableData = ref<Parbik[]>(props.data);
watchEffect(() => {
  pabrikTableData.value = props.data;
});
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VDataTable
          disable-sort
          :headers="pabrikTableHeader"
          :items="pabrikTableData"
        >
          <template #item.id="{ index }">
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
