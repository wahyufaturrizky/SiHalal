<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { data } = props || {};
const { importer, hcb, hcn, profile } = data || {};

const dataDetail = {
  name: importer?.name,
  nib: profile?.nib,
  api: profile?.api_type,
  npwp: profile?.npwp,
  address: importer?.address,
  province: profile?.province,
  regence: profile?.regency,
  subDistrict: profile?.sub_district,
  hcb: hcb?.hcb_id,
  companyName: hcb?.company_name,
  companyId: hcb?.corporate_id_number,
  country: hcb?.country,
  companyAddress: hcb?.address,
  halalCertNumber: hcn?.hcn_number,
  issuedDate: hcn?.issued_date,
  expiredDate: hcn?.expired_date,
  scope: hcn?.scope,
};
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VList>
          <!-- Personal Information -->
          <VListSubheader class="font-weight-bold">
            Personal Information
          </VListSubheader>
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium"> Name </VListItemTitle>
            </template>
            <VListItemSubtitle>
              {{ dataDetail?.name }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                NIB/Business No.
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.nib }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                API-P/API-U
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.api }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                NPWP/Taxpayer No.
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.npwp }}</VListItemSubtitle>
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
            <VListItemSubtitle>{{ dataDetail?.address }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Province
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.province }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Regence
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.regence }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Sub-District
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.subDistrict }}</VListItemSubtitle>
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
            <VListItemSubtitle>{{ dataDetail?.hcb }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Company Name
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.companyName }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Company/Corporate Id No.
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.companyId }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Country
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.country }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Company Address
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              {{ dataDetail?.companyAddress }}
            </VListItemSubtitle>
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
            <VListItemSubtitle>
              {{ dataDetail?.halalCertNumber }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Issued Date
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.issuedDate }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Expired Date
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.expiredDate }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Scope
              </VListItemTitle>
            </template>
            <VListItemSubtitle>{{ dataDetail?.scope }}</VListItemSubtitle>
          </VListItem>
        </VList>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.v-list-item-title {
  min-inline-size: 200px;
}
</style>
