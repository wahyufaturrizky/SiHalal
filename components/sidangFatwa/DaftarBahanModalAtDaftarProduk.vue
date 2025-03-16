<template>
  <VDialog>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        text="Lihat Bahan"
        variant="tonal"
        @click="loadData"
      ></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <VCard
        style="
          height: fit-content;
          max-width: 80svw;
          display: flex;
          justify-content: center;
          padding: 1.5svw;
        "
      >
        <VCardTitle>
          <VRow>
            <VCol cols="10">
              <div class="text-h3 font-weight-bold">Daftar Bahan</div>
            </VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                size="small"
                @click="isActive.value = false"
                icon="fa-times"
              ></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VDataTable
            height="45svh"
            :headers="headers"
            :items="processedDataProduk"
          >
            <template #item.no="{ item }">
              {{ item.no }}
            </template>
            <template #item.nama_bahan="{ item }">
              {{ item.nama_bahan }}
            </template>
          </VDataTable>
        </VCardItem>
      </VCard>
    </template>
  </VDialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  databahan: {
    type: Array,
    required: true,
  },
});

let processedDataProduk = reactive([]);
const loadData = () => {
  processedDataProduk = [];
  props.databahan?.forEach((val, idx) => {
    const tmp = {
      no: idx + 1,
      nama_bahan: val,
    };

    processedDataProduk.push(tmp);
  });
};

const headers = [
  { title: "No", value: "no" },
  { value: "nama_bahan", title: "Nama Bahan" },
];
</script>

<style></style>
