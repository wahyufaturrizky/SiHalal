<script setup lang="ts">
import { modalTypeEnum } from "./verval-enum";

interface prosesProdukIntf {
  id: string;
  requirement: string;
  explanation: string;
}

const content: Array<prosesProdukIntf> = [
  {
    id: "1",
    requirement: "Teh Candi Borobudur",
    explanation: "Diragukan",
  },
];

const selected = ref([]);
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Proses Produk Halal</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end">
          <ModalProsesProdukHalalVerval
            :modal-type="modalTypeEnum.ADD"
          ></ModalProsesProdukHalalVerval>
        </VCol>
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
            Persyaratan
          </th>
          <th class="text-left" style="width: 10svw; word-wrap: break-word">
            Penjelasan
          </th>
          <th class="text-center" style="width: 3svw; word-wrap: break-word">
            Action
          </th>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in content" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.requirement }}</td>
            <td>{{ item.explanation }}</td>
            <td class="text-center">
              <VIcon style="color: red" icon="fa-trash"></VIcon>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardItem>
  </VCard>
</template>
