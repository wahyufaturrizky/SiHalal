<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const props = defineProps({
  datalistmanufacturetracking: {
    type: Object,
    required: true,
  },
});

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

onMounted(async () => {
  await loadItemListManufactureById(1, itemPerPage.value);
});

const headers = [
  { title: "No", key: "no" },
  { title: "Manufacture Name", key: "name" },
  { title: "Address", key: "address" },
  { title: "Country", key: "country" },
];
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
                  @refresh="emit('refresh')"
                />
              </VCol>
              <VCol cols="6">
                <VerificationManufactureSaveConfirmation
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
      <VCard class="pa-4">
        <p class="text-h3">Tracking</p>
        <VerificatorTrackingManufactureTimeLine
          :datalistmanufacturetracking="props.datalistmanufacturetracking"
        />
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss"></style>
