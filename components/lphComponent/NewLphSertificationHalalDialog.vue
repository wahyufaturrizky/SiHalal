<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
<template>
  <div class="mb-2">
    <VBtn @click="openDialog" variant="flat">
      {{ t("pengajuan-reguler.reguler-list-btn-ajukan") }}
    </VBtn>
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <VCardTitle> {{ t("pengajuan-reguler.popup-title") }}</VCardTitle>
        <VCardText>{{ t("pengajuan-reguler.popup-content") }} </VCardText>
        <VRow no-gutters class="pa-4 ga-2">
          <VCol>
            <VCard class="text-center">
              <VCardTitle class="text-center text-h6">
                {{ t("pengajuan-reguler.popup-new-title") }}</VCardTitle
              >
              <VDivider></VDivider>
              <VCardText class="mt-0">
                {{ t("pengajuan-reguler.popup-new-desc") }}<br />
                {{ t("pengajuan-reguler.popup-new-desc-1") }}
                <strong>{{ t("pengajuan-reguler.popup-new-desc-2") }} </strong>
                / <strong>{{ t("pengajuan-reguler.popup-new-desc-3") }} </strong
                ><br />
                {{ t("pengajuan-reguler.popup-new-desc-4") }}
              </VCardText>
              <VDivider></VDivider>
              <VCardActions class="pa-2 justify-center">
                <VBtn
                  variant="flat"
                  style="min-inline-size: 100%"
                  @click="newRegister"
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
              <VDivider></VDivider>
              <VCardText class="mt-0">
                {{ t("pengajuan-reguler.popup-new-desc") }}<br />
                {{ t("pengajuan-reguler.popup-new-desc-1") }}
                <strong> {{ t("pengajuan-reguler.popup-new-desc-2") }}</strong>
                / <strong> {{ t("pengajuan-reguler.popup-new-desc-3") }}</strong
                ><br />
                {{ t("pengajuan-reguler.popup-new-desc-4") }}
              </VCardText>
              <VDivider></VDivider>
              <VCardActions class="pa-2 justify-center">
                <VBtn
                  variant="flat"
                  style="min-inline-size: 100%"
                  @click="additionalRegister"
                >
                  {{ t("pengajuan-reguler.popup-new-btn") }}
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
        </VRow>

        <VCardText>
          <span class="font-weight-bold mb-4">{{
            t("pengajuan-reguler.popup-kbli-title")
          }}</span>
          <v-select
            v-model="selectedItem"
            :items="items"
            item-title="text"
            :placeholder="t(`pengajuan-reguler.popup-kbli-combo-text`)"
            item-text="text"
            item-value="value"
          ></v-select>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";

import { useDisplay } from "vuetify";

const props = defineProps({});

const isVisible = ref(false);

const openDialog = () => {
  isVisible.value = true;
};

const selectedItem = ref(null);
const items = [
  { text: "Nama Usaha 1", value: "1" },
  { text: "Nama Usaha 2", value: "2" },
  { text: "Nama Usaha 3", value: "3" },
];

const newRegister = () => {
  console.log("new register ; ", selectedItem);
  isVisible.value = false;
};

const additionalRegister = () => {
  console.log("additional register ; ", selectedItem);
  isVisible.value = false;
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 750 : "90%";
});
</script>

<style scoped></style>
