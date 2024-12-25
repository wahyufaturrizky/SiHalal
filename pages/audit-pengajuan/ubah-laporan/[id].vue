<script setup lang="ts">
const panelCertificateRequest = ref([0, 1])
const route = useRoute()
const id = route?.params?.id

const requestDataHalal = ref([
  { title: 'Nama Perusahaan', value: 'PT Bahagia Sentosa', type: 'text' },
  { title: 'Alamat Perusahaan', value: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio', type: 'text' },
  { title: 'NIB', value: '83472896', type: 'text' },
  { title: 'Skala Usaha', value: 'Mikro', type: 'select', disabled: false },
  { title: 'Nama Pimpinan', value: 'Bambang', type: 'text' },
  { title: 'Nama Fasilitas', value: 'Es Cream', type: 'select', disabled: false },
  { title: 'Alamat Fasilitas', value: 'Sumbawa Banget, RT002/RW002, Sumbang, Curio', type: 'text' },
  {
    type: 'date',
    data: [
      {
        title: 'Tanggal Mulai', value: '11/11/2024', type: 'date',
      },
      {
        title: 'Tanggal Selesai', value: '12/11/2024', type: 'date',
      },
    ],
  },
  { title: 'Jenis Produk', value: 'Minuman Bahagia', type: 'select', disabled: true },
  { title: 'Nama / Merk Produk', value: 'Minuman Bahagia Lvl 2', type: 'select', disabled: true },
  { title: 'Pengujian Laboratorium', value: 'Ada', type: 'select', disabled: false },
  { title: 'Hasil Audit', value: 'Lulus', type: 'select', disabled: false },
  { title: 'Hasil Pengujian', value: 'Es Cream', type: 'textarea' },
  { title: 'Catatan', value: 'Es Cream', type: 'textarea' },
])

const loadItem = async (): void => {
  console.log("loaditem")
  try {
    const response = await $api(`/reguler/auditor/ubah-laporan/${id}`, {
      method: 'GET',
      params: {id},
    })

    if (response.code === 2000) {
      // TODO -> MAPPING VALUE
      const data = response.data

      // REQUEST DATA HALAL
      requestDataHalal.value = [
        { title: 'Nama Perusahaan', value: data.pengajuan_sertifikat?.nama_pu, type: 'text' },
        { title: 'Alamat Perusahaan', value: data.pengajuan_sertifikat?.alamat, type: 'text' },
        { title: 'NIB', value: data.pengajuan_sertifikat?.nib, type: 'text' },
        { title: 'Skala Usaha', value: data.pengajuan_sertifikat?.skala_usaha, type: 'select', disabled: false },
        { title: 'Nama Pimpinan', value: data.pengajuan_sertifikat?.nama_pimpinan, type: 'text' },
        { title: 'Nama Fasilitas', value: data.pengajuan_sertifikat?.nama_fasilitas , type: 'select', disabled: false },
        { title: 'Alamat Fasilitas', value: data.pengajuan_sertifikat?.alamat_fasilitas , type: 'text' },
        {
          type: 'date',
          data: [
            {
              title: 'Tanggal Mulai', value: data.pengajuan_sertifikat?.tanggal_mulai, type: 'date',
            },
            {
              title: 'Tanggal Selesai', value: data.pengajuan_sertifikat?.tanggal_selesai, type: 'date',
            },
          ],
        },
        { title: 'Jenis Produk', value: data.pengajuan_sertifikat?.jenis_produk, type: 'select', disabled: true },
        { title: 'Nama / Merk Produk', value: data.pengajuan_sertifikat?.nama_produk, type: 'select', disabled: true },
        { title: 'Pengujian Laboratorium', value: 'Ada', type: 'select', disabled: false },
        { title: 'Hasil Audit', value: 'Lulus', type: 'select', disabled: false },
        { title: 'Hasil Pengujian', value: 'Es Cream', type: 'textarea' },
        { title: 'Catatan', value: 'Es Cream', type: 'textarea' },
      ]

      materialData.value.value = data.bahan.map(
        (v, i) => ({
          no: i + 1,
          materialName: v.nama_bahan,
          priority: v.kriteria,
          findings: v.temuan,
          information: v.keterangan,
        }))

      // processData.value.value = data.proses_produk_halal.map(
      //   (v, i) => ({
      //     no: i + 1,
      //     requirement: v.persyaratan,
      //     explanation: v.penjelasan,
      //   }))

      registrationProductData.value.value = data.produk.map(
        (v, i) => ({ no: i + 1, name: v.nama_produk, foto: v.photo }))


      outletData.value.value = data.outlet.map(
        (v, i) => ({
          no: i + 1,
          name: v.nama_outlet,
          address: v.alamat_outlet,
        }))

      summaryData.value.value = data.kesimpulan.map(
        (v, i) => ({
          no: i + 1,
          criteria: v.kriteria,
          matcher: v.kesesuaian,
          information: v.keterangan,
        }))

      auditorListData.value.value = data.auditor.map(
        (v, i) => ({
          no: i + 1,
          name: v.nama_auditor,
          birthdate: v.tgl_lahir,
          registrationNo: v.no_reg,
        }),
      )
    }
  }
  catch (e) {
    console.log("ERROR : ", e)
    useSnackbar().sendSnackbar('Terjadi Kesalahan ', 'error')
  }
}

onMounted(async () => {
  await loadItem()
})

const materialData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Bahan', key: 'materialName', nowrap: true },
      { title: 'Kritis / Tidak Kritis', key: 'priority', nowrap: true },
      { title: 'Temuan', key: 'findings', nowrap: true },
      { title: 'Keterangan', key: 'information', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, materialName: 'Sunlight', priority: 'Tidak kritis', findings: 'SK/KH no.10002114', information: 'Bahan Kimia' },
      { no: 2, materialName: 'Kemasan botol', priority: 'Tidak kritis', findings: '-', information: 'Bahan Kimia' },
      { no: 3, materialName: 'Air Kelapa', priority: 'Tidak kritis', findings: '13/10/2019', information: 'Bahan Kimia' },
    ],
  },
)

const processData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Persyaratan', key: 'requirement', nowrap: true },
      { title: 'Penjelasan', key: 'explanation', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, requirement: 'Proses', explanation: 'Produk dibuat dengan cara' },
      { no: 2, requirement: 'Kriteria', explanation: 'Produk dibuat dengan cara' },
    ],
  },
)

const registrationProductData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Produk', key: 'name', nowrap: true },
      { title: 'Foto Produk', key: 'foto', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, name: 'Proses', foto: 'file' },
      { no: 2, name: 'Kriteria', foto: 'file' },
    ],
  },
)

const outletData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama Outlet', key: 'name', nowrap: true },
      { title: 'Address', key: 'address', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, name: 'Proses', address: 'file' },
      { no: 2, name: 'Kriteria', address: 'file' },
    ],
  },
)

const summaryData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Kriteria', key: 'criteria', nowrap: true },
      { title: 'Kesesuaian', key: 'matcher', nowrap: true },
      { title: 'keterangan', key: 'information', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, criteria: 'Proses', matcher: 'file', information: '-' },
      { no: 2, criteria: 'Kriteria', matcher: 'file', information: 'ada yang salah' },
    ],
  },
)

const auditorListData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'name', nowrap: true },
      { title: 'Tanggal Lahir', key: 'birthdate', nowrap: true },
      { title: 'No. Pendaftara', key: 'registrationNo', nowrap: true },
      { title: 'Action', value: 'action', sortable: false, nowrap: true },
    ],
    value: [
      { no: 1, name: 'Proses', birthdate: '16/12/1999', registrationNo: '-' },
      { no: 2, name: 'Kriteria', birthdate: '16/12/1999', registrationNo: 'SH 213618969 er' },
    ],
  },
)

const fasilityOptions = ref(
  [
    { title: 'facility 1', value: '1', alamat: 'alamat 2' },
    { title: 'facility 2', value: '2', alamat: 'alamat 1' },
  ],
)

const getSelectOptions = field => {
  let data = []
  switch (field) {
  case 'Skala Usaha':
    data = ['Mikro', 'Kecil', 'Menengah', 'Besar']
      break;
  case 'Nama Fasilitas':
    data = fasilityOptions.value
      break;
  case 'Pengujian Laboratorium':
    data = ['Ada', 'Tidak Ada']
      break;
  case 'Hasil Audit':
    data = ['Lulus', 'Tidak Lulus']
      break;
  default:
    break;
  }

  return data
}

const shouldShowHasilPengujian = computed(() => {
  const labTesting = requestDataHalal.value.find(
    item => item.title === 'Pengujian Laboratorium',
  )

  return labTesting && labTesting.value === 'Ada'
})

const shouldShowCatatan = computed(() => {
  const auditResult = requestDataHalal.value.find(
    item => item.title === 'Hasil Audit',
  )

  return auditResult && auditResult.value === 'Lulus'
})

const triggerDialog = type => {

}
</script>

<template>
  <VContainer>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3">
          Ubah Laporan Hasil Audit
        </h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            class="borderInfo"
            color="#E1442E"
          >
            Batal
          </VBtn>
          <VBtn>Simpan</VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol class="pr-0">
        <VExpansionPanels v-model="panelCertificateRequest">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow>
                <VCol
                  v-for="(item, index) in requestDataHalal"
                  :key="item.title"
                  :value="index"
                  cols="12"
                >
                  <!-- <br> -->
                  <div v-if="item.type === 'text'">
                    <p class="label-pengajuan">
                      {{ item.title }}
                    </p>
                    <VTextField
                      v-model="item.value"
                      disabled
                      bg-color="#F6F6F6"
                      class="-mt-10"
                    />
                  </div>
                  <div v-if="item.type === 'select'">
                    <p class="label-pengajuan">
                      {{ item.title }}
                    </p>
                    <VSelect
                      v-if="item.disabled"
                      v-model="item.value"
                      :items="getSelectOptions(item.title)"
                      outlined
                      class="-mt-10"
                      disabled
                      bg-color="#F6F6F6"
                    />
                    <VSelect
                      v-if="!item.disabled"
                      v-model="item.value"
                      :items="getSelectOptions(item.title)"
                      outlined
                      class="-mt-10"
                    />
                  </div>
                  <VCol
                    v-if="item.type === 'date'"
                    class="d-flex justify-space-between align-center px-0"
                    cols="12"
                  >
                    <!-- <p class="label-pengajuan">{{ item.title }}</p> -->
                    <div
                      v-for="(element, idx) in item.data"
                      :key="element.title"
                      :value="idx"
                      cols="5"
                      class="px-0 w-48"
                    >
                      <p class="label-pengajuan">
                        {{ element.title }}
                      </p>
                      <VTextField
                        v-model="element.value"
                        disabled
                        bg-color="#F6F6F6"
                        class="-mt-10"
                      />
                    </div>
                  </VCol>
                  <div v-if="item.type === 'textarea'">
                    <div v-if="item.title === 'Hasil Pengujian' && shouldShowHasilPengujian">
                      <p class="label-pengajuan">
                        {{ item.title }}
                      </p>
                      <VTextarea
                        v-model="item.value"
                        class="-mt-10"
                      />
                    </div>
                    <div v-if="item.title === 'Catatan' && shouldShowCatatan && shouldShowHasilPengujian">
                      <div>
                        <p class="label-pengajuan">
                          {{ item.title }}
                        </p>
                        <VTextarea
                          v-model="item.value"
                          class="-mt-10"
                        />
                      </div>
                    </div>
                    <div v-if="item.title === 'Catatan' && shouldShowCatatan && !shouldShowHasilPengujian">
                      <div class="-mt-20">
                        <p class="label-pengajuan">
                          {{ item.title }}
                        </p>
                        <VTextarea
                          v-model="item.value"
                          class="-mt-10"
                        />
                      </div>
                    </div>
                  </div>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <ContentAuditPengajuan
          :on-add="() => triggerDialog('add')"
          title="Bahan"
          :headers-label="materialData.label"
          :items-label="materialData.value"
          with-add-button
        />
        <br>
        <ContentAuditPengajuan
          :on-add="() => console.log('aaa')"
          title="Proses Produk Halal"
          :headers-label="processData.label"
          :items-label="processData.value"
          with-add-button
        />
        <br>
        <ContentAuditPengajuan
          :on-add="() => console.log('aaa')"
          title="Daftar Produk"
          :headers-label="registrationProductData.label"
          :items-label="registrationProductData.value"
          :with-add-button="false"
        />
        <br>
        <ContentAuditPengajuan
          :on-add="() => console.log('aaa')"
          title="Daftar Outlet"
          :headers-label="outletData.label"
          :items-label="outletData.value"
          :with-add-button="false"
        />
        <br>
        <ContentAuditPengajuan
          :on-add="() => console.log('aaa')"
          title="Kesimpulan Pemenuhan Kriteria Sistem Jaminan Produk Halal"
          :headers-label="summaryData.label"
          :items-label="summaryData.value"
          with-add-button
        />
        <br>
        <ContentAuditPengajuan
          :on-add="() => console.log('aaa')"
          title="Nama Auditor Halal"
          :headers-label="auditorListData.label"
          :items-label="auditorListData.value"
          :with-add-button="false"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style lang="scss" scoped>
.borderInfo {
    border-color: #E1442E !important;
    border-width: 1px !important;
}

.-mt-10 {
    margin-top: -10px;
}

.-mt-20 {
    margin-top: -20px;
}

.label-pengajuan {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #2C222E;
}

.w-48 {
    max-width: 48%;
    min-width: 48%;
}
</style>
