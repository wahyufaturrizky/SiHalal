<script setup lang="ts">
const headers = [
  { title: "No", key: "no" },
  { title: "Nama", key: "penyelia_nama", nowrap: true },
  { title: "No. KTP", key: "no_ktp", nowrap: true },
  { title: "Unduh SKPH", value: "file_skph", sortable: false, nowrap: true },
  { title: "Unduh SPPH", value: "file_spph", sortable: false, nowrap: true },
  { title: "Unduh KTP", value: "file_ktp", sortable: false, nowrap: true },
  {
    title: "No Sertif Penyelia Halal",
    key: "no_penyelia_halal",
    nowrap: true,
  },
  {
    title: "Tanggal Sertif Penyelia Halal",
    key: "tgl_penyelia_halal",
    nowrap: true,
  },
  { title: "Nomor SK", key: "no_sk", nowrap: true },
  { title: "Tanggal SK", key: "tgl_sk", nowrap: true },
  { title: "No. Kontak", key: "no_kontak", nowrap: true },
];
const store = useMyVerifikatorRegulerStore();
const { penyelia_halal } = storeToRefs(store);
const donwloadSkph = (item) => {
  downloadDocument(item);
};

const donwloadSpph = (item) => {
  downloadDocument(item);
};

const donwloadKtp = (item) => {
  downloadDocument(item, "FILES");
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Penyelia Halal</span>
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="headers" :items="penyelia_halal">
        <template #item.file_skph="{ item }">
          <v-btn
            :disabled="item.file_skph == ''"
            color="primary"
            variant="plain"
            @click="donwloadSkph(item.file_skph)"
          >
            <VIcon>mdi-download</VIcon>
          </v-btn>
        </template>
        <template #item.file_spph="{ item }">
          <v-btn
            :disabled="item.file_spph == ''"
            color="primary"
            variant="plain"
            @click="donwloadSpph(item.file_spph)"
          >
            <VIcon>mdi-download</VIcon>
          </v-btn>
        </template>
        <template #item.file_ktp="{ item }">
          <v-btn
            :disabled="item.file_ktp == ''"
            color="primary"
            variant="plain"
            @click="donwloadKtp(item.file_ktp)"
          >
            <VIcon>mdi-download</VIcon>
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
