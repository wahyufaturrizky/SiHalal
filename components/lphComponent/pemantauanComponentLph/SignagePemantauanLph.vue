<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Tanda Tangan Penanggung Jawab", value: "signage_responsible" },
  { title: "Nama Penyelia Halal", value: "penyelia_name" },
  { title: "Tanda Tangan Penyelia Halal", value: "signage_penyelia" },
  { title: "Action", value: "action" },
];

const items = [
  {
    signage_responsible: "",
    penyelia_name: "",
    signage_penyelia: "",
  },
];
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Tanda Tangan</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end"
          ><ModalTambahTtd></ModalTambahTtd
        ></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VAlert style="background-color: #f0e9f1" density="compact">
        <VRow style="display: flex; align-items: center">
          <VCol cols="1">
            <VIcon color="primary" icon="fa-exclamation-circle"></VIcon>
          </VCol>
          <VCol cols="11" style="display: flex; align-items: center">
            <p>Format file tanda tangan berupa foto (jpeg,jpg,png)</p>
          </VCol>
        </VRow>
      </VAlert>
      <br />
      <VDataTable
        :items-per-page-options="[10, 25, 50, 100]"
        :headers="tableHeader"
        :items="items"
      >
        <template
          #item.signage_responsible
          style="display: flex; align-items: center; align-content: center"
        >
          <p>
            <VIcon color="primary" icon="mdi-file-download"></VIcon>
            File
          </p>
        </template>
        <template
          #item.signage_penyelia
          style="display: flex; align-items: center; align-content: center"
        >
          <p>
            <VIcon color="primary" icon="mdi-file-download"></VIcon>
            File
          </p>
        </template>
        <template #item.action>
          <div class="text-center">
            <ModalHapusProduk></ModalHapusProduk>
          </div>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
