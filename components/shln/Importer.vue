<script setup>
const importer = {
  name: "SAMSUL",
  nib: "9162739732837",
  api: "API-U",
  npwp: "87623981523478641234",
  address: "Sumbang RT/RW - Sumbang, Curio",
  province: "Sulawesi Selatan",
  regence: "Kab. Enrekang",
  subDistrict: "Curio",
  hcb: "Halal Transaction, Inc / Halal Transaction of Omaha",
  companyName: "Marvin Rocio",
  companyId: "87623819512853",
  country: "United States of America",
  companyAddress: "1518 Stellar Dr, Kenai, Alaska 99611 USA",
  halalCertNumber: "IDP-HC-REG10025",
  issuedDate: "05/07/2024",
  expiredDate: "07/07/2025",
  scope: "Food",
};
</script>

<template>
  <VCard class="mx-auto" max-width="800">
    <VCardText>
      <VRow>
        <VCol cols="12">
          <VList>
            <!-- Personal Information -->
            <VListSubheader class="font-weight-bold">
              Personal Information
            </VListSubheader>
            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Name
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.name }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  NIB/Business No.
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.nib }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  API-P/API-U
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.api }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  NPWP/Taxpayer No.
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.npwp }}</VListItemSubtitle>
            </VListItem>

            <!-- Address Information -->
            <VDivider class="my-2" />
            <VListSubheader class="font-weight-bold">
              Address Information
            </VListSubheader>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Address
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.address }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Province
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.province }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Regence
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.regence }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Sub-District
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.subDistrict }}</VListItemSubtitle>
            </VListItem>

            <!-- Company Information -->
            <VDivider class="my-2" />
            <VListSubheader class="font-weight-bold">
              Company Information
            </VListSubheader>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Halal Certification Body (HCB)
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.hcb }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Company Name
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.companyName }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Company/Corporate Id No.
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.companyId }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Country
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.country }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Company Address
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{
                importer.companyAddress
              }}</VListItemSubtitle>
            </VListItem>

            <!-- Certification Information -->
            <VDivider class="my-2" />
            <VListSubheader class="font-weight-bold">
              Certification Information
            </VListSubheader>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Halal Certification Number
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{
                importer.halalCertNumber
              }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Issued Date
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.issuedDate }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Expired Date
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.expiredDate }}</VListItemSubtitle>
            </VListItem>

            <VListItem>
              <template #prepend>
                <VListItemTitle class="font-weight-medium">
                  Scope
                </VListItemTitle>
              </template>
              <VListItemSubtitle>{{ importer.scope }}</VListItemSubtitle>
            </VListItem>
          </VList>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>
.v-list-item-title {
  min-inline-size: 200px;
}
</style>
