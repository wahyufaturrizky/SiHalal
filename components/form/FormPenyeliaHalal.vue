<script setup lang="ts">
const props = defineProps({
  isEditable: {
    type: Boolean,
    default: true,
  },
});

const headers = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name", nowrap: true },
  { title: "Unduh SKPH", value: "skph", sortable: false, nowrap: true },
  { title: "Unduh SPPH", value: "spph", sortable: false, nowrap: true },
  { title: "Unduh KTP", value: "ktp", sortable: false, nowrap: true },
  { title: "No. KTP", key: "idNo", nowrap: true },
  { title: "Agama", key: "religion", nowrap: true },
  {
    title: "No/Tgl Sertif Penyelia Halal",
    key: "cerificateNumber",
    nowrap: true,
  },
  { title: "Nomor SK", key: "skNumber", nowrap: true },
  { title: "No. Kontak", key: "phoneNumber", nowrap: true },
  { title: "Tanggal SK", key: "skDate", nowrap: true },
  {
    title: "Action",
    value: "action",
    sortable: false,
    nowrap: true,
    fixed: true,
  },
];

const items = ref([
  {
    no: 1,
    name: "Nico Robin",
    idNo: "1231321421",
    religion: "Sedulur ",
    cerificateNumber: "1231412421",
    certificateDate: "10/08/2019",
    skNumber: "I32131231",
    phoneNumber: "411414141",
    skDate: "10/08/2019",
    skph: null,
    spph: null,
    ktp: null,
  },
  {
    no: 2,
    name: "Kapten Kid",
    idNo: "1231321421",
    religion: "Sedulur ",
    cerificateNumber: "1231412421",
    certificateDate: "10/08/2019",
    skNumber: "I32131231",
    phoneNumber: "411414141",
    skDate: "10/08/2019",
    skph: null,
    spph: null,
    ktp: null,
  },
]);

// TODO -> LOGIC DELETE BY ID
const remove = (no) => {
  console.log("DELETE WITH ID : ", no);
};

// TODO -> LOGIC EDIT BY ID
const update = (form) => {
  console.log("EDIT  : ", form);
};

// TODO -> LOGIC TAMBAH DATA
const save = (form) => {
  console.log("TAMBAH DATA ", form);
};

// TODO -> DOWNLOAD FILE

const donwloadSkph = (item) => {
  console.log("donwloadSkph : ", item);
};

const donwloadSpph = (item) => {
  console.log("donwloadSpph : ", item);
};

const donwloadKtp = (item) => {
  console.log("donwloadKtp : ", item);
};
</script>

<template>
  <VCard class="pa-4 mb-8">
    <VCardTitle class="d-flex justify-space-between align-center">
      <span class="text-h3">Penyelia Halal</span>
      <FormTambahPenyeliaHalal
        :is-editable="props.isEditable"
        @confirm="save"
      />
    </VCardTitle>
    <VCardItem>
      <VDataTable :headers="headers" :items="items">
        <template #item.skph="{ item }">
          <v-btn color="primary" variant="plain" @click="donwloadSkph(item)">
            <VIcon>mdi-download</VIcon>
          </v-btn>
        </template>
        <template #item.spph="{ item }">
          <v-btn color="primary" variant="plain" @click="donwloadSpph(item)">
            <VIcon>mdi-download</VIcon>
          </v-btn>
        </template>
        <template #item.ktp="{ item }">
          <v-btn color="primary" variant="plain" @click="donwloadKtp(item)">
            <VIcon>mdi-download</VIcon>
          </v-btn>
        </template>
        <template #item.action="{ item }">
          <v-btn color="primary" variant="plain">
            <VIcon>mdi-dots-vertical</VIcon>
            <VMenu activator="parent" :close-on-content-click="false">
              <VCard>
                <FormEditPenyeliaHalal
                  :is-editable="props.isEditable"
                  :initial-data="item"
                  @confirm="update"
                />
                <VBtn
                  :disabled="!props.isEditable"
                  variant="text"
                  color="error"
                  prepend-icon="ri-delete-bin-6-line"
                  @click="remove(item.no)"
                  block
                >
                  Hapus
                </VBtn>
              </VCard>
            </VMenu>
          </v-btn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<style scoped lang="scss"></style>
