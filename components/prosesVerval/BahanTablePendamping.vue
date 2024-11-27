<script setup lang="ts">
import { modalTypeEnum } from "./verval-enum";

interface bahanIntf {
  id: string;
  ingr_name: string;
  ingr_doubt: string;
  findings: string;
  notes: string;
}

const content: Array<bahanIntf> = [
  {
    id: "1",
    ingr_name: "Teh Candi Borobudur",
    ingr_doubt: "Diragukan",
    findings:
      "SH/KH No.ID35110001325901022 , berlaku s.d. 23/01/2027. Merk Teh candi, Bahan dari produsen PD. Teh Naga",
    notes: "",
  },
];

const selected = ref([]);
</script>
<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Bahan</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end">
          <ModalBahanPendampingVerval
            :modal-type="modalTypeEnum.ADD"
          ></ModalBahanPendampingVerval
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
            Nama Bahan
          </th>
          <th class="text-left" style="width: 10svw; word-wrap: break-word">
            Diragukan (Kritis / Tidak Kritis)
          </th>
          <th class="text-left" style="width: 10svw; word-wrap: break-word">
            Temuan
          </th>
          <th class="text-left" style="width: 10svw; word-wrap: break-word">
            Keterangan
          </th>
          <th class="text-center" style="width: 3svw; word-wrap: break-word">
            Action
          </th>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in content" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.ingr_name }}</td>
            <td>{{ item.ingr_doubt }}</td>
            <td>{{ item.findings }}</td>
            <td>{{ item.notes }}</td>
            <td class="text-center">
              <VMenu>
                <template #activator="{ props }">
                  <VIcon icon="fa-ellipsis-v" v-bind="props"></VIcon>
                </template>

                <VList>
                  <ModalBahanPendampingVerval
                    :modal-type="modalTypeEnum.EDIT"
                  ></ModalBahanPendampingVerval>
                  <VListItem style="color: red" prepend-icon="fa-trash"
                    >Hapus</VListItem
                  >
                </VList>
              </VMenu>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardItem>
  </VCard>
</template>
