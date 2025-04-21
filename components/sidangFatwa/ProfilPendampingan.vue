<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

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

// Combine props into a single reactive object
const combinedProps = ref({
  sertifikat: props.sertifikat,
  penanggungjawab: props.penanggungjawab,
  bahan: props.bahan,
  produk: props.produk,
  cleaning: props.cleaning,
  kemasan: props.kemasan,
});

const profil = ref([]);

function getValueOrDash(value) {
  return value && value.trim() !== "" ? value : "-";
}

watch(
  combinedProps,
  (newData) => {
    // Example of using `newData` to update a derived reactive variable
    if (newData) {
      profil.value = [
        {
          id: 1,
          key: "Nomor STTD",
          value: getValueOrDash(newData?.sertifikat?.no_daftar),
        },
        {
          id: 2,
          key: "Nama Perusahaan",
          value: getValueOrDash(newData?.sertifikat?.nama_pu),
        },
        {
          id: 3,
          key: "Alamat",
          value: getValueOrDash(newData?.sertifikat?.alamat_pu),
        },
        {
          id: 4,
          key: "Kota/Kab",
          value: getValueOrDash(newData?.sertifikat?.kota_pu),
        },
        {
          id: 5,
          key: "Nama Personel",
          value: getValueOrDash(newData?.penanggungjawab?.nama_pj),
        },
        { id: 6, key: "divider", value: true },
        {
          id: 7,
          key: "Jenis Layanan",
          value: getValueOrDash(newData?.sertifikat?.jenis_layanan),
        },
        {
          id: 8,
          key: "Jenis Produk",
          value: getValueOrDash(newData?.sertifikat?.jenis_produk),
        },
        {
          id: 9,
          key: "Pendampingan",
          value: getValueOrDash(formatDate(newData?.sertifikat?.tgl_daftar)),
        },
        {
          id: 10,
          key: "Pendamping",
          value: getValueOrDash(newData?.sertifikat?.pendamping),
        },
        {
          id: 11,
          key: "Lembaga",
          value: getValueOrDash(newData?.sertifikat?.lembaga_pendamping),
        },
        {
          id: 12,
          key: "Nama Produk",
          value: getValueOrDash(newData?.produk),
        },
        { id: 13, key: "divider", value: true },
      ];
    }

    // console.log(profil, 'Derived Profil')
  },
  { immediate: true, deep: true }
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
