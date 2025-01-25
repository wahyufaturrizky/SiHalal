<script setup lang="ts">
const router = useRouter();
const profileData = reactive({
  institutionName: "Lembaga AB761",
  institutionType: "Komisi Fatwa MUI Provinsi",
  address: "Jl. Jend. Sudirman No. 1",
  province: "Pusat",
  city: "Kab. Enrekang",
  district: "-",
  email: "",
});
const responsiblerData = reactive([
  {
    position: "Pimpinan",
    name: "Albert Flores",
    phone: "082178958123",
    tteFile: "TTE_Pimpinan.JPG",
  },
  {
    position: "Sekretaris",
    name: "Robert Fox",
    phone: "082167247818",
    tteFile: "TTE_Sekretaris.JPG",
  },
  {
    position: "Ketua Bidang Fatwa",
    name: "Kathryn Murphy",
    phone: "082167126781",
    tteFile: "TTE_KetuaBidang.JPG",
  },
  {
    position: "Kontak",
    name: "Savannah Nguyen",
    phone: "082189897921",
    tteFile: "",
  },
]);
const accountData = reactive({
  bankName: "BRI",
  accountNumber: "1234-0008-7771-9871",
  accountName: "Lembaga ABX771",
  accountPhoto: "RekeningBRI.JPG",
  npwpNumber: "0198.6358.9912.8172.1",
  npwpPhoto: "NPWP.JPG",
});
</script>

<template>
  <VRow align="center">
    <VCol>
      <h1 style="font-size: 32px">Detail Profil Komisi Fatwa</h1>
    </VCol>
    <VCol align="end">
      <VBtn
        color="primary"
        variant="outlined"
        text="Ubah"
        class="px-3"
        @click="router.push('/komisi-fatwa/edit-profile')"
      >
        <template #prepend>
          <VIcon icon="mdi-pencil" />
        </template>
      </VBtn>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Profil Komisi Fatwa</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Nama Lembaga</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.institutionName }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Jenis Lembaga</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.institutionType }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Alamat</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.address }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Provinsi</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.province }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Kota/Kab</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.city }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Kecamatan</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.district }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Email</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ profileData.email }}</span>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Penanggung Jawab</h3>
        </VCardTitle>
        <VCardItem>
          <VRow v-for="(item, idx) in responsiblerData">
            <VCol cols="6">
              <VRow>
                <VCol cols="6" class="font-weight-bold">
                  <h4>Nama {{ item.position }}</h4>
                </VCol>
                <VCol cols="6" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{ item.name }}</span>
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="6" class="font-weight-bold">
                  <h4>No. HP</h4>
                </VCol>
                <VCol cols="6" class="d-flex">
                  <span class="me-2">:</span>
                  <span>{{ item.phone }}</span>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="6" v-if="item.tteFile">
              <VRow>
                <VCol cols="6" class="font-weight-bold">
                  <h4>Upload TTE</h4>
                </VCol>
                <VCol cols="6" class="d-flex">
                  <span class="me-2">:</span>
                  <div v-if="item.tteFile" class="d-flex text-primary">
                    <VIcon icon="fa-download" color="primary" />
                    <span class="ms-3">
                      {{ item.tteFile }}
                    </span>
                  </div>
                  <span v-else>-</span>
                </VCol>
              </VRow>
            </VCol>
            <VDivider v-if="idx !== responsiblerData.length - 1" />
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Data Rekening Bank & NPWP</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Nama Bank</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ accountData.bankName }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>No. Rekening</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ accountData.accountNumber }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Atas Nama</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ accountData.accountName }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Upload Foto Rekening</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <div v-if="accountData.accountPhoto" class="d-flex text-primary">
                <VIcon icon="fa-download" color="primary" />
                <span class="ms-3">
                  {{ accountData.accountPhoto }}
                </span>
              </div>
              <span v-else>-</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>NPWP</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <span>{{ accountData.npwpNumber }}</span>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="3" class="font-weight-bold">
              <h4>Upload Foto NPWP</h4>
            </VCol>
            <VCol cols="9" class="d-flex">
              <span class="me-2">:</span>
              <div v-if="accountData.npwpPhoto" class="d-flex text-primary">
                <VIcon icon="fa-download" color="primary" />
                <span class="ms-3">
                  {{ accountData.npwpPhoto }}
                </span>
              </div>
              <span v-else>-</span>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped></style>
