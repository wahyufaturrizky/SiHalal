<!-- eslint-disable vue/prop-name-casing -->
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  onSubmit: {
    type: Function,
    default: () => {},
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  withAddButton: {
    type: Boolean,
    required: true,
  },
  service_type: {
    type: Array,
    required: false,
  },
  product_type: {
    type: Array,
    required: false,
  },
  jenis_layanan: {
    type: String,
    required: false,
  },
  area_pemasaran: {
    type: String,
    required: false,
  },
  isviewonly: {
    type: Boolean,
  },
  isDisabled: {
    type: Boolean,
  },
  facId: {
    type: String,
    required: false,
  },
  facMessage: {
    type: String,
    required: false,
  },
})

const emit = defineEmits()
const { t } = useI18n()
const itemsLph = ref<any>([])
const searchRegisType = ref<string>(props?.facId)
const messageFasilitator = ref<string>(props?.facMessage)
const productList = ref<any[]>([])
const isDisabledForm = ref(false)

const listAreaPemasaran = [
  { name: 'Kabupaten/Kota', code: 'Kabupaten/Kota' },
  { name: 'Provinsi', code: 'Provinsi' },
  { name: 'Nasional', code: 'Nasional' },
  { name: 'Internasional', code: 'Internasional' },
]

const getSelectOptions = (field: string): string => {
  let data: string[] = []
  field = t(field)
  switch (field) {
    case t('pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnslay'):
      data = props?.service_type
    break;

    case t('pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnsprod'):
      data = productList.value || []
    break;
    case 'Skala Usaha':
      data = ['Mikro', 'Kecil', 'Menengah', 'Besar']
    break;
    case t('pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnsdaftar'):
      data = [
        { name: 'Pendaftaran Mandiri/Reguler ', code: '' },
        { name: 'Pendaftaran Melalui Fasilitasi', code: 'CH002' },
      ];
      break;
    case t('pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnspengajuan'):
      data = [{ name: 'baru', code: 'baru' }]
    break;
    case 'Nama Fasilitas':
      data = ['Es Cream', 'Minuman', 'Snack', 'Lainnya']
    break;
    case 'Pengujian Laboratorium':
      data = ['Ada', 'Tidak Ada']
    break;
    case 'Hasil Audit':
      data = ['Lulus', 'Tidak Lulus']
  case t('pengajuan-reguler.reguler-form--pengajuan-pengajuan-marketing'):
      data = listAreaPemasaran || []
    break;
    default:
      break;
  }

  return data
}

const getLph = async (path: string, layanan: string, area: string) => {
  try {
    const params = {
      url: `${path}/${props?.id}/lph?jenis_layanan=${layanan}&area_pemasaran=${area}`,
      page: 1,
      size: 10,
      keyword: '',
    }

    const response: any = await $api('/reguler/list', {
      method: 'get',
      params,
    })

    if (response?.code === 2000)
      itemsLph.value = response.data
  }
  catch (error) {
    // useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const onSubmit = async () => {
  if (props?.title === t('pengajuan-reguler.reguler-form--pengajuan-pengajuan-title')) {
    const jenisLayanan = props?.service_type?.find(
      (item: any) =>
        props.data?.[3]?.value === item.name
        || props.data?.[3]?.value === item.code,
    )

    const jenisProduk = props?.product_type?.find(
      (item: any) =>
        props.data?.[4]?.value === item.name
        || props.data?.[4]?.value === item.code,
    )

    const tanggalDaftar
      = props.data[2]?.value && formatDateIntl(new Date(props.data[2]?.value))

    const lphId = itemsLph.value?.find(
      (item: any) =>
        props.data[7]?.value === item.nama_lph
        || props.data[7]?.value === item.lph_id,
    )

    const payload = {
      id_reg: props?.id,
      nama_pu: props.data[0]?.value,
      no_mohon: props.data[1]?.value,
      tgl_daftar: `${tanggalDaftar?.split('/')?.[2]}-${
        tanggalDaftar?.split('/')?.[1]
      }-${tanggalDaftar?.split('/')?.[0]}`,
      jenis_layanan: jenisLayanan?.code || props?.service_type?.[0].code || props.data?.[3]?.value,
      jenis_produk: jenisProduk?.code || props.data?.[4]?.value,
      merk_dagang: props.data[5]?.value,
      area_pemasaran: props.data?.[6]?.value,
      lph_id: lphId ? lphId.lph_id : props.data[7]?.id ? props.data[7]?.id : props.data[7]?.value,
      channel_id: '',
      fac_id: props.data[9]?.value,
    }

    if (lphId || props.data[7]?.id)
      props.onSubmit(payload)
    else
      props.onSubmit('error')
  }
  else {
    props.onSubmit()
  }
}

const route = useRoute<''>()
const submissionId = route.params?.id

const getProductType = async (id: string) => {
  try {
    // const response: any =
    //   await $api('/master/product-filter', {
    //   method: 'get',
    //   params: { id },
    // })

    const jenisLayanan = props?.service_type?.find(
      (item: any) =>
        props.data?.[3]?.value === item.name
        || props.data?.[3]?.value === item.code
        || props.data?.[3]?.value === id,
    )

    const response = await $api("/master/product-filter-by-regid", {
      method: "get",
      params: {
        id: jenisLayanan?.code,
        idReg: submissionId,
      },
    })

    if (!response) {
      return
    }

    if (response.length) {
      productList.value = response

      return response
    }
    else {
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const lphValidation = async (title: string, value: string, index: number) => {
  if (title === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnslay') {
    props.data.map(el => {
      if (
        el.title
        === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-jnsprod'
      )
        el.value = ''
      else if (
        el.title === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-lph'
      )
        el.value = ''
      else if (
        el.title
        === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-marketing'
      )
        el.value = ''
    })
  }

  const jenisLayanan = props?.service_type?.find(
    (item: any) =>
      props.data?.[3]?.value === item.name
      || props.data?.[3]?.value === item.code,
  )

  if (title === 'pengajuan-reguler.reguler-detail-pengajuan-jnslay') {
    await getProductType(value)
  }
  else if (
    title === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-marketing'
  ) {
    await getLph(LIST_BUSINESS_ACTOR, jenisLayanan?.code, value)
  }

  if (props.title === 'halal_cert_submission.title') {
    const checkData = props.data.map((el: any) => {
      if (el.required && el.value === '')
        return false

      return true
    })
  }
}



const checkCodeFasilitas = async () => {
  try {
    messageFasilitator.value = 'Mohon tunggu'

    const jenisLayanan = props?.service_type?.find(
      (item: any) =>
        props.data?.[3]?.value === item.name
        || props.data?.[3]?.value === item.code,
    )

    if (!jenisLayanan) {
      useSnackbar().sendSnackbar('Jenis layanan tidak boleh kosong', 'error')
      messageFasilitator.value = null

      return
    }

    const jenisProduk = props?.product_type?.find(
      (item: any) =>
        props.data?.[4]?.value === item.name
        || props.data?.[4]?.value === item.code,
    )

    if (!jenisProduk) {
      useSnackbar().sendSnackbar('Jenis produk tidak boleh kosong', 'error')
      messageFasilitator.value = null

      return
    }

    const lphId = itemsLph.value?.find(
      (item: any) =>
        props.data[7]?.value === item.nama_lph
        || props.data[7]?.value === item.lph_id,
    )

    if (!jenisProduk) {
      useSnackbar().sendSnackbar('LPH tidak boleh kosong', 'error')
      messageFasilitator.value = null

      return
    }

    if (!props.data?.[6]?.value) {
      useSnackbar().sendSnackbar('Area pemasaran tidak boleh kosong', 'error')
      messageFasilitator.value = null

      return
    }

    if (!searchRegisType.value) {
      useSnackbar().sendSnackbar('Kode fasilitasi tidak boleh kosong', 'error')
      messageFasilitator.value = null

      return
    }

    const response: any = await $api('/reguler/pelaku-usaha/find-facility-reguler', {
      method: 'post',
      body: {
        lingkup_wilayah: props.data?.[6]?.value,
        kode_fac: searchRegisType.value,
        id_reg: submissionId,
        jenis_layanan: jenisLayanan?.code || props.data?.[3]?.value,
        jenis_produk: jenisProduk?.code || props.data?.[4]?.value,
        lph_id: lphId.lph_id,
      },
    })

    if (response) {
      messageFasilitator.value = response?.message
      emit('complete', response?.data?.[0]?.id)

      if (response?.code === 2000)
        onSubmit()

      return response
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    messageFasilitator.value = null
  }
}

const onSubmitReguler = async () => {
  try {
    // Ensure props.data is not readonly or create a local copy
    const updatedData = [...(props.data ?? [])]
    if (updatedData[9])
      updatedData[9].value = ''

    const response: any = await $api('/reguler/pelaku-usaha/delete-facility-reguler', {
      method: 'delete',
      body: {
        idReg: submissionId,
      },
    })

    if (response) {
      if (response?.code === 2000) {
        searchRegisType.value = ''
        messageFasilitator.value = ''

        useSnackbar().sendSnackbar('Kode fasilitasi dihapus', 'success')
      }

      return response
    }
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')

    // Ensure messageFasilitator is a ref before setting it
    if (messageFasilitator)
      messageFasilitator.value = null
  }
}

onMounted(async () => {
  isDisabledForm.value = props.isDisabled
  if (props?.service_type) {
    const jenisLayanan = props?.service_type?.find(
      (item: any) =>
        props.data?.[3]?.value === item.name
        || props.data?.[3]?.value === item.code,
    )

    if (jenisLayanan || props.data?.[3]?.value)
      await getProductType(jenisLayanan?.code || props.data?.[3]?.value)
    if (jenisLayanan && props.data[6]) {
      await getLph(
        LIST_BUSINESS_ACTOR,
        jenisLayanan?.code,
        props.data?.[6]?.value,
      )
    }
  }
})

watchEffect(async () => {
  // we need to check undefined because if we pass 0 as currentStep it will be falsy
  const jenisLayanan = props?.service_type?.find(
    (item: any) =>
      props.data?.[3]?.value === item.name
      || props.data?.[3]?.value === item.code,
  )

  if (props.data?.[3]?.value)
    await getProductType(jenisLayanan?.code || props.data?.[3]?.value)

  if (jenisLayanan && props.data[6]) {
    await getLph(
      LIST_BUSINESS_ACTOR,
      jenisLayanan?.code,
      props.data?.[6]?.value,
    )
  }
})
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h5 font-weight-bold">{{ props.title }}</span>
    </VCardTitle>
    <VCardText>
      <br>
      <VRow>
        <VCol
          v-for="(item, index) in props.data"
          :key="index"
          :value="item.value"
          cols="12"
        >
          <div v-if="item.type === 'text'">
            <p class="label-pengajuan">
              {{ t(item.title) }}
              <span
                v-if="item.required"
                class="required"
              >*</span>
            </p>
            <div
              v-if="
                item.title.includes('Tanggal')
                  || item.title
                    === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-tglmohon'
              "
            >
              <VueDatePicker
                id="tanggal_daftar"
                v-model="item.value"
                teleport-center
                :enable-time-picker="false"
                format="dd-MM-yyyy"
                :disabled="isDisabledForm"
              />
            </div>
            <div v-else>
              <VTextField
                v-model="item.value"
                class="-mt-10"
                :disabled="isDisabledForm"
              />
            </div>
          </div>
          <div v-if="item.type === 'select'">
            <p class="label-pengajuan">
              {{ t(item.title) }}
              <span
                v-if="item.required"
                class="required"
              >*</span>
            </p>
            <VSelect
              v-if="item.disabled"
              v-model="item.value"
              :items="getSelectOptions(item.title) || []"
              outlined
              class="-mt-10"
              disabled
              bg-color="#F6F6F6"
              :value="item.value"
            />

            <VSelect
              v-if="!item.disabled"
              v-model="item.value"
              :disabled="searchRegisType !== '' || isDisabledForm"
              :items="
                item.title
                  === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-lph'
                  ? itemsLph
                  : getSelectOptions(item.title)
              "
              outlined
              class="-mt-10"
              :item-value="
                item.title
                  === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-lph'
                  ? 'lph_id'
                  : 'code'
              "
              :item-title="
                item.title
                  === 'pengajuan-reguler.reguler-form--pengajuan-pengajuan-lph'
                  ? 'nama_lph'
                  : 'name'
              "
              @update:model-value="
                () => lphValidation(item.title, item.value, index)
              "
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
            <div>
              <p class="label-pengajuan">
                {{ t(item.title) }}
                <span
                  v-if="item.required"
                  class="required"
                >*</span>
              </p>
              <VTextarea
                v-model="item.value"
                class="-mt-10"
                :disabled="isDisabledForm"
              />
            </div>
          </div>
        </VCol>
        <VCol
          v-if="
            props.data?.[9]?.value === 'CH002'
              || props?.data?.[9]?.value === 'Pendaftaran Melalui Fasilitasi'
          "
          cols="12"
        >
          <label> {{ t("pengajuan-reguler.reguler-kode-facilitas") }} </label>
          <div class="d-flex gap-10 mt-3">
            <VTextField
              v-model="searchRegisType"
              :placeholder="t('pengajuan-reguler.reguler-kode-facilitas-2')"
              style="max-inline-size: 13rem;"
            />
            <VBtn
              variant="outlined"
              style="block-size: 45px;"
              @click="checkCodeFasilitas"
            >
              {{ t("pengajuan-reguler.reguler-kode-facilitas-1") }}
            </VBtn>

            <VBtn
              variant="outlined"
              color="#E1442E"
              style="block-size: 45px;"
              @click="onSubmitReguler"
            >
              <VIcon color="red">
                fa-trash
              </VIcon>
            </VBtn>
          </div>
          <VAlert
            v-if="messageFasilitator"
            type="warning"
            variant="tonal"
            color="#652672"
            class="mt-3"
          >
            {{ messageFasilitator }}
            <br>

            <span
              class="text-xs"
              style="padding-top: 20px;"
            >
              Klik <VIcon color="red">
                fa-trash
              </VIcon> untuk mengubah data
            </span>
          </VAlert>
        </VCol>
      </VRow>
      <br>
      <VBtn
        v-if="!isviewonly"
        class="btn-container"
        variant="flat"
        @click="onSubmit"
      >
        {{ t("pengajuan-reguler.reguler-form--pengajuan-pengajuan-save") }}
      </VBtn>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}

.btn-container {
  float: inline-end !important;
}
</style>
