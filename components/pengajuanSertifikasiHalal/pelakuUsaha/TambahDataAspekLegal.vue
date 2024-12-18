<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { VTextField } from "vuetify/components";

const emit = defineEmits(["refresh"]);

const addDialog = ref(false);

const props = defineProps({
  dokumen: {
    type: Array,
  },
});

const { dokumen } = props || {};
const loadingAdd = ref(false);

const formData = ref({
  dokumen: "",
  nomor_dokumen: "",
  tanggal_dokumen: "",
  masa_berlaku: "",
  instansi_penerbit: "",
});

const resetForm = () => {
  formData.value = {
    dokumen: "",
    nomor_dokumen: "",
    tanggal_dokumen: "",
    masa_berlaku: "",
    instansi_penerbit: "",
  };
};

const addDataAspekLegal = async () => {
  try {
    loadingAdd.value = true;

    const res: any = await $api("/self-declare/aspek-legal/add", {
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
          <VCol cols="10"><h3>Tambah Data Aspek Legal</h3></VCol>
          <VCol cols="2" style="display: flex; justify-content: end">
            <VIcon size="small" icon="fa-times" @click="addDialog = false" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem>
        <VRow>
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Jenis Dokumen</VLabel>
              <VSelect
                v-model="formData.dokumen"
                :items="dokumen"
                item-title="name"
                item-value="code"
                placeholder="Pilih Jenis Dokumen"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <!-- merk produk appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Nomor Dokumen</VLabel>
              <VTextField
                v-model="formData.nomor_dokumen"
                placeholder="Isi Nomor Dokumen"
                density="compact"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VLabel>Tanggal Dokumen</VLabel>
            <VTextField
              v-model="formData.tanggal_dokumen"
              placeholder="Tanggal Dokumen"
              type="date"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VLabel>Masa Berlaku</VLabel>
            <VTextField
              v-model="formData.masa_berlaku"
              placeholder="Masa Berlaku"
              type="date"
            />
          </VCol>
        </VRow>
        <VRow>
          <!-- merk produk appears when tipe bahan = bersertifikat -->
          <VCol cols="12">
            <VItemGroup>
              <VLabel>Instansi Penerbit</VLabel>
              <VTextField
                placeholder="Isi Instansi Penerbit"
                density="compact"
                v-model="formData.instansi_penerbit"
              />
            </VItemGroup>
          </VCol>
        </VRow>
      </VCardItem>
      <VCardActions
        style="display: flex; justify-content: end; padding: 1.5svw"
      >
        <div>
          <VBtn
            :disabled="loadingAdd"
            @click="isActive.value = false"
            variant="outlined"
          >
            Batal
          </VBtn>
          <VBtn :loading="loadingAdd" @click="addDataAspekLegal" variant="flat"
            >Tambah</VBtn
          >
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
