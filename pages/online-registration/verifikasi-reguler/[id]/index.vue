<script lang="ts" setup>
import AspekLegal from "@/components/selfDeclare/verifikasi/AspekLegal.vue";
import DaftarNamaProduk from "@/components/selfDeclare/verifikasi/DaftarNamaProduk.vue";
import PenanggungJawabUsaha from "@/components/selfDeclare/verifikasi/PenanggungJawabUsaha.vue";
import Penyelia from "@/components/selfDeclare/verifikasi/Penyelia.vue";
import ProfilPengajuan from "@/components/selfDeclare/verifikasi/ProfilPengajuan.vue";
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

const route = useRoute();
const shlnId = route.params.id;

const loadItemDetailRegistrationById = async () => {
  try {
    loadingDetailRegistration.value = true;

    const response = await $api(
      `/shln/verificator/detail/registration/${shlnId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataDetailRegistration.value = response.data;
      loadingDetailRegistration.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingDetailRegistration.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingDetailRegistration.value = false;
  }
};

const loadItemById = async () => {
  try {
    loading.value = true;

    const response = await $api(`/shln/verificator/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      data.value = response.data;
      loading.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loading.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const loadItemTrackingById = async () => {
  try {
    loadingTracking.value = true;

    const response = await $api(`/shln/verificator/tracking/${shlnId}`, {
      method: "get",
    });

    if (response.code === 2000) {
      dataTracking.value = response.data;
      loadingTracking.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingTracking.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingTracking.value = false;
  }
};

onMounted(async () => {
  await loadItemById();
  await loadItemTrackingById();
  await loadItemDetailRegistrationById();
});

const navigateAction = () => {
  navigateTo(`/sertifikasi-halal/luar-negeri/verification/${shlnId}/detail`);
};

</script>

<template>
  <SHLNVerfikasiLayout
    v-if="!loading && !loadingTracking && !loadingDetailRegistration"
  >
    <template #pageTitle>
      <VRow>
        <VCol><h2>Verifikasi Dokumen Pengajuan: Detail</h2></VCol>
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
                <h2>
                  Daftar Nama Produk
                </h2>
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
                <h2>Registration Data</h2>
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
                <h2>Registration Data</h2>
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
                <h2>Registration Data</h2>
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
                <h2>Registration Data</h2>
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
                <h2>Registration Data</h2>
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
          <VCard>
            <VCardTitle><h2>Tracking</h2></VCardTitle>
            <VCardText>
              <TrackingShln :data="dataTracking" />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Registration Data</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <RegisterDataShln :data="dataDetailRegistration" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </template>
  </SHLNVerfikasiLayout>
</template>
