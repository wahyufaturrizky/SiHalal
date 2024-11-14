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


const route = useRoute()

const userId = route.params.id



const productItems = [
  {
    "No" : "xxx",
    "Product Name " : "xxxx",
    "HS Code " : "xxxxx",
    "Delete" : "xxxxx",
  }
]

const documentItems = [
  {
    "No" : 1,
    "Document Types" : "Letter of Application",
    "Upload / Download " : "",
    "Recent History" : "o"
  },
  {
    "No" : 2,
    "Document Types" : "Business License Number (NIB) ",
    "Upload / Download " : "",
    "Recent History" : "o"
  }
]

const timelineEvents = ref([
  { time: '5pm', title: 'New Icon', description: 'Mobile App', dotColor: 'pink' },
  { time: '3-4pm', title: 'Design Stand Up', description: 'Hangouts', dotColor: 'teal-lighten-3'},
  { time: '12pm', title: 'Lunch break', dotColor: 'pink'},
  { time: '9-11am', title: 'Finish Home Screen', description: 'Web App', dotColor: 'teal-lighten-3' },
])

</script>

<template>
<div>
  <KembaliButton />
  <VRow>
    <VCol cols="8">
      <p class="text-h4">Foreign Halal Certificate Registration Submission</p>
    </VCol>
    <VCol cols="4">
      <VRow justify="end" class="gap-1">
        <VCol cols="auto">
          <VBtn
            variant="outlined"
            color="error"
            @click="deleteItem"
          >
            <VIcon icon="ri-delete-bin-6-line"></VIcon>
          </VBtn>
        </VCol>
        <VCol cols="auto">
          <VBtn
            variant="outlined"
            color="primary"
            append-icon="ri-edit-line"
            @click="editItem"
          >
            Edit
          </VBtn>
        </VCol>
        <VCol cols="auto">
          <VBtn
            variant="outlined"
            color="primary"
            append-icon="ri-send-plane-line"
            @click="submitItem">
            Submit
          </VBtn>
        </VCol>
      </VRow>
    </VCol>
  </VRow>

  
  <VRow>
    <VCol cols="8">
      <ExpandCard title="Importer" class="mb-6">
        <InfoRow name="Name">SAMSUL</InfoRow>
        <InfoRow name="NIB/ Business Id No.">{{userId}}</InfoRow>
        <InfoRow name="API-P / API-U"></InfoRow>
        <InfoRow name="NPWP / Taxpayer Id No.">21932103120310</InfoRow>
        <InfoRow name="Address">Sumbang. RT/RW-, Sumbang, Curio</InfoRow>
        <InfoRow name="Province">Sulawesi Selatan</InfoRow>
        <InfoRow name="Regence">Kab. Enrekang</InfoRow>
        <InfoRow name="Sub-District">Curio</InfoRow>
        <ThinLine :thickness=1 />
        <InfoRow name="Halal Certification Body (HCB)"></InfoRow>
        <ThinLine :thickness=1 />
        <InfoRow name="Company Name">Marvin Roob</InfoRow>
        <InfoRow name="Company / Corporate Id No. ">8782172181818</InfoRow>
        <InfoRow name="Country">United States Of America</InfoRow>
        <InfoRow name="Address">1558 Stellar Dr. Kenal Alaska 99611, USA</InfoRow>
        <ThinLine :thickness=1 />
        <InfoRow name="Halal Certification Number"></InfoRow>
        <InfoRow name="Issued Date"></InfoRow>
        <InfoRow name="Expired Date"></InfoRow>
        <InfoRow name="Scope">-</InfoRow>
      </ExpandCard>

      <ExpandCard title="Importer's Point of Contract" class="mb-6">
        <InfoRow name="Name">Yopi Syukur</InfoRow>
        <InfoRow name="Position">Penanggung Jawab</InfoRow>
        <InfoRow name="Email">yopisyukur@gmail.com</InfoRow>
        <InfoRow name="Phone No.">08123456789</InfoRow>
        <InfoRow name="Address">Jl. Percetakan Negara Raya BI B/6, DKI Jakarta</InfoRow>
      </ExpandCard>

      <ExpandCard title="Products" class="mb-6">
        <VDataTable :items="productItems"/>
      </ExpandCard>
      <ExpandCard title="Requirement Document" class="mb-6">
        <VDataTable :items="documentItems" />
      </ExpandCard>
    </VCol>

    <VCol cols="4">
      <ExpandCard title="Registration Data" class="mb-6">
        <InfoRow name="Submission Number">-</InfoRow>
        <InfoRow name="Halal Registration Number">-</InfoRow>
        <InfoRow name="IssuedDate">-</InfoRow>
        <InfoRow name="Expired Date">21932103120310</InfoRow>
        <InfoRow name="Status"><VBtn variant="outlined">Draft</VBtn></InfoRow>
        <InfoRow name="Download Halal Registration Number"><VBtn ><VIcon icon="ri-download-line"></VIcon></VBtn></InfoRow>
      </ExpandCard>

      <ExpandCard title="Tracking">
        <HalalTimeLine  :events="timelineEvents" />
      </ExpandCard>
    </VCol>
  </VRow>
</div>
</template>

<style scoped lang="scss">

</style>
