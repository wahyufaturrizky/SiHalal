<script setup lang="ts">
const props = defineProps({
  sertifikat: {
    type: Object,
    required: true,
  },
  penanggungjawab: {
    type: Object,
    required: true,
  },
  bahan: {
    type: String,
    required: true,
  },
  produk: {
    type: String,
    required: true,
  },
  cleaning: {
    type: String,
    required: true,
  },
  kemasan: {
    type: String,
    required: true,
  },
});

const { sertifikat, penanggungjawab, bahan, produk } = props;

const newDataSertifikatForModal = ref();

const profil = ref([]);

// {
//     id: 1,
//     key: "Nomor STTD",
//     value: newDataSertifikatForModal?.no_daftar ?? "-",
//   },
//   {
//     id: 2,
//     key: "Nama Perusahaan",
//     value: newDataSertifikatForModal?.nama_pu ?? "-",
//   },
//   { id: 3, key: "Alamat", value: newDataSertifikatForModal?.alamat_pu ?? "-" },
//   { id: 4, key: "Kota/Kab", value: newDataSertifikatForModal?.kota_pu ?? "-" },
//   { id: 5, key: "Nama Personel", value: penanggungjawab?.nama_pj ?? "-" },
//   { id: 6, key: "divider", value: true },
//   {
//     id: 7,
//     key: "Jenis Layanan",
//     value: newDataSertifikatForModal?.jenis_layanan ?? "-",
//   },
//   {
//     id: 8,
//     key: "Jenis Produk",
//     value: newDataSertifikatForModal?.jenis_produk ?? "-",
//   },
//   {
//     id: 9,
//     key: "Pendampingan",
//     value: formatDate(newDataSertifikatForModal?.tgl_daftar) ?? "-",
//   },
//   {
//     id: 10,
//     key: "Pendamping",
//     value:
//       newDataSertifikatForModal?.pendamping === ""
//         ? sertifikat.pendamping
//         : "-",
//   },
//   {
//     id: 11,
//     key: "Lembaga",
//     value: newDataSertifikatForModal?.lembaga_pendamping ?? "-",
//   },
//   { id: 12, key: "Nama Produk", value: produk ?? "-" },
//   { id: 13, key: "divider", value: true },

watch(
  () => props.sertifikat,
  (newData) => {
    console.log(newData, "ini sertifikat di modal");
    newDataSertifikatForModal.value = newData;

    // ===============
    // bisa nih, di push atau replace aja waktu watch
    // ===============

    if (newData) {
      profil.value.push({
        id: 1,
        key: "Nomor STTD",
        value: newData?.no_daftar ?? "-",
      });
    }
  },
  { immediate: true }
);

const paneSwitcher = [0];
</script>

<template>
  <VExpansionPanels v-model="paneSwitcher">
    <VExpansionPanel>
      <VExpansionPanelTitle><h2>Profil</h2></VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VRow v-for="item in profil" :key="item.id" gutters="0.5svh">
          <VCol v-if="item.key !== 'divider'" cols="3">
            {{ item.key }}
          </VCol>
          <VCol v-if="item.key !== 'divider'" cols="1"> : </VCol>
          <VCol v-if="item.key !== 'divider'" cols="8">
            {{ item.value }}
          </VCol>
          <VCol v-else cols="12">
            <VDivider />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <h4>Daftar Bahan</h4>
          </VCol>
        </VRow>
        <VRow style="padding-inline-start: 2svw">
          <VCol cols="12">
            <ol type="1">
              <li>
                <VRow>
                  <VCol cols="4"> Bahan </VCol>
                  <VCol cols="1"> : </VCol>
                  <VCol cols="7">
                    {{ bahan }}
                  </VCol>
                </VRow>
              </li>
              <li>
                <VRow>
                  <VCol cols="4"> Cleaning Agent </VCol>
                  <VCol cols="1"> : </VCol>
                  <VCol cols="7">
                    {{ cleaning }}
                  </VCol>
                </VRow>
              </li>
              <li>
                <VRow>
                  <VCol cols="4"> Kemasan </VCol>
                  <VCol cols="1"> : </VCol>
                  <VCol cols="7">
                    {{ kemasan }}
                  </VCol>
                </VRow>
              </li>
            </ol>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style type="text/css">
li {
  list-style-position: outside;
}
</style>
