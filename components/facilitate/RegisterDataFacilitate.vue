<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { status_code, kode_fasilitasi } = props.data || {};

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF12: { color: "success", desc: "Verifikasi LPH" },
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
        <VChip label :color="statusItem[status_code].color">
          {{ statusItem[status_code].desc }}
        </VChip>
      </VCol>
    </VRow>

    <VDivider class="my-3" />

    <VRow no-gutters align="center" justify="space-between">
      <VCol cols="auto">
        <span class="text-grey-darken-1">Kode Fasilitasi</span>
      </VCol>
      <VCol cols="auto">
        <span>{{ kode_fasilitasi }}</span>
      </VCol>
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
