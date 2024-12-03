<script setup lang="ts">
const props = defineProps({
  loadinghapus: {
    type: Boolean,
  },
  visiblemodalhapus: {
    type: Boolean,
  },
});

const emit = defineEmits<{
  (event: "cancel"): void;
  (event: "hapus"): void;
}>();

const { loadinghapus, visiblemodalhapus } = props || {};
</script>

<template>
  <VBtn
    density="compact"
    style="margin: 0.5svw"
    variant="outlined"
    color="#E1442E"
  >
    <VIcon style="color: #e1442e" icon="fa-trash" />
  </VBtn>

  <VDialog v-model="visiblemodalhapus" max-width="50svw">
    <VCard style="padding: 1svw">
      <VCardTitle><h3>Hapus Pengajuan</h3></VCardTitle>
      <VCardItem>
        <p>Yakin ingin menghapus pengajuan fasilitasi?</p>
      </VCardItem>
      <VCardActions>
        <VBtn variant="outlined" density="compact" @click="emit('cancel')">
          Batal
        </VBtn>
        <VBtn
          color="#E1442E"
          variant="flat"
          density="compact"
          :disabled="loadinghapus"
          @click="emit('hapus')"
        >
          {{ loadinghapus ? "Loading..." : "Ya, Hapus" }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
