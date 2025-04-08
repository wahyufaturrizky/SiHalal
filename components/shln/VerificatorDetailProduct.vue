<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const props = defineProps({
  datalistproducttracking: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const shlnId = route.params.id;

const loadingListProduct = ref(false);
const dataListProduct = ref();
const totalItems = ref(0);
const itemPerPage = ref(10);
const page = ref(1);

const loadItemListProductById = async (page: number, size: number) => {
  try {
    loadingListProduct.value = true;

    const response = await $api(`/shln/verificator/product/list/${shlnId}`, {
      method: "get",
      params: {
        page,
        size,
      },
    });

    if (response.code === 2000) {
      dataListProduct.value = response.data;
      totalItems.value = response?.total_item;
      loadingListProduct.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingListProduct.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingListProduct.value = false;
  }
};

const headers = [
  { title: "No", key: "no" },
  { title: "Manufacture", key: "manufactur" },
  { title: "Product Name", key: "name" },
  { title: "HS Code", key: "hc_code" },
];
</script>

<template>
  <VRow>
    <VCol cols="8">
      <VCard class="pa-4">
        <VRow>
          <VCol cols="8">
            <p class="text-h3">Products</p>
          </VCol>
          <VCol cols="4">
            <VRow no-gutters>
              <VCol cols="6">
                <VerificationProductReturnConfirmation
                  @refresh="emit('refresh')"
                />
              </VCol>
              <VCol cols="6">
                <VerificationProductSaveConfirmation
                  @refresh="emit('refresh')"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          :headers="headers"
          :items="dataListProduct"
          :loading="loadingListProduct"
          :items-length="totalItems"
          loading-text="Loading..."
          @update:options="loadItemListProductById(page, itemPerPage)"
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
        </VDataTableServer>
      </VCard>
    </VCol>

    <VCol cols="4">
      <VCard class="pa-4">
        <p class="text-h3">Tracking</p>
        <VerificatorTrackingProductTimeLine
          :datalistproducttracking="props.datalistproducttracking"
        />
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
