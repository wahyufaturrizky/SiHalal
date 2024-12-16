<script setup lang="ts">
import { statusItemFacilitator } from "@/server/utils/statusFasilitator";

const tableHeader = [
  { title: "No", value: "index" },
  { title: "Kode Fasilitasi", value: "kode_fac" },
  { title: "Tahun", value: "tahun" },
  { title: "Nama Fasilitasi", value: "fac_name" },
  { title: "Sumber Pembiayaan", value: "sumber_biaya" },
  { title: "Jenis", value: "jenis" },
  { title: "Tanggal AKtif", value: "tgl_aktif" },
  { title: "Tanggal Selesai", value: "tgl_selesai" },
  { title: "Kuota", value: "kuota" },
  { title: "Status", value: "status_code" },
  { title: "Action", value: "action" },
];

const itemPerPage = ref(10);
const totalItems = ref(0);
const loading = ref(true);
const page = ref(1);
const items = ref([]);
const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await $api("/facilitate/entry", {
      method: "get",
      params: {
        page,
        size,
        keyword: "",
        status: "OF1,OF10,OF5,OF2,OF290",
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
const navigateAction = (id: string) => {
  navigateTo(`/facilitation/entry/${id}`);
};
</script>

<template>
  <VDataTableServer
    :headers="tableHeader"
    v-model:items-per-page="itemPerPage"
    v-model:page="page"
    :items-length="totalItems"
    :loading="loading"
    loading-text="Loading..."
    :items="items"
    @update:options="loadItem(page, itemPerPage)"
  >
    <template #item.index="{ index }">
      {{ index + 1 + (page - 1) * itemPerPage }}
    </template>
    <template #item.status_code="{ item }">
      <VChip label :color="statusItemFacilitator[item.status_code].color">
        {{ statusItemFacilitator[item.status_code].desc }}
      </VChip>
    </template>
    <template #item.tgl_aktif="{ item }">
      {{
        new Date(item.tgl_aktif) != "Invalid Date"
          ? formatDateIntl(new Date(item.tgl_aktif))
          : ""
      }}
    </template>
    <template #item.tgl_selesai="{ item }">
      {{
        new Date(item.tgl_selesai) != "Invalid Date"
          ? formatDateIntl(new Date(item.tgl_selesai))
          : ""
      }}
    </template>
    <template #item.action="{ item }">
      <div class="d-flex gap-1">
        <IconBtn size="small" @click="">
          <VIcon
            icon="ri-arrow-right-line"
            color="primary"
            @click="navigateAction(item.id)"
          />
        </IconBtn>
      </div>
    </template>
  </VDataTableServer>
</template>
