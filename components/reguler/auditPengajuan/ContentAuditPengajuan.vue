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
  opsiBahan: {
    type: Array,
    required: false
  },
  opsiKeterangan: {
    type: Array,
    required: false
  },
  bahanData: {
    type: Array,
    required: false
  }
})

const bahanData = ref({
  namaBahan: '',
  statusKeraguan: '',
  kriteriaBahan: '',
  keterangan: '',
});

const addProsesProduk = ref({
  persyaratan: '',
  penjelasan: ''
})

const updateBahanData = ref(props.bahanData)

const emit = defineEmits()
const submitData = () => {
  if(props.title === 'Bahan'){
    emit('submit', bahanData);
  } else if (props.title === 'Proses Produk Halal'){
    emit('submit',addProsesProduk)
  }
};

const updateBahan = (items) => {
  if(props.title === 'Bahan'){
    emit('update', items)
  }
}

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
              @submit="submitData"
            >
              <template #content>
                <p class="label-pengajuan">
                  Nama Bahan
                </p>
                <VSelect
                  v-model="bahanData.namaBahan"
                  :items="props.opsiBahan"
                  outlined
                  class="-mt-5"
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Status Keraguan
                </p>
                <VSelect
                  v-model="bahanData.statusKeraguan"
                  :items="['Diragukan', 'Tidak Diragukan']"
                  outlined
                  class="-mt-5"
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Kriteria Bahan
                </p>
                <VSelect
                  v-model="bahanData.kriteriaBahan"
                  :items="['Kritis', 'Tidak Kritis']"
                  outlined
                  class="-mt-5"
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Keterangan
                </p>
                <VSelect
                  v-model="bahanData.keterangan"
                  :items="props.opsiKeterangan"
                  outlined
                  class="-mt-5"
                  bg-color="#F6F6F6"
                />
              </template>
            </DialogAuditPengajuan>
            <DialogAuditPengajuan
              v-if="title === 'Proses Produk Halal'"
              title="Tambah Proses Produk Halal"
              button-text="Tambah"
              @submit="submitData"
            >
              <template #content>
                <p class="label-pengajuan">
                  Persyaratan
                </p>
                <VSelect
                  v-model="addProsesProduk.persyaratan"
                  :items="['Proses', 'Kriteria SJPH']"
                  outlined
                  class="-mt-5"
                  bg-color="#F6F6F6"
                />
                <br>
                <p class="label-pengajuan">
                  Penjelasan
                </p>
                <VTextarea class="-mt-5" v-model="addProsesProduk.penjelasan"/>
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
            title="Ubah Bahan"
            button-text="Tambah"
            @submit="() => updateBahan(item)"
          >
            <template
              v-if="title === 'Bahan'"
              #content
            >
              <p class="label-pengajuan">
                Nama Bahan
              </p>
              <VSelect
                v-model="item.materialName"
                :items="props.opsiBahan"
                disabled
                outlined
                class="-mt-5"
                bg-color="#F6F6F6"
              />
              <br>
              <p class="label-pengajuan">
                Status Keraguan
              </p>
              <VSelect
                v-model="item.diragukan"
                :items="['Diragukan', 'Tidak Diragukan']"
                outlined
                class="-mt-5"
                bg-color="#F6F6F6"
              />
              <br>
              <p class="label-pengajuan">
                Kriteria Bahan
              </p>
              <VSelect
                v-model="item.priority"
                :items="['Kritis', 'Tidak Kritis']"
                outlined
                class="-mt-5"
                bg-color="#F6F6F6"
              />
              <br>
              <p class="label-pengajuan">
                Keterangan
              </p>
              <VSelect
                v-model="item.information"
                :items="props.opsiKeterangan"
                outlined
                class="-mt-5"
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
