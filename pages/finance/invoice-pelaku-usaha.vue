<script setup lang="ts">
const data = {
  bill_date: ref([]),
};

const tableHeader = [
  { title: "No", value: "index" },
  { title: "No Invoice", value: "no" },
  { title: "Tanggal Invoice", value: "date" },
  { title: "Register Number", value: "shln_no" },
  { title: "Payment Code", value: "payment_code" },
  { title: "Importer's Name", value: "importer_name" },
  { title: "Due Date", value: "due_date" },
  { title: "Payment Date", value: "va" },
  { title: "Amount", value: "amount" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
];

const items = ref<
  {
    id: string;
    nama_importir: string;
    nib: string;
    no_daftar: string;
    npwp: string;
    tgl_daftar: string;
  }[]
>([]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);

const loadItem = async (page: number, size: number, keyword: string = "") => {
  try {
    loading.value = true;

    const response = await $api("/shln/invoice", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });

    items.value = response.data;
    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};
const defaultStatus = { color: "error", desc: "Unknown Status" };
const statusItem = new Proxy(
  {
    SB001: { color: "warning", desc: "Menunggu Pembayaran" },
    SB002: { color: "warning", desc: "Kurang Bayar" },
    SB003: { color: "warning", desc: "Lebih Bayar" },
    SB004: { color: "success", desc: "Lunas" },
    SB005: { color: "warning", desc: "Konfirmasi Pembayaran" },
    default: { color: "error", desc: "No Status" },
  },
  {
    get(target, prop) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const selectedStatus = ref([]);

const selectedDate = ref([]);
</script>
<template>
  <VRow>
    <VCol cols="12"><h2>Bukti Bayar SHLN</h2></VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="6"><h4>Invoice List</h4></VCol>
            <VCol cols="6" style="display: flex; justify-content: end">
              <VBtn variant="flat">Download Excel</VBtn>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="3">
              <VMenu :close-on-content-click="false" persistent>
                <template #activator="{ props: openMenu }">
                  <VBtn
                    append-icon="fa-filter"
                    v-bind="openMenu"
                    variant="outlined"
                    style="width: 100%"
                    >Filter</VBtn
                  >
                </template>
                <template #default="{ isActive }">
                  <VList>
                    <VListItem>
                      <VItemGroup>
                        <VLabel><b>Status</b></VLabel>
                        <VSelect
                          v-model="selectedStatus"
                          density="compact"
                          placeholder="Semua"
                        ></VSelect>
                      </VItemGroup>
                    </VListItem>
                    <VListItem>
                      <VItemGroup>
                        <VLabel><b>Range</b></VLabel>
                        <AppDateTimePicker
                          v-model="selectedDate"
                          placeholder="Select date"
                          :config="{ mode: 'range' }"
                        />
                      </VItemGroup>
                    </VListItem>
                    <VListItem>
                      <VBtn
                        style="width: 100%"
                        variant="flat"
                        density="compact"
                        @click="isActive.value = false"
                        >Apply</VBtn
                      >
                    </VListItem>
                  </VList>
                </template>
              </VMenu>
            </VCol>
            <VCol cols="1"></VCol>
            <VCol cols="8">
              <VTextField
                density="compact"
                placeholder="Cari Nama Pengajuan"
                append-inner-icon="mdi-magnify"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow>
            <VDataTableServer
              v-model:items-per-page="itemPerPage"
              v-model:page="page"
              :items-length="totalItems"
              :loading="loading"
              loading-text="Loading..."
              @update:options="loadItem(page, itemPerPage)"
              :headers="tableHeader"
              :items="items"
            >
              <template #item.index="{ index }">
                {{ index + 1 + (page - 1) * itemPerPage }}
              </template>
              <template #item.status="{ item }">
                <VChip
                  :color="statusItem[item.status].color"
                  text-color="white"
                  small
                >
                  {{ statusItem[item.status].desc }}
                </VChip>
              </template>
              <template #item.action>
                <VMenu :close-on-content-click="false">
                  <template #activator="{ props: openMenu }">
                    <VIcon icon="mdi-dots-vertical" v-bind="openMenu"></VIcon>
                  </template>
                  <template #default="{ isActive }">
                    <VList>
                      <VListItem>
                        <p>
                          <VIcon
                            icon="fa-download"
                            size="xs"
                            color="primary"
                          ></VIcon>
                          Unduh Invoice
                        </p>
                      </VListItem>
                      <VListItem>
                        <p>
                          <VIcon
                            icon="fa-download"
                            size="xs"
                            color="primary"
                          ></VIcon>
                          Unduh Bukti
                        </p>
                      </VListItem>
                    </VList>
                  </template>
                </VMenu>
              </template>
            </VDataTableServer>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>
