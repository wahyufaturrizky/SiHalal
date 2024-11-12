<script setup lang="ts">
import { ref } from 'vue'


const loaForm = ref({
  authorizerName: '',
  authorizedName: '',
  date: '',
  loaDocument: '',
})

const saveForm = () => {
  console.log("Form saved", form.value)
}

const tableRequirementDocumentHeader = [
  { title: 'No', key: 'no' },
  { title: 'Document Types', key: 'documentTypes' },
  { title: 'Upload / Download ', key: 'option' },
  { title: 'Notes', key: 'notes' },
  { title: 'status', key: 'status' },
  { title: 'Record History', key: 'recordHistory' },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <ExpandCard title="Mutual Recognition Agreement / MRA Document ">
        <p>Document for Mutual Halal Certification Recognition</p>
        <InfoRow name="Halal Instituion Name">The Central Islamic Council of Thailand</InfoRow>
        <InfoRow name="Validity Period">16/11/2027</InfoRow>
        <InfoRow name="Country">Thailand</InfoRow>
      </ExpandCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <ExpandCard title="Letter Of Authorization / LoA Document " class="mb-4">
        <p>An Appointment Letter from the Exporter to the Importer</p>
        <VCol cols="12">
          <VTextField v-model="loaForm.authorizerName" label="Authorizer Name" disabled />
        </VCol>
        <VCol cols="12">
          <VTextField v-model="loaForm.authorizedName" label="Authorized Name" disabled />
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="loaForm.date"
            label="Issued Date"
            outlined
            dense
            required
            type="date"
            class="custom-date-input"
          />
        </VCol>
        <VCol cols="12">
          <VFileInput
            v-model="loaForm.loaDocument"
            label="Unggah Sertifikat Kompetensi Penyelia Halal"
            outlined
            dense
            accept=".pdf,.jpg,.png"
            class="mb-2"
          />
        </VCol>

        <VCol cols="12">
          <!-- Note Title -->
          <p class="text-h5 font-weight-bold">Note</p>

          <!-- Note Box -->
          <VCard outlined>
            <VCardText>
              <p>
                This is the paragraph inside the box. You can put any content here, such as additional instructions, important information, or any other text you want to highlight in a box.
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" class="text-right">
          <VBtn color="primary" @click="saveForm">Save</VBtn>
        </VCol>
      </ExpandCard>

      <ExpandCard title="Original of the Foreign Halal Certificate ">
        <VCol cols="12">
          <VFileInput
            v-model="loaForm.loaDocument"
            label="File"
            outlined
            dense
            accept=".pdf,.jpg,.png"
            class="mb-2"
          />
        </VCol>

        <VCol cols="12">
          <!-- Note Title -->
          <p class="text-h5 font-weight-bold">Note</p>

          <!-- Note Box -->
          <VCard outlined>
            <VCardText>
              <p>
                This is the paragraph inside the box. You can put any content here, such as additional instructions, important information, or any other text you want to highlight in a box.
              </p>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" class="text-right">
          <VBtn color="primary" @click="saveForm">Save</VBtn>
        </VCol>
      </ExpandCard>
    </VCol>
    <VCol cols="4">
      <ExpandCard title="Tracking of LOA" class="mb-4">
        <HalalTimeLine :events="timelineEvents" />
      </ExpandCard>

      <ExpandCard title="Tracking of Certificate and Legalization">
        <HalalTimeLine :events="timelineEvents" />
      </ExpandCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <ExpandCard title="Requirement Document ">
        <VDataTable :headers="tableRequirementDocumentHeader" />


        <VCol cols="12" class="d-flex justify-end ga-2">
          <VBtn color="primary" @click="saveForm" variant="outlined" append-icon="ri-download-line">Download FHCR Application Letter Document Format</VBtn>
          <VBtn color="primary" @click="saveForm">Save</VBtn>
        </VCol>
      </ExpandCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">

</style>
