<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { VTextField } from 'vuetify/components'

const emit = defineEmits(['refresh'])

const route = useRoute()

const selfDeclareId = (route.params as any).id
const isFormError = ref(false)
const loadingAll = ref(false)
const uploadType = ref('UNGGAH')

const listPenetapan = ref(
  [
    {
      code: 'SF001',
      name: 'Halal',
      name_eng: '',
    },
    {
      code: 'SF002',
      name: 'Tidak Halal',
      name_eng: '',
    },
  ],
)

const fileExtensionValidator = (value: any) => {
  let file = value
  if (Array.isArray(value))
    file = value[0]

  console.log('file attribute = ', value[0].type)

  const allowedFileExtensionList = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'application/pdf',
  ]

  const result = useArrayIncludes(allowedFileExtensionList, file.type).value
  if (result) {
    isFormError.value = false

    return true
  }
  isFormError.value = true

  return 'File extension not allowed'
}

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData()

    formData.append('id', selfDeclareId)
    formData.append('file', file)
    formData.append('type', 'ketetapan-halal')

    const response: any = await $api('/shln/submission/document/upload', {
      method: 'post',
      body: formData,
    })

    if (response?.code === 2000) {
      return response
    }
    else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error',
      )
      loadingAdd.value = false
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar(
      'ada kesalahan saat upload file, gagal menyimpan!',
      'error',
    )
    loadingAdd.value = false
  }
}

const addDialog = ref(false)
const loadingAdd = ref(false)

const formData = ref({
  no_penetapan: '',
  penetapan: '',
  tgl_penetapan: new Date().toISOString().slice(0, 10),
  keterangan: '',
  dokumen: null,
})

const resetForm = () => {
  formData.value = {
    no_penetapan: '',
    penetapan: '',
    keterangan: '',
    tgl_penetapan: new Date().toISOString().slice(0, 10),
    dokumen: null,
  }
}

const addDataPenyeliaHalal = async () => {
  try {
    loadingAdd.value = true

    const { dokumen } = formData.value

    let fileSpph

    if (dokumen) {
      fileSpph = await uploadDocument(dokumen)
      if (fileSpph.code !== 2000)
        return
    }

    const res: any = await $api(
      `/sidang-fatwa/entri-ketetapan-halal/add/${selfDeclareId}`,
      {
        method: 'put',
        body: {
          ...formData.value,
          dokumen: fileSpph?.data?.file_url || '',
        },
      },
    )

    if (res?.code === 2000) {
      loadingAdd.value = false
      resetForm()
      addDialog.value = false
      useSnackbar().sendSnackbar('Berhasil menambahkan data', 'success')
      emit('refresh')
    }
    else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(', '), 'error')
      loadingAdd.value = false
      resetForm()
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    loadingAdd.value = false
    resetForm()
  }
}

const checkIsFieldEmpty = (data: any) => {
  return Object.keys(data)?.find((key: any) => {
    if (uploadType.value === 'GENERATE') {
      if (formData.value.penetapan === 'SF004')
        return key !== 'dokumen' && key !== 'no_penetapan' && !data[key]
      else
        return key !== 'dokumen' && key !== 'no_penetapan' && key !== 'keterangan' && !data[key]
    }

    return key !== 'keterangan' && !data[key] // Always allow 'keterangan'
  })
}

const { mdAndUp } = useDisplay()
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : '90%'))

onMounted(async () => {
  // const res = await Promise.all([loadItemPenetapan()])

  // const checkResIfUndefined = res.every((item: any) => {
  //   return item !== undefined
  // })

  // if (checkResIfUndefined)
  //   loadingAll.value = false
  // else
  //   loadingAll.value = false
})
</script>

<template>
  <VBtn
    style="margin: 1svw;"
    @click="addDialog = true"
  >
    Unggah Ketetapan Halal
  </VBtn>

  <VDialog
    v-model="addDialog"
    :max-width="dialogMaxWidth"
  >
    <VCard v-if="!loadingAll">
      <VCardTitle>
        <VRow>
          <VCol cols="10">
            <h3>Unggah Ketetapan Halal</h3>
          </VCol>

          <VCol
            cols="2"
            style="display: flex; justify-content: end;"
          >
            <VIcon
              size="small"
              icon="fa-times"
              @click="addDialog = false"
            />
          </VCol>
        </VRow>

        <VRow justify="center">
          <VCol cols="4">
            <VSheet
              rounded="pill"
              color="#6526721A"
              class="pa-2 d-flex justify-space-between"
              style="inline-size: max-content;"
            >
              <VBtn
                :variant="uploadType === 'UNGGAH' ? 'flat' : 'text'"
                rounded="pill"
                size="large"
                class="me-5"
                @click="
                  () => {
                    resetForm();
                    uploadType = 'UNGGAH';
                  }
                "
              >
                Unggah
              </VBtn>
              <VBtn
                :variant="uploadType === 'GENERATE' ? 'flat' : 'text'"
                rounded="pill"
                size="large"
                @click="
                  () => {
                    resetForm();
                    uploadType = 'GENERATE';
                  }
                "
              >
                Generate
              </VBtn>
            </VSheet>
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem>
        <VRow v-if="uploadType !== 'GENERATE'">
          <VCol cols="12">
            <VItemGroup>
              <VLabel>No. Penetapan</VLabel>
              <VTextField
                v-model="formData.no_penetapan"
                placeholder="Isi Nomor Penetapan"
              />
            </VItemGroup>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Tanggal</VLabel>
              <VTextField
                v-model="formData.tgl_penetapan"
                disabled
                placeholder="Isi Tanggal Sertifikat"
                type="date"
              />
            </VItemGroup>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Penetapan</VLabel>
              <VSelect
                v-model="formData.penetapan"
                :items="listPenetapan"
                item-title="name"
                item-value="code"
                placeholder="Pilih Jenis Dokumen"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>

        <VRow v-if="formData.penetapan === 'SF004'">
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Alasan</VLabel>
              <VTextarea
                v-model="formData.keterangan"
                placeholder="Masukkan Alasan"
              />
            </VItemGroup>
          </VCol>
        </VRow>

        <VRow v-if="uploadType !== 'GENERATE'">
          <VCol cols="12">
            <VRow>
              <VCol cols="8">
                <h3>Unggah File KH</h3>
              </VCol>
              <VCol cols="4">
                <HalalFileInput
                  :model-value="formData.dokumen"
                  :rules="[
                    requiredValidator,
                    fileExtensionValidator,
                    (value: any) => {
                      if (value && value.length && value[0].size > 2000000) {
                        isFormError = true
                        return 'file maksimum 2MB'
                      }
                      else {
                        isFormError = false
                      }
                    },
                  ]"
                  @update:model-value="formData.dokumen = $event"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCardItem>
      <VCardActions style="display: flex; justify-content: end; padding: 1.5svw;">
        <div>
          <VBtn
            :disabled="loadingAdd"
            variant="outlined"
            @click="addDialog = false"
          >
            Batal
          </VBtn>
          <VBtn
            :loading="loadingAdd"
            :disabled="checkIsFieldEmpty(formData) || isFormError"
            variant="flat"
            @click="addDataPenyeliaHalal"
          >
            {{
              uploadType === "UNGGAH" ? "Simpan" : "Generate Ketetapan"
            }}
          </VBtn>
        </div>
      </VCardActions>
    </VCard>
    <VSkeletonLoader
      v-else
      type="table-heading, list-item-two-line, image, table-tfoot"
    />
  </VDialog>
</template>
