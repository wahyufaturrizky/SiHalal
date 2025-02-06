<script setup lang="ts">
const emit = defineEmits(["confirm"]);

const item = ref(0);

const check = ref(false);

const next = () => {
  if (!check.value) return;

  if (check.value && item.value === 2) {
    emit("confirm", true);

    return;
  }
  if (check.value) item.value = item.value + 1;
  check.value = false;
};

onMounted(() => {
  item.value = 0;
});
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <VCard class="pa-4">
    <VCardTitle>
      {{ t("pengajuan-reguler.reguler-form--komitmen-title") }}
    </VCardTitle>

    <VCardItem>
      <VCard class="border rounded pa-4">
        <VCardItem v-if="item === 0">
          <VCardTitle class="d-flex justify-center mb-4">
            <span class="text-h3">
              {{
                t("pengajuan-reguler.reguler-form--komitmen-1-subtitle")
              }}</span
            >
          </VCardTitle>
          <VCardText class="pa-8">
            <span class="text-h5">
              {{ t("pengajuan-reguler.reguler-form--komitmen-1-content") }}
            </span>
            <ol class="ma-4 pa-4">
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-1-content-1") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-1-content-2") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-1-content-3") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-1-content-4") }}
              </li>
            </ol>
          </VCardText>
        </VCardItem>
        <VCardItem v-if="item === 1">
          <VCardTitle class="d-flex justify-center mb-4">
            <span class="text-h3">{{
              t("pengajuan-reguler.reguler-form--komitmen-2-subtitle")
            }}</span>
          </VCardTitle>
          <VCardText class="pa-8">
            <span class="text-h5">
              {{ t("pengajuan-reguler.reguler-form--komitmen-1-content") }}
            </span>
            <ol class="ma-4 pa-4">
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-2-content-1") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-2-content-2") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-2-content-3") }}
              </li>
            </ol>
          </VCardText>
        </VCardItem>
        <VCardItem v-if="item === 2">
          <VCardTitle class="d-flex justify-center mb-4">
            <span class="text-h3">
              {{
                t("pengajuan-reguler.reguler-form--komitmen-3-subtitle")
              }}</span
            >
          </VCardTitle>
          <VCardText class="pa-8">
            <span class="text-h5">
              {{ t("pengajuan-reguler.reguler-form--komitmen-1-content") }}
            </span>
            <ol class="ma-4 pa-4">
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-3-content-1") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-3-content-2") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-3-content-3") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-3-content-4") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-3-content-5") }}
              </li>
              <li>
                {{ t("pengajuan-reguler.reguler-form--komitmen-3-content-6") }}
              </li>
            </ol>
          </VCardText>
        </VCardItem>
        <VCardActions>
          <VCheckbox id="checkHalal" v-model="check" />
          <VLabel for="checkHalal">
            {{ t("pengajuan-reguler.reguler-form--komitmen-1-agreed") }}
          </VLabel>
        </VCardActions>
        <VCardActions class="d-flex justify-center">
          <VBtn
            min-width="120px"
            max-width="120px"
            variant="flat"
            block
            @click="next"
          >
            {{ t("pengajuan-reguler.reguler-form--komitmen-1-agreed-save") }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
