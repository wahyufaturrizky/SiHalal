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
    parent-btn-label="Perbaharui Data OSS"
    parent-btn-variant="outlined"
    :card-width="500"
    title="Perbaharui Data OSS"
    message="Apakah yakin ingin memperbaharui data pelaku usaha dari data OSS?"
    cancel-label="Batal"
    confirm-label="Ya, Perbaharui"
    confirm-color="primary"
    @confirm="handleSaveConfirm"
    @cancel="handleSaveCancel"
  />
</template>

<style scoped lang="scss">

</style>
