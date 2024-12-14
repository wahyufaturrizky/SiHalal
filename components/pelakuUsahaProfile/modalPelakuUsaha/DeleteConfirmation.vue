<script setup lang="ts">
const emit = defineEmits(['delete-confirm', 'delete-cancel'])

const handleDeleteConfirm = (String: id) => {
  console.log('Action confirmed!')
  emit('delete-confirm', id)
}

const handleDeleteCancel = () => {
  console.log('Action cancelled!')
  emit('delete-cancel')
}
</script>

<template>
  <ConfirmationDialog
    parent-btn-label="Hapus"
    parent-btn-variant="outlined"
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
