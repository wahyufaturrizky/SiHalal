<script setup lang="ts">
import { useDisplay } from "vuetify";

const emit = defineEmits(["refresh"]);
const route = useRoute();

const selfDeclareId = (route.params as any).id;

const loadingAdd = ref(false);
const isFormError = ref(false);
const addDialog = ref(false);
const loadingRincian = ref(false);
const loadingAll = ref(true);

const dataProductClasification = ref([]);
const listRincian = ref([]);

const formData = ref({
  kode_rincian: "",
  nama_produk: "",
  merek: "",
  foto_produk: null,
});

const resetForm = () => {
  formData.value = {
    kode_rincian: "",
    nama_produk: "",
    merek: "",
    foto_produk: null,
  };
};

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("id", selfDeclareId);
    formData.append("file", file);
    formData.append("type", "sample");
    const response: any = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });

    if (response?.code === 2000) {
      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingAdd.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
    loadingAdd.value = false;
  }
};

const addData = async () => {
  try {
    loadingAdd.value = true;

    const { foto_produk } = formData.value;

    const fotoProduk = await uploadDocument(foto_produk);
    if (fotoProduk.code !== 2000) {
      return;
    }
    console.log("@formData.value", formData.value);

    const res: any = await $api(
      `/self-declare/verificator/produk/add/${selfDeclareId}`,
      {
        method: "post",
        body: {
          ...formData.value,
          foto_produk: fotoProduk.data.file_url,
        },
      }
    );

    if (res?.code === 2000) {
      loadingAdd.value = false;
      resetForm();
      addDialog.value = false;
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      emit("refresh");
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingAdd.value = false;
      resetForm();
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingAdd.value = false;
    resetForm();
  }
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));

const loadItemProductClasifications = async () => {
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/clasification/${selfDeclareId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataProductClasification.value = response.data;

      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemProductRincian = async (kode_rincian: string) => {
  loadingRincian.value = true;
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/rincian/${kode_rincian}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      listRincian.value = response.data;
      loadingRincian.value = false;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingRincian.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingRincian.value = false;
  }
};

onMounted(async () => {
  const res = await Promise.all([loadItemProductClasifications()]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});
</script>

<template>
  <VBtn
    variant="outlined"
    append-icon="fa-plus"
    @click="addDialog = true"
    style="margin-right: 1svw"
    >Tambah</VBtn
  >

  <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol cols="10" style="display: flex; align-items: center"
            ><h3>Tambah Nama Produk</h3></VCol
          >
          <VCol cols="2" style="display: flex; justify-content: end">
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                size="small"
                icon="fa-times"
                @click="addDialog = false"
              ></VIcon
            ></VCol>
          </VCol>
        </VRow>
      </VCardTitle>
      <VCardItem v-if="!loadingAll">
        <VItemGroup>
          <VLabel><b>Klasifikasi Produk</b></VLabel>
          <VSelect
            density="compact"
            placeholder="Pilih Klasifikasi Produk"
            :loading="loadingRincian"
            item-title="name"
            item-value="code"
            :items="dataProductClasification"
            @update:modelValue="loadItemProductRincian"
          ></VSelect>
        </VItemGroup>
        <br />
        <VItemGroup v-if="!loadingRincian">
          <VLabel><b>Rincian Produk</b></VLabel>

          <VSelect
            density="compact"
            placeholder="Pilih Rincian Produk"
            v-model="formData.kode_rincian"
            :loading="loadingRincian"
            item-title="name"
            item-value="code"
            :items="listRincian"
          ></VSelect>
        </VItemGroup>
        <br />
        <VItemGroup>
          <VLabel><b>Nama Produk</b></VLabel>
          <VTextField
            density="compact"
            placeholder="Isi Nama Produk"
            v-model="formData.nama_produk"
          ></VTextField>
        </VItemGroup>
        <br />
        <VItemGroup>
          <VLabel><b>Merk</b></VLabel>
          <VTextField
            density="compact"
            v-model="formData.merek"
            placeholder="Isi Merk"
          ></VTextField>
        </VItemGroup>
        <br />
        <VItemGroup>
          <VRow>
            <VCol cols="6" style="display: flex; align-items: center">
              <b>Upload Produk</b>
            </VCol>
            <VCol cols="6">
              <HalalFileInput
                :modelValue="formData.foto_produk"
                :rules="[
                      requiredValidator,
                      fileExtensionValidator,
                      (value: any) => {
                        if (value && value.length && value[0].size > 20000000) {
                          isFormError = true
                          return 'file maksimum 20MB'
                        } else {
                          isFormError = false
                        }
                      },
                    ]"
                @update:modelValue="formData.foto_produk = $event"
              />
            </VCol>
          </VRow>
        </VItemGroup>
        <br />
      </VCardItem>
      <VCardActions>
        <VBtn
          :disabled="loadingAdd"
          variant="outlined"
          @click="addDialog = false"
        >
          Batal</VBtn
        >
        <VBtn @click="addData" :loading="loadingAdd" variant="flat"
          >Tambah</VBtn
        >
      </VCardActions>
    </VCard>
  </VDialog>
</template>
