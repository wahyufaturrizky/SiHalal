<script setup lang="ts">

import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"


import { useDisplay } from "vuetify"

const dialog = ref(true);

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};


const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 1100 : '90%'
})

const items = ref([
  { title: "Tanggal 2 Februari 2024", subtitle: `
    Sehubungan dengan kewajiban menggunakan dokumen SJPH bagi Pelaku Usaja, terhitung mulai
    tanggal 2 Februari 2024, seluruh Pelaku Usaha wajib melampirkan dokumen SJPH pada
    pendaftaran Sertifikat Halal jalur Mandiri.
  ` },
  { title: "Tanggal 3 Februari", subtitle: `
    Terhitung mulai tanggal 3 Februari 2023 pendaftaran Sertifikat Halal jalur Self Declare telah bisa
    dilakukan submit oleh PU dengan catatan telah dilakukan kurasi/verifikasi oleh Pendamping.
  ` },
  { title: "Tanggal 2 Februari 2023", subtitle: `
    Sehubungan dengan kewajiban bersertifikat Penyelia Halal Untuk Pelaku Usaha Non UMK
    terhitung mulai tanggal 2 Februari 2023, seluruh pelaku Usaha Non UMK Wajib melampirkan
    Sertifikat Pelatihan Penyelia Halal dan Sertifikat Kompetensi Penyelia Halal pada pendaftaran
    Sertifikar Halal jalur Mandiri
  ` },
]);

const signed = ref({
  date: 'Jakarta, 2 Februari 2023',
  head: 'Muhammad Aqil Irham'
})

const clickDownload = () => {
  console.log("DONWLOAD FILE ")
}

</script>


<template>
  <VDialog v-model="dialog" :max-width="dialogMaxWidth">
    <VCard class="pa-8">
      <VBtn
        icon
        @click="closeDialog"
        class="ml-auto close-btn"
        style="position: absolute; top: 16px; right: 16px; z-index: 10;"
      >
        <VIcon>mdi-close</VIcon>
      </VBtn>

      <VCardTitle>
        <div class="auth-logo app-logo d-flex justify-center align-center">
          <VNodeRenderer :nodes="themeConfig.app.logo" />
        </div>
      </VCardTitle>

      <VCardText align="center">
        <span class="text-h3">Pengumuman</span>
      </VCardText>

      <VCardText class="px-8 mb-4">
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <div>
              <span class="font-weight-bold">{{ item.title }}</span>
            </div>
            <div>
              <p>{{ item.subtitle }}</p>
            </div>
          </li>
          <li>
            Informasi detail teknis tambahan pengajuan sertifikasi halal self declare dapat
            <span
              class="text-primary"
              style="cursor: pointer; text-decoration: underline;"
              @click="clickDownload"
            >
              download di sini
            </span>
          </li>
        </ul>
      </VCardText>
      <VCardText class="text-right">
        <p class="font-weight-bold">
          {{signed.date}} <br>
          Kepala, <br>
          ttd <br>
          {{signed.head}}
        </p>
      </VCardText>
    </VCard>
  </VDialog>
</template>
