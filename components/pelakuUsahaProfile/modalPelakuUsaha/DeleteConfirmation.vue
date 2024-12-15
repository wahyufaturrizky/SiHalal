<script setup lang="ts">
const emit = defineEmits(['delete-confirm', 'delete-cancel'])

const handleDeleteConfirm = () => {
  emit('delete-confirm')
}

const handleDeleteCancel = () => {
  emit('delete-cancel')
}
</script>

<template>
  <ConfirmationDialog
    prepend-icon="  mdi-delete"
    parent-btn-label="Hapus"
    parent-btn-variant="text"
    parent-btn-color="error"
    :card-width="500"
    title="Menghapus Data"
    message="Apakah yakin ingin menghapus data ini?"
    cancel-label="Batal"
    confirm-label="Ya, Hapus"
    confirm-color="error"
    @confirm="handleDeleteConfirm"
    @cancel="handleDeleteCancel"
  />
</template>

<style scoped lang="scss">

</style>
