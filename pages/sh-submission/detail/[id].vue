<script setup lang="ts">
import IdentityTabPendamping from "@/components/shSubmission/IdentityTabPendamping.vue";

const router = useRouter();
const sessionData = await useMyAuthUserStore().getSession();
const userRoles = sessionData.value?.roles.map((role) => role.name);

const currentTab = ref("IDENTITY");
const refresh = ref();

const route = useRoute();
const id_detail = (route.params as any).id as string;
</script>

<template>
  <div class="d-flex align-center cursor-pointer" @click="router.go(-1)">
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div>
  <VRow no-gutters>
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
      <VTabs v-model="currentTab" class="mb-10">
        <VTab value="IDENTITY">Pelaku Usaha</VTab>
        <VTab value="SUBMISSION">Pengajuan</VTab>
        <VTab value="PLACE">Pabrik & Outlet</VTab>
        <VTab value="INGREDIENT">Bahan</VTab>
        <VTab value="PRODUCT">Produk</VTab>
        <VTab value="PROCESS">Proses Produk Halal</VTab>
        <VTab value="STATEMENT">Pernyataan</VTab>
      </VTabs>

      <VTabsWindow v-model="currentTab">
        <VTabsWindowItem value="IDENTITY">
          <IdentityTabPendamping :id-detail="id_detail" />
        </VTabsWindowItem>
        <VTabsWindowItem value="SUBMISSION">
          <SubmissionTab :id-detail="id_detail" />
        </VTabsWindowItem>
        <VTabsWindowItem value="PLACE">
          <PlaceTab />
        </VTabsWindowItem>
        <VTabsWindowItem value="INGREDIENT">
          <IngredientTab />
        </VTabsWindowItem>
        <VTabsWindowItem value="PRODUCT">
          <ProductTab />
        </VTabsWindowItem>
        <VTabsWindowItem value="PROCESS">
          <ProcessTab :user-roles="userRoles" />
        </VTabsWindowItem>
        <VTabsWindowItem value="STATEMENT">
          <!-- <StatementTab :id-detail="id_detail" /> -->
          <EditPernyataanSelfDeclareSubmision></EditPernyataanSelfDeclareSubmision>
        </VTabsWindowItem>
      </VTabsWindow>
    </VCol>
  </VRow>
</template>
