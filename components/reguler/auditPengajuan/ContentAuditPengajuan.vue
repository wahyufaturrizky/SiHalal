<script setup lang="ts">
const props = defineProps({
  onAdd: {
    type: Function,
    default: () => { },
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  headersLabel: {
    type: Array,
    required: true,
  },
  itemsLabel: {
    type: Array,
    required: true,
  },
  withAddButton: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <VCard>
    <VCardTitle class="text-h4 font-weight-bold">
      <VRow class="d-flex flex-wrap justify-space-between align-center pt-5 pb-2 pr-5">
        <VCol class="pl-4">
          <h3 class="text-h3">
            {{ title }}
          </h3>
        </VCol>
        <VCol>
          <VRow
            v-if="withAddButton"
            class="d-flex justify-end align-center ga-2"
          >
            <DialogAuditPengajuan
              v-if="title === 'Bahan'"
              title="Tambah Bahan"
              button-text="Tambah"
            >
              <template #content>
                <p class="label-pengajuan">
                  Nama Bahan
                </p>
                <VSelect
                  :items="['1', '2']"
                  outlined
                  class="-mt-5"
                  disabled
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Status Keraguan
                </p>
                <VSelect
                  :items="['1', '2']"
                  outlined
                  class="-mt-5"
                  disabled
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Kriteria Bahan
                </p>
                <VSelect
                  :items="['1', '2']"
                  outlined
                  class="-mt-5"
                  disabled
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Keterangan
                </p>
                <VSelect
                  :items="['1', '2']"
                  outlined
                  class="-mt-5"
                  disabled
                  bg-color="#F6F6F6"
                />
              </template>
            </DialogAuditPengajuan>
            <DialogAuditPengajuan
              v-if="title === 'Proses Produk Halal'"
              title="Tambah Proses Produk Halal"
              button-text="Tambah"
            >
              <template #content>
                <p class="label-pengajuan">
                  Persyaratan
                </p>
                <VSelect
                  :items="['1', '2']"
                  outlined
                  class="-mt-5"
                  disabled
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Penjelasan
                </p>
                <VTextarea class="-mt-5" />
              </template>
            </DialogAuditPengajuan>
            <DialogAuditPengajuan
              v-if="title === 'Kesimpulan Pemenuhan Kriteria Sistem Jaminan Produk Halal'"
              title="Kesimpulan Pemenuhan Kriteria"
              button-text="Tambah"
            >
              <template #content>
                <p class="label-pengajuan">
                  Kriteria
                </p>
                <VSelect
                  :items="['1', '2']"
                  outlined
                  class="-mt-5"
                  disabled
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Kesesuaian
                </p>
                <VSelect
                  :items="['1', '2']"
                  outlined
                  class="-mt-5"
                  disabled
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Penjelasan
                </p>
                <VTextarea class="-mt-5" />
              </template>
            </DialogAuditPengajuan>
          </VRow>
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        class="border rounded"
        :items-per-page="-1"
        hide-default-footer=""
        :headers="headersLabel"
        :items="itemsLabel"
      >
        <template #item.productType="{ item }">
          <div>
            {{ item.productType }}
          </div>
        </template>
        <template #item.productName="{ item }">
          <div>
            {{ item.productName }}
          </div>
        </template>
        <template #item.publication="{ item }">
          <VCheckbox true-value="true" />
        </template>
        <template #item.action="{ item }">
          <DialogEditAuditPengajuan
            v-if="title === 'Bahan'"
            title="Ubah Nama Produk"
            button-text="Tambah"
          >
            <template
              v-if="title === 'Bahan'"
              #content
            >
              <p class="label-pengajuan">
                Nama Bahan
              </p>
              <VSelect
                :items="['1', '2']"
                outlined
                class="-mt-5"
                disabled
                bg-color="#F6F6F6"
              />
              <br>
              <p class="label-pengajuan">
                Status Keraguan
              </p>
              <VSelect
                :items="['1', '2']"
                outlined
                class="-mt-5"
                disabled
                bg-color="#F6F6F6"
              />
              <br>
              <p class="label-pengajuan">
                Kriteria Bahan
              </p>
              <VSelect
                :items="['1', '2']"
                outlined
                class="-mt-5"
                disabled
                bg-color="#F6F6F6"
              />
              <br>
              <p class="label-pengajuan">
                Keterangan
              </p>
              <VSelect
                :items="['1', '2']"
                outlined
                class="-mt-5"
                disabled
                bg-color="#F6F6F6"
              />
            </template>
          </DialogEditAuditPengajuan>
          <DialogDeleteAuditPengajuan
            v-else
            title="Hapus Bahan"
            button-text="Hapus"
          />
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style lang="scss" scoped>
.ic-center {
    place-self: center;
    display: flex;
}
.-mt-5 {
    margin-top: -5px;
}
</style>
