<script setup lang="ts">
import { modalTypeEnum } from "@/components/prosesVerval/verval-enum";
</script>

<template>
  <VRow
    ><VCol><KembaliButton></KembaliButton></VCol
  ></VRow>
  <VRow
    ><VCol><h2>Detail Proses Verval</h2></VCol></VRow
  >
  <VRow>
    <VCol cols="7">
      <VBtn style="margin-right: 1svw" color="warning" variant="outlined"
        >Formulir Rekomendasi</VBtn
      >
      <VBtn append-icon="fa-download" variant="outlined"
        >Download Rekomendasi</VBtn
      >
    </VCol>
    <VCol cols="5" style="display: flex; justify-content: end">
      <ModalPengembalianDanKirim
        :modal-type="modalTypeEnum.KEMBALI"
      ></ModalPengembalianDanKirim>
      <ModalPengembalianDanKirim
        :modal-type="modalTypeEnum.KIRIM"
      ></ModalPengembalianDanKirim>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VRow
        ><VCol cols="12"><DataPelakuUsahaVerval></DataPelakuUsahaVerval></VCol
      ></VRow>
      <VRow
        ><VCol cols="12"><PenanggungJawabVerval></PenanggungJawabVerval></VCol
      ></VRow>
    </VCol>
    <VCol cols="4">
      <RightPanelVervalDetail></RightPanelVervalDetail>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <PersyaratanUmumTable></PersyaratanUmumTable>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <PersyaratanKhususTable></PersyaratanKhususTable>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <BahanTablePendamping></BahanTablePendamping>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ProsesProdukHalalPendamping></ProsesProdukHalalPendamping>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ProdukHalalPendamping></ProdukHalalPendamping>
    </VCol>
  </VRow>
</template>
