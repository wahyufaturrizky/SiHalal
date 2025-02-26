<script setup lang="ts">
import { computed, defineProps, ref } from "vue";

import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const props = defineProps({
  newRegister: {
    type: Function,
    default: () => {},
    required: false,
  },
  additionalRegister: {
    type: Function,
    default: () => {},
    required: false,
  },
  data: {
    type: Array,
    required: false,
  },
});

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const selectedItem = ref(null);
const onRegister = () => {
  props.newRegister("JD.1", selectedItem.value);
  isVisible.value = false;
};

const onAddRegister = () => {
  developmentDialog.value = true;
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 750 : "90%";
});

const { t } = useI18n();

const developmentDialog = ref(false);
const noSertifikat = ref("");
const router = useRouter();

const registerNewDevelopment = async () => {
  try {
    const response: any = await $api(
      "/reguler/pelaku-usaha/draft-development",
      {
        method: "post",
        body: {
          id: noSertifikat.value,
        },
      }
    );

    if (response?.code === 2000) {
      router.push(`/sh-domestic/submission/reguler/${response?.data?.id_reg}`);
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.length != 0
          ? response.errors.list_error[0]
          : "Ada Kesalahan",
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    noSertifikat.value = "";
    developmentDialog.value = false;
    isVisible.value = false;
  }
};
</script>

<template>
  <div class="mb-2">
    <VBtn @click="openDialog" variant="flat">
      {{ t("pengajuan-reguler.reguler-list-btn-ajukan") }}
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle>{{ t("pengajuan-reguler.popup-title") }}</VCardTitle>
        <VCardText>
          {{ t("pengajuan-reguler.popup-content") }}
        </VCardText>
        <VRow no-gutters class="pa-4 ga-2">
          <VCol>
            <VCard class="text-center">
              <VCardTitle class="text-center text-h6">
                {{ t("pengajuan-reguler.popup-new-title") }}
              </VCardTitle>
              <VDivider />
              <VCardText class="mt-0">
                {{ t("pengajuan-reguler.popup-new-desc") }}<br />
                {{ t("pengajuan-reguler.popup-new-desc-1") }}
                <strong> {{ t("pengajuan-reguler.popup-new-desc-2") }}</strong>
                / <strong> {{ t("pengajuan-reguler.popup-new-desc-3") }}</strong
                ><br />
                {{ t("pengajuan-reguler.popup-new-desc-4") }}
              </VCardText>
              <VDivider />
              <VCardActions class="pa-2 justify-center">
                <VBtn
                  variant="flat"
                  style="min-inline-size: 100%"
                  @click="onRegister"
                >
                  {{ t("pengajuan-reguler.popup-new-btn") }}
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
          <VCol>
            <VCard class="text-center">
              <VCardTitle class="text-center text-h6">
                {{ t("pengajuan-reguler.popup-newp-title") }}
              </VCardTitle>
              <VDivider />
              <VCardText class="mt-0">
                {{ t("pengajuan-reguler.popup-new-desc") }}<br />
                {{ t("pengajuan-reguler.popup-new-desc-1") }}
                <strong>{{ t("pengajuan-reguler.popup-new-desc-2") }}</strong> /
                <strong>{{ t("pengajuan-reguler.popup-new-desc-3") }}</strong
                ><br />
                {{ t("pengajuan-reguler.popup-new-desc-4") }}
              </VCardText>
              <VDivider />
              <VCardActions class="pa-2 justify-center">
                <VBtn
                  variant="flat"
                  style="min-inline-size: 100%"
                  @click="onAddRegister"
                >
                  {{ t("pengajuan-reguler.popup-new-btn") }}
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
        </VRow>

        <VCardText>
          <span class="font-weight-bold mb-4">
            {{ t("pengajuan-reguler.popup-kbli-title") }}
          </span>
          <VSelect
            v-model="selectedItem"
            :items="props?.data"
            item-title="uraian_usaha"
            :placeholder="t(`pengajuan-reguler.popup-kbli-combo-text`)"
            item-text="uraian_usaha"
            item-value="id"
          />
        </VCardText>
      </VCard>
    </VDialog>
  </div>

  <VDialog v-model="developmentDialog" width="500">
    <!-- Dialog Content -->
    <VCard title="Perkembangan Sertifikat Halal">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="developmentDialog = false"
      />

      <VForm @submit.prevent="registerNewDevelopment()">
        <VCardText>
          <VLabel>Nomor</VLabel>
          <v-text-field
            name="name"
            class="mt-2"
            v-model="noSertifikat"
            placeholder="Isi nomor sertifikat halal"
            id="id"
          ></v-text-field>
        </VCardText>

        <VCardText class="d-flex justify-end flex-wrap gap-4">
          <VBtn
            variant="outlined"
            color="secondary"
            @click="developmentDialog = false"
          >
            close
          </VBtn>
          <VBtn type="submit"> Submit </VBtn>
        </VCardText>
      </VForm>
    </VCard>
  </VDialog>
</template>
