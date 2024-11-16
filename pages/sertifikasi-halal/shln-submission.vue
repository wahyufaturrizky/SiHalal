<script setup lang="ts">

import NewRequestDialog from "@/views/pages/shln/NewRequestDialog.vue";

const items = ref([{
  'No' : '1',
  'Submission Number' : 'xxxx',
  'NIB/Business Id No' : 'xxxxx',
  'NPWP/Taxpayer id No.' : 'xxxxx',
  'Date' : 'xxxxx',
  'Action' : 'xxxx'
},])

const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!searchQuery.value)
    return items.value

  return items.value.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  )
})

const requestDialogVisible = ref(false)

const router = useRouter()
const hanleSubmitRequest = answer => {
  console.log('answer request : ', answer)
  router.push("/sertifikasi-halal/shln-detail/123456789")
}

const openModalsRequest = () => {
  console.log("TEST ")
  requestDialogVisible.value = true
}

</script>

<template>
  <div>
    <p class="text-h4">Foreign Halal Certificate Registration Submission</p>
    <VCard class="pa-4">
      <p class="text-h5">Submission List</p>
      <VRow>
        <VCol class="d-flex justify-sm-space-between align-center">
          <VTextField
            v-model="searchQuery"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            style="max-width: 100%;"
          />
        </VCol>
        <VCol class="d-flex justify-end align-center">
          <VBtn
            color="primary"
            append-icon="ri-add-line"
            @click="openModalsRequest"
          >
            Add Submission
          </VBtn>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTable :items="filteredItems"/>
        </VCol>
      </VRow>
    </VCard>
    <NewRequestDialog
      :dialog-visible="requestDialogVisible"
      :submit="hanleSubmitRequest"
      @update:dialog-visible="requestDialogVisible = $event"
    />

  </div>
</template>

<style scoped lang="scss">

</style>
