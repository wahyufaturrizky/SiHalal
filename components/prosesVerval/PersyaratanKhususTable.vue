<script setup lang="ts">
import type RequirementDataInterface from "./verval-interface";

const content: Array<RequirementDataInterface> = [
  {
    id: "1",
    uraian: "Kebijakan halal telah ditetapkan pemilik usaha",
    bukti: "-",
    verval: "",
  },
  {
    id: "2",
    uraian: "Kebijakan halal telah disampaikan ke semua pekerja",
    bukti: "-",
    verval: "",
  },
  {
    id: "3",
    uraian:
      "Pemilik Usaha atau orang yang bertanggung jawab dalam proses produk halal (Penyelia Halal) telah ditetapkan oleh pemilik usaha dengan tanggung jawab yang jelas",
    bukti: "-",
    verval: "",
  },
  {
    id: "4",
    uraian: "Prosedur tertulis pelaksanaan training telah tersedia",
    bukti: "-",
    verval: "",
  },
  {
    id: "5",
    uraian:
      "Training tentang produksi halal telah dilakukan untuk semua pekerja",
    bukti: "-",
    verval: "",
  },
  {
    id: "6",
    uraian:
      "Bahan (bahan baku, bahan tambahan dan bahan penolong) telah dilengkapi dokumen pendukung sesuai dengan kriteria bahan dalam PPH",
    bukti: "-",
    verval: "",
  },
  {
    id: "7",
    uraian:
      "Prosedur tertulis penggunaan bahan baru untuk produk yang sudah disertifikasi telah tersedia",
    bukti: "-",
    verval: "",
  },
  {
    id: "8",
    uraian:
      "Bahan penolong pencucian (cleaning agent) merupakan bahan yang suci",
    bukti: "-",
    verval: "",
  },
  {
    id: "9",
    uraian:
      "Adanya prosedur tertulis yang menjamin nama, bentuk dan rasa produk telah memenuhi kriteria",
    bukti: "-",
    verval: "",
  },
  {
    id: "10",
    uraian: "Semua fasilitas produksi telah tercantum dalam permohonan",
    bukti: "-",
    verval: "",
  },
  {
    id: "11",
    uraian:
      "Adanya prosedur tertulis yang menjamin semua fasilitas yang kontak langsung dengan bahan, produk antara dan produk akhir bebas babi (tidak digunakan untuk menangani daging babi atau produk turunan babi)",
    bukti: "-",
    verval: "",
  },
  {
    id: "12",
    uraian:
      "Adanya prosedur tertulis yang menjamin semua fasilitas bebas kontaminasi najis (dicuci dan dibersihkan sebelum digunakan)",
    bukti: "-",
    verval: "",
  },
  {
    id: "13",
    uraian:
      "Adanya prosedur tertulis pemeriksaan bahan datang dapat menjamin kesesuaian data yang tercantum dalam label/kemasan dengan label/kemasan yang tercantum dalam dokumen pendukung bahan (nama bahan, nama produsen, negara produsen dan logo halal, jika dipersyaratkan)",
    bukti: "-",
    verval: "",
  },
  {
    id: "14",
    uraian:
      "Adanya prosedur tertulis yang menjamin bahwa PPH hanya menggunakan bahan halal dan dilakukan di fasilitas yang bebas babi dan najis",
    bukti: "-",
    verval: "",
  },
  {
    id: "15",
    uraian:
      "Adanya prosedur tertulis yang menjamin bahwa bahan, produk antara dan produk akhir tidak terkontaminasi najis selama penyimpanan",
    bukti: "-",
    verval: "",
  },
  {
    id: "16",
    uraian:
      "Adanya prosedur tertulis yang menjamin bahwa produk yang disertifikasi hanya berasal dari bahan halal dan diproduksi di fasilitas bebas babi dan najis",
    bukti: "-",
    verval: "",
  },
  {
    id: "17",
    uraian:
      "Adanya prosedur tertulis yang menjamin bahwa produk yang tidak memenuhi kriteria akan dimusnahkan",
    bukti: "-",
    verval: "",
  },
  {
    id: "18",
    uraian:
      "Adanya prosedur tertulis yang menjamin bahwa audit internal dan kaji ulang dilakukan oleh pemilik usaha setidaknya setahun sekali",
    bukti: "-",
    verval: "",
  },
];

const selected = ref([]);
</script>
<template>
  <VCard>
    <VCardTitle><h3>Persyaratan Umum</h3></VCardTitle>
    <VCardItem>
      <VTable
        density="comfortable"
        style="
          border-collapse: collapse;
          border: 1px solid #eae9eb;
          border-radius: 10px;
        "
      >
        <thead style="background-color: #f6f6f6">
          <th
            style="padding: 1.5svw; word-wrap: break-word; width: 2svw"
            class="text-left"
          >
            No
          </th>
          <th style="word-wrap: break-word; width: 5svw" class="text-left">
            Uraian
          </th>
          <th style="word-wrap: break-word; width: 5svw" class="text-left">
            Bukti
          </th>
          <th style="word-wrap: break-word; width: 5svw" class="text-left">
            Verval
          </th>
          <th style="word-wrap: break-word; width: 5svw" class="text-left">
            Sesuai / Tidak Sesuai
          </th>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in content" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.uraian }}</td>
            <td>{{ item.bukti }}</td>
            <td>{{ item.verval }}</td>
            <td class="text-center">
              <VCheckbox :key="idx" :model-value="selected"></VCheckbox>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardItem>
    <VCardActions style="display: flex; justify-content: end">
      <VBtn variant="flat">Simpan Pengecekan Persyaratan</VBtn>
    </VCardActions>
  </VCard>
</template>
