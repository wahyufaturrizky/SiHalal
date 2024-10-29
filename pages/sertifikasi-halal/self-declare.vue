<script setup lang="ts">
import { computed, ref } from 'vue'

const searchQuery = ref('')

const submission = ref([
  {
    no: 1,
    idReg: 159,
    regNo: 'FY-00001',
    date: '2024-10-10',
    name: 'Yogurt Halal ',
    productType: 'Fermentasi',
    status: 'Pending',
    brand: 'SipalingHalal',
    action: 'Edit',
  },
])

const filteredSubmissions = computed(() => {
  if (!searchQuery.value)
    return submission.value

  return submission.value.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  )
})

const questions = [
  '1. Saya tidak pernah mendapatkan fasilitas sertifikasi halal sebelumnya ',
  '2. Aktivitas produksi yang dilakukan merupakan usaha rumahan (bukan usaha pabrikan)',
  '3. Proses produksi menggunakan bahan-bahan halal. (contoh bahan halal: 1. Bahan bersertifikat halal 2. Bahan berasal dari alam (tanpa melihat sertifikat): buah segar, sayur segar, telur segar, ikan segar, rempah, dll)',
  '4. Jika ada proses produksi produk lain yang menggunakan bahan non-halal, dilakukan pada tempat terpisah dan menggunakan alat yang berbeda.',
  '5. Proses produksi tidak menggunakan bahan berbahaya (contoh bahan berbahaya tertuang dalam Peraturan BPOM Nomor 3 Tahun 2018)',
  '6. Proses pengawetan produk sederhana dan tidak menggunakan kombinasi lebih dari 1 metode pengawetan ',
  '7. Proses produksi menggunakan peralatan manual/ semi otomatis',
]

const questionareDialogVisible = ref(false)

const requestDialogVisible = ref(false)

const openModalsQuestionare = () => {
  questionareDialogVisible.value = true
}

const handleSubmitQuestionare = answers => {
  console.log('Answers submitted:', answers)
  requestDialogVisible.value = true
}

const router = useRouter()

const hanleSubmitRequest = answer => {
  console.log('answer request : ', answer)
  router.push("/sertifikasi-halal/self-declare-detail")
}
</script>

<template>
  <div>
    <div class="mb-8">
      <p class="text-h4">
        Pengajuan Self Declare
      </p>
    </div>

    <VContainer class="bg-surface rounded">
      <VRow>
        <VCol class="d-flex justify-sm-space-between">
          <p class="text-h5">
            Data Pengajuan Self Declare
          </p>
          <VIcon
            size="24"
            icon="ri-arrow-up-s-line"
            style="opacity: 1;"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Cari Data"
            append-inner-icon="ri-search-line"
            style="max-width: 100%;"
          />
        </VCol>
        <VCol class="d-flex justify-end align-center">
          <VBtn
            color="primary"
            append-icon="ri-add-line"
            @click="openModalsQuestionare"
          >
            Buat Pengajuan
          </VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VTable class="border rounded-lg">
            <thead>
              <tr>
                <th class="text-uppercase table-width-5">
                  No
                </th>
                <th class="text-uppercase table-width-10">
                  ID Reg
                </th>
                <th class="text-uppercase table-width-20">
                  No. Daftar
                </th>
                <th class="text-uppercase table-width-10">
                  Tanggal
                </th>
                <th class="text-uppercase table-width-10">
                  Nama PU
                </th>
                <th class="text-uppercase table-width-10">
                  Jenis Produk
                </th>
                <th class="text-uppercase table-width-10">
                  Status
                </th>
                <th class="text-uppercase table-width-10">
                  Merk Dagang
                </th>
                <th class="text-uppercase table-width-10">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="border">
              <tr v-if="filteredSubmissions.length === 0">
                <td colspan="9">
                  <DataKosong />
                </td>
              </tr>
              <tr
                v-for="item in filteredSubmissions"
                :key="item.no"
              >
                <td class="table-width-5">
                  {{ item.no }}
                </td>
                <td class="table-width-10">
                  {{ item.idReg }}
                </td>
                <td class="table-width-20">
                  {{ item.regNo }}
                </td>
                <td class="table-width-10">
                  {{ item.date }}
                </td>
                <td class="table-width-10">
                  {{ item.name }}
                </td>
                <td class="table-width-10">
                  {{ item.productType }}
                </td>
                <td class="table-width-10">
                  {{ item.status }}
                </td>
                <td class="table-width-10">
                  {{ item.brand }}
                </td>
                <td class="table-width-10">
                  {{ item.action }}
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCol>
      </VRow>
    </VContainer>

    <RequestDialogue
      :dialog-visible="requestDialogVisible"
      :submit="hanleSubmitRequest"
      @update:dialog-visible="requestDialogVisible = $event"
    />

    <Questionnaire
      :dialog-visible="questionareDialogVisible"
      :questions="questions"
      :submit="handleSubmitQuestionare"
      @update:dialog-visible="questionareDialogVisible = $event"
    />
  </div>
</template>

<style scoped lang="scss">
.table-width-5 { width: 5%; }
.table-width-10 { width: 10%; }
.table-width-15 { width: 15%; }
.table-width-20 { width: 20%; }
</style>
