<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();

const { status_code, registration_number } = props.data || {};

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);
</script>

<template>
  <VCardText class="pa-0">
    <VRow no-gutters align="center" justify="space-between" class="mb-2">
      <VCol cols="auto">
        <span class="text-grey-darken-1">Status</span>
      </VCol>
      <VCol cols="auto">
        <VChip
          :color="statusItem[status_code].color"
          text-color="white"
          size="small"
          class="px-2"
        >
          {{ statusItem[status_code].desc }}
        </VChip>
      </VCol>
    </VRow>

    <VDivider class="my-3" />

    <VRow no-gutters align="center" justify="space-between" class="ga-1">
      <template v-if="registration_number">
        <VCol cols="auto">
          <span class="text-grey-darken-1">{{
            t("shln-verification.halal-registration-number")
          }}</span>
        </VCol>
        <VCol cols="auto">
          <span>{{ registration_number }}</span>
        </VCol>
      </template>
      <template v-else>
        <VCol cols="auto">
          <span class="text-grey-darken-1">{{
            t("shln-verification.halal-registration-number-not-available")
          }}</span>
        </VCol>
      </template>
    </VRow>
  </VCardText>
</template>

<style scoped>
.v-card {
  border: none !important;
  box-shadow: none !important;
}

.v-chip {
  font-weight: normal;
}
</style>
