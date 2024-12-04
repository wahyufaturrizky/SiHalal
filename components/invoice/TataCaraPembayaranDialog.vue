<script setup lang="ts">
import { useDisplay } from 'vuetify'

const tabs = ref(0)

onMounted(() => {
  tabs.value = 0
})

const isVisible = ref(false)
const openDialog = () => (isVisible.value = true)
const closeDialog = () => (isVisible.value = false)

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 900 : '90%'
})

const bankMuamalatPanels = ref([0, 0, 0, 0, 0])
const bankBSIPanels = ref([0, 0, 0, 0, 0])
const bankBTNPanels = ref([0, 0, 0, 0, 0])


const kodePembayaran = ref('00108297389462')

const copyToClipboard = () => {
  navigator.clipboard.writeText(kodePembayaran.value).then(() => {
    useSnackbar().sendSnackbar("Kode berhasil disalin ke clipboard!", "success");
  }).catch(() => {
    useSnackbar().sendSnackbar("Gagal menyalin kode.", "error");
  });
}

const tataCaraPembayaran = ref({
  bankMuamalat: {
    internetBanking: {
      title: 'Internet Banking Muamalat',
      step: [
        'Login pilih menu Payment',
        'Pilih Virtual Account dan masukkan Nomor VA (16 Digit) dengan format 8778 + 12 Kode Pembayaran',
        'Masukkan nPasscode, kemudian pilih Submit',
        'Selesai',
      ],
    },
    teller: {
      title: 'Teller Muamalat',
      step: [
        'Datang ke cabang terdekat lalu isi Formulir Transfer Dana, isi rekening tujuan berupa No Nomor VA (16 Digit) dengan format 8778 + 12 Kode Pembayaran beserta nominal pembayaran',
        'Serahkan formulir ke Teller Bank Muamalat dan informasikan bahwa anda melakukan pembayaran Sertifikasi Halal BPJPH',
        'Cek kembali rincian transaksi, apabila semua data sudah sesuai selanjutnya ajukan TIN dan klik LANJUT',
        'Pembayaran selesai, simpan struk bukti pembayaran VA BPJPH dari Teller',
      ],
    },
    atm: {
      title: 'ATM Muamalat',
      step: [
        'Masukkan kartu ATM dan nomor PIN, lalu pilih menu Transaksi lain',
        'Pilih menu pembayaran, kemudian pilih menu Virtual Account',
        'Masukkan Nomor VA (16 Digit) dengan format 8778 + 12 Kode Pembayaran',
        'Masukkan nominal pembayaran yang diminta',
        'Pilih Benar, lalu pilih Bayar, simpan struk ATM sebagai bukti pembayaran',
      ],
    },
    mobile: {
      title: 'Mobile Banking Muamalat',
      step: [
        'Login ke MDM, pilih menu "Beli/Bayar"',
        'Pilih "Layanan Pemerintah"',
        'Pilih Pembayaran pada logo BPJPH',
        'Masukkan Nomor VA (16 Digit) dengan format 8778 + 12 Kode Bayar, klik LANJUT',
        'Cek kembali rincian transaksi, apabila semua data sudah sesuai selanjutnya input TIN dan klik LANJUT',
      ],
    },
    banklain: {
      title: 'Melalui Bank Lain',
      step: [
        'Pilih menu Transfer Antar Bank (Transfer Online, BI FAST, SKN, RTGS)',
        'Pilih Bank Muamalat atau isi Kode Bank Muamalat :147, diikuti dengan Nomor VA (16 Digit) dengan format 8778 + 12 Kode Bayar',
        'Masukkan nominal pembayaran sesuai dengan informasi tagihan yang muncul',
        'Pastikan semua rincian transaksi sesuai dengan tagihan yang diminta',
        'Pembayaran VA BPJPH berhasil dilakukan dan cetak bukti transaksi jika diperlukan',
      ],
    },
  },
  btnSyariah: {
    teller: {
      title: 'Pembayaran Melalui Teller BTN Syariah',
      step: [
        'Isi form untuk pembayaran setoran/pembayaran jasa (Virtual Account)',
        'Isi kolom no rekening dengan isian (17109 + Kode/Nomor Pembayaran)',
        'Isi nominal tagihan sesuai dengan informasi yang tertera pada invoice tagihan bayar',
        'Lakukan pembayaran secara tunai atau debit rekening',
        'Selesai',
      ],
    },
    atm: {
      title: 'Pembayaran Melalui ATM BTN Syariah',
      step: [
        'Pilih menu Pembayaran/Payment',
        'Pilih multipayment',
        'Pilih Virtual Account',
        'Ketik Nomor Virtual Account dengan isian (17109 + Kode/Nomor Pembayaran), dan pilih "Lanjut"',
        'Layar validasi tagihan akan muncul pada layar, pilih benar dan masukkan pin transaksi jika sudah sesuai',
        'Selesai',
      ],
    },
    mobile: {
      title: 'Pembayaran Melalui Mobile Banking BTN Syariah',
      step: [
        'Pilih menu Pembayaran pada mobile banking',
        'Pilih Virtual Account',
        'Ketik Nomor Virtual Account dengan isian (17109 + Kode/Nomor Pembayaran), dan pilih "Kirim"',
        'Layar validasi tagihan akan muncul pada layar, pilih kirim dan masukkan pin transaksi jika sudah sesuai',
        'Selesai',
      ],
    },
    mobileBankLain: {
      title: 'Pembayaran Melalui Mobile Bank Lain',
      step: [
        'Pilih menu Online Transfer',
        'Pilih Bank BTN / UUS Bank BTN',
        'Ketik Nomor rekening virtual Account dengan isian (17109 + Kode/Nomor Pembayaran)',
        'Input jumlah pembayaean sesuai dengan nilai tagihan yang tertera pada invoice tagihan bayar, dan pilih lanjut',
        'Layar validasi tagihan akan muncul pada layar, pilih kirim dan masukkan pin transaksi jika sudah sesuai',
        'Selesai',
      ],
    },
    banklain: {
      title: 'Pembayaran Melalui Mobile Banking Bank Lain',
      step: [
        'Pilih menu Online Transfer',
        'Pilih Bank BTN / UUS Bank BTN',
        'Ketik nomor rekening virtual account (17109 + Kode/Nomor Pembayaran)',
        'Input jumlah pembayaran sesuai dengan nilai tagihan yang tertera pada invoice tagihan bayar, dan pilih lanjut',
        'Layar validasi tagihan akan muncul pada layar, pilih kirim dan masukkan pin transaksi jika sudah sesuai',
        'Selesai',
      ],
    },
  },
  bsi: {
    internetBanking: {
      title: 'Internet Banking BSI',
      step: [
        'Pilih menu Pembayaran/Payment',
        'Pilih Institusi',
        'Masukkan nama institusi BPJPH',
        'Ketik Kode Pembayaran, dan pilih "Lanjut" jika sudah sesuai tagihan',
        'Layar validasi tagihan akan muncul pada layar',
        'Masukkan Token dan PIN anda kemudian pilih "Selanjutnya" untuk submit',
        'Selesai',
      ],
    },
    teller: {
      title: 'Teller BSI',
      step: [
        'Pilih menu Pembayaran/Payment',
        'Pilih Institusi',
        'Masukkan nama BPJPH atau masukkan Kode Biller 2640',
        'Ketik Kode Pembayaran, dan pilih "Lanjut" jika sudah sesuai tagihan',
        'Layar validasi tagihan akan muncul pada layar',
        'Masukkan PIN dan data PIN kemudian pilih "Selanjutnya" untuk submit',
        'Selesai',
      ],
    },
    atm: {
      title: 'ATM BSI',
      step: [
        'Pilih menu Pembayaran/Payment',
        'Pilih Akademik/Institusi',
        'Ketik Kode Biller 2640 + Kode Pembayaran, dan pilih "Lanjut" jika sudah sesuai',
        'Layar validasi tagihan akan muncul pada layar, pilih benar jika sudah sesuai',
        'Masukkan PIN dan data PIN "Selanjutnya" untuk submit',
        'Selesai',
      ],
    },
    mobile: {
      title: 'BSI Mobile',
      step: [
        'Pilih menu Pembayaran/Payment',
        'Pilih Institusi',
        'Masukkan nama BPJPH atau masukkan Kode Biller 2640',
        'Ketik Kode Pembayaran, dan pilih "Lanjut" jika sudah sesuai tagihan',
        'Layar validasi tagihan akan muncul pada layar',
        'Masukkan PIN dan Token kemudian pilih "Selanjutnya" untuk submit',
        'Selesai',
      ],
    },
    banklain: {
      title: 'Melalui Bank Lain',
      step: [
        'Pilih menu Transfer Online Antar Bank (selain SKN, RTGS, BI Fast)',
        'Pilih Bank Tujuan Bank Syariah Indonesia (Kode Bank: 451)',
        'Masukkan nominal pembayaran sesuai dengan informasi tagihan yang muncul',
        'Masukkan 2600 + Kode Pembayaran',
        'Pastikan semua rincian sesuai',
        'Transaksi selesai',
        'Selesai',
      ],
    },
  },
})
</script>

<template>
  <VBtn
    variant="text"
    prepend-icon="mdi-cash"
    block
    @click="openDialog"
    class="text-left"
    style="width: 100%; justify-content: flex-start;"
  >
    Bayar Sekarang
  </VBtn>
  <VDialog
    v-model="isVisible"
    :max-width="dialogMaxWidth"
  >
    <VCard class="pa-2">
      <VCardTitle class="text-h5 font-weight-bold d-flex justify-space-between align-center">
        <span> Tata Cara Pembayaran </span>
        <VBtn
          icon
          color="transparent"
          style="border: none"
          elevation="0"
          @click="closeDialog"
        >
          <VIcon color="black">
            ri-close-line
          </VIcon>
        </VBtn>
      </VCardTitle>
      <VCardItem>
        <div class="d-flex justify-center align-center">
          <VTabs
            v-model="tabs"
            align-tabs="center"
            bg-color="#f0dcf5"
            class="border pa-2"
            style="border-radius: 40px"
            height="auto"
          >
            <VTab
              value="1"
              base-color="#f0dcf5"
              active-color="primary"
              style="border-radius: 40px"
              hide-slider
              color="primary"
              variant="flat"
              height="40px"
            >
              <span>Bank Muamalat </span>
            </VTab>
            <VTab
              value="2"
              active-color="primary"
              base-color="#f0dcf5"
              style="border-radius: 40px"
              hide-slider
              variant="flat"
              height="40px"
            >
              <span>Bank BSI </span>
            </VTab>
            <VTab
              value="3"
              active-color="primary"
              base-color="#f0dcf5"
              style="border-radius: 40px"
              hide-slider
              variant="flat"
              height="40px"
            >
              <span>Bank BTN </span>
            </VTab>
          </VTabs>
        </div>
        <VTabsWindow v-model="tabs">
          <br>
          <v-row class="d-flex justify-between mb-4 pa-4">
            <v-col cols="12" sm="6" class="d-flex align-center">
              <span class="font-weight-bold mr-2">Kode Pembayaran:</span>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center justify-end">
              <span class="text-h6">{{ kodePembayaran }}</span>
              <v-btn
                icon
                class="ml-2"
                @click="copyToClipboard"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <VTabsWindowItem value="1">
            <VExpansionPanels
              v-model="bankMuamalatPanels"
              multiple
            >
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bankMuamalat.internetBanking.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bankMuamalat.internetBanking.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bankMuamalat.teller.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bankMuamalat.teller.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bankMuamalat.atm.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bankMuamalat.atm.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bankMuamalat.mobile.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bankMuamalat.mobile.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bankMuamalat.banklain.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bankMuamalat.banklain.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VTabsWindowItem>

          <VTabsWindowItem value="2">
            <VExpansionPanels
              v-model="bankBTNPanels"
              multiple
            >
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.btnSyariah.teller.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.btnSyariah.teller.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.btnSyariah.atm.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.btnSyariah.atm.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.btnSyariah.mobile.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.btnSyariah.mobile.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.btnSyariah.mobileBankLain.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.btnSyariah.mobileBankLain.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.btnSyariah.banklain.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.btnSyariah.banklain.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VTabsWindowItem>

          <VTabsWindowItem value="3">
            <VExpansionPanels
              v-model="bankBSIPanels"
              multiple
            >
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bsi.internetBanking.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bsi.internetBanking.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bsi.teller.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bsi.teller.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bsi.atm.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bsi.atm.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bsi.mobile.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bsi.mobile.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
              <VExpansionPanel class="mb-2">
                <VExpansionPanelTitle>{{ tataCaraPembayaran.bsi.banklain.title }}</VExpansionPanelTitle>
                <VExpansionPanelText class="pa-4">
                  <ol>
                    <li
                      v-for="(step, index) in tataCaraPembayaran.bsi.banklain.step"
                      :key="index"
                    >
                      {{ step }}
                    </li>
                  </ol>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VTabsWindowItem>
          <br />
          <v-row align="center" class="info-box pa-3" no-gutters>
            <VCol cols="1">
              <v-icon class="mr-2" color="primary">mdi-information</v-icon>
            </VCol>
            <VCol>
              <span class="text-body-2">
        Apabila sebelumnya terjadi kurang bayar dan ingin mengupload bukti transfer kekurangannya maka harap mengupload
        kedua bukti bayar (bukti bayar sebelumnya + kekurangannya) dijadikan dalam 1 file upload.
      </span>
            </VCol>
          </v-row>
        </VTabsWindow>
        <br/>
        <VRow>
          <VCol class="d-flex justify-end">
            <VBtn @click="closeDialog">
              Tutup
            </VBtn>
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>
  </VDialog>
</template>

<style scoped>
.no-shadow .v-expansion-panel__content {
  box-shadow: none !important;
}
</style>
