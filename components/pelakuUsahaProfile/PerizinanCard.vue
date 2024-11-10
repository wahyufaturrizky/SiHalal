<script setup lang="ts">
const tablePerizinanHeader = [
  { title: "No", key: "no" },
  { title: "Penerbit", key: "publisher" },
  { title: "Nama Izin", key: "permission_name" },
  { title: "Nomor", key: "number" },
  { title: "Tanggal", key: "date" },
  { title: "Document", key: "document"}
]
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="5"><p>Perizinan</p></VCol>
      </VRow>
    </VCardTitle>
    <VCardText>
      <div style="max-height: 30svh; overflow-y: auto">
        <div
          style="
            overflow-x: auto;
            max-width: max-content;
            border: dotted;
            padding: 2svh;
          "
        >
          <VRow
            ><VCol cols="12"><p>No.1</p></VCol></VRow
          >
          <VRow>
            <VCol cols="12"> Penerbit: Badan Koordinasi Penanaman Modal </VCol>
          </VRow>
          <VRow>
            <VCol cols="12"> Nama Izin: NIB </VCol>
          </VRow>
        </div>
        <br />
        <div
          style="
            overflow-x: auto;
            max-width: max-content;
            border: dotted;
            padding: 2svh;
          "
        >
          <VRow
            ><VCol cols="12"><p>No.2</p></VCol></VRow
          >
          <VRow>
            <VCol cols="12"> Penerbit: Badan Koordinasi Penanaman Modal </VCol>
          </VRow>
          <VRow>
            <VCol cols="12"> Nama Izin: NIB </VCol>
          </VRow>
        </div>
      </div>
    </VCardText>
    <VCardActions>
      <VRow
        ><VCol cols="12">
<BasicDataPopup
        parent-btn-label="Lihat Data"
        :card-width="700"
      >
        <template #content>
          <VDataTable  :headers="tablePerizinanHeader"/>
        </template>
      </BasicDataPopup></VCol
        ></VRow
      >
    </VCardActions>
  </VCard>
</template>
