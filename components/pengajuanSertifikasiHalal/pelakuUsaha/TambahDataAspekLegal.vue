<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { VTextField } from "vuetify/components";

const selfDeclareId = (useRoute().params as any).id;

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
  jenis_surat: "",
  no_surat: "",
  tanggal_surat: "",
  masa_berlaku: "",
  instansi_penerbit: "",
  id_legal: "",
});

const resetForm = () => {
  formData.value = {
    jenis_surat: "",
    no_surat: "",
    tanggal_surat: "",
    masa_berlaku: "",
    instansi_penerbit: "",
    id_legal: "",
  };
};

const isFormError = ref(false);

const checkIsFieldEMpty = (data: any) => {
  return Object.keys(data)?.find((key: any) => {
    if (key !== "id_legal") {
      return !data[key];
    }
  });
};

const addDataAspekLegal = async () => {
  try {
    loadingAdd.value = true;

    const res: any = await $api(
      `/self-declare/verificator/aspek-legal/add/${selfDeclareId}`,
      {
        method: "post",
        body: formData.value,
      }
    );

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
                v-model="formData.jenis_surat"
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
                v-model="formData.no_surat"
                placeholder="Isi Nomor Dokumen"
                density="compact"
                :rules="[requiredValidator]"
              />
            </VItemGroup>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VLabel>Tanggal Dokumen</VLabel>
            <VTextField
              v-model="formData.tanggal_surat"
              placeholder="Tanggal Dokumen"
              type="date"
              :rules="[requiredValidator]"
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
              :rules="[requiredValidator]"
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
                :rules="[requiredValidator]"
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
          <VBtn
            :disabled="checkIsFieldEMpty(formData) || isFormError"
            :loading="loadingAdd"
            @click="addDataAspekLegal"
            variant="flat"
            >Tambah</VBtn
          >
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
