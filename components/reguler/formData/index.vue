<!-- eslint-disable vue/prop-name-casing -->
<script setup lang="ts">
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
})

console.log(props.jenis_layanan, props.area_pemasaran, props.id)

const itemsLph = ref<any>({})
const localData = ref(props?.data)

const getSelectOptions = (field: string): string => {
  let data: string[] = []
  switch (field) {
    case 'Jenis Layanan':
      data = props?.service_type
      break
    case 'Jenis Produk':
      data = props?.product_type
      break
    case 'Skala Usaha':
      data = ['Mikro', 'Kecil', 'Menengah', 'Besar']
      break
    case 'Jenis Pendaftaran':
      data = ['Self Declare', 'Lainnya']
      break
    case 'Nama Fasilitas':
      data = ['Es Cream', 'Minuman', 'Snack', 'Lainnya']
      break
    case 'Pengujian Laboratorium':
      data = ['Ada', 'Tidak Ada']
      break
    case 'Hasil Audit':
      data = ['Lulus', 'Tidak Lulus']
    case 'Area Pemasaran':
      data = [
        { name: 'Kabupaten/Kota', code: '1' },
        { name: 'Provinsi', code: '2' },
        { name: 'Nasional', code: '3' },
        { name: 'Internasional', code: '4' },
      ]
      break
    default:
      break
  }

  return data
}

const getLph = async (path: string) => {
  try {
    const params = {
      url: `${path}/${props?.id}/lph?jenis_layanan=A0000&area_pemasaran=Internasional`,
      page: 1,
      size: 10,
      keyword: '',
    }

    const response: any = await $api('/reguler/list', {
      method: 'get',
      params,
    })

    console.log(response)
    if (response?.code === 2000)
      itemsLph.value = response.data
    else
      useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

const onSubmit = async () => {
  const payload = {
    id_reg: props?.id,
    nama_pu: props.data[0].value,
    no_mohon: props.data[1].value,
    tgl_daftar: props.data[2].value,
    jenis_layanan: props.data[3].value,
    jenis_produk: props.data[4].value,
    merk_dagang: props.data[5].value,
    area_pemasaran: props.data[6].value,
    lph_id: props.data[7].value,
    channel_id: props.data[8].value,
    fac_id: props.data[9].value,
  }

  props.onSubmit(payload)
}

onMounted(async () => {
  if (props.title === 'Pengajuan Sertifikasi Halal')
    await getLph(LIST_BUSINESS_ACTOR)
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
          :key="item.title"
          :value="item.value"
          cols="12"
        >
          <div v-if="item.type === 'text'">
            <p class="label-pengajuan">
              {{ item.title }}
              <span v-if="item.required" class="required">*</span>
            </p>
            <VTextField v-model="item.value" class="-mt-10" />
          </div>
          <div v-if="item.type === 'select'">
            <p class="label-pengajuan">
              {{ item.title }}
              <span v-if="item.required" class="required">*</span>
            </p>
            <VSelect
              v-if="item.disabled"
              v-model="item.value"
              :items="getSelectOptions(item.title)"
              outlined
              class="-mt-10"
              disabled
              bg-color="#F6F6F6"
              :value="item.value"
            />
            <VSelect
              v-if="!item.disabled"
              v-model="item.value"
              :items="item.title === 'LPH' ? itemsLph : getSelectOptions(item.title)"
              outlined
              class="-mt-10"
              :item-value="item.title === 'LPH' ? 'lph_id' : 'code'"
              :item-title="item.title === 'LPH' ? 'nama_lph' : 'name'"
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
                {{ item.title }}
                <span v-if="item.required" class="required">*</span>
              </p>
              <VTextarea v-model="item.value" class="-mt-10" />
            </div>
          </div>
        </VCol>
      </VRow>
      <br />
      <VBtn class="btn-container" variant="flat" @click="onSubmit">
        Simpan
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
