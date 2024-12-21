<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

import { useDisplay } from 'vuetify'

const props = defineProps({
  newRegister: {
    type: Function,
    default: () => {},
    required: false,
  },
  additionalRegister: {
    type: Function,
    default: () => {},
    required: false,
  },
  data: {
    type: Array,
    required: false,
  },
})

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const selectedItem = ref(null)

const onRegister = () => {
  props.newRegister('JD.1', selectedItem.value)
  isVisible.value = false
}

const onAddRegister = () => {
  props.newRegister('JD.3', selectedItem.value)
  isVisible.value = false
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 750 : '90%'
})
</script>

<template>
  <div class="mb-2">
    <VBtn @click="openDialog" variant="flat"> Ajukan Layanan </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle>Layanan Sertifikasi Halal</VCardTitle>
        <VCardText>
          Ajukan Permohonan Anda untuk mendapatkan sertifikasi halal dari BPJPH
          dengan memilih salah satu diantara layanan dibawah ini:
        </VCardText>
        <VRow
          no-gutters
          class="pa-4 ga-2"
        >
          <VCol>
            <VCard class="text-center">
              <VCardTitle class="text-center text-h6">
                Baru
              </VCardTitle>
              <VDivider />
              <VCardText class="mt-0">
                Proses sertifikasi halal untuk produk baru<br>
                yang <strong>belum pernah</strong> /
                <strong>belum memiliki</strong><br>
                sertifikat halal sebelumnya
              </VCardText>
              <VDivider />
              <VCardActions class="pa-2 justify-center">
                <VBtn
                  variant="flat"
                  style="min-width: 100%"
                  @click="onRegister"
                >
                  Daftar
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
          <VCol>
            <VCard class="text-center">
              <VCardTitle class="text-center text-h6">
                Baru (Pengembang)
              </VCardTitle>
              <VDivider />
              <VCardText class="mt-0">
                Proses sertifikasi halal untuk produk baru<br>
                yang <strong>belum pernah</strong> /
                <strong>belum memiliki</strong><br>
                sertifikat halal sebelumnya
              </VCardText>
              <VDivider />
              <VCardActions class="pa-2 justify-center">
                <VBtn
                  variant="flat"
                  style="min-width: 100%"
                  @click="onAddRegister"
                >
                  Daftar
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
        </VRow>

        <VCardText>
          <span class="font-weight-bold mb-4">
            Nama Usaha / Kegiatan (Nama yang di tampilkan pada
            sertifikat)
          </span>
          <VSelect
            v-model="selectedItem"
            :items="props?.data"
            item-title="uraian_usaha"
            placeholder="Pilih Nama Usaha"
            item-text="uraian_usaha"
            item-value="id"
          />
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
