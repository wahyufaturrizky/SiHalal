<script setup lang="ts">
import { ref } from "vue";
const tab = ref("identity");

const sessionData = await useMyAuthUserStore().getSession();
const userRoles = sessionData.value?.roles.map((role) => role.name);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <KembaliButton />
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <h1>Detail Pengajuan</h1>
    </VCol>
    <VCol v-if="userRoles?.includes('Verifikator')" class="d-flex justify-end">
      <VBtn
        color="primary"
        variant="outlined"
        text="Lihat Laporan"
        class="me-4"
      />
      <VBtn
        color="primary"
        variant="outlined"
        text="Pengembalian"
        class="me-4"
      />
      <VBtn color="#49A84C" text="Tandai OK" class="me-4" />
      <VBtn color="error" text="Dibatalkan" />
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VTabs v-model="tab" class="mb-10">
        <VTab value="identity">Pelaku Usaha</VTab>
        <VTab value="document">Pengajuan</VTab>
        <VTab value="manufacture">Pabrik & Outlet</VTab>
        <VTab value="material">Bahan</VTab>
        <VTab value="product">Produk</VTab>
        <VTab value="process">Proses Produk Halal</VTab>
        <VTab value="declare">Pernyataan</VTab>
      </VTabs>

      <VTabsWindow v-model="tab">
        <VTabsWindowItem value="identity">
          <TabPelakuUsaha />
        </VTabsWindowItem>
        <VTabsWindowItem value="document">
          <TabPengajuan />
        </VTabsWindowItem>
        <VTabsWindowItem value="manufacture">
          <TabPabrikDanOutlet />
        </VTabsWindowItem>
        <VTabsWindowItem value="material"> </VTabsWindowItem>
        <VTabsWindowItem value="product">
          <TabProduk />
        </VTabsWindowItem>
        <VTabsWindowItem value="process">
          <TabProsesProdukHalal :user-roles="userRoles" />
        </VTabsWindowItem>
        <VTabsWindowItem value="declare">
          <TabPernyataan />
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
