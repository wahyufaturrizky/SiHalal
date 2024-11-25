<template>
  <VDialog max-width="45svw">
    <template #activator="{ props: openModal }">
      <VBtn color="primary" variant="outlined" v-bind="openModal">Surat Pernyataan</VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard class="mx-4">
        <VCardTitle>
          <VRow class="mt-3 mx-2">
            <VCol cols="10">
              <h2 class="display-1 font-weight-bold">Pernyataan Pelaku Usaha</h2>
            </VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              />
            </VCol>
          </VRow>
        </VCardTitle>

        <VCardText>
          <VRow>
            <VCol cols="12" class="mx-4">
              <div class="text-h6">Yth. Kepala BPJPH <br> Jakarta</div>
            </VCol>

            <VCol cols="12" class="mx-4">
              <VRow>
                <VCol cols="4">Nama (sesuai KTP)</VCol>
                <VCol cols="8">: SAMSUL</VCol>
              </VRow>
              <VRow>
                <VCol cols="4">Alamat (sesuai KTP)</VCol>
                <VCol cols="8">: SUMBANG, RT/RW-, SUMBANG, CURIO, KAB. ENREKANG, SULAWESI SELATAN, -, INDONESIA</VCol>
              </VRow>
              <VRow>
                <VCol cols="4">Jabatan</VCol>
                <VCol cols="8">: PENANGGUNG JAWAB USAHA</VCol>
              </VRow>
              <VRow>
                <VCol cols="4">Nomor Kontak</VCol>
                <VCol cols="8">: 082113900779</VCol>
              </VRow>
              <VRow>
                <VCol cols="4">Nama Perusahaan</VCol>
                <VCol cols="8">: SAMSUL</VCol>
              </VRow>
              <VRow>
                <VCol cols="4">Alamat Perusahaan</VCol>
                <VCol cols="8">: SUMBANG, RT/RW-, SUMBANG, CURIO, KAB. ENREKANG, SULAWESI SELATAN, -, INDONESIA</VCol>
              </VRow>
            </VCol>
          </VRow>
          <VContainer>
            <p>
              Dengan ini menyatakan:
              <ol class="pl-4">
                <li>Usaha kami telah berproduksi minimal 1 tahun;</li>
                <li>Memiliki pendapatan tahunan (omset) maksimal Rp. 500.000.000 (lima ratus juta rupiah) yang dihitung berdasarkan pendapatan per bulan</li>
              </ol>
            </p>

            <p>
              Apabila dikemudian hari data dan informasi, serta pernyataan yang saya buat ini tidak benar dan terbukti merugikan Negara, maka
              saya bersedia mengembalikan biaya fasilitasi sertifikasi halal kepada Kas Negara dan/atau BPJPH berhak membatalkan pengajuan
              permohonan sertifikat halal secara sepihak.
            </p>

            <p>
              Demikian surat permohonan ini dibuat sebagai syarat pengajuan permohonan Sertifikat Halal dengan pernyataan pelaku usaha. Atas perhatiannya kami ucapkan terima kasih.
            </p>
          </VContainer>
        </VCardText>

        <VCardActions>
          <VBtn color="primary" variant="flat" class="mr-6 mb-8">Pratinjau Surat Pengajuan</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
