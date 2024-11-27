<script setup lang="ts">
import { modalTypeEnum } from "./verval-enum";

interface prosesProdukIntf {
  id: string;
  criteria: string;
  question: string;
  answer: string;
}

const content: Array<prosesProdukIntf> = [
  {
    id: "1",
    criteria: "Nama / Simbol",
    question: "Apakah bertentangan dengan akidah Islam??",
    answer: "Ya",
  },
  {
    id: "2",
    criteria: "Bentuk",
    question: "Apakah menggunakan bentuk babi atau anjing?",
    answer: "Tidak",
  },
  {
    id: "3",
    criteria: "Kemasan",
    question:
      "Apakah menggunakan kemasan bergambar anjing atau babi sebagai fokus utama?",
    answer: "Tidak",
  },
];

const selected = ref([]);
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Produk</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end"
          ><ModalProdukHalalVerval
            :modal-type="modalTypeEnum.ADD"
          ></ModalProdukHalalVerval
        ></VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VTable
        density="comfortable"
        style="
          border-collapse: separate;
          border: 1px solid #eae9eb;
          border-radius: 10px;
          max-height: 40svh;
          overflow-y: auto;
        "
        fixed-header
      >
        <thead style="background-color: #f6f6f6">
          <th
            style="padding: 1.5svw; width: 3svw; word-wrap: break-word"
            class="text-left"
          >
            No
          </th>
          <th class="text-left" style="width: 10svw; word-wrap: break-word">
            Kriteria
          </th>
          <th class="text-left" style="width: 10svw; word-wrap: break-word">
            Pertanyaan
          </th>
          <th class="text-left" style="width: 10svw; word-wrap: break-word">
            Jawaban
          </th>
          <th class="text-center" style="width: 3svw; word-wrap: break-word">
            Action
          </th>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in content" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.criteria }}</td>
            <td>{{ item.question }}</td>
            <td>{{ item.answer }}</td>
            <td class="text-center">
              <VIcon style="color: red" icon="fa-trash"></VIcon>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardItem>
  </VCard>
</template>
