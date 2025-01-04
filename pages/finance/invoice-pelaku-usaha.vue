<script setup lang="ts">
const data = {
  bill_date: ref([]),
};

const tableHeader = [
  { title: "No", value: "index" },
  { title: "No Invoice", value: "no_inv" },
  { title: "Tanggal Invoice", value: "tgl_inv" },
  { title: "Register Number", value: "no_daftar" },
  { title: "Payment Code", value: "va" },
  { title: "Importer's Name", value: "nama" },
  { title: "Due Date", value: "duedate" },
  { title: "Payment Date", value: "tgl_bayar" },
  { title: "Amount", value: "total_inv" },
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

    const response = await $api("/shln/finance/invoice", {
      method: "get",
      params: {
        page,
        size,
        keyword,
      },
    });
    if (response.code != 2000) {
      loading.value = false;

      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      return;
    }

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
              <template #item.total_inv="{ item }">
                {{ formatToIDR(item.total_inv) }}
              </template>
              <template #item.tgl_inv="{ item }">
                {{ formatToISOString(item.tgl_inv) }}
              </template>
              <template #item.duedate="{ item }">
                {{ formatToISOString(item.duedate) }}
              </template>
              <template #item.tgl_bayar="{ item }">
                {{ formatToISOString(item.tgl_bayar) }}
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
