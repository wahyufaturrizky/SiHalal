<script setup lang="ts">
import PerizinanCard from "@/components/pelakuUsahaProfile/PerizinanCard.vue";
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";
import { VForm } from "vuetify/components";

const store = pelakuUsahaProfile();

const navigatePage = () => navigateTo("/pelaku-usaha");

const panelOpen = ref(0);

const formData = ref({
  nameResponsible: store.penanggungJawabHalal?.name,
  nomorKontak: store.penanggungJawabHalal?.phone,
  email: store.penanggungJawabHalal?.email,
});

const snackbar = useSnackbar();
const penanggungJawabRef = ref<VForm>();

const submitPenanggungJawab = () => {
  penanggungJawabRef.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      const submitApi = $api(
        `/pelaku-usaha-profile/${store.profileData?.id}/update-responsible`,
        {
          method: "PUT",
          body: {
            pic_name: formData.value.nameResponsible,
            pic_phone_number: formData.value.nomorKontak,
            pic_email: formData.value.email,
          },
        }
      ).then((val: any) => {
        if (val.code == 2000) {
          store.fetchProfile();
          snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
        } else {
          snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
        }
      });
    }
  });
};

const phoneValidator = (value: string) => {
  const isValid = /^08\d{8,15}$/.test(value);

  return (
    isValid ||
    'Nomor Handphone harus dimulai dengan "08" dan berjumlah 10-13 digit angka'
  );
};

const nameValidator = (value: string) => {
  const isValid = /^[a-zA-Z'-]+$/.test(value);

  return isValid || "Nama tidak boleh angka";
};

onMounted(() => {
  formData.value.nameResponsible = store.penanggungJawabHalal?.name;
  formData.value.nomorKontak = store.penanggungJawabHalal?.phone;
  formData.value.email = store.penanggungJawabHalal?.email;
});
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow>
        <VCol><h3>Ubah Pelaku Usaha</h3></VCol>
        <VCol style="display: flex; justify-content: end">
          <!-- <DeleteConfirmation /> -->
          <VBtn variant="outlined" @click="navigatePage()">Batal</VBtn>
          <SaveConfirmation
            @confirm-add="submitPenanggungJawab"
            :responsible-data="formData"
          />
        </VCol>
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <ProfileCard
            :profile-data="store.profileData ? store.profileData : {}"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpen">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Penanggung Jawab</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VForm ref="penanggungJawabRef">
                  <VRow>
                    <VCol cols="12">
                      <VTextField
                        v-model="formData.nameResponsible"
                        label="Nama"
                        outlined
                        dense
                        :rules="[requiredValidator, nameValidator]"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VTextField
                        v-model="formData.nomorKontak"
                        label="Nomor Kontak"
                        outlined
                        dense
                        :rules="[requiredValidator, phoneValidator]"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VTextField
                        v-model="formData.email"
                        label="Email"
                        outlined
                        dense
                        :rules="[emailValidator, requiredValidator]"
                      />
                    </VCol>
                  </VRow>
                </VForm>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <AspekLegalCardEdit
            :aspek-legal-data="store.legal ? store.legal : []"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <PabrikCardEdit :pabrik-data="store.factory ? store.factory : []" />
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <OutletEdit :outlet-data="store.outlet ? store.outlet : []" />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <PenyeliaHallalEdit />
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <PerizinanCard />
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <KBLICard />
        </VCol>
      </VRow>
      <!-- <VRow>
        <VCol :cols="12">
          <DivisiUnitUsaha />
        </VCol>
      </VRow> -->
    </template>
  </SubPelakuUsahaLayout>
</template>
