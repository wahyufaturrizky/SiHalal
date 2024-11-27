<script setup lang="ts">
interface PriceTableObj {
  name: string;
  birth_date: string;
  jk: string;
  regist_no: string;
}
const content: Array<PriceTableObj> = [
  {
    name: "Bambang",
    birth_date: new Date().toLocaleDateString("id-ID"),
    jk: "-",
    regist_no: "REG RI AHA 10102134",
  },
];

const expanded = [0];
</script>
<template>
  <VExpansionPanels v-model="expanded">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h3>Auditor</h3>
      </VExpansionPanelTitle>
      <br />
      <VExpansionPanelText>
        <VTable
          density="comfortable"
          style="
            border-collapse: collapse;
            border: 1px solid #eae9eb;
            border-radius: 10px;
          "
        >
          <thead style="background-color: #f6f6f6">
            <th style="padding: 1.5svw" class="text-left">No</th>
            <th class="text-left">Nama</th>
            <th class="text-left">Tanggal Lahir</th>
            <th class="text-left">JK</th>
            <th class="text-left">No Pendaftaran</th>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in content" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.birth_date }}</td>
              <td>Rp.{{ item.jk }}</td>
              <td>Rp.{{ item.regist_no }}</td>
            </tr>
          </tbody>
        </VTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
