<script setup lang="ts">
const router = useRouter()

const deleteItem = () => {
  console.log('Hapus item')
}

const editItem = () => {
  router.push("/sertifikasi-halal/shln-edit")
}

const submitItem = () => {
  console.log('Submit item')
}

</script>

<template>
<div>
  <KembaliButton />
  <VRow>
    <VCol cols="9">
      <p class="text-h4">Foreign Halal Certificate Registration Submission</p>
    </VCol>
    <VCol cols="3">
      <VBtn
        class="mr-4"
        color="primary"
        append-icon="ri-delete-bin-6-line"
        @click="deleteItem"
      >
      </VBtn>
      <VBtn
        class="mr-4"
        color="primary"
        append-icon="ri-edit-line"
        @click="editItem"
      >
        Edit
      </VBtn>
      <VBtn
        color="primary"
        append-icon="ri-send-plane-line"
        @click="submitItem"
      >
        Submit
      </VBtn>
    </VCol>
  </VRow>
</div>
</template>

<style scoped lang="scss">

</style>
