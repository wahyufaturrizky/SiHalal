<script setup lang="ts">
const tableKBLIHeader = [
  { title: "No", key: "no" },
  { title: "No. KBLI", key: "kbli_number" },
  { title: "Nama KBLI", key: "kbli_name" },
  { title: "Nama Usaha", key: "business_name" },
  { title: "Alamat", key: "address" },
  { title: "Modal Usaha", key: "business_capital"}
]
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="5"><p>KBLI</p></VCol>
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
            <VCol cols="12"> No.KBLI: 10761 </VCol>
          </VRow>
          <VRow>
            <VCol cols="12"> Nama KBLI: Industri Pengolahan Kopi </VCol>
          </VRow>
          <VRow>
            <VCol cols="12"> Nama Usaha : Industri Pengolahan Kopi </VCol>
          </VRow>
        </div>
      </div>
    </VCardText>
    <VCardActions>
      <VRow
        ><VCol cols="12">
        <BasicDataPopup parent-btn-label="Lihat Data">
          <template #content>
            <VDataTable :headers="tableKBLIHeader"/>
          </template>
        </BasicDataPopup>
      </VCol
        ></VRow
      >
    </VCardActions>
  </VCard>
</template>
