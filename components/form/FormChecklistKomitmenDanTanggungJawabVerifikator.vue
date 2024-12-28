<script setup lang="ts">
const emit = defineEmits(['confirm'])

const item = ref(0)

const check = ref(false)

const next = () => {
  if (!check.value)
    return

  if (check.value && item.value === 2) {
    emit('confirm', true)

    return
  }
  if (check.value)
    item.value = item.value + 1
    check.value = false
}

onMounted(() => {
  item.value = 0
})
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle>
      Komitmen dan Tanggung Jawab
    </VCardTitle>

    <VCardItem>
      <VCard class="border rounded pa-4">
        <VCardItem v-if="item === 0">
          <VCardTitle class="d-flex justify-center mb-4">
            <span class="text-h3">Kebijakan Halal</span>
          </VCardTitle>
          <VCardText class="pa-8">
            <span class="text-h5">
              Kami berkomitmen dan bertanggung jawab untuk menghasilkan produk halal secara konsisten dan bersinambungan dengan melakukan tindakan :
            </span>
            <ol class="ma-4 pa-4">
              <li>
                Mematuhi peraturan perundangan terkait jaminan produk halal.
              </li>
              <li>
                Menggunakan bahan halal dan melakukan Proses Produk Halal (PPH) sesuai ketentuan yang berlaku.
              </li>
              <li>
                Menyiapkan sumber daya manusia yang mendukung pelaksanaan PPH di perusahaan
              </li>
              <li>
                Mensosialisasikan dan mengkomunikasikan kebijakan halal pada seluruh pihak terkait untuk memastikan semnua personel menjaga integrasi halal di perusahaan
              </li>
            </ol>
          </VCardText>
        </VCardItem>
        <VCardItem v-if="item === 1">
          <VCardTitle class="d-flex justify-center mb-4">
            <span class="text-h3">Pengertian Halal Dan Haram</span>
          </VCardTitle>
          <VCardText class="pa-8">
            <span class="text-h5">
              Kami berkomitmen dan bertanggung jawab untuk menghasilkan produk halal secara konsisten dan bersinambungan dengan melakukan tindakan :
            </span>
            <ol class="ma-4 pa-4">
              <li>
                Mengkonsumsi makanan dan minuman yang halal adalah wajib hukumnya bagi orang islam.
              </li>
              <li>
                Pengertian halal haram: (i) Halal adalah boleh. (ii) Haram adalah sesuatu yang dilarang oleh ALLAH SWT dengan larangan yang tegas.
              </li>
              <li>
                Contoh bahan haram: (i) Babi, termasuk seluruh bagian tubuhnya dan produk turunannya (segar atau olahan), (ii) Khamr (minuman beralkohol), (iii) Hasil
                Samping Khamr yang di peroleh hanya dengan pemisahan secara fisik, (iv) Darah, (v) Bangkai, (vi) Bagian dari tubuh manusia, binatang buas, dan anjing
              </li>
            </ol>
          </VCardText>
        </VCardItem>
        <VCardItem v-if="item === 2">
          <VCardTitle class="d-flex justify-center mb-4">
            <span class="text-h3">Praktik Penerapan SJPH</span>
          </VCardTitle>
          <VCardText class="pa-8">
            <span class="text-h5">
              Kami berkomitmen dan bertanggung jawab untuk menghasilkan produk halal secara konsisten dan bersinambungan dengan melakukan tindakan :
            </span>
            <ol class="ma-4 pa-4">
              <li>
                Menjaga semua fasilitas produksi dan peralatan dalam keadaan bersih sebelum dan sesudah digunakan
              </li>
              <li>
                Menjaga kebersihan diri sebelum dan selama bekerja sehingga tidak mengotori produk yang dihasilkan
              </li>
              <li>
                Tidak boleh membawa produk tidak halal di area produksi
              </li>
              <li>
                Tidak boleh menggunakan peralatan produksi untuk kepentingan lain
              </li>
              <li>
                Menyimpan bahan dan produk di tempat yang bersih dan menjaga supaya terhindar dari najis.
              </li>
              <li>
                Memastikan kendaraan yang digunakan untuk mengangkut produk halal dalam kondisi baik dan tidak digunakan untuk mengakngkut produk lain yang
                diragukan kehalalan nya
              </li>
            </ol>
          </VCardText>
        </VCardItem>
        <VCardActions>
          <VCheckbox
            id="checkHalal"
            v-model="check"
          />
          <VLabel for="checkHalal">
            Saya Telah Membaca seluruh persyaratan yang telah dicantumkan, dan berjanji akan memenuhi kebijakan tersebut.
          </VLabel>
        </VCardActions>
        <VCardActions class="d-flex justify-center">
          <VBtn
            min-width="120px"
            max-width="120px"
            variant="flat"
            block
            @click="next"
          >
            Saya Setuju
          </VBtn>
        </VCardActions>
      </VCard>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss">

</style>
