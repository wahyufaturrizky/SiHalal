<script setup lang="ts">
const route = useRoute<''>()
const submissionId = route.params?.id

const submissionDetail = reactive({
  id_reg: null,
  jenis_pengajuan: null,
  id_jenis_pengajuan: null,
  tanggal_buat: null,
  nama_pj: null,
  alamat_pu: null,
  jabatan_pj: null,
  nomor_kontak_pj: null,
  nama_pu: null,
})

const formData = reactive({
  id_reg: submissionId,
  jenis_pendaftaran: null,
  id_jenis_pengajuan: null,
  kode_daftar: null,
  no_mohon: null,
  tgl_surat_permohonan: null,
  tgl_mohon: null,
  jenis_layanan: null,
  jenis_produk: null,
  id_jenis_layanan: null,
  id_jenis_produk: null,
  id_fasilitator: null,
  nama_pu: null,
  area_pemasaran: null,
  lokasi_pendamping: 'Provinsi',
  lembaga_pendamping: null,
  id_lembaga_pendamping: null,
  pendamping: null,
  id_pendamping: null,
})

const listPendaftaran = ref([])
const listFasilitasi = ref([])
const listLayanan = ref([])
const listProduk = ref([])

const listAreaPemasaran = ref([
  { title: 'Kabupaten/Kota', value: 'Kabupaten' },
  { title: 'Provinsi', value: 'Provinsi' },
  { title: 'Nasional', value: 'Nasional' },
  { title: 'Internasional', value: 'Internasional' },
])

const lokasiPendamping = ref([
  { title: 'Kabupaten', value: 'Kabupaten' },
  { title: 'Provinsi', value: 'Provinsi' },
])

const lembagaPendamping = ref([])
const listPendamping = ref([])

const loadDataPendamping = async (lokasi: string | null) => {
  if (lokasi)
    await handleGetLembagaPendamping(lokasi)
}

const handleGetListPendaftaran = async () => {
  try {
    listPendaftaran.value = await $api('/master/jenis-pendaftaran', {
      method: 'get',
    })
  }
  catch (error) {
    console.log(error)
  }
}

const isFasilitator = ref<boolean>(false)
const isKodeNotFound = ref<boolean>(false)
const isKodeFound = ref<boolean>(false)

const handleGetFasilitator = async () => {
  try {
    const response: any = await $api(
      '/self-declare/business-actor/submission/list-fasilitator',
      {
        method: 'get',
        query: {
          reg_id: submissionId,
          lokasi: 'Kabupaten',
        },
      },
    )

    if (response.code === 2000) {
      listFasilitasi.value = response.data
      listFasilitasi.value.push({
        id: 'Lainnya',
        name: 'Lainnya',
      })
    }

    return response
  }
  catch (error) {
    console.log(error)
  }
}

const querySearch = ref('')

const onSelectFasilitator = (selectedId: string) => {
  if ((isFasilitator.value = selectedId === 'Lainnya')) {
    isKodeFound.value = false
    querySearch.value = ''
  }
  else {
    isKodeFound.value = true
    isKodeNotFound.value = false
  }
}

const responseMessage = ref('')
const responseId = ref('')

const onSearchFasilitator = async () => {
  try {
    const kode = querySearch.value

    const response: any = await $api('/self-declare/submission/kode', {
      method: 'post',
      body: {
        kode,
      },
    })

    if (responseMessage.value === 'Kode Fasilitasi dapat digunakan') {
      isKodeFound.value = true
      isKodeNotFound.value = false
      responseMessage.value = ''
      responseId.value = response.id
    }
    else {
      responseMessage.value = response.message
      isKodeFound.value = false
      isKodeNotFound.value = true
    }
  }
  catch (error) {
    console.log(error)
  }
}

const responseType = computed(() => {
  return responseMessage.value === 'Kode Fasilitasi dapat digunakan'
    ? 'success'
    : 'error'
})

const responseColor = computed(() => {
  return responseMessage.value === 'Kode Fasilitasi dapat digunakan'
    ? '#5CB338'
    : '#FB4141'
})

const handleGetJenisLayanan = async () => {
  try {
    listLayanan.value = await $api('/master/jenis-layanan', {
      method: 'get',
    })
  }
  catch (error) {
    console.log(error)
  }
}

const handleGetJenisProduk = async () => {
  try {
    listProduk.value = await $api('/master/products', {
      method: 'get',
    })
  }
  catch (error) {
    console.log(error)
  }
}

const handleGetLembagaPendamping = async (lokasi: string) => {
  try {
    const response: any = await $api(
      '/self-declare/business-actor/submission/list-lembaga-pendamping',
      {
        method: 'get',
        query: {
          id_reg: submissionId,
          lokasi,
        },
      },
    )

    if (response.code === 2000) {
      if (response.data !== null)
        lembagaPendamping.value = response.data
    }

    return response
  }
  catch (error) {
    console.log(error)
  }
}

const handleGetPendamping = async (idLembaga: string | null) => {
  if (!idLembaga)
    return
  try {
    const response: any = await $api(
      '/self-declare/business-actor/submission/list-pendamping',
      {
        method: 'get',
        query: {
          id_lembaga: idLembaga,
        },
      },
    )

    if (response.code === 2000) {
      if (response.data !== null)
        listPendamping.value = response.data
    }

    return response
  }
  catch (error) {
    console.log(error)
  }
}

const { refresh } = await useAsyncData('get-detail-submission', async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${submissionId}/detail`,
      {
        method: 'get',
      },
    )

    if (response.code === 2000) {
      Object.assign(submissionDetail, response.data.certificate_halal)
      submissionDetail.tanggal_buat = response.data.pendaftaran.tgl_daftar
      submissionDetail.nama_pj = response.data.penanggung_jawab.nama_pj
      submissionDetail.nomor_kontak_pj
        = response.data.penanggung_jawab.nomor_kontak_pj
      Object.assign(formData, response.data.certificate_halal)
      formData.tgl_surat_permohonan
        = formData.tgl_mohon != '' ? formatToISOString(formData.tgl_mohon) : null
      if (formData.id_lembaga_pendamping != '')
        await handleGetPendamping(formData.id_lembaga_pendamping)
    }

    return response
  }
  catch (error) {
    console.log(error)
  }
})

const formLembagaPendamping = ref<{}>()
const refVForm = ref<VForm>()

const onSubmitSubmission = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    console.log('ini submit')
    if (formData.id_fasilitator.value === 'Lainnya') {
      if (isValid && isKodeFound.value === true) {
        console.log(' check isvalid', isValid)
        handleUpdateSubmission()
      }
    }
    else {
      if (isValid) {
        console.log(' check isvalid', isValid)
        handleUpdateSubmission()
      }
    }
  })
}

const handleUpdateSubmission = async () => {
  try {
    console.log('update Submission')

    if (isKodeFound.value === true)
      formData.id_fasilitator.value = responseId.value

    const response: any = await $api(
      '/self-declare/business-actor/submission/update',
      {
        method: 'put',
        body: {
          id_reg: submissionId,
          jenis_pendaftaran: formData.id_jenis_pengajuan,
          kode_daftar: formData.id_fasilitator,
          no_surat_permohonan: formData.no_mohon,
          tgl_surat_permohonan: new Date(formData.tgl_surat_permohonan),
          jenis_layanan: formData.id_jenis_layanan,
          jenis_produk: formData.id_jenis_produk,
          nama_usaha: formData.nama_pu,
          area_pemasaran: formData.area_pemasaran,
          lokasi_pendamping: formData.lokasi_pendamping,
          lembaga_pendamping: formData.id_lembaga_pendamping,
          pendamping: formData.id_pendamping,
        },
      },
    )

    if (response.code === 2000) {
      if (response.data !== null) {
        useSnackbar().sendSnackbar('Berhasil mengubah data', 'success')
        refresh()
      }
    }

    return response
  }
  catch (error) {
    useSnackbar().sendSnackbar('Gagal mengubah data', 'error')
  }
}

const findListDaftar = (kode: string) => {
  const data = listPendaftaran.value.find(code => kode == code.code)
  if (data == undefined)
    return { code: null, name: '-' }

  return data
}

onMounted(() => {
  // await Promise.all([
  handleGetListPendaftaran()

  // handleDetailPengajuan();
  handleGetFasilitator()
  handleGetJenisLayanan()
  handleGetJenisProduk()
  loadDataPendamping(formData.lokasi_pendamping)

  // ]);
})
</script>

<template>
  <VCard
    class="pa-3"
    variant="elevated"
    elevation="9"
  >
    <VForm
      ref="refVForm"
      @submit.prevent="() => {}"
    >
      <!-- @submit.prevent="onSubmitSubmission" -->
      <VCardTitle class="d-flex justify-space-between align-center font-weight-bold text-h4 mb-5">
        <div>Data Pengajuan</div>
        <VBtn
          type="submit"
          color="primary"
          variant="flat"
          text="Simpan Perubahan"
          @click="onSubmitSubmission"
        />
      </VCardTitle>
      <VCardTitle>
        <VRow>
          <VCol cols="2">
            Tanggal
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="9">
            {{
              submissionDetail.tanggal_buat
                ? submissionDetail.tanggal_buat
                : "-"
            }}
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="2">
            Jenis Pengajuan
          </VCol>
          <VCol cols="1">
            :
          </VCol>
          <VCol cols="9">
            {{
              findListDaftar(submissionDetail.id_jenis_pengajuan as any).name
            }}
          </VCol>
        </VRow>
        <br>
        <br>
        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Jenis Pendaftaran</VLabel>
              <VSelect
                v-model="formData.id_jenis_pengajuan"
                density="compact"
                :items="listPendaftaran"
                item-title="name"
                item-value="code"
                disabled
                placeholder="Pilih Jenis Pendaftaran"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <br>
        <VRow>
          <VCol cols="12">
            <VLabel>Kode Daftar / Fasilitasi</VLabel>
            <VRow>
              <VCol cols="5">
                <VSelect
                  v-model="formData.id_fasilitator"
                  density="compact"
                  :items="listFasilitasi"
                  item-title="name"
                  :rules="[requiredValidator]"
                  item-value="id"
                  placeholder="Pilih Fasilitator"
                  @update:model-value="onSelectFasilitator"
                />
              </VCol>
            </VRow>

            <VSpacer
              v-if="isFasilitator"
              style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
"
            >
              <p>Atau</p>
            </VSpacer>
            <VCol
              v-if="isFasilitator"
              cols="5"
            >
              <VTextField
                v-model="querySearch"
                placeholder="Masukan Kode Fasilitasi"
                append-inner-icon="mdi-magnify"
                density="compact"
                :rules="[requiredValidator]"
                @input="onSearchFasilitator"
              />
            </VCol>
          </vcol>
        </VRow>

        <VAlert
          v-if="isKodeNotFound"
          :type="responseType"
          variant="tonal"
          :color="responseColor"
          class="mt-5"
        >
          {{ responseMessage }}
        </VAlert>

        <VAlert
          v-if="isKodeFound"
          type="success"
          variant="tonal"
          color="#5CB338"
          class="mt-5"
        >
          Kode Fasilitasi dapat digunakan
        </VAlert>

        <VAlert
          type="warning"
          variant="tonal"
          color="#652672"
          class="mt-5"
        >
          Kode unik yang diterbitkan oleh BPJPH yang diberikan kepada
          fasilitator sebagai kode untuk mendaftarkan sertifikasi halal
          gratis
        </VAlert>

        <VAlert
          v-if="isKodeFound"
          type="warning"
          variant="tonal"
          color="#652672"
          class="mt-5"
        >
          Pastikan anda melengkapi isian pengajuan sertifikasi halal dan mengirimkan pengajuan untuk memperoleh fasilitasi sertifikat halal.
        </VAlert>
        </VCol>
        </VRow>
        <br>
        <VDivider />
        <br>
        <VRow>
          <VCol cols="6">
            <VItemGroup>
              <VLabel>Nomor Surat Permohonan</VLabel>
              <VTextField
                v-model="formData.no_mohon"
                :rules="[requiredValidator]"
                placeholder="Isi Nomor Surat Permohonan"
                density="compact"
              />
            </VItemGroup>
            <br>
          </VCol>
          <VCol cols="6">
            <VItemGroup>
              <Vuepicdatepicker>
                <template #trigger>
                  <Vuepicdatepicker
                    v-model:model-value="formData.tgl_surat_permohonan"
                    auto-apply
                    model-type="yyyy-MM-dd"
                    :enable-time-picker="false"
                    :rules="[requiredValidator]"
                    teleport
                    clearable
                  >
                    <template #trigger>
                      <VLabel class="required">
                        Tanggal Surat Pemohon
                      </VLabel>
                      <VTextField
                        placeholder="Pilih Tanggal Surat Pemohon"
                        :rules="[requiredValidator]"
                        append-inner-icon="fa-calendar"
                        :model-value="formData.tgl_surat_permohonan"
                        color="#757575"
                        readonly
                      />
                    </template>
                  </Vuepicdatepicker>
                </template>
              </Vuepicdatepicker>
            </VItemGroup>
          </VCol>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Jenis Layanan</VLabel>
              <VSelect
                v-model="formData.id_jenis_layanan"
                placeholder="Pilih Jenis Layanan"
                density="compact"
                :items="listLayanan"
                item-title="name"
                :rules="[requiredValidator]"
                item-value="code"
              />
            </VItemGroup>
            <br>
            <VItemGroup>
              <VLabel>Jenis Produk</VLabel>
              <VSelect
                v-model="formData.id_jenis_produk"
                placeholder="Pilih Jenis Produk"
                density="compact"
                :items="listProduk"
                item-title="name"
                :rules="[requiredValidator]"
                item-value="code"
              />
            </VItemGroup>
            <br>
            <VItemGroup>
              <VLabel>Nama Usaha</VLabel>
              <VTextField
                v-model="formData.nama_pu"
                :rules="[requiredValidator]"
                placeholder="Isi Nama Usaha"
                density="compact"
              />
            </VItemGroup>
            <br>
            <VItemGroup>
              <VLabel>Area Pemasaran</VLabel>
              <VSelect
                v-model="formData.area_pemasaran"
                placeholder="Pilih Area Pemasaran"
                :rules="[requiredValidator]"
                density="compact"
                :items="listAreaPemasaran"
              />
            </VItemGroup>
            <br>
            <VItemGroup>
              <VLabel>Lokasi Pendamping</VLabel>
              <VSelect
                v-model="formData.lokasi_pendamping"
                placeholder="Pilih Area Pemasaran"
                density="compact"
                :rules="[requiredValidator]"
                :items="lokasiPendamping"
                @update:model-value="loadDataPendamping"
              />
            </VItemGroup>
            <br>
            <VItemGroup>
              <VLabel>Lembaga Pendamping</VLabel>
              <VSelect
                v-model="formData.id_lembaga_pendamping"
                placeholder="Pilih Area Pemasarang"
                density="compact"
                :items="lembagaPendamping"
                item-title="name"
                :rules="[requiredValidator]"
                item-value="id"
                :disabled="formData.lokasi_pendamping == null"
                @update:model-value="handleGetPendamping"
              />
            </VItemGroup>
            <br>
            <VItemGroup>
              <VLabel>Pendamping</VLabel>
              <VSelect
                v-model="formData.id_pendamping"
                placeholder="Pilih Pendamping"
                density="compact"
                :items="listPendamping"
                :rules="[requiredValidator]"
                item-title="name"
                :disabled="formData.lokasi_pendamping == null"
                item-value="id"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <br>
        <div style="display: flex; justify-content: end;">
          <VItemGroup style="display: inline-flex;">
            <SuratPermohonanModal :data="submissionDetail" />
            <div style="margin-inline-start: 1svw;" />
            <SuratPernyataanModal :data="submissionDetail" />
          </VItemGroup>
        </div>
      </VCardTitle>
    </VForm>
  </VCard>
</template>
