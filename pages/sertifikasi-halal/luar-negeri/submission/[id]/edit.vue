<script setup lang="ts">
import EditDocument, { MRA } from "@/views/pages/shln/EditDocument.vue";
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
const mra = ref<MRA>();

const getidentity = async () => {
  try {
    await getHcb();
    const response = await $api("/shln/submission/identity", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    identity.value = response.data;
    if (
      identity.value?.hcb.country == "" ||
      identity.value?.hcb.country == null ||
      identity.value?.hcb.country == undefined
    ) {
      disabledTab("manufacture", true);
    }
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
const getMra = async () => {
  try {
    const response = await $api("/shln/submission/document/mra", {
      method: "post",
      body: {
        id: shlnId,
      },
    });
    if (response.code == 500) {
      disabledTab("document", true);
      return;
    }
    mra.value = response.data;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const hcb = ref<{ country: string; id: string; name: string }[]>();

const getHcb = async () => {
  try {
    const response = await $api("/shln/submission/identity/hcb", {
      method: "get",
    });

    hcb.value = response;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const changeHcb = (item: string) => {
  return hcb.value?.find((body) => body.id == item)?.name;
};
onMounted(async () => {
  await Promise.allSettled([getidentity(), getManufacture(), getMra()]);
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
      disabledTab("manufacture", false);
      disabledTab("document", false);
      getidentity();
      getHcb();
      getMra();
    }
    // if (newValue == "document") {
    //   getmra();
    // }
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
  <KembaliButton />
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
        <EditIdentity v-if="identity" :hcb="hcb" :event="identity" />
      </VTabsWindowItem>

      <VTabsWindowItem value="document">
        <EditDocument v-if="mra" :mra="mra" />
      </VTabsWindowItem>

      <VTabsWindowItem value="manufacture">
        <EditManufacture
          v-if="manufacture != undefined && identity != undefined"
          :manufacture="manufacture"
          :hcb-country="identity.hcb.country"
        />
      </VTabsWindowItem>
      <VTabsWindowItem value="product">
        <EditProduct
          v-if="manufacture != undefined"
          :manufacture="manufacture"
        />
      </VTabsWindowItem>
    </VTabsWindow>
    <!-- </v-card-text> -->
    <!-- </v-card> -->
  </div>
</template>
