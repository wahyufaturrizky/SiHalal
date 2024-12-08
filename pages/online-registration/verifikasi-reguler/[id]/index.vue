<script lang="ts" setup>
import AspekLegal from "@/components/selfDeclare/verifikasi/AspekLegal.vue";
import DaftarNamaProduk from "@/components/selfDeclare/verifikasi/DaftarNamaProduk.vue";
import PenanggungJawabUsaha from "@/components/selfDeclare/verifikasi/PenanggungJawabUsaha.vue";
import Penyelia from "@/components/selfDeclare/verifikasi/Penyelia.vue";
import ProfilPengajuan from "@/components/selfDeclare/verifikasi/ProfilPengajuan.vue";
import SertifikatHalal from "@/components/selfDeclare/verifikasi/SertifikatHalal.vue";
import SHLNVerfikasiLayout from "@/layouts/SHLNVerfikasiLayout.vue";

const panelOpenPengajuan = ref(0);
const panelOpenPenanggungJawab = ref(0);
const panelOpenAspekLegal = ref(0);
const panelOpenPabrik = ref(0);
const panelOpenOutlet = ref(0);
const panelOpenPenyelia= ref(0);
const panelOpenProduk = ref(0);

const openPanelRegisterData = ref(0);
const loading = ref(false);
const loadingTracking = ref(false);
const loadingDetailRegistration = ref(false);
const data = ref();
const dataDetailRegistration = ref();
const dataTracking = ref();

const showConfirmation = ref(false);
const showReturn = ref(false);
const returnNote = ref("");

const openConfirmation = () => (showConfirmation.value = true);
const closeConfirmation = () => (showConfirmation.value = false);

const openReturn = () => (showReturn.value = true);
const closeReturn = () => (showReturn.value = false);

const submitData = () => {
  console.log("Data submitted!");
  closeConfirmation();
};

const returnDocument = () => {
  console.log("Return note:", returnNote.value);
  closeReturn();
};

</script>

<template>
  <SHLNVerfikasiLayout
    v-if="!loading && !loadingTracking && !loadingDetailRegistration"
  >
    <template #pageTitle>
      <VRow>
        <VCol style="display: flex; justify-content: start;"><h2>Verifikasi Dokumen Pengajuan: Detail</h2></VCol>
        <VCol style="display: flex; justify-content: end;">
          <VBtn 
            text="Pengembalian"
            color="#e1442e"
            class="ma-1"
            @click="openConfirmation" 
          />
          <VBtn 
            text="Verifikasi"
            class="ma-1"
            @click="openReturn"
          />
        </VCol>
      </VRow>

      <!-- <VRow>
        <VCol style="display: flex; justify-content: start">
          <VBtn
            variant="flat"
            prepend-icon=""
            color="primary"
            @click="navigateAction"
          >
            Detail
          </VBtn>
        </VCol>
        <VCol style="display: flex; justify-content: end">
          <VerificationReturnConfirmation />
          <VerificationRejectConfirmation />

          <VerificationApproveConfirmationDetail />
        </VCol>
      </VRow> -->
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPengajuan">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2> Profil Pengajuan </h2>
              </VExpansionPanelTitle>

              <VExpansionPanelText>
                <ProfilPengajuan :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPenanggungJawab">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>
                  Penanggung Jawab
                </h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <PenanggungJawabUsaha :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenAspekLegal">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>
                  Aspek Legal
                </h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <AspekLegal :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPabrik">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <VCol cols="9">
                <h2>
                  Pabrik
                </h2>
              </VCol>
              <VCol cols="3">
                <VBtn
                  variant="outlined"
                  text="Unduh"
                />
              </VCol>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Pabrik :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenOutlet">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <VCol cols="9">
                <h2>
                  Outlet
                </h2>
              </VCol>
              <VCol cols="3">
                <VBtn
                  variant="outlined"
                  text="Unduh"
                />
              </VCol>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Outlet :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPenyelia">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>
                  Penyelia Halal
                </h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Penyelia :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenProduk">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <VCol cols="9">
                <h2>
                  Daftar Nama Produk
                </h2>
              </VCol>
              <VCol cols="3">
                <VBtn
                  variant="outlined"
                  text="Unduh"
                />
              </VCol>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <DaftarNamaProduk :data="data" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Formulir Unduhan</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                  <VRow>
                    <VCol cols="3"> STTD </VCol>
                    <VCol cols="1"> : </VCol>
                    <VCol cols="8"> 
                      <VBtn 
                        icon="ri-download-fill"
                        class="rounded"
                        variant="flat"
                        density="compact"
                      />   
                      </VCol>
                  </VRow>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Pendaftaran</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Pendaftaran :data="dataDetailRegistration" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Sertifikat Halal</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <SertifikatHalal :data="dataDetailRegistration" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Pemeriksaan</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <RegisterDataShln :data="dataDetailRegistration" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Sidang Fatwa</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <SidangFatwa :data="dataDetailRegistration" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle><h3>Melacak</h3></VCardTitle>
            <VCardText>
              <Melacak :data="dataTracking" />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Pengawasan</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Pengawasan :data="dataDetailRegistration" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VDialog v-model="showConfirmation" max-width="600px">
        <VCard>
          <VCardTitle class="font-weight-bold d-flex justify-space-between"><h3>Konfirmasi</h3>
            <VBtn
                icon
                variant="plain"
                @click="closeConfirmation"
              >
              <VIcon style="color: black;">mdi-close</VIcon>
          </VBtn>
        </VCardTitle>
          <VCardText>Data akan dikirim ke LPH, pastikan dokumen telah memenuhi persyaratan!</VCardText>
          <VCardActions class="d-flex justify-end">
            <VBtn color="primary" variant="outlined" @click="closeConfirmation">Batal</VBtn>
            <VBtn color="primary" variant="flat" @click="submitData">Kirim</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>

      <!-- Document Return Modal -->
      <VDialog v-model="showReturn" max-width="600px">
        <VCard>
          <VCardTitle class="font-weight-bold d-flex justify-space-between"><h3>Pengembalian Dokumen</h3>
            <VBtn
              icon
              variant="plain"
              @click="closeReturn"
            >
            <VIcon style="color: black;">mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
          <VCardText>
            <div class="mb-3 font-weight-medium text-caption text-grey">
          <span style="color: black;"><b>Masukan Keterangan Pengembalian</b></span>(Max. 1000 Karakter)
        </div>
            <VTextarea
              label="Masukan Keterangan Pengembalian (Max. 1000 Karakter)"
              v-model="returnNote"
              rows="4"
              outlined
            />
          </VCardText>
          <VCardActions class="d-flex justify-end">
            <VBtn color="primary" variant="outlined" @click="closeReturn">Batal</VBtn>
            <VBtn color="primary" variant="flat" @click="returnDocument">Kembalikan</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </template>
  </SHLNVerfikasiLayout>
</template>
