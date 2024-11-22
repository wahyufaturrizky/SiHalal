<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

// State untuk checkbox
const kunciLembaga = ref(false);

// Header tabel
const headers = [
  { title: "No", key: "no" },
  { title: "Nama LPH / LP3H", key: "institutionName" },
  { title: "Nama Penanggung Jawab", key: "picName" },
  { title: "Nomor Penanggung Jawab", key: "picPhoneNumber" },
  { title: "Action", value: "action", sortable: false },
];

// Data tabel
const items = ref([
  {
    no: 1,
    institutionName: "Pusat Halal Pemuda Muhammadiyah (PHPM)",
    picName: "Yusuf",
    picPhoneNumber: "081299998888",
  },
  {
    no: 2,
    institutionName: "Forum Zakat",
    picName: "Syafiq",
    picPhoneNumber: "081299998889",
  },
  {
    no: 3,
    institutionName: "Halal Center Al-Hidayah",
    picName: "Yani",
    picPhoneNumber: "081299998881",
  },
]);

// Form data dan dialog
const formRef = ref(null);
const selectedItem = ref(null);
const addDialog = ref(false);
const deleteDialog = ref(false);

// Data untuk form tambah lembaga
const formData = ref({
  institutionName: "",
  picName: "",
  picPhoneNumber: "",
});

// Fungsi tambah data
const tambahData = () => {
  if (formRef.value?.validate()) {
    items.value.push({
      no: items.value.length + 1,
      ...formData.value,
    });
    resetForm();
    addDialog.value = false;
  }
};

// Reset form
const resetForm = () => {
  formData.value = {
    institutionName: "",
    picName: "",
    picPhoneNumber: "",
  };
};

const confirmDelete = (item: any) => {
  selectedItem.value = item;
  deleteDialog.value = true;
};

const hapusData = () => {
  const index = items.value.indexOf(selectedItem.value);
  if (index > -1) {
    items.value.splice(index, 1);
  }
  deleteDialog.value = false;
};

const { mdAndUp } = useDisplay();
const dialogMaxWidth = computed(() => (mdAndUp ? 700 : "90%"));
</script>

<template>
  <VContainer>
    <!-- Checkbox Kunci Lembaga -->
    <VCard class="mb-6">
      <VCardText>
        <VRow>
          <VCol cols="3">
            <label for="kunciLembaga">Kunci Lembaga (LPH / LP3H) </label>
          </VCol>
          <VCol cols="9">
            <VCheckbox
              id="kunciLembaga"
              v-model="kunciLembaga"
              label="Kunci (LPH/LP3H)"
            ></VCheckbox>
            <span
            >Dengan mengunci lembaga (LPH/LP3H), maka pelaku usaha hanya bisa
              memilih lembaga sesuai dengan isian pada form di bawah ini.</span
            >
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard class="pa-4">
      <VCardText class="d-flex justify-space-between align-center">
        <p class="text-h4">List Lembaga</p>
        <VBtn
          color="primary"
          class="mb-4"
          @click="addDialog = true"
          append-icon="ri-add-line"
        >
          Tambah
        </VBtn>
      </VCardText>
      <VDataTable :headers="headers" :items="items" class="elevation-1">
        <template #item.action="{ item }">
          <VIcon
            color="error"
            style="cursor: pointer;"
            @click="confirmDelete(item)"
          >
            ri-delete-bin-6-line
          </VIcon>
        </template>
      </VDataTable>
    </VCard>

    <VDialog v-model="addDialog" :max-width="dialogMaxWidth">
      <VCard class="pa-4">
        <VCardTitle class="text-h4">Tambah Lembaga</VCardTitle>
        <VCardText>
          <VForm ref="formRef">
            <label
              class="text-h6"
              for="institutionName"
            > Lembaga Pendamping </label>
            <VSelect
              placeholder="Pilih Lembaga Pendamping"
              id="institutionName"
              v-model="formData.institutionName"
              :items="['lembaga 1', 'lembaga 2', 'lembaga 3']"
              required
              class="mb-4"
            ></VSelect>
            <label
              class="text-h6"
              for="picName"
            > Nama Penanggung Jawab Program LPH / LP3H </label>
            <VTextField
              id="picName"
              placeholder="Isi Nama Penanggung Jawab Program LPH / LP3H "
              v-model="formData.picName"
              required
              class="mb-4"
            ></VTextField>
            <label
              class="text-h6"
              for="picName"
            > Nomor Kontak Penanggung Jawab Program LPH / LP3H </label>
            <VTextField
              placeholder="Isi Nomor Kontak Penanggung Jawab Program LPH / LP3H "
              v-model="formData.picPhoneNumber"
              required
              class="mb-4"
            ></VTextField>
          </VForm>
        </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn text @click="addDialog = false" variant="outlined">Batal</VBtn>
          <VBtn color="primary" text @click="tambahData" variant="flat">Tambah</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="deleteDialog" :max-width="dialogMaxWidth">
      <VCard class="pa-4">
        <VCardTitle class="text-h4">Hapus Data Lembaga</VCardTitle>
        <VCardText>Yakin ingin menghapus data lembaga? </VCardText>
        <VCardActions>
          <VSpacer></VSpacer>
          <VBtn text @click="deleteDialog = false" color="primary" variant="outlined" >Batal</VBtn>
          <VBtn color="error" variant="flat" text @click="hapusData">Ya, Hapus</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>
