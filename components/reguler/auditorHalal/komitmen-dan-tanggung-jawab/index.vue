<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  onComplete: {
    type: Function,
    default: () => {},
    required: false,
  },
});

const { t } = useI18n();
const agreed = ref(false);
const progress = ref(33);
const labelProgress = ref("1/3");

const handleSubmit = () => {
  switch (progress.value) {
    case 33:
      progress.value = 66;
      labelProgress.value = "2/3";
      break;
    case 66:
      progress.value = 100;
      labelProgress.value = "3/3";
      break;
    case 100:
      props.onComplete();
      localStorage.setItem("commitmentAndResponsibility", true);
      break;
    default:
      break;
  }
  agreed.value = false;
};

onMounted(() => {
  if (localStorage.getItem("commitmentAndResponsibility")) props.onComplete();
});
</script>

<template>
  <VRow justify="center">
    <VCol cols="12">
      <VCard class="pa-5">
        <label class="progress-text">
          {{ labelProgress }}
        </label>
        <VProgressLinear
          height="6"
          color="success"
          class="mb-4"
          bg-color="#000"
          active="true"
          buffer-color="#652672"
          :buffer-value="progress"
          buffer-opacity="1"
          rounded="50px"
        />
        <h2 class="text-h6 font-weight-bold">
          {{ t("pengajuan-reguler.reguler-form--komitmen-title") }}
        </h2>
        <VDivider class="mb-4" />

        <VCardText v-if="progress <= 33" class="bgContent">
          <div class="text-center mb-4">
            <span class="text-h3 font-weight-bold">
              {{
                t("pengajuan-reguler.reguler-form--komitmen-1-subtitle")
              }}</span
            >
          </div>

          <p>
            {{ t("pengajuan-reguler.reguler-form--komitmen-1-content") }}
          </p>

          <ol class="ml-4">
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
        <VCardText v-if="progress > 33 && progress <= 66" class="bgContent">
          <div class="text-center mb-4">
            <span class="text-h3 font-weight-bold">
              {{
                t("pengajuan-reguler.reguler-form--komitmen-2-subtitle")
              }}</span
            >
          </div>

          <ol class="ml-4">
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
        <VCardText v-if="progress > 66" class="bgContent">
          <div class="text-center mb-4">
            <span class="text-h3 font-weight-bold">
              {{
                t("pengajuan-reguler.reguler-form--komitmen-3-subtitle")
              }}</span
            >
          </div>
          <ol class="ml-4">
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

        <VDivider class="my-4" />

        <VRow align="center">
          <VCheckbox
            v-model="agreed"
            :label="t('pengajuan-reguler.reguler-form--komitmen-1-agreed')"
          />
        </VRow>

        <VRow justify="center" class="mt-4">
          <VBtn :disabled="!agreed" color="#652672" @click="handleSubmit">
            {{ t("pengajuan-reguler.reguler-form--komitmen-1-agreed-save") }}
          </VBtn>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
}

.progress-text {
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}
</style>
