<script setup lang="ts"></script>

<template>
  <VCard>
    <VCardTitle class="my-5">
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
          <VCol cols="3" class="text-xl text-24 font-weight-bold">Nama</VCol>
          <VCol cols="9" class="text-xl text-24">: Sumayah</VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24 font-weight-bold"
            >Nama Usaha</VCol
          >
          <VCol cols="9" class="text-xl text-24">: Minuman Rasarasa</VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24 font-weight-bold"
            >Alamat Usaha</VCol
          >
          <VCol cols="9" class="text-xl text-24"
            >: Sumbangan, RT002/007, Jombang, Jawa Barat, Indonesia</VCol
          >
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24 font-weight-bold"
            >Alamat Tempat Usaha</VCol
          >
          <VCol cols="9" class="text-xl text-24"
            >: Blok M, Jakarta Selatan</VCol
          >
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24 font-weight-bold">Telfon</VCol>
          <VCol cols="9" class="text-xl text-24">: 081212121212</VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24 font-weight-bold">Email</VCol>
          <VCol cols="9" class="text-xl text-24">: sumayahhhh@gmail.com</VCol>
        </VRow>
        <VRow no-gutters class="pb-4">
          <VCol cols="3" class="text-xl text-24 font-weight-bold"
            >Jenis Produk</VCol
          >
          <VCol cols="9" class="text-xl text-24">: Pilih...</VCol>
        </VRow>
        <div class="text-xl pb-3 text-24">Dengan ini menyatakan:</div>
        <ol class="text-xl text-24 ms-7">
          <li class="pb-3">
            Menggunakan bahan yang sudah dipastikan kehalalannya
          </li>
          <li class="pb-3">
            Memproduksi dan mengolah produk sesuai dengan persyaratan kehalalan
          </li>
          <li class="pb-3">
            Menghasilkan Produk yang dipastikan kehalalannya, dan
          </li>
        </ol>
        <div class="text-xl text-24 mb-5" style="line-height: 35px">
          Semua informasi yang disampaikan dalam akad/ikrar ini adalah benar.
          Apabila ditemukan dan/atau dibuktikan adanya penipuan/pemalsuan atas
          informasi yang kami sampaikan, maka kami bersedia dikenakan dan
          menerima penetapan sangsi.
        </div>
        <div class="text-xl text-24 pb-15" style="line-height: 35px">
          Demikian akad/ikrar pernyataan Pelaku Usaha ini kami buat untuk
          digunakan secara semestinya
        </div>
        <div class="mt-16">
          <div>_____________________</div>
          <div class="text-xl text-24">SUMAYAH</div>
          <div class="text-xl text-24">Penanggung Jawab Produk Halal</div>
        </div>
      </VSheet>
    </VCardText>
    <VCardActions>
      <VRow>
        <VCol>
          <VCheckbox>
            <template #label>
              <div style="font-size: 21px">
                Saya telah membaca seluruh persyaratan yang telah dicantumkan,
                dan berjanji akan memenuhi kebijakan tersebut.
              </div>
            </template>
          </VCheckbox>
          <div class="d-flex justify-center py-5">
            <VBtn variant="flat" color="primary" class="px-3" size="large"
              >Saya Setuju</VBtn
            >
          </div>
        </VCol>
      </VRow>
    </VCardActions>
  </VCard>
</template>

<style scoped>
.text-24 {
  font-size: 24px;
}
</style>
