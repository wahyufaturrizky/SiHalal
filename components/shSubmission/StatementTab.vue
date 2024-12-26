<script setup lang="ts">
const isRead = ref(false);

const guarantorData = ref({
  name: "Sumayah",
  businessName: "Minuman Rasarasa",
  businessAddress: "Sumbangan, RT002/007, Jombang, Jawa Barat, Indonesia",
  outletAddress: "Blok M, Jakarta Selatan",
  phoneNumber: "081212121212",
  email: "sumayahhhh@gmail.com",
  productType: "Pilih...",
});

const props = defineProps({
  idDetail: {
    required: true,
    type: String,
  },
});
</script>

<template>
  <VCard>
    <VCardTitle class="my-3">
      <div class="font-weight-bold text-h4">Pernyataan</div>
    </VCardTitle>
    <VCardText>
      <VSheet color="#F0E9F1" class="py-10 px-15 rounded-xl">
        <div class="text-h2 text-center font-weight-bold mb-5">
          Pernyataan Pelaku Usaha
        </div>
        <div class="text-xl text-24 mb-5">
          Yang bertanda tangan di bawah ini sebagai Pelaku Usaha:
        </div>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24">
            <div class="d-flex justify-space-between">
              <div class="font-weight-bold">Nama</div>
              <div class="ms-1">:</div>
            </div>
          </VCol>
          <VCol cols="9" class="text-xl text-24 ps-2">{{
            guarantorData.name
          }}</VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24">
            <div class="d-flex justify-space-between">
              <div class="font-weight-bold">Nama Usaha</div>
              <div class="ms-1">:</div>
            </div>
          </VCol>
          <VCol cols="9" class="text-xl text-24 ps-2">{{
            guarantorData.businessName
          }}</VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24">
            <div class="d-flex justify-space-between">
              <div class="font-weight-bold">Alamat Usaha</div>
              <div class="ms-1">:</div>
            </div>
          </VCol>
          <VCol cols="9" class="text-xl text-24 ps-2">{{
            guarantorData.businessAddress
          }}</VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24">
            <div class="d-flex justify-space-between">
              <div class="font-weight-bold">Alamat Tempat Usaha</div>
              <div class="ms-1">:</div>
            </div>
          </VCol>
          <VCol cols="9" class="text-xl text-24 ps-2">{{
            guarantorData.outletAddress
          }}</VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24">
            <div class="d-flex justify-space-between">
              <div class="font-weight-bold">Telfon</div>
              <div class="ms-1">:</div>
            </div>
          </VCol>
          <VCol cols="9" class="text-xl text-24 ps-2">
            {{ guarantorData.phoneNumber }}
          </VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24">
            <div class="d-flex justify-space-between">
              <div class="font-weight-bold">Email</div>
              <div class="ms-1">:</div>
            </div>
          </VCol>
          <VCol cols="9" class="text-xl text-24 ps-2">{{
            guarantorData.email
          }}</VCol>
        </VRow>
        <VRow no-gutters class="pb-7">
          <VCol cols="3" class="text-xl text-24">
            <div class="d-flex justify-space-between">
              <div class="font-weight-bold">Jenis Produk</div>
              <div class="ms-1">:</div>
            </div>
          </VCol>
          <VCol cols="9" class="text-xl text-24 ps-2">{{
            guarantorData.productType
          }}</VCol>
        </VRow>
        <div class="text-xl pb-3 text-24">Dengan ini menyatakan:</div>
        <ol class="text-xl text-24 ms-7 ps-2 pb-2">
          <li class="pb-3">
            Menggunakan bahan yang sudah dipastikan kehalalannya
          </li>
          <li class="pb-3">
            Memproduksi dan mengolah produk sesuai dengan persyaratan kehalalan
          </li>
          <li class="pb-3">
            Menghasilkan produk yang dipastikan kehalalannya, dan
          </li>
        </ol>
        <div class="text-xl text-24 mb-5" style="line-height: 30px">
          Semua informasi yang disampaikan dalam akad/ikrar ini adalah benar.
          Apabila ditemukan dan/atau dibuktikan adanya penipuan/pemalsuan atas
          informasi yang kami sampaikan, maka kami bersedia dikenakan dan
          menerima penetapan sangsi.
        </div>
        <VRow>
          <VCol class="text-xl text-24 pb-15">
            Demikian akad/ikrar pernyataan Pelaku Usaha ini kami buat untuk
            digunakan secara semestinya
          </VCol>
        </VRow>
        <div class="mt-16 pt-5">
          <div>_________________________________</div>
          <div class="text-xl text-24">SUMAYAH</div>
          <div class="text-xl text-24">Penanggung Jawab Produk Halal</div>
        </div>
      </VSheet>
    </VCardText>
    <VCardActions>
      <VRow>
        <VCol>
          <div class="d-flex">
            <VCheckboxBtn v-model="isRead" />
            <div style="font-size: 21px">
              Saya telah membaca seluruh persyaratan yang telah dicantumkan, dan
              berjanji akan memenuhi kebijakan tersebut.
            </div>
          </div>
          <div class="d-flex justify-center py-5">
            <VBtn
              variant="flat"
              color="primary"
              class="px-4"
              size="large"
              text="Saya Setuju"
            >
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="scss">
.v-selection-control {
  align-items: start;
}
.text-24 {
  font-size: 24px;
}
</style>
