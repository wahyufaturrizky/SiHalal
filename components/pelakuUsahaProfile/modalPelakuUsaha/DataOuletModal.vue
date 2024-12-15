<script setup lang="ts">
import type { MasterDistrict } from '@/server/interface/master.iface';
import { computed, defineEmits, defineProps, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import type { VForm } from 'vuetify/components';

const props = defineProps({
  mode: { type: String, default: 'add' },
  initialData: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['confirmAdd', 'confirmEdit', 'cancel'])

const isVisible = ref(false)

const openDialog = async () => {
  if (props.mode == 'add')
    resetForm()

  await getProvince()

  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const selectedIdOutlet = ref()

const confirm = () => {
  let whichEmit: any = null
  if (props.mode === 'add')
    whichEmit = 'confirmAdd'
  else
    whichEmit = 'confirmEdit'

  vformref.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      emit(whichEmit, form.value, selectedIdOutlet.value)
      closeDialog()
    }
  })
}

const cancel = () => {
  emit('cancel')
  closeDialog()
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})

const form = ref({
  namaOutlet: '',
  alamatOutlet: '',
  kabKota: '',
  provinsi: '',
  negara: 'Indonesia',
  kodePos: '',
})

const resetForm = () => {
  form.value = {
    namaOutlet: '',
    alamatOutlet: '',
    kabKota: '',
    provinsi: '',
    negara: 'Indonesia',
    kodePos: '',
  }
}

const vformref = ref<VForm>()

const provinsiOptions = ref([])
const kabKotaOptions = ref([])

const getDistrict = async (kode: string) => {
  form.value.kabKota = ''

  const response: MasterDistrict[] = await $api('/master/district', {
    method: 'post',
    body: {
      province: kode,
    },
  })

  kabKotaOptions.value = response
}

const getProvince = async () => {
  const response = await $api('/master/province', {
    method: 'get',
  })

  provinsiOptions.value = response
}

watch(
  () => props.initialData,
  newData => {
    if (props.mode === 'edit' && newData) {
      form.value.namaOutlet = newData.name
      form.value.alamatOutlet = newData.address
      form.value.provinsi = newData.province_code
      form.value.negara = 'Indonesia'
      form.value.kodePos = newData.postal_code

      getDistrict(newData.province_code).then(val => {
        form.value.kabKota = kabKotaOptions.value.filter(
          resp => resp.code == newData.city_code,
        )[0]?.name
      })

      selectedIdOutlet.value = newData.id
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="ma-1">
    <VBtn
      v-if="props.mode === 'add'"
      variant="outlined"
      append-icon="ri-add-line"
      @click="openDialog"
    >
      Tambah
    </VBtn>

    <VBtn
      v-else-if="props.mode === 'edit'"
      variant="text"
      prepend-icon="ri-edit-line"
      @click="openDialog"
    >
      Ubah
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>{{
            props.mode === "add" ? "Tambah Data Outlet" : "Edit Data Outlet"
          }}</span>
          <VBtn
            icon
            color="transparent"
            style="border: none;"
            elevation="0"
            @click="closeDialog"
          >
            <VIcon color="black">
              ri-close-line
            </VIcon>
          </VBtn>
        </VCardTitle>

        <VCardText>
          <VForm ref="vformref">
            <VItemGroup>
              <VLabel>Nama Outlet</VLabel>
              <VTextField
                v-model="form.namaOutlet"
                :rules="[requiredValidator]"
                outlined
                dense
                required
                class="mb-2"
              />
            </VItemGroup>
            <VItemGroup>
              <VLabel>Alamat Outlet</VLabel>
              <VTextField
                v-model="form.alamatOutlet"
                :rules="[requiredValidator]"
                outlined
                dense
                required
                class="mb-2"
              />
            </VItemGroup>

            <VRow
              no-gutters
              class="mb-2"
            >
              <VCol cols="5">
                <VItemGroup>
                  <VLabel>Provinsi</VLabel>
                  <VAutocomplete
                    v-model="form.provinsi"
                    :rules="[requiredValidator]"
                    :items="provinsiOptions"
                    item-title="name"
                    item-value="code"
                    outlined
                    dense
                    required
                    class="input-field"
                    @update:model-value="getDistrict"
                  />
                </VItemGroup>
              </VCol>
              <VSpacer />
              <VCol
                cols="5"
                class="me-2"
              >
                <VItemGroup>
                  <VLabel>Kab/Kota</VLabel>
                  <VAutocomplete
                    v-model="form.kabKota"
                    :rules="[requiredValidator]"
                    :items="kabKotaOptions"
                    item-title="name"
                    item-value="code"
                    outlined
                    dense
                    required
                    class="input-field"
                    @update:model-value="getDistrict"
                  />
                </VItemGroup>
              </VCol>
            </VRow>

            <VRow no-gutters>
              <VCol
                cols="5"
                class="me-2"
              >
                <VItemGroup>
                  <VLabel>Negara</VLabel>
                  <VTextField
                    v-model="form.negara"
                    disabled
                    outlined
                    dense
                    required
                  />
                </VItemGroup>
              </VCol>
              <VSpacer />
              <VCol cols="5">
                <VItemGroup>
                  <VLabel>Kode Pos</VLabel>
                  <VTextField
                    v-model="form.kodePos"
                    :rules="[
                      requiredValidator,
                      lengthValidator(form.kodePos, 5),
                    ]"
                    maxlength="5"
                    outlined
                    dense
                    required
                  />
                </VItemGroup>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>

        <div class="d-flex justify-end ga-2">
          <VBtn
            variant="outlined"
            @click="cancel"
          >
            Batal
          </VBtn>
          <VBtn
            :color="props.confirmColor"
            @click="confirm"
          >
            {{ props.mode === "add" ? "Tambah" : "Simpan" }}
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.d-flex {
  display: flex;
}

.justify-end {
  justify-content: flex-end;
}

.mb-4 {
  margin-block-end: 16px;
}

.text-red {
  color: red;
}
</style>
