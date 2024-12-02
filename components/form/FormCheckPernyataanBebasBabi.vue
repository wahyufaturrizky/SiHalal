<script setup lang="ts">
const emit = defineEmits(['confirm'])

const item = ref(0)

const check = ref(false)

const submit = () => {
  if (!check.value)
    return

  if (check.value) {
    emit('confirm', true)

    return
  }
  if (check.value)
    item.value = item.value + 1
  check.value = false
}

const data = ref({
  nama: 'Sumayah',
  jabatan: 'Tim Manajemen Halal',
  nib: '0923493402432',
  perusahaan: 'Samsul',
})

onMounted(() => {
  item.value = 0
})
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle>
      Pernyataan Bebas Babi
    </VCardTitle>

    <VCardItem>
      <VCard class="border rounded pa-4">
        <VCardItem v-if="item === 0">
          <VCardTitle class="d-flex justify-center mb-4">
            <span class="text-h3">Pernyataan Bebas Babi</span>
          </VCardTitle>
          <VCardText class="pa-8">
            <span class="text-h5">
              Yang bertanda tangan di bawah ini :
            </span>
            <InfoRow name="Nama" :nameStyle="{fontWeight: 'bold' }">{{data.nama}}</InfoRow>
            <InfoRow name="Jabatan" :nameStyle="{fontWeight: 'bold' }">{{data.jabatan}}</InfoRow>
            <InfoRow name="NIB" :nameStyle="{fontWeight: 'bold' }">{{data.nib}}</InfoRow>
            <InfoRow name="Perusahaan" :nameStyle="{fontWeight: 'bold' }">{{data.perusahaan}}</InfoRow>
            <br />
            <p>
              Menyatakan bahwa perusahaan kami tidak menggunakan bahan, fasilitas, dan
              memproduksi produk yang mengandung babi dan turunannya yang bersifat najis dan
              bahan berbahaya.
            </p>
            <p>
              Demikian surat ini dibuat dengan sebenar-benarnya untuk dapat digunakan dengan
              semesti nya
            </p>
          </VCardText>
        </VCardItem>
      </VCard>
    </VCardItem>
    <VCardActions>
      <VCheckbox
        id="checkPernyataanBebasBabi"
        v-model="check"
      />
      <VLabel for="checkPernyataanBebasBabi">
        Saya Telah Membaca seluruh persyaratan yang telah dicantumkan, dan berjanji akan memenuhi kebijakan tersebut.
      </VLabel>
    </VCardActions>
    <VCardActions class="d-flex justify-center">
      <VBtn
        min-width="120px"
        max-width="120px"
        variant="flat"
        block
        @click="submit"
      >
        Saya Setuju
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="scss">

#left {
  font-weight: bold;
}

</style>
