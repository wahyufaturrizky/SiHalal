<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const dataPelakuUsaha = ref([
  { id: 1, key: "Nomor ID", value: "", api_key: "id_reg" },
  { id: 2, key: "Tanggal", value: "", api_key: "tgl_daftar" },
  { id: 3, key: "divider", value: true, api_key: "" },
  { id: 4, key: "No. Surat Permohonan", value: "", api_key: "no_mohon" },
  { id: 5, key: "Tanggal Permohonan", value: "", api_key: "tgl_daftar" },
  { id: 6, key: "Jenis Layanan", value: "", api_key: "jenis_layanan" },
  { id: 7, key: "Jenis Produk", value: "", api_key: "jenis_produk" },
  { id: 8, key: "Merk Dagang", value: "", api_key: "merek_dagang" },
  { id: 9, key: "Area Pemasaran", value: "", api_key: "area_pemasaran" },
  { id: 10, key: "Pendamping", value: "", api_key: "nama_pendamping" },
  {
    id: 11,
    key: "Lembaga Pendamping",
    value: "",
    api_key: "lembaga_pendamping",
  },
  { id: 12, key: "divider", value: true, api_key: "" },
  { id: 13, key: "Nama Perusahaan", value: "", api_key: "nama_perusahaan" },
  {
    id: 14,
    key: "Nama Alternatif Perusahaan",
    value: "",
    api_key: "nama_alt_perusahaan",
  },
  { id: 15, key: "Alamat", value: "", api_key: "alamat" },
  { id: 16, key: "Kota / Kab", value: "", api_key: "kota" },
  { id: 17, key: "Provinsi", value: "", api_key: "provinsi" },
  { id: 18, key: "Kode Pos", value: "", api_key: "kode_pos" },
  { id: 19, key: "Negara", value: "", api_key: "negara" },
  { id: 20, key: "Telepon", value: "", api_key: "telepon" },
  { id: 21, key: "Email", value: "", api_key: "email" },
  { id: 22, key: "divider", value: true, api_key: "" },
  { id: 23, key: "Jenis Badan Usaha", value: "", api_key: "jenis_usaha" },
  { id: 24, key: "Sekala Usaha", value: "", api_key: "skala_usaha" }, // categorized
  { id: 25, key: "Tingkat Usaha", value: "", api_key: "tingkat_usaha" },
  { id: 26, key: "Modal Dasar", value: "", api_key: "modal_usaha" },
  { id: 27, key: "Asal Usaha", value: "", api_key: "asal_usaha" }, // categorized
]);

const expanded = [0];

const storeMaster = dataMasterStore();

const variableMapper = (key: string, data: any) => {
  const jnlayData = storeMaster.masterJnlay;
  const jnproData = storeMaster.masterJnpro;

  switch (key) {
    case "tgl_daftar":
      return formatDateId(data);
    case "skala_usaha":
      return data === 0 ? "Besar" : data === 1 ? "UMK" : "-";
    case "asal_usaha":
      return data === 0 ? "Domestik" : data === 1 ? "Luar Negeri" : "-";
    case "jenis_layanan":
      return jnlayData.filter((val) => val.code == data)[0]?.name;
    case "jenis_produk":
      return jnproData.filter((val) => val.code == data)[0]?.name;
    case "modal_usaha":
      return `Rp.${data}`;
    default:
      return data;
  }
};

watch(
  () => props.data,
  async (newData) => {
    if (newData) {
      await storeMaster.initMasterData();
      dataPelakuUsaha.value.forEach((val) => {
        const tmp = variableMapper(val.api_key, newData[val.api_key]);

        val.value = tmp || "-";
      });
    }
  },
  { immediate: true }
);
</script>

<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle><h3>Data Pelaku Usaha</h3></VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow v-for="item in dataPelakuUsaha" :key="item.id" gutters="0.5svh">
          <VCol v-if="item.key !== 'divider'" cols="3">
            {{ item.key }}
          </VCol>
          <VCol v-if="item.key !== 'divider'" cols="1"> : </VCol>
          <VCol v-if="item.key !== 'divider'" cols="8">
            {{ item.value }}
          </VCol>
          <VCol v-else-if="item.key === 'divider' && item.value" cols="12">
            <VDivider />
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
