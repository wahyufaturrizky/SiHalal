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

const years = ref([
        {
          color: 'cyan',
          year: '1960',
        },
        {
          color: 'green',
          year: '1970',
        },
        {
          color: 'pink',
          year: '1980',
        },
        {
          color: 'amber',
          year: '1990',
        },
        {
          color: 'orange',
          year: '2000',
        },
      ])


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

  
  <VRow>
    <VCol cols="8">
      <ExpandCard title="Importer" class="mb-6">
        <InfoRow name="Name">SAMSUL</InfoRow>
        <InfoRow name="NIB/ Business Id No.">9876849859494</InfoRow>
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
        <InfoRow name="Status"><VBtn>Draft</VBtn></InfoRow>
        <InfoRow name="Download Halal Registration Number"><i class="fa-solid fa-download"></i></InfoRow>
      </ExpandCard>

      <ExpandCard title="Tracking">
        <v-timeline align="start">
    <v-timeline-item
      v-for="(year, i) in years"
      :key="i"
      :dot-color="year.color"
      size="small"
    >
      <template v-slot:opposite>
        <div
          :class="`pt-1 headline font-weight-bold text-${year.color}`"
          v-text="year.year"
        ></div>
      </template>
      <div>
        <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">
          Lorem ipsum
        </h2>
        <div>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
      </ExpandCard>
    </VCol>
  </VRow>
</div>
</template>

<style scoped lang="scss">

::deep(.v-timeline-divider__before){
  display: none !important;

}

</style>
