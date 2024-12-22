<script setup lang="ts">
const props = defineProps<{
  detaildata: {
    type: Object
  }
}>()

const {detaildata} = props || {}
const {certificate_halal, penanggung_jawab} = (detaildata as any) || {}
const {nama_pu, alamat_pu} = certificate_halal || {}
const {nomor_kontak_pj, nama_pj} = penanggung_jawab || {}

const bioData = [
  {
    label: 'Nama (sesuai KTP)',
    value: nama_pj,
  },
  {
    label: 'Alamat (sesuai KTP)',
    value: alamat_pu,
  },
  {
    label: 'Jabatan',
    value: 'PENANGGUNG JAWAB USAHA',
  },
  {
    label: 'Nomor Kontak',
    value: nomor_kontak_pj,
  },
  {
    label: 'Nama Perusahaan',
    value: nama_pu,
  },
  {
    label: 'Alamat Perusahaan',
    value: alamat_pu,
  },
]
</script>

<template>
  <VDialog max-width="45svw">
    <template #activator="{ props: openModal }">
      <VBtn color="primary" variant="outlined" v-bind="openModal">Surat Permohonan</VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard class="mx-4">
        <VCardTitle>
          <VRow class="mt-3 mx-2">
            <VCol cols="10">
              <h2 class="display-1 font-weight-bold">Surat Permohonan</h2>
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
              <VRow v-for="({label, value}, index) in bioData"
              :key="index" >
                <VCol cols="4">{{label}}</VCol>
                <VCol cols="8">: {{value}}</VCol>
              </VRow>
            </VCol>
          </VRow>
          <VContainer>
            <p>
              Dengan ini mengajukan permohonan sertifikat halal dengan pernyataan pelaku usaha. Selain itu kami menyatakan bahwa:
              <ol class="pl-4">
                <li>Kami belum pernah mendapatkan fasilitas pembiayaan sertifikasi halal dan tidak sedang/akan menerima fasilitas pembiayaan sertifikasi halal dari pihak mana pun;</li>
                <li>Kami bersedia untuk didampingi oleh pendamping PPH dan bersedia untuk mencantumkan label halal pada produk yang telah disertifikasi halal;</li>
                <li>Saya menjamin kebenaran dan kelengkapan data dan dokumen yang menjadi persyaratan penerimaan fasilitas sertifikasi halal bagi pelaku usaha mikro dan kecil dari Kementerian Agama RI.</li>
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
          <VBtn color="primary" variant="flat" class="mr-6 mb-8">Pratinjau Surat Permohonan</VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
