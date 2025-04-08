<script setup lang="ts">
const tableHeader = [
  { title: "No", value: "no" },
  { title: "Nama Dokumen", value: "docs_name" },
  { title: "File Dokumen", value: "file_docs" },
  { title: "Dokumen Pendukung", value: "supp_docs" },
  { title: "Action", value: "action" },
];

const items = [
  {
    docs_name: "xx",
    file_docs: "xx",
    supp_docs: "xx",
  },
];

const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Upload Dokumen Lainnya</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end"
          ><ModalUploadDocument
            :is-editable="props.isEditable"
          ></ModalUploadDocument
        ></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VAlert style="background-color: #f0e9f1">
        <VRow>
          <VCol cols="1">
            <VIcon color="primary" icon="fa-exclamation-circle"></VIcon>
          </VCol>
          <VCol cols="11">
            <ol type="1">
              <li>
                Dokumen yang diupload hanya untuk sekala usaha menengah dan
                besar
              </li>
              <li>Format dokumen berupa PDF</li>
            </ol>
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
          #item.file_docs
          style="display: flex; align-items: center; align-content: center"
        >
          <p>
            <VIcon color="primary" icon="mdi-file-download"></VIcon>
            File
          </p>
        </template>
        <template
          #item.supp_docs
          style="display: flex; align-items: center; align-content: center"
        >
          <p>
            <VIcon color="primary" icon="mdi-file-download"></VIcon>
            File
          </p>
        </template>
        <template #item.action>
          <div class="text-center">
            <ModalHapusProduk
              :is-editable="props.isEditable"
            ></ModalHapusProduk>
          </div>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
