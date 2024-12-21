<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  data: Array<string>,
});

const emit = defineEmits(["update:dialogVisible"]);

const localDialogVisible = ref(props.dialogVisible);

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);

watch(localDialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});

const closeDialog = () => {
  localDialogVisible.value = false;
};
</script>

<template>
  <VDialog v-model="localDialogVisible" max-width="50%">
    <VCard class="pa-4">
      <VCardTitle class="d-flex space-between align-center">
        <span class="text-h5">Info</span>
        <VSpacer />
        <VIcon icon="mdi-close" style="color: black" @click="closeDialog" />
      </VCardTitle>
      <VCardText>
        <VRow>
          <VCol cols="12">
            Maaf, Anda tidak layak untuk mengajukan self declare. Syarat-syarat
            berikut tidak terpenuhi:
          </VCol>
        </VRow>
        <VRow no-gutters class="ps-5">
          <VCol cols="12">
            <ul v-for="item in data">
              <li>{{ item }}</li>
            </ul>
          </VCol>
        </VRow>
        <VRow no-gutters>
          <VCol cols="12">
            Silahkan mengajukan pengajuan Sertifikat Halal Regular
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped></style>
