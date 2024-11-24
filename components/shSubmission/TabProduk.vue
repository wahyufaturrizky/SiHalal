<script setup lang="ts">
const dialogVisible = ref(false);
const dialogUse = ref("CREATE");

const productHeader: any = [
  { title: "No", value: "index" },
  { title: "Nama Produk", value: "name" },
  { title: "Merek", value: "brand" },
  { title: "Foto", value: "image", nowrap: true },
  { title: "Jumlah Bahan Digunakan", value: "ingredientCount" },
  { title: "Input Bahan", value: "ingredientInput" },
  { title: "Verif oleh Pendamping", value: "isVerified" },
  { title: "Action", value: "actions", align: "center" },
];
const productData = ref([
  {
    name: "Kopi Luwak Ciater",
    brand: "Biji Kopi",
    image: "",
    ingredientCount: "20",
    ingredientInput: "",
    isVerified: false,
  },
]);

const verifiedProduct = computed(() => {
  let count = 0;
  productData.value.forEach((item) => {
    if (item.isVerified) count++;
  });
  return count;
});

const handleOpenDialog = () => {
  dialogVisible.value = true;
};

const fileName = ref("");
const fileInput = ref();
const triggerFileInput = () => {
  fileInput.value.click();
};
const onFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    return (fileName.value = file.name);
  }
};
</script>

<template>
  <VCard>
    <VCardTitle class="my-5 d-flex justify-space-between align-center">
      <div class="font-weight-bold text-h4">Daftar Nama Produk</div>
      <div>
        <VBtn variant="outlined" class="me-3" @click="handleOpenDialog">
          <div class="pe-3">Tambah</div>
          <VIcon icon="fa-plus" />
        </VBtn>
        <VBtn variant="flat" :color="verifiedProduct ? 'primary' : `#A09BA1`">
          <div class="pe-3">
            {{
              verifiedProduct
                ? `Simpan Verif (${verifiedProduct})`
                : "Simpan Verif"
            }}
          </div>
          <VIcon icon="fa-upload" />
        </VBtn>
      </div>
    </VCardTitle>
    <VCardText>
      <VDataTable
        :headers="productHeader"
        :items="productData"
        hide-default-footer
      >
        <template #item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.image>
          <div class="d-flex">
            <VIcon icon="mdi-file-download" size="small" color="primary" />
            <div class="text-primary ms-3">file</div>
          </div>
        </template>
        <template #item.ingredientInput>
          <VBtn variant="outlined" size="small" rounded="lg"> Lihat </VBtn>
        </template>
        <template #item.isVerified="{ item }">
          <VCheckboxBtn v-model="item.isVerified" />
        </template>
        <template #item.actions="{ index }">
          <VMenu>
            <template #activator="{ props }">
              <VIcon
                icon="fa-ellipsis-v"
                color="primary"
                class="cursor-pointer"
                v-bind="props"
              />
            </template>
            <VList>
              <VListItem prepend-icon="mdi-pencil" title="Ubah" />
              <VListItem>
                <template #prepend>
                  <VIcon icon="mdi-delete" color="error" />
                </template>
                <VListItemTitle class="text-error">Hapus</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
  <ShSubmissionDetailFormModal
    dialog-title="Tambah Pemetaan Produk dan Pabrik"
    :dialog-visible="dialogVisible"
    :dialog-use="dialogUse"
    @update:dialog-visible="dialogVisible = $event"
  >
    <VCardText>
      <VItemGroup>
        <VLabel>Klasifikasi Produk</VLabel>
        <VSelect placeholder="Pilih Klasifikasi Produk" density="compact" />
        <br />
      </VItemGroup>
      <VItemGroup>
        <VLabel>Rincian Produk</VLabel>
        <VSelect placeholder="Pilih Rincian Produk" density="compact" />
        <br />
      </VItemGroup>
      <VItemGroup>
        <VLabel>Nama Produk</VLabel>
        <VTextField placeholder="Masukkan Nama Produk" density="compact" />
        <br />
      </VItemGroup>
      <VItemGroup>
        <VLabel>Merek Produk</VLabel>
        <VTextField placeholder="Masukkan Merek Produk" density="compact" />
        <br />
      </VItemGroup>
      <VItemGroup>
        <VRow align="center">
          <VCol cols="6">
            <VLabel>Unggah Foto Produk</VLabel>
          </VCol>
          <VCol cols="6">
            <VTextField
              v-if="fileName"
              density="compact"
              :model-value="fileName"
              placeholder="No file choosen"
              rounded="xl"
              max-width="400"
            >
              <template #append-inner>
                <VIcon
                  icon="fa-trash"
                  color="error"
                  class="cursor-pointer"
                  @click="fileName = ''"
                />
              </template>
            </VTextField>
            <VTextField
              v-else
              class="custom-file-input"
              density="compact"
              rounded="xl"
              placeholder="No file choosen"
              max-width="400"
            >
              <template #append-inner>
                <VBtn
                  rounded="s-0 e-xl"
                  @click.prevent="triggerFileInput"
                  text="Choose"
                />
              </template>
            </VTextField>
            <input
              type="file"
              ref="fileInput"
              @change="onFileChange"
              accept="application/vnd.ms-excel, application/pdf, image/png"
              style="display: none"
            />
          </VCol>
        </VRow>
        <br />
      </VItemGroup>
    </VCardText>
  </ShSubmissionDetailFormModal>
</template>

<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
