<script lang="ts" setup>
interface Outlet {
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

const outletTableHeader = [
  { title: "No", key: "id" },
  { title: "Nama Outlet", key: "nama" },
  { title: "Alamat", key: "alamat" },
  { title: "Status", key: "status_milik" },
];

const props = defineProps<{ data: Outlet[] }>();

const outletTableData = ref<Outlet[]>(props.data);
watchEffect(() => {
  outletTableData.value = props.data;
});
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VDataTable
          disable-sort
          :headers="outletTableHeader"
          :items="outletTableData"
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
