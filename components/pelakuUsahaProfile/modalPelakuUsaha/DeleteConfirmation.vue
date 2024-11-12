<script setup lang="ts">
const handleDeleteConfirm = () => {
  console.log('Action confirmed!')
}

const handleDeleteCancel = () => {
  console.log('Action cancelled!')
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
