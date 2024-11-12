<script setup lang="ts">
const handleSaveConfirm = () => {
  console.log('Action confirmed!')
}

const handleSaveCancel = () => {
  console.log('Action cancelled!')
}
</script>

<template>
  <ConfirmationDialog
    parent-btn-label="Simpan Perubahan"
    :card-width="500"
    title="Menyimpan perubahan"
    message="Apakah yakin ingin menyimpan data ini?"
    cancel-label="Batal"
    confirm-label="Ya, Simpan"
    confirm-color="primary"
    @confirm="handleSaveConfirm"
    @cancel="handleSaveCancel"
  />
</template>

<style scoped lang="scss">

</style>
