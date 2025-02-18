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
console.log(props,'isi props')
const onRegister = () => {
  props.newRegister("JD.1", selectedItem.value);
  isVisible.value = false;
};

const onAddRegister = () => {
  props.newRegister("JD.3", selectedItem.value);
  isVisible.value = false;
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 750 : "90%";
});

const { t } = useI18n();
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
                  style="min-inline-size: 100%;"
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
                  style="min-inline-size: 100%;"
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
</template>
