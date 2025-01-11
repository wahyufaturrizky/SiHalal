<script setup lang="ts">
const panelCertificateRequest = ref([0, 1])
const route = useRoute()
const id = route?.params?.id

const loading = ref(false)

const hasil = ref({
  pengujianLab: '',
  hasilAudit: '',
  hasilUji: '',
  catatan: '',
})

const requestDataHalal = ref([])

const saveHasilAudit = async () => {
  const body = {
    pengujian_laboratorium: hasil.value.pengujianLab, // Ada / Tidak Ada
    hasil_audit: hasil.value.hasilAudit, // LULUS / TIDAK LULUS
    hasil_uji: hasil.value.pengujianLab === 'Ada' ? hasil.value.hasilUji : '',
    keterangan: hasil.value.hasilAudit === 'TIDAK LULUS' ? hasil.value.catatan : '',
  }

  try {
    const response: any = await $api(`/reguler/auditor/${id}/save-hasil-audit`, {
      method: 'post',
      body,
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadProsesProduk()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

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
    ],
  },
)

const auditorListData = ref(
  {
    label: [
      { title: 'No.', key: 'no', nowrap: true },
      { title: 'Nama', key: 'name', nowrap: true },
      { title: 'Tanggal Lahir', key: 'birthdate', nowrap: true },
      { title: 'No. Pendaftaran', key: 'registrationNo', nowrap: true },
    ],
    value: [
    ],
  },
)

const facility = ref([])
const facilityOptions = ref([])
const selectedFacility = ref(null)
const facilityAddress = ref(null)

watch(selectedFacility, (newSelectedItem) => {
  console.log("SELECT : ", newSelectedItem)
  facilityAddress.value = facility.value.filter(
    f => f.id_fas === newSelectedItem
  )[0].alamat
});

const loadItem = async (): void => {
  console.log('loaditem')
  try {
    const response = await $api(`/reguler/auditor/ubah-laporan/${id}`, {
      method: 'GET',
      params: { id },
    })

    if (response.code === 2000) {
      // TODO -> MAPPING VALUE
      const data = response.data

      // REQUEST DATA HALAL
      requestDataHalal.value = [
        { title: 'Nama Perusahaan', value: data.pengajuan_sertifikat?.nama_pu, type: 'text' },
        { title: 'Alamat Perusahaan', value: data.pengajuan_sertifikat?.alamat, type: 'text' },
        { title: 'NIB', value: data.pengajuan_sertifikat?.nib, type: 'text' },
        { title: 'Skala Usaha', value: data.pengajuan_sertifikat?.skala_usaha, type: 'select', disabled: true },
        { title: 'Jenis Produk', value: data.pengajuan_sertifikat?.jenis_produk, type: 'text', },
        { title: 'Alamat Fasilitas', value: '' , type: 'text-fasilitasi' },
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
      ]

      facility.value = data.pengajuan_sertifikat?.fasilitas

      selectedFacility.value = facility.value.length > 0 ? facility.value[0].id_fas : ''

      facilityOptions.value = data.pengajuan_sertifikat?.fasilitas.map(
        f => ({
          title: f.nama,
          value: f.id_fas
        })
      )

      hasil.value = {
        pengujianLab: data.pengajuan_sertifikat?.hasil_audit !== null || data.pengajuan_sertifikat?.hasil_audit !== '' ? 'Ada' : 'Tidak Ada',
        hasilAudit: data.pengajuan_sertifikat?.hasil_audit,
        hasilUji: data.pengajuan_sertifikat?.hasil_uji,
        catatan: data.pengajuan_sertifikat?.hasil_audit === 'TIDAK LULUS' ? data.pengajuan_sertifikat?.keterangan : '',
      }

      auditorListData.value.value = data.auditor_halal.map(
        (v, i) => ({
          no: i + 1,
          name: v.nama,
          birthdate: v.tgl_lahir,
          registrationNo: v.no_registrasi,
        }),
      )
    }
  }
  catch (e) {
    useSnackbar().sendSnackbar('Terjadi Kesalahan ', 'error')
  }
}

const fasilityOptions = ref(
  [
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
    data = ['LULUS', 'TIDAK LULUS']
      break;
  default:
    break;
  }

  return data
}

const triggerDialog = type => {

}

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
    ],
  },
)

// PEMENUHAN KRITERIA:
const loadPemenuhanKriteria = async () => {
  try {
    const response = await $api(
      `/reguler/auditor/${id}/pemenuhan-kriteria`,
      {
        method: 'get',
      },
    )

    if (response.code === 2000) {
      const data = response.data

      summaryData.value = {
        label: summaryData.value.label,
        value: data.pemenuhan_kriteria?.map(
          (v, i) => ({
            no: i + 1,
            criteria: v.kriteria,
            matcher: v.kesesuaian,
            information: v.keterangan,
            id_kriteria: v.id_kriteria,
            id_reg: v.id_reg,
          })),
      }

      return response
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const addPemenuhanKriteria = async item => {
  try {
    const body = {
      kriteria: item.value.kriteria,
      kesesuaian: item.value.kesesuaian,
      keterangan: item.value.keterangan,
    }

    const response: any = await $api(`/reguler/auditor/${id}/add-pemenuhan-kriteria`, {
      method: 'post',
      body,
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadPemenuhanKriteria()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const removePemenuhanKriteria = async item => {
  try {
    const body = {
      id_reg: id,
      id_pemenuhan_kriteria: item.id_kriteria,
    }

    const response: any = await $api(`/reguler/auditor/${id}/destroy-pemenuhan-kriteria`, {
      method: 'post',
      body,
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadPemenuhanKriteria()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

// PROSES PRODUK
const loadProsesProduk = async () => {
  try {
    const response = await $api(
      `/reguler/auditor/${id}/proses-produk`,
      {
        method: 'get',
      },
    )

    if (response.code === 2000) {
      const data = response.data

      processData.value = {
        label: processData.value.label,
        value: data.proses_produk_halal?.map(
          (v, i) => ({
            no: i + 1,
            explanation: v.penjelasan,
            requirement: v.persyaratan,
            id_proses_produk_halal: v.id_proses_produk_halal,

          })),
      }

      return response
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const addProsesProduk = async item => {
  console.log('ITEM ADD PROSES PRODUK: ', item)
  try {
    const response: any = await $api(`/reguler/auditor/${id}/add-proses-produk`, {
      method: 'post',
      body: {
        persyaratan: item.value.persyaratan,
        penjelasan: item.value.penjelasan,
      },
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadProsesProduk()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const removeProsesProduk = async item => {
  try {
    const body = {
      id_reg: id,
      id_proses_produk_halal: item.id_proses_produk_halal,
    }

    const response: any = await $api(`/reguler/auditor/${id}/destroy-proses-produk`, {
      method: 'post',
      body,
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadProsesProduk()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

// BAHAN DUKUNG METHOD
const jenisKeteranganBahan = ref([])

const loadJenisKeteranganBahan = async () => {
  try {
    const response: any = await $api('/master/jenis-keterangan', {
      method: 'get',
    })

    if (response.length > 0) {
      jenisKeteranganBahan.value = response.map(
        i => ({
          title: i.name,
          value: i.code,
        }),
      )

      return response
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const addDataDukung = async item => {
  try {
    const response: any = await $api(`/reguler/auditor/${id}/add-bahan-dukung`, {
      method: 'post',
      body: {
        id_reg_bahan: item.value.namaBahan,
        nama_bahan: opsiBahan.value.filter(i => i.value === item.value.namaBahan)[0].title,
        diragukan: item.value.statusKeraguan,
        kriteria_bahan: item.value.kriteriaBahan,
        keterangan: item.value.keterangan,
      },
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadBahanDukung()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const updateDataDukung = async item => {
  try {
    const body = {
      id_reg_bahan: item.id_reg_bahan,
      id_bahan_data_dukung: item.id_bahan_data_dukung,
      nama_bahan: item.materialName,
      diragukan: item.diragukan,
      kriteria_bahan: item.priority,
      keterangan: item.information,
    }

    const response: any = await $api(`/reguler/auditor/${id}/update-bahan-dukung`, {
      method: 'put',
      body,
    })

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar('Sukses add data', 'success')
      await loadBahanDukung()
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const opsiBahan = ref([])

const loadBahanDukung = async () => {
  try {
    const response = await $api(
      `/reguler/auditor/${id}/bahan-dukung`,
      {
        method: 'get',
      },
    )

    if (response.code === 2000) {
      const data = response.data
      materialData.value = {
        label: materialData.value.label,
        value: data.bahan?.map(
          (v, i) => ({
            no: i + 1,
            id_reg_bahan: v.id_reg_bahan,
            id_bahan_data_dukung: v.DataDukung?.id_bahan_data_dukung,
            materialName: v.reg_nama_bahan,
            priority: v.DataDukung?.kriteria_bahan,
            findings: v.DataDukung?.temuan,
            information: v.DataDukung?.Mref?.ref_desc,
            diragukan: v.DataDukung?.diragukan,
          })),
      }
      opsiBahan.value = data.bahan?.filter(
        i => i.DataDukung?.id_bahan_data_dukung === '00000000-0000-0000-0000-000000000000',
      ).map(i => ({
        title: i.reg_nama_bahan,
        value: i.id_reg_bahan,
      }))

      return response
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

onMounted(async () => {
  loading.value = true
  Promise.all([loadItem(), loadBahanDukung(), loadJenisKeteranganBahan(), loadProsesProduk(), loadPemenuhanKriteria()])

  // await loadBahanDukung()
  // await loadItem()
  // await loadJenisKeteranganBahan()
  // await loadProsesProduk()
  // await loadPemenuhanKriteria()
  loading.value = false
})
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
          <VBtn @click="saveHasilAudit">
            Simpan
          </VBtn>
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
                  <div v-if="item.type === 'select-fasillitasi'">
                    <p class="label-pengajuan">
                      {{ item.title }}
                    </p>
                    <VSelect
                      v-model="selectedFacility"
                      :items="facilityOptions"
                      outlined
                      class="-mt-10"
                      bg-color="#F6F6F6"
                    />
                  </div>

                  <div v-if="item.type === 'text-fasilitasi'">
                    <p class="label-pengajuan">
                      {{ item.title }}
                    </p>
                    <VTextField
                      v-model="facilityAddress"
                      :items="facilityOptions"
                      outlined
                      class="-mt-10"
                      bg-color="#F6F6F6"
                      disabled
                    />
                  </div>
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
                </VCol>
                <VCol cols="12">
                  <p class="label-pengajuan">
                    Pengujian Laboratorium
                  </p>
                  <VSelect
                    v-model="hasil.pengujianLab"
                    :items="getSelectOptions('Pengujian Laboratorium')"
                    outlined
                    class="-mt-10"
                    bg-color="#F6F6F6"
                  />
                </VCol>
                <VCol
                  v-if="hasil.pengujianLab === 'Ada'"
                  cols="12"
                >
                  <div>
                    <p class="label-pengajuan">
                      Hasil Uji
                    </p>
                    <VTextarea
                      v-model="hasil.hasilUji"
                      class="-mt-10"
                    />
                  </div>
                </VCol>
                <VCol cols="12">
                  <p class="label-pengajuan">
                    Hasil Audit
                  </p>
                  <VSelect
                    v-model="hasil.hasilAudit"
                    :items="getSelectOptions('Hasil Audit')"
                    outlined
                    class="-mt-10"
                    bg-color="#F6F6F6"
                  />
                </VCol>
                <VCol
                  v-if="hasil.hasilAudit === 'TIDAK LULUS'"
                  cols="12"
                >
                  <div>
                    <p class="label-pengajuan">
                      Catatan
                    </p>
                    <VTextarea
                      v-model="hasil.catatan"
                      class="-mt-10"
                    />
                  </div>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br>
        <ContentAuditPengajuan
          v-if="!loading"
          :opsi-bahan="opsiBahan"
          :opsi-keterangan="jenisKeteranganBahan"
          :on-add="() => triggerDialog('add')"
          title="Bahan"
          :headers-label="materialData.label"
          :items-label="materialData.value"
          with-add-button
          @submit="addDataDukung"
          @update="updateDataDukung"
        />
        <br>
        <ContentAuditPengajuan
          title="Proses Produk Halal"
          :headers-label="processData.label"
          :items-label="processData.value"
          with-add-button
          @submit="addProsesProduk"
          @remove="removeProsesProduk"
        />
        <br>
        <DaftarProdukAudit />
        <DaftarOutletAudit :id="id" />
        <br>
        <ContentAuditPengajuan
          title="Kesimpulan Pemenuhan Kriteria Sistem Jaminan Produk Halal"
          :headers-label="summaryData.label"
          :items-label="summaryData.value"
          with-add-button
          @submit="addPemenuhanKriteria"
          @remove="removePemenuhanKriteria"
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
