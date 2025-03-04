<script setup lang="ts">
import PerizinanCard from "@/components/pelakuUsahaProfile/PerizinanCard.vue";
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";
import { useI18n } from "vue-i18n";
import { VForm } from "vuetify/components";

const { t } = useI18n();
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
const profileCardEditRef = ref();

const submitPenanggungJawab = () => {
  console.log("asal usaha = ", store.profileData?.asal_usaha?.toLowerCase());
  if (store.profileData?.asal_usaha?.toLowerCase() == "luar negeri") {
    profileCardEditRef.value.submitProfile();
  }
  if (store.profileData?.asal_usaha?.toLowerCase() == "instansi pemerintah") {
    profileCardEditRef.value.submitProfilePemerintah();
  }
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

const skBlobUri = ref();

const skReadyHandler = (blob) => {
  skBlobUri.value = blob;
};
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow>
        <VCol>
          <h1 style="font-size: 32px">{{ t("detail-pu.pu-edit-title") }}</h1>
        </VCol>
        <VCol style="display: flex; align-items: center; justify-content: end">
          <!-- <DeleteConfirmation /> -->
          <VBtn variant="outlined" @click="navigatePage()">{{
            t("detail-pu.pu-edit-cancel")
          }}</VBtn>
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
          <!-- <ProfileCard
            :profile-data="store.profileData ? store.profileData : {}"
          /> -->
          <ProfileCardEdit
            :profile-data="store.profileData ? store.profileData : {}"
            ref="profileCardEditRef"
          ></ProfileCardEdit>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpen">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <div class="text-h4 font-weight-bold">
                  {{ t("detail-pu.pu-pj-title") }}
                </div>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VForm ref="penanggungJawabRef">
                  <VRow>
                    <VCol cols="12">
                      <VTextField
                        v-model="formData.nameResponsible"
                        :label="t('detail-pu.pu-pj-nama')"
                        outlined
                        dense
                        :rules="[
                          requiredValidator,
                          regexValidator(
                            formData.nameResponsible,
                            /^(?!.*\s\s)(?!.*'')[a-zA-Z\s']+$/,
                            'Format nama penanggung jawab tidak sesuai'
                          ),
                        ]"
                      />
                    </VCol>
                  </VRow>
                  <VRow>
                    <VCol cols="12">
                      <VTextField
                        v-model="formData.nomorKontak"
                        :label="t('detail-pu.pu-pj-telp')"
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
                        :label="t('detail-pu.pu-pj-email')"
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
          <PenyeliaHallalEdit
            :file-sk-blob="skBlobUri || 'undefined'"
            :data-profile="store.profileData"
          />
        </VCol>
      </VRow>
      <VRow style="display: none">
        <VCol cols="12">
          <VCard>
            <VCardItem>
              <SkPenyeliaHalal
                @sk-penyelia-download-handler="skReadyHandler"
              ></SkPenyeliaHalal>
            </VCardItem>
          </VCard>
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
