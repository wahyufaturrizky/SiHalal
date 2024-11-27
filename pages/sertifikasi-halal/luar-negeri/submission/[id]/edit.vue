<script setup lang="ts">
import EditDocument from "@/views/pages/shln/EditDocument.vue";
import EditIdentity from "@/views/pages/shln/EditIdentity.vue";
import EditManufacture from "@/views/pages/shln/EditManufacture.vue";
import EditProduct from "@/views/pages/shln/EditProduct.vue";
import type { ShlnDetail } from "./index.vue";
export interface Manufacture {
  address: string;
  country: string;
  id: string;
  name: string;
}

const tab = ref("identity");
const route = useRoute();
const shlnId = route.params.id;
const identity = ref<ShlnDetail>();
const manufacture = ref<Manufacture[] | null>();

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

const getManufacture = async () => {
  try {
    const response = await $api("/shln/submission/manufacture", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    manufacture.value = response.data;
    if (manufacture.value == null) {
      manufacture.value = [];
      disabledTab("product", true);
      return;
    }
    disabledTab("product", false);
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
onMounted(async () => {
  await Promise.allSettled([getidentity(), getManufacture()]);
  if (identity.value?.hcb.hcb_id == "" || identity.value?.hcb.country == "") {
    // disabledTab("document", true);
  }
  if (identity.value?.hcb.country == "") {
    disabledTab("manufacture", true);
  }
});
const updateData = useMyUpdateSubmissionEditStore();
watch(
  () => updateData.dataUpdate,
  (newValue, oldValue) => {
    if (newValue == "") {
      return;
    }
    if (newValue == "manufacture") {
      getManufacture();
    }
    if (newValue == "identity") {
      getidentity();
    }
    updateData.setData("");
  }
);
const tabDisable = ref({
  identity: false,
  document: false,
  manufacture: false,
  product: false,
});
const disabledTab = (
  type: "identity" | "document" | "manufacture" | "product",
  value: boolean
) => {
  tabDisable.value[type] = value;
};
</script>

<template>
  <div class="">
    <p class="text-h4">Edit Foreign Halal Certificate Requirements</p>
    <!-- <v-card class="pa-4"> -->
    <VTabs v-model="tab">
      <VTab :disabled="tabDisable.identity" value="identity"> identity </VTab>
      <VTab :disabled="tabDisable.document" value="document"> document </VTab>
      <VTab :disabled="tabDisable.manufacture" value="manufacture">
        manufacture
      </VTab>
      <VTab :disabled="tabDisable.product" value="product"> product </VTab>
    </VTabs>

    <!-- <v-card-text> -->
    <VTabsWindow v-model="tab">
      <VTabsWindowItem value="identity">
        <EditIdentity v-if="identity" :event="identity" />
      </VTabsWindowItem>

      <VTabsWindowItem value="document">
        <EditDocument :mra="mra" />
      </VTabsWindowItem>

      <VTabsWindowItem value="manufacture">
        <EditManufacture
          v-if="manufacture != undefined && identity != undefined"
          :manufacture="manufacture"
          :hcb-country="identity.hcb.country"
        />
      </VTabsWindowItem>
      <VTabsWindowItem value="product">
        <EditProduct />
      </VTabsWindowItem>
    </VTabsWindow>
    <!-- </v-card-text> -->
    <!-- </v-card> -->
  </div>
</template>
