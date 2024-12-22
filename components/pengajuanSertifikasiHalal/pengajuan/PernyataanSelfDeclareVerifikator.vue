<script setup lang="ts">

const props = defineProps<{
  detaildata: Object
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
              <VRow v-for="({label, value}, index) in bioData"
              :key="index" >
                <VCol cols="4">{{label}}</VCol>
                <VCol cols="8">: {{value}}</VCol>
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
