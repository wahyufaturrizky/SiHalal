<script setup lang="ts">
import EditDocument from "@/views/pages/shln/EditDocument.vue";
import EditIdentity from "@/views/pages/shln/EditIdentity.vue";
import EditManufacture from "@/views/pages/shln/EditManufacture.vue";
import EditProduct from "@/views/pages/shln/EditProduct.vue";
import type { ShlnDetail } from "./index.vue";

const tab = ref("identity");
const route = useRoute();
const shlnId = route.params.id;
const identity = ref<ShlnDetail>();

const getidentity = async () => {
  try {
    const response = await $api("/shln/submission/identity", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    identity.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const tracking = ref<ShlnTracking[]>();

const loadTracking = async () => {
  try {
    const response = await $api("/shln/submission/tracking", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    tracking.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  Promise.allSettled([getidentity(), loadTracking()]);
  console.log(identity);
});
</script>

<template>
  <div class="">
    <p class="text-h4">Edit Foreign Halal Certificate Requirements</p>
    <!-- <v-card class="pa-4"> -->
    <VTabs v-model="tab">
      <VTab value="identity"> identity </VTab>
      <VTab value="document"> document </VTab>
      <VTab value="manufacture"> manufacture </VTab>
      <VTab value="product"> product </VTab>
    </VTabs>

    <!-- <v-card-text> -->
    <VTabsWindow v-model="tab">
      <VTabsWindowItem value="identity">
        <EditIdentity :tracking="tracking" :event="identity" />
      </VTabsWindowItem>

      <VTabsWindowItem value="document">
        <EditDocument />
      </VTabsWindowItem>

      <VTabsWindowItem value="manufacture">
        <EditManufacture />
      </VTabsWindowItem>
      <VTabsWindowItem value="product">
        <EditProduct />
      </VTabsWindowItem>
    </VTabsWindow>
    <!-- </v-card-text> -->
    <!-- </v-card> -->
  </div>
</template>
