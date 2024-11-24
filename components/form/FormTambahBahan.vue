<script setup lang="ts">
import { useDisplay } from 'vuetify'

const emit = defineEmits(['confirm'])
const tabs = ref(0)

onMounted(() => {
  tabs.value = 0
})

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const closeDialog = () => {
  isVisible.value = false
}

const form = ref({
  name: '',
  address: '',
  regency: '',
  provinsi: '',
  country: '',
  zipCode: '',
})

const resetForm = () => {
  form.value = {
    name: '',
    address: '',
    regency: '',
    provinsi: '',
    country: '',
    zipCode: '',
  }
}

const confirm = () => {
  emit('confirm', form.value)
  resetForm()
  closeDialog()
}

const cancel = () => {
  closeDialog()
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 700 : '90%'
})
</script>

<template>
  <div class="mb-2">
    <VBtn
      variant="outlined"
      append-icon="ri-add-line"
      @click="openDialog"
    >
      Tambah
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
          <span>Tambah Data Bahan</span>
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
        <VCardItem>
          <div
            class="d-flex justify-center align-center"
          >
            <VTabs
              v-model="tabs"
              align-tabs="center"
              bg-color="#c9c9c9"
              class="border pa-2"
              style="border-radius: 40px"
              height="auto"
            >
              <VTab
                value="1"
                base-color="#c9c9c9"
                active-color="primary"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span>Unggah File </span>
              </VTab>
              <VTab
                value="2"
                base-color="#c9c9c9"
                active-color="primary"
                style="border-radius: 40px"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual  </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsWindow v-model="tabs">
            <br>
            <VTabsWindowItem value="1">
              <VRow no-gutters class="mb-4">
                <VCol cols="6" class="d-flex align-center">
                  <span>
                    Unduh template acuan "unggah bahan"
                  </span>
                </VCol>
                <VCol cols="6">
                  <VBtn append-icon="mdi-download">
                    Unduh
                  </VBtn>
                </VCol>
              </VRow>
              <VRow no-gutters>
                <VCol cols="6" class="d-flex align-center">
                  <span>
                    Unggah Bahan
                  </span>
                </VCol>
                <VCol cols="6">
                  <VBtn>
                    Choosee File
                  </VBtn>
                </VCol>
              </VRow>
            </VTabsWindowItem>

            <VTabsWindowItem value="2">
              TAB 2
            </VTabsWindowItem>
          </VTabsWindow>
        </VCardItem>

        <div class="d-flex justify-end ga-2">
          <VBtn
            variant="outlined"
            @click="cancel"
          >
            Batal
          </VBtn>
          <VBtn @click="confirm">
            Tambah
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
</style>
