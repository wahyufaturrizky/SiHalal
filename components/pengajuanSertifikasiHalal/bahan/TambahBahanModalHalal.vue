<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { VTextField } from "vuetify/components";

const emit = defineEmits(["refresh"]);

const formData = ref({
  bahan_type: "",
  bahan_name: "",
  bahan_kelompok: "",
  bahan_merk_produk: "",
  bahan_produsen: "",
  bahan_nomor_sertifikat_halal: "",
});

const loadingAdd = ref(false);

const resetForm = () => {
  formData.value = {
    bahan_type: "",
    bahan_name: "",
    bahan_kelompok: "",
    bahan_merk_produk: "",
    bahan_produsen: "",
    bahan_nomor_sertifikat_halal: "",
  };
};

const addDialog = ref(false);

const addDataBahan = async () => {
  try {
    loadingAdd.value = true;

    const res: any = await $api("/self-declare/verificator/bahan/add", {
      method: "post",
      body: formData.value,
    });

    if (res?.code === 2000) {
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      emit("refresh");
    } else {
      useSnackbar().sendSnackbar("Gagal update data", "error");
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
    resetForm();
    addDialog.value = false;
  }
};

// Sample data for "Bahan Bersertifikat" and "Tidak Bersertifikat"
const bahanOptions = [
  { name: "Bahan Bersertifikat", value: "bersertifikat" },
  { name: "Bahan Tidak Bersertifikat", value: "tidak_bersertifikat" },
];

// Search term entered by the user
const searchTerm = ref("");
// Boolean to toggle visibility of the suggestion
const showSuggestion = ref(false);

// Function to handle search input
const handleSearch = () => {
  showSuggestion.value = searchTerm.value.toLowerCase() === "susu";
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));
</script>

<template>
  <VBtn
    variant="outlined"
    prepend-icon="fa-plus"
    style="margin: 1svw"
    @click="addDialog = true"
  >
    Tambah
  </VBtn>

  <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol cols="10"><h3>Tambah Data Bahan</h3></VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon size="small" icon="fa-times" @click="addDialog = false" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Tipe Bahan</VLabel>
              <VSelect
                v-model="formData.bahan_type"
                :items="bahanOptions"
                item-title="name"
                item-value="value"
                placeholder="Pilih Tipe Bahan"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VItemGroup v-if="formData.bahan_type === 'tidak_bersertifikat'">
              <VLabel> Bahan&nbsp; Tidak&nbsp; Bersertifikat </VLabel>
              <VTextField
                placeholder="Cari Bahan Tidak Bersertifikat"
                density="compact"
              >
                <template #append-inner>
                  <CariBahanModal />
                </template>
              </VTextField>
            </VItemGroup>
            <VItemGroup>
              <VLabel> Bahan&nbsp; Bersertifikat </VLabel>
              <VTextField
                v-model="formData.bahan_name"
                placeholder="Cari Bahan Bersertifikat"
                density="compact"
                @input="handleSearch"
              >
                <!-- Suggestion and Button -->

                <template #append-inner>
                  <CariBahanModal />
                </template>
              </VTextField>
              <VRow v-if="showSuggestion" class="mt-2 justify-end align-center">
                <VCol cols="auto" class="d-flex align-center pr-0">
                  <p class="text-caption mb-0">
                    Bahan yang dicari tidak ditemukan? Ajukan bahan disini.
                  </p>
                </VCol>
                <VCol cols="auto" class="pl-0">
                  <AjukanBahanModal />
                </VCol>
              </VRow>
            </VItemGroup>
          </VCol>
        </VRow>

        <br />
        <VDivider />
        <br />
        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Jenis Bahan</VLabel>
              <VSelect
                v-model="formData.bahan_type"
                :items="bahanOptions"
                item-title="name"
                item-value="value"
                placeholder="Pilih Jenis Bahan"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Nama Bahan</VLabel>
              <VTextField
                readonly
                placeholder="Nama Bahan otomatis terisi setelah memilih bahan"
                density="compact"
                v-model="formData.bahan_name"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="bahanType === 'tidak_bersertifikat'">
          <!-- kelompok appears when tipe bahan = tidak bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Kelompok</VLabel>
              <VTextField
                readonly
                placeholder="Kelompok otomatis terisi setelah memilih bahan"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="bahanType === 'bersertifikat'">
          <!-- merk produk appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Merk Produk</VLabel>
              <VTextField
                readonly
                placeholder="Merk Produk otomatis terisi setelah memilih bahan"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="bahanType === 'bersertifikat'">
          <!-- produsen appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Produsen</VLabel>
              <VTextField
                readonly
                placeholder="Produsen otomatis terisi setelah memilih bahan"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="bahanType === 'bersertifikat'">
          <!-- appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Nomor Sertifikat Halal</VLabel>
              <VTextField
                readonly
                placeholder="Nomor Sertifikat Halal otomatis terisi setelah memilih bahan"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow v-if="bahanType === 'bersertifikat'">
          <VCol cols="12">
            <VItemGroup>
              <!-- Date TextField -->
              <Vuepicdatepicker>
                <template #trigger>
                  <Vuepicdatepicker
                    v-model:model-value="data.sertifikasi_date.value"
                    auto-apply
                    model-type="dd/MM/yyyy"
                    :enable-time-picker="false"
                    :teleport="true"
                    clearable
                  >
                    <template #trigger>
                      <VLabel>Masa Berlaku Sertifikat Halal</VLabel>
                      <VTextField
                        placeholder="Masa Berlaku Sertifikat Halal"
                        density="compact"
                        readonly
                        append-inner-icon="fa-calendar"
                        :model-value="data.sertifikasi_date.value"
                      />
                    </template>
                  </Vuepicdatepicker>
                </template>
              </Vuepicdatepicker>
            </VItemGroup>
          </VCol>
        </VRow>
      </VCardItem>
      <VCardActions
        style="display: flex; justify-content: end; padding: 1.5svw"
      >
        <div>
          <VBtn
            @click="addDialog = false"
            :disabled="loadingAdd"
            variant="outlined"
          >
            Batal
          </VBtn>
          <VBtn @click="addDataBahan" :loading="loadingAdd" variant="flat">
            Tambah
          </VBtn>
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
