<script setup lang="ts">
const props = defineProps<{
  data: {
    type: Array;
    required: false;
  };
  withUnduh: {
    type: boolean;
    required: false;
    default: false;
  };
  itemsPerPage?: number; // Angka untuk jumlah item per halaman
  currentPage?: number;
  onDownload: {
    type: Function;
    default: () => {};
    required: false;
  };
  headers: {
    type: Array;
  };
}>();

const route = useRoute();

const handleDownload = async (item: any) => {
  try {
    const response = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename: item,
      },
    });

    if (response.url)
      window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.log(error);
  }
};

const id = route.params.id;
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <span class="text-h5 font-weight-bold">{{ props.title }}</span>
    <div class="d-flex justify-space-between gap-4">
      <VBtn
        v-if="withUnduh"
        variant="outlined"
        append-icon="ri-add-line"
        @click="props.onDownload"
      >
        Unduh
      </VBtn>
    </div>
  </div>
  <slot name="headerDialog" />
  <VDataTable
    disable-sort
    :headers="props?.headers"
    :items="data"
    class="border rounded"
    hide-default-footer
  >
    <template #item.no="{ index }">
      <div>
        {{
          ((props.currentPage || 1) - 1) * (props.itemsPerPage || 10) +
          index +
          1
        }}
      </div>
    </template>
    <template #item.file_skph="{ item }">
      <Vbtn
        v-if="item.file_skph"
        class="d-flex gap-3 cursor-pointer"
        style="margin-inline-start: -10px"
        @click="() => handleDownload(item.file_skph)"
      >
        <div>
          <VIcon end icon="ri-file-3-line" color="#652672" />
        </div>
        <label class="cursor-pointer">file</label>
      </Vbtn>
      <div v-else>
        <label>-</label>
      </div>
    </template>
    <template #item.file_spph="{ item }">
      <Vbtn
        v-if="item.file_spph"
        class="d-flex gap-3 cursor-pointer"
        style="margin-inline-start: -10px"
        @click="() => handleDownload(item.file_spph)"
      >
        <div>
          <VIcon end icon="ri-file-3-line" color="#652672" />
        </div>
        <label class="cursor-pointer">file</label>
      </Vbtn>
      <div v-else>
        <label>-</label>
      </div>
    </template>
    <template #item.file_ktp="{ item }">
      <Vbtn
        v-if="item.file_ktp"
        class="d-flex gap-3 cursor-pointer"
        style="margin-inline-start: -10px"
        @click="() => handleDownload(item.file_ktp)"
      >
        <div>
          <VIcon end icon="ri-file-3-line" color="#652672" />
        </div>
        <label class="cursor-pointer">file</label>
      </Vbtn>
      <div v-else>
        <label>-</label>
      </div>
    </template>
    <template #item.productType="{ item }">
      <div class="mw-170">
        {{ item.productType }}
      </div>
    </template>
    <template #item.productName="{ item }">
      <div class="mw-170">
        {{ item.productName }}
      </div>
    </template>
    <template #item.id_reg_legal="{ index }">
      <div class="mw-170">
        {{ index + 1 }}
      </div>
    </template>
    <template #item.publication="{ item }">
      <VCheckbox :checked="item.reg_publish" />
    </template>
    <template #item.tgl_penyelia_halal="{ item }">
      {{ formatDateId(item.tgl_penyelia_halal) }}
    </template>
    <template #item.tanggal_sk="{ item }">
      {{ formatDateId(item.tanggal_sk) }}
    </template>
    <template #item.tanggal_surat="{ item }">
      {{ formatDateId(item.tanggal_surat) }}
    </template>
    <template #item.masa_berlaku="{ item }">
      {{ formatDateId(item.masa_berlaku) }}
    </template>
  </VDataTable>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}

.p0 {
  padding-inline-start: 2px !important;
}

.ml5 {
  margin-inline-start: 5px;
}

.textRed {
  color: #e1442e;
}

.h-20 {
  block-size: 20px;
}

.mw30 {
  min-inline-size: 20rem !important;
}

.-ml10 {
  margin-inline-start: -10px;
}
</style>
