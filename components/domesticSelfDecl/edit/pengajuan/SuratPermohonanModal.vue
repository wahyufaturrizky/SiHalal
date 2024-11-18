<script setup lang="ts">
const dataPermohonan = [
  { id: 1, key: "Nama (sesuai KTP)", value: "Samsul" },
  {
    id: 2,
    key: "Alamat (sesuai KTP)",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
  { id: 3, key: "Jabatan", value: "Penanggung Jawab Usaha" },
  { id: 4, key: "Nomor Kontak", value: "0812113900779" },
  { id: 5, key: "Nama Perusahaan", value: "Samsul" },
  {
    id: 6,
    key: "Alamat Perusahaan",
    value: "Sumbang, RT/RW -, Sumbang, Curio, xxx",
  },
];
</script>
<template>
  <VDialog max-width="70svw">
    <template #activator="{ props: openModal }">
      <VBtn variant="outlined" v-bind="openModal">Surat Permohonan</VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle style="padding: 1.5svw">
          <VRow>
            <VCol cols="10"><h3>Surat Permohonan</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              ></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <div style="max-height: 50svh; overflow: auto">
            <VRow no-gutters>
              <VCol cols="12"><b>Yth. Kepala BPJH</b></VCol>
            </VRow>
            <VRow no-gutters>
              <VCol cols="12"><b>Jakarta</b></VCol>
            </VRow>
            <br />
            <VRow no-gutters v-for="item in dataPermohonan" :key="item.id">
              <VCol cols="3">{{ item.key }}</VCol>
              <VCol cols="1">:</VCol>
              <VCol cols="8">{{ item.value }}</VCol>
            </VRow>
            <br />
            <VRow>
              <VCol cols="12">
                <p>
                  Dengan ini mengajukan permohonan sertifikat halal dengan
                  pernyataan pelaku usaha. Selain itu kami menyatakan bahwa:
                </p>
                <ul
                  style="padding-inline-start: 3svw; list-style-type: decimal"
                >
                  <li>
                    Kami belum pernah mendapatkan fasilitasi pembiayaan
                    sertifikasi halal dan tidak sedang/akan menerima fasilitasi
                    pembiayaan sertifikasi halal dari pihak mana pun;
                  </li>
                  <li>
                    Kami bersedia untuk didampingi oleh pendamping PPH dan
                    bersedia untuk mencantumkan label halal pada produk yang
                    telah disertifikasi halal;
                  </li>
                  <li>
                    Saya menjamin kebenaran kelengkapan data dan dokumen yang
                    menjadi persyaratan penerimaan fasilitasi sertifikasi halal
                    bagi pelaku usaha mikro dan kecil dari Kementerian Agama RI;
                  </li>
                </ul>
                <br />
                <p>
                  Apabila dikemudian hari data dan informasi, serta pernyataan
                  yang saya buat ini tidak benar dan terbukti merugikan Negara,
                  maka saya bersedia mengembalikan biaya fasilitasi sertifikasi
                  halal kepada Kas Negara dan/atau BPJPH berhak membatalkan
                  pengajuan permohonan sertifikat halal secara sepihak.
                </p>
                <p>
                  Demikian surat permohonan ini dibuat sebagai syarat pengajuan
                  permohonan Sertifikat Halal dengan pernyataan pelaku usaha.
                  Atas perhatiannya kami ucapkan terima kasih.
                </p>
              </VCol>
            </VRow>
          </div>
        </VCardItem>
        <VCardActions
          style="display: flex; justify-content: end; padding: 1.5svw"
        >
          <div>
            <VBtn variant="flat">Pratinjau Surat Permohonan</VBtn>
          </div>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
