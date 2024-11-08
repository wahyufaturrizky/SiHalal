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
                <VCol cols="5"><p>Perizinan</p></VCol>
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
                <VCol cols="5"><p>KBLI</p></VCol>
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
                <VCol cols="5"><p>Divisi / Unit Usaha</p></VCol>
              </VRow>
            </VCardTitle>
            <VCardText></VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>
  </SubPelakuUsahaLayout>
</template>
