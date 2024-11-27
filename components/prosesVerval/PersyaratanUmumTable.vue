<script setup lang="ts">
import type RequirementDataInterface from "./verval-interface";

const content: Array<RequirementDataInterface> = [
  {
    id: "1",
    uraian: "Pernyataan Pelaku Usaha",
    bukti: "Dokumen akad / ikrar",
    verval: "Memeriksa kesesuaian dan kelengkapan dokumen akad/ikrar",
  },
  {
    id: "1",
    uraian: "Merk atau Nama Produk",
    bukti: "Foto Produk",
    verval:
      "Memeriksa kesesuaian merek/nama, symbol, bentuk, dan kemasan produk dengan ketentuan SJPH",
  },
  {
    id: "1",
    uraian: "Daftar Bahan",
    bukti: "Dokumen : daftar bahan, Sertifikat Halal",
    verval:
      "Memeriksa kesesuaian daftar bahan dengan dokumen dan sertifikat halal yang diinput",
  },
  {
    id: "1",
    uraian: "Proses Produk Halal",
    bukti: "Skema PPH dalam bentuk narasi PPH secara singkat dan jelas",
    verval: "Memeriksa kesesuaian skema PPH dengan narasi yang diinput",
  },
  {
    id: "1",
    uraian: "Manual SPJH",
    bukti: "Pelaku UMK memiliki manual SJPH",
    verval:
      "Memeriksa manual SJPH sesuai dengan format atau template manual SJPH Selfdeclare",
  },
];

const selected = ref([]);
</script>
<template>
  <VCard>
    <VCardTitle><h3>Persyaratan Umum</h3></VCardTitle>
    <VCardItem>
      <VTable
        density="comfortable"
        style="
          border-collapse: collapse;
          border: 1px solid #eae9eb;
          border-radius: 10px;
        "
      >
        <thead style="background-color: #f6f6f6">
          <th style="padding: 1.5svw" class="text-left">No</th>
          <th class="text-left">Uraian</th>
          <th class="text-left">Bukti</th>
          <th class="text-left">Verval</th>
          <th class="text-left">Sesuai / Tidak Sesuai</th>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in content" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.uraian }}</td>
            <td>{{ item.bukti }}</td>
            <td>{{ item.verval }}</td>
            <td class="text-center">
              <VCheckbox :key="idx" :model-value="selected"></VCheckbox>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardItem>

    <VCardActions style="display: flex; justify-content: end">
      <VBtn variant="flat">Simpan Pengecekan Persyaratan</VBtn>
    </VCardActions>
  </VCard>
</template>
