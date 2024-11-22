<script setup lang="ts">
import VerificationReturnConfirmation from "@/components/shln/VerificationReturnConfirmation.vue"
import VerificationSaveConfirmation from "@/components/shln/VerificationSaveConfirmation.vue"
import { ref } from 'vue'
const headers = [
  {title: 'No' , key: 'no'},
  {title: 'Manufacture Name' , key: 'manufacture_name'},
  {title: 'Address' , key: 'address'},
  {title: 'Country' , key: 'country'}
]

const items = ref([
  {no: '1', manufacture_name: 'Allyn Group', address: 'Jl. Mangga Besar Raya 211 Mangga Besar, Jakarta', country: 'Thailand'},
])

const snakeBar = useSnackbar()

const handleReturnConfirmation = (inputValue: string) => {
  console.log("INPUT RETURN NYA DISINI YA : ", inputValue)
  snakeBar.sendSnackbar("Submission Successfully Returned ", "success")
}

const handleApproveConfirmation = () => {
  console.log("INPUT APPROVE NYA DISINI YA : ")
  snakeBar.sendSnackbar("Submission Successfully Approved ", "success")
}
</script>

<template>
  <VRow>
    <VCol cols="8">
      <VCard class="pa-4">
        <VRow>
          <VCol cols="8">
            <p class="text-h3">Manufacture</p>
          </VCol>
          <VCol cols="4">
            <VRow no-gutters>
              <VCol cols="6">
                <VerificationReturnConfirmation @confirm="handleReturnConfirmation"/>
              </VCol>
              <VCol cols="6">
                <VerificationSaveConfirmation @confirm="handleApproveConfirmation"/>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VDataTable :headers="headers" :items="items"/>
      </VCard>
    </VCol>

    <VCol cols="4">
      <VCard  class="pa-4">
        <p class="text-h3">Tracking</p>
        <HalalTimeLine :events="timelineEvents" />
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">

</style>
