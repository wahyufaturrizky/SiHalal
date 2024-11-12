<script setup lang="ts">
const panelOpenPenyeliaHallal = ref(0)

const tableHeaders = [
  { title: 'No', key: 'no', align: 'start', sortable: false },
  { title: 'Nama', key: 'nama', align: 'start', sortable: false },
  { title: 'Unduh SKPH', key: 'unduh_skph', align: 'start', sortable: false },
  { title: 'Unduh SPPH', key: 'unduh_spph', align: 'start', sortable: false },
  { title: 'Unduh KTP', key: 'unduh_ktp', align: 'start', sortable: false },
  { title: 'No. KTP', key: 'no_ktp', align: 'start', sortable: false },
  { title: 'Action', key: 'actions', align: 'end', sortable: false },
]

const items = ref([
  {
    no: 1,
    nama: 'Maya',
    unduh_skph: 'file',
    unduh_spph: 'file',
    unduh_ktp: 'file',
    no_ktp: '836287762931623',
  },
  {
    no: 2,
    nama: 'Rahmi',
    unduh_skph: 'file',
    unduh_spph: 'file',
    unduh_ktp: 'file',
    no_ktp: '123121345',
  },
])
</script>

<template>
  <VExpansionPanels v-model="panelOpenPenyeliaHallal">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <div class="d-flex justify-space-between align-center w-100">
          <div class="d-flex align-center">
            <h2 class="mr-4">
              Penyelia Halal
            </h2>
            <VChip
              color="purple"
              class="white--text"
            >
              SK Penetapan Penyelia Halal
            </VChip>
          </div>
          <!-- <VBtn color="purple" class="white--text"> Tambah + </VBtn> -->
          <DataPenyeliaHalalModal
            mode="add"
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </div>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VTable>
          <thead>
            <tr>
              <th
                v-for="header in tableHeaders"
                :key="header.key"
              >
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.no"
            >
              <td>{{ item.no }}</td>
              <td>{{ item.nama }}</td>
              <td>
                <VBtn
                  variant="text"
                  color="purple"
                  class="px-0"
                >
                  <VIcon
                    color="purple"
                    class="mr-1"
                  >
                    mdi-download
                  </VIcon>
                  file
                </VBtn>
              </td>
              <td>
                <VBtn
                  variant="text"
                  color="purple"
                  class="px-0"
                >
                  <VIcon
                    color="purple"
                    class="mr-1"
                  >
                    mdi-download
                  </VIcon>
                  file
                </VBtn>
              </td>
              <td>
                <VBtn
                  variant="text"
                  color="purple"
                  class="px-0"
                >
                  <VIcon
                    color="purple"
                    class="mr-1"
                  >
                    mdi-download
                  </VIcon>
                  file
                </VBtn>
              </td>
              <td>{{ item.no_ktp }}</td>
              <td>
                <VMenu>
                  <template #activator="{ props }">
                    <VBtn
                      icon
                      variant="text"
                      v-bind="props"
                    >
                      <VIcon>mdi-dots-vertical</VIcon>
                    </VBtn>
                  </template>
                  <VList>
                    <VListItem>
                      <VListItemTitle>
                        <VIcon class="mr-2">
                          mdi-pencil
                        </VIcon>
                        Ubah
                      </VListItemTitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle class="text-red">
                        <VIcon
                          color="red"
                          class="mr-2"
                        >
                          mdi-delete
                        </VIcon>
                        Hapus
                      </VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.v-expansion-panel-title {
  padding: 16px;
}

:deep(.v-table) {
  border: 1px solid #eee;
  border-radius: 8px;
}

:deep(.v-table th) {
  background: #f5f5f5;
  font-weight: bold;
  text-transform: none !important;
}

:deep(.v-btn--icon) {
  margin-inline: -8px;
}

.text-red {
  color: red;
}
</style>
