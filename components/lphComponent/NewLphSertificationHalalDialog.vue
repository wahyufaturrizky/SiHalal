<template>
  <div class="mb-2">
    <VBtn @click="openDialog"  variant="flat">
      Ajukan Layanan
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle>Layanan Sertifikasi Halal</VCardTitle>
        <VCardText>Ajukan Permohonan Anda untuk mendapatkan sertifikasi halal dari BPJPH dengan memilih salah satu diantara layanan dibawah ini: </VCardText>
        <VRow no-gutters class="pa-4 ga-2">
          <VCol >
            <VCard class="text-center">
              <VCardTitle class="text-center text-h6">Baru</VCardTitle>
              <VDivider></VDivider>
              <VCardText class="mt-0">
                Proses sertifikasi halal untuk produk baru<br />
                yang <strong>belum pernah</strong> / <strong>belum memiliki</strong><br />
                sertifikat halal sebelumnya
              </VCardText>
              <VDivider></VDivider>
              <VCardActions class="pa-2 justify-center" >
                <VBtn variant="flat" style="min-width: 100%;" @click="newRegister">
                  Daftar
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
          <VCol>
            <VCard class="text-center">
              <VCardTitle class="text-center text-h6" >Baru (Pengembang) </VCardTitle>
              <VDivider></VDivider>
              <VCardText class="mt-0">
                Proses sertifikasi halal untuk produk baru<br />
                yang <strong>belum pernah</strong> / <strong>belum memiliki</strong><br />
                sertifikat halal sebelumnya
              </VCardText>
              <VDivider></VDivider>
              <VCardActions class="pa-2 justify-center">
                <VBtn variant="flat" style="min-width: 100%;" @click="additionalRegister">
                  Daftar
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
        </VRow>

        <VCardText>
          <span class="font-weight-bold mb-4">Nama Usaha / Kegiatan (Nama yang di tampilkan pada sertifikat)</span>
          <v-select
            v-model="selectedItem"
            :items="items"
            item-title="text"
            placeholder="Pilih Nama Usaha"
            item-text="text"
            item-value="value"
          ></v-select>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
})

const isVisible = ref(false)

const openDialog = () => {
  isVisible.value = true
}

const selectedItem = ref(null);
const items = [
  { text: 'Nama Usaha 1', value: '1' },
  { text: 'Nama Usaha 2', value: '2' },
  { text: 'Nama Usaha 3', value: '3' },
];

const newRegister = () => {
  console.log("new register ; ", selectedItem)
  isVisible.value = false
}

const additionalRegister = () => {
  console.log("additional register ; ", selectedItem)
  isVisible.value = false

}


const { mdAndUp } = useDisplay()
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 750 : '90%'
})
</script>

<style scoped>
</style>
