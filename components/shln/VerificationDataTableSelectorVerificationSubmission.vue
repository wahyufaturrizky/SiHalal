<script setup lang="ts">
import { computed, defineEmits, ref } from "vue";
import { useDisplay } from "vuetify";

const emit = defineEmits<{
  (event: "cancel", message: string): void;
  (event: "update"): void;
  (event: "refresh"): void;
}>();

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const searchQuerySubmission = ref("");
const loadingAddSubmission = ref(false);
const isverificatorParams = ref(false);
const dialogVisible = ref(false);
const loadingSubmission = ref(false);

const itemsSubmission = ref<
  {
    date: string;
    hcb: string;
    id: string;
    verificator_name: string;
    nib: string;
    register_number: string;
    pelaku_usaha: string;
    status_code: string;
  }[]
>([]);

const itemPerPageSubmission = ref(10);
const totalItemsSubmission = ref(0);
const pageSubmission = ref(1);

const checkedItems = ref<{ [key: string]: boolean }>({});

const loadItemSubmission = async (
  pageParams: number,
  sizeParams: number,
  keywordParams: string = "",
  isverificatorParams: boolean = false
) => {
  try {
    loadingSubmission.value = true;

    const response = await $api("/shln/verificator/submission", {
      method: "get",
      params: {
        page: pageParams,
        size: sizeParams,
        keyword: keywordParams,
        isverificator: isverificatorParams,
      },
    });

    itemsSubmission.value = response.data || [];
    totalItemsSubmission.value = response.total_item;
    loadingSubmission.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingSubmission.value = false;
  }
};

const debouncedFetch = debounce(loadItemSubmission, 500);

const handleInputSubmission = () => {
  debouncedFetch(
    pageSubmission.value,
    itemPerPageSubmission.value,
    searchQuerySubmission.value,
    isverificatorParams.value
  );
};

const verifikatorTablePopUpHeader = [
  { title: "No", key: "id", sortable: false },
  { title: "Registration Number", key: "register_number", sortable: false },
  { title: "Pelaku Usaha", key: "pelaku_usaha", sortable: false },
  { title: "NIB / Business ID No", key: "nib", sortable: false },
  { title: "HCB", key: "hcb", sortable: false },
  { title: "Registration Date", key: "date", sortable: false },
  { title: "Submit Date", key: "date", sortable: false },
  { title: "Verifikator", key: "verificator_name", sortable: false },
  { title: "Status", key: "status_code", sortable: false },
  { title: "Action", key: "check", sortable: false },
];

const itemsWithCheckbox = computed(() => {
  return itemsSubmission.value.map((item) => ({
    ...item,
    isChecked: checkedItems.value[item.id] || false,
  }));
});

const checkedItemsCount = computed(() => {
  return itemsWithCheckbox.value.filter((item) => item.isChecked).length;
});

const cancelSelection = () => {
  Object.keys(checkedItems.value).forEach((key) => {
    checkedItems.value[key] = false;
  });
  emit("cancel", "Selection canceled");
  dialogVisible.value = false;
};

const postSubmission = async (selectedItems: string[]) => {
  try {
    loadingAddSubmission.value = true;

    const res: any = await $api(
      "/shln/verificator/assign-certificate-halal-foreign",
      {
        method: "post",
        body: {
          certificate_id: selectedItems,
        },
      }
    );

    if (res?.code === 2000)
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
    else useSnackbar().sendSnackbar("Gagal menambahkan data", "error");

    dialogVisible.value = false;
    loadingAddSubmission.value = false;
    emit("refresh");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    dialogVisible.value = false;
    loadingAddSubmission.value = false;
  }
};

const addSelection = () => {
  const selectedItems = Object.keys(checkedItems.value)
    .filter((key) => checkedItems.value[key])
    .map((key) => {
      return itemsSubmission.value.find((item) => item.id === key);
    });

  postSubmission(selectedItems.map((item: any) => item.id));
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 1100 : "90%";
});

// Function to open the dialog
const openDialog = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <VBtn variant="flat" block append-icon="ri-add-line" @click="openDialog">
    Add Submission
  </VBtn>

  <!-- Add v-model to control dialog visibility -->
  <VDialog v-model="dialogVisible" :max-width="dialogMaxWidth">
    <VCard class="pa-4">
      <p class="text-h4">Submission</p>

      <VRow>
        <VCol>
          <VCheckbox
            v-model="isverificatorParams"
            label="Verifikator"
            @change="
              loadItemSubmission(
                pageSubmission,
                itemPerPageSubmission,
                searchQuerySubmission,
                isverificatorParams
              )
            "
          />
        </VCol>
        <VCol>
          <VTextField
            v-model="searchQuerySubmission"
            density="compact"
            placeholder="Search Data"
            append-inner-icon="ri-search-line"
            style="max-inline-size: 100%"
            @input="handleInputSubmission"
          />
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VDataTableServer
            v-model:items-per-page="itemPerPageSubmission"
            v-model:page="pageSubmission"
            :items-per-page-options="[10, 25, 50, 100]"
            :loading="loadingSubmission"
            :items-length="totalItemsSubmission"
            :headers="verifikatorTablePopUpHeader"
            :items="itemsSubmission"
            loading-text="Loading..."
            @update:options="
              loadItemSubmission(
                pageSubmission,
                itemPerPageSubmission,
                searchQuerySubmission,
                isverificatorParams
              )
            "
          >
            <template #item.id="{ index }">
              {{ index + 1 + (pageSubmission - 1) * itemPerPageSubmission }}
            </template>
            <template #item.register_number="{ item }">
              {{ item.register_number || "NA" }}
            </template>
            <template #item.pelaku_usaha="{ item }">
              {{ item.pelaku_usaha || "NA" }}
            </template>
            <template #item.nib="{ item }">
              {{ item.nib || "NA" }}
            </template>
            <template #item.hcb="{ item }">
              {{ item.hcb || "NA" }}
            </template>
            <template #item.date="{ item }">
              {{ item.date ? formatDateId(item.date) : "NA" }}
            </template>
            <template #item.verificator_name="{ item }">
              {{ item.status_code === "OF10" ? item.verificator_name : "" }}
            </template>
            <template #item.status_code="{ item }">
              <VChip label :color="statusItem[item.status_code].color">
                {{ statusItem[item.status_code].desc }}
              </VChip>
            </template>
            <template #item.check="{ item }">
              <VCheckbox v-model="checkedItems[item.id]" />
            </template>
          </VDataTableServer>
        </VCol>
      </VRow>
      <VRow class="mt-3">
        <VCol class="d-flex justify-end">
          <VBtn
            color="primary"
            variant="outlined"
            class="mr-2"
            @click="cancelSelection"
          >
            Cancel
          </VBtn>
          <VBtn
            :disabled="loadingaddsubmission || checkedItemsCount === 0"
            color="primary"
            @click="addSelection"
          >
            {{ loadingaddsubmission ? "Loading..." : "Add" }} ({{
              checkedItemsCount
            }})
          </VBtn>
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss"></style>
