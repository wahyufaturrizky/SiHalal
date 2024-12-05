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

const selectedFilters = ref({
  fasilitas: 'Semua',
  jenisProduk: 'Semua',
  provinsi: 'Semua',
  lembaga: 'Semua',
  pendamping: 'Semua',
  kabupaten: 'Semua',
  skalaUsaha: 'Semua',
  jenisPengajuan: 'Semua',
  fac: 'Semua'
})
</script>

<template>
  <div class="mx-auto" max-width="800">
    <VRow>
      <VCol cols="12">
        <VList>
          <!-- Personal Information -->
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium"> Nomor ID </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataDetail?.name }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Tanggal
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.nib }}</VListItemSubtitle>
          </VListItem>

          <!-- Address Information -->
          <VDivider class="my-2" />
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                No. Permohonan
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: Test</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Tanggal Permohonan
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.province }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Jenis Layanan
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.regence }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Jenis Produk
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.subDistrict }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Merek Dagang
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.subDistrict }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Area Pemasaran
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.subDistrict }}</VListItemSubtitle>
          </VListItem>
          <!-- Company Information -->
          <VDivider class="my-2" />
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nama Perusahaan
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.hcb }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nama Perusahaan tertera di SH
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.hcb }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Nama KBLI
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.companyName }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Alamat
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.companyId }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Kota/Kab
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.country }}</VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Provinsi
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataDetail?.companyAddress }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Kode Pos
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataDetail?.companyAddress }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Negara
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataDetail?.companyAddress }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Telepon
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataDetail?.companyAddress }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Email
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataDetail?.companyAddress }}
            </VListItemSubtitle>
          </VListItem>

          <!-- Certification Information -->
          <VDivider class="my-2" />
          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Jenis Badan Usaha
              </VListItemTitle>
            </template>
            <VListItemSubtitle>
              : {{ dataDetail?.halalCertNumber }}
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Skala Usaha
              </VListItemTitle>
            </template>
            <VListItemSubtitle class="d-flex align-center">
              <span class="mr-2">:</span>
              <VSelect
                v-model="selectedFilters.kabupaten"
                :items="['Mikro', 'Makro', 'Maroco']"
                density="compact"
                outlined
                style="max-width: 200px;"
              />
              <VBtn
                color="primary"
                variant="outlined"
                dense
                class="ml-2"
                @click="applyFilters"
              >
                Update
              </VBtn>
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <template #prepend>
              <VListItemTitle class="font-weight-medium">
                Modal Dasar
              </VListItemTitle>
            </template>
            <VListItemSubtitle>: {{ dataDetail?.expiredDate }}</VListItemSubtitle>
          </VListItem>
        </VList>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.v-list-item-subtitle {
  white-space: nowrap; /* Prevents breaking into multiple lines */
}

.v-list-item-title {
  min-inline-size: 300px;
}
</style>
