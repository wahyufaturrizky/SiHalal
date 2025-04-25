<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  datalistmanufacturetracking: {
    type: Object,
    required: true,
  },
  loadingListTrackingManufacture: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const route = useRoute();

const shlnId = route.params.id;

const loadingListManufacture = ref(false);
const dataListManufacture = ref();
const totalItems = ref(0);
const itemPerPage = ref(10);
const page = ref(1);

const loadItemListManufactureById = async (page: number, size: number) => {
  try {
    loadingListManufacture.value = true;

    const response = await $api(
      `/shln/verificator/manufacture/list/${shlnId}`,
      {
        method: "get",
        params: {
          page,
          size,
        },
      }
    );

    if (response.code === 2000) {
      dataListManufacture.value = response.data || [];
      totalItems.value = response?.total_item;

      loadingListManufacture.value = false;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loadingListManufacture.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingListManufacture.value = false;
  }
};

const headers = [
  { title: "No", key: "no" },
  { title: "Manufacture Name", key: "name" },
  { title: "Address", key: "address" },
  { title: "Country", key: "country" },
];

const latestStatus = computed(() =>
  checkStatusTracking(props.datalistmanufacturetracking)
);
</script>

<template>
  <VRow>
    <VCol cols="8">
      <VCard class="pa-4">
        <VRow>
          <VCol cols="8">
            <p class="text-h3">Manufacture</p>
          </VCol>
          <VCol cols="4">
            <VRow no-gutters>
              <VCol cols="6">
                <VerificationManufactureReturnConfirmation
                  :is-disabled="latestStatus === 'returned'"
                  @refresh="emit('refresh')"
                />
              </VCol>
              <VCol cols="6">
                <VerificationManufactureSaveConfirmation
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
          :items-per-page-options="[10, 25, 50, 100]"
          :headers="headers"
          :items="dataListManufacture"
          :loading="loadingListManufacture"
          :items-length="totalItems"
          loading-text="Loading..."
          @update:options="loadItemListManufactureById(page, itemPerPage)"
        >
          <template #item.no="{ index }">
            {{ index + 1 + (page - 1) * itemPerPage }}
          </template>
        </VDataTableServer>
      </VCard>
    </VCol>

    <VCol cols="4">
      <VCard class="pa-0">
        <VCardTitle class="pt-4 pb-0">
          <h3 :class="`${props.loadingListTrackingManufacture ? 'mb-2' : ''}`">
            Tracking
          </h3>
          <VProgressLinear
            v-if="props.loadingListTrackingManufacture"
            color="primary"
            indeterminate
          />
        </VCardTitle>
        <VerificatorTrackingManufactureTimeLine
          :datalistmanufacturetracking="props.datalistmanufacturetracking"
        />
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
