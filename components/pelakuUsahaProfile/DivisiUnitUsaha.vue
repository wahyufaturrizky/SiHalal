<script setup lang="ts">

const tableBussinessUnitHeader = [
  { title: "No", key: "no" },
  { title: "Divisi / Unit Usaha", key: "bussiness_unit" },
  { title: "Alamat", key: "address" },
  { title: "Username", key: "username" }
]

</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="5"><p>Divisi / Unit Usaha</p></VCol>
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
            <VCol cols="12"> Divisi / Unit Usaha: 10761 </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              Alamat: Sumbawa Banget, RT002/RW002, Sumbang, Curio
            </VCol>
          </VRow>
        </div>
      </div>
    </VCardText>
    <VCardActions>
      <VRow
        ><VCol cols="12"
          >
        <BasicDataPopup parent-btn-label="Lihat Data"
        >
          <template #content>
            <VDataTable :headers="tableBussinessUnitHeader"/>
          </template>
        </BasicDataPopup>
        </VCol
        ></VRow
      >
    </VCardActions>
  </VCard>
</template>
