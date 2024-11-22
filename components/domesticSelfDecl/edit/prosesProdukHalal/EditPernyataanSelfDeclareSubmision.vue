<script setup lang="ts">

const data = ref({
  ownerName: 'Muhammad Rizky',
  businessName: 'Kopi Lawak',
  businessAddress: 'KATERBAN, KUTOARJO, KAB.PURWOREJO, JAWA TENGAH, INDONESIA',
  businessPlaceAddress: 'KATERBAN, KUTOARJO, KAB.PURWOREJO, JAWA TENGAH, INDONESIA',
  phoneNumber: '081212341234',
  email: 'kopilawak@gmail.com',
  productType: 'Minuma'
})

const aggreButtonDisable = ref(false)
const showDownloadButton = ref(false)


const agree = () => {
  console.log("agree.........")
  aggreButtonDisable.value = true
  showDownloadButton.value = true
}

const download = () => {
  console.log("DOWNLOAD DOCUMENT...... ")
}

</script>

<template>
  <VCard class="pa-6">
    <VCardTitle class="pa-0 mb-2">
      <span class="text-h5 font-weight-bold">Pernyataan Pelaku Usaha </span>
    </VCardTitle>
    <VCardText class="pa-0">
      <p>
        Yang bertandatangan di bawah ini sebagai Pelaku Usaha :
      </p>
      <VRow>
        <VCol cols="8">
          <InfoRow name="Nama Pemilik Usaha" >{{data.ownerName}}</InfoRow>
          <InfoRow name="Nama Usaha" >{{data.businessName}}</InfoRow>
          <InfoRow name="Alamat Usaha" >{{data.businessAddress}}</InfoRow>
          <InfoRow name="Alamat Tempat Usaha" >{{data.businessPlaceAddress}}</InfoRow>
          <InfoRow name="Nomor Handphone" >{{data.phoneNumber}}</InfoRow>
          <InfoRow name="Email" >{{data.email}}</InfoRow>
          <InfoRow name="Jenis Produk" >{{data.productType}}</InfoRow>

          <br />
          <p>Dengan ini menyatakan: </p>
          <ol class="pl-4">
            <li>Menggunakan bahan yang sudah dipastikan kehalalannya</li>
            <li>Memproduksi dan mengolah produk sesuai dengan persyaratan kehalalan</li>
            <li>Menghasilkan produk yang dipastikan kehalalan nya; dan</li>
          </ol>
          <p>Semua informasi yang disampaikan dalam akad/ikrar ini adalah benar, Apabila ditemukan dan/atau dibuktikan adanya penipuan/pemalsuan atas
            informasi yang kami sampaikan, maka kami bersedia dikenakan dan menerima penetapan sangsi
          </p>
          <p>Demikian akad/ikrar pernyataan Pelaku Usaha ini kami buat untuk digunakan secara semestinya </p>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText class="pa-0">
      <VRow no-gutters class="d-flex flex-column align-items-start ">
        <VCol cols="12" md="6" lg="4" >
          <br />
          <br />
          <br />
          <div class="dots">{{data.ownerName}}</div>
          <p>Penanggung Jawab Produk Halal</p>
        </VCol>
      </VRow>
    </VCardText>
    <VCardActions class="d-flex justify-end">
      <VBtn v-if="showDownloadButton" @click="download" variant="outlined" append-icon="ri-download-line">Download ikrar</VBtn>
      <VBtn @click="agree" variant="flat" min-width="120px" :disabled="aggreButtonDisable">Setuju</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="scss">

.dots {
  display: inline-block;
  position: relative;
  font-weight: bold;
}

.dots::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -5px;
  border-bottom: 1px dotted black;
  width: 100%;
}

</style>
