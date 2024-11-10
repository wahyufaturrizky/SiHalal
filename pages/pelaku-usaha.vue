<script setup lang="ts">
import SubPelakuUsahaLayout from "@/layouts/subPelakuUsahaLayout.vue";
const tablePabrikHeader = [
  { title: "No", key: "no" },
  { title: "Jenis", key: "kind" },
  { title: "No. Dokumen", key: "no_docs" },
  { title: "Tanggal", key: "date" },
  { title: "Masa Berlaku", key: "exp_date" },
  { title: "Instansi Penerbit", key: "publisher" },
];

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
];


const tablePerizinanHeader = [
  { title: "No", key: "no" },
  { title: "Penerbit", key: "publisher" },
  { title: "Nama Izin", key: "permission_name" },
  { title: "Nomor", key: "number" },
  { title: "Tanggal", key: "date" },
  { title: "Document", key: "document"}
]

const tableKBLIHeader = [
  { title: "No", key: "no" },
  { title: "No. KBLI", key: "kbli_number" },
  { title: "Nama KBLI", key: "kbli_name" },
  { title: "Nama Usaha", key: "business_name" },
  { title: "Alamat", key: "address" },
  { title: "Modal Usaha", key: "business_capital"}
]

const tableBussinessUnitHeader = [
  { title: "No", key: "no" },
  { title: "Divisi / Unit Usaha", key: "bussiness_unit" },
  { title: "Alamat", key: "address" },
  { title: "Username", key: "username" }
]
</script>

<template>
  <SubPelakuUsahaLayout>
    <template #pageTitle>
      <VRow>
        <VCol><h3>Detail Pelaku Usaha</h3></VCol>
        <VCol style="display: flex; justify-content: end"
          ><VBtn density="compact" variant="outlined" prepend-icon=""
            >Ubah</VBtn
          ></VCol
        >
      </VRow>
    </template>
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="5"><p>Aspek Legal</p></VCol>
              </VRow>
            </VCardTitle>
            <VCardText><AspekLegalTable></AspekLegalTable></VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="6"><h4>Pabrik</h4></VCol>
              </VRow>
            </VCardTitle>
            <VCardText>
              <VDataTable :headers="tablePabrikHeader"></VDataTable>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="6"><h4>Outlet</h4></VCol>
              </VRow>
            </VCardTitle>
            <VCardText>
              <VDataTable :headers="tableOutletHeader"></VDataTable>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="5"><p>Penyelia Halal</p></VCol>
              </VRow>
            </VCardTitle>
            <VCardText><AspekLegalTable></AspekLegalTable></VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="5"><p>Perizinan</p>
                  <BasicDataPopup
                    parent-btn-label="Lihat Detail"
                    :card-width="700"
                  >
                    <template #content>
                      <VDataTable  :headers="tablePerizinanHeader"/>
                    </template>
                  </BasicDataPopup>
                </VCol>
              </VRow>
            </VCardTitle>
            <VCardText></VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="5"><p>KBLI</p>
                  <BasicDataPopup
                    parent-btn-label="Lihat Detail"
                    :card-width="700"
                  >
                    <template #content>
                      <VDataTable :headers="tableKBLIHeader"/>
                    </template>
                  </BasicDataPopup>
                </VCol>
              </VRow>
            </VCardTitle>
            <VCardText></VCardText>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle>
              <VRow>
                <VCol cols="5"><p>Divisi / Unit Usaha</p>
                  <BasicDataPopup
                    parent-btn-label="Lihat Detail"
                    :card-width="700"
                  >
                    <template #content>
                      <VDataTable :headers="tableBussinessUnitHeader"/>
                    </template>
                  </BasicDataPopup>
                </VCol>
              </VRow>
            </VCardTitle>
            <VCardText></VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>
  </SubPelakuUsahaLayout>
</template>
