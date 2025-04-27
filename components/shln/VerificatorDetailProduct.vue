<script setup lang="ts">
const props = defineProps({
  datalistproducttracking: {
    type: Object,
    required: true,
  },
  loadingListTrackingProduct: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

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

const latestStatus = computed(() =>
  checkStatusTracking(props.datalistproducttracking)
);
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
                  :is-disabled="latestStatus === 'returned'"
                  @refresh="emit('refresh')"
                />
              </VCol>
              <VCol cols="6">
                <VerificationProductSaveConfirmation
                  :is-disabled="latestStatus === 'verified'"
                  @refresh="emit('refresh')"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VDataTableServer
          v-model:items-per-page="itemPerPage"
          v-model:page="page"
          disable-sort
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
          <template #item.hc_code="{ item }">
            {{ item.hc_code }} ({{ item.hc_code_description }})
          </template>
        </VDataTableServer>
      </VCard>
    </VCol>

    <VCol cols="4">
      <VCard class="pa-0">
        <VCardTitle class="pt-4 pb-0">
          <h3 :class="`${props.loadingListTrackingProduct ? 'mb-2' : ''}`">
            Tracking
          </h3>
          <VProgressLinear
            v-if="props.loadingListTrackingProduct"
            color="primary"
            indeterminate
          />
        </VCardTitle>
        <VerificatorTrackingProductTimeLine
          :datalistproducttracking="props.datalistproducttracking"
        />
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
