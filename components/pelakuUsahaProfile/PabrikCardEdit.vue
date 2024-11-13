<script setup lang="ts">
import { ref } from 'vue';

const panelOpen = ref(0)

const tablePabrikHeader = [
  { title: 'No', key: 'no' },
  { title: 'Nama', key: 'name' },
  { title: 'Alamat', key: 'address' },
  { title: 'Action', key: 'action', align: 'end' },
]

const pabrikData = ref([
  {
    no: 1,
    name: 'My Drink Oke',
    address:
      'Sumbawa Banget, RT002/RW002, Sumbang, Curio, Kab.Enrekang, Sulawesi Selatan',
  },
])

function handleEdit(item) {
  console.log('Edit item:', item)
}

function handleDelete(item) {
  console.log('Delete item:', item)
}

const handleAddAspekLegalConfirm = formData => {
  console.log('Add confirmed:', formData)
}
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h2>Pabrik</h2>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <div class="d-flex justify-end mb-4">
          <!--
            <VBtn
            color="primary"
            outlined
            @click="() => console.log('Tambah item')"
            >
            Tambah <VIcon>mdi-plus</VIcon>
            </VBtn>
          -->
          <DataPabrikModal
            mode="add"
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </div>
        <VDataTable
          :headers="tablePabrikHeader"
          :items="pabrikData"
          item-value="no"
          class="elevation-1"
        >
          <template #[`item.action`]="{ item }">
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
                    <DataPabrikModal
                      mode="edit"
                      :initial-data="initialDataForEdit"
                      @confirm-edit="handleEditConfirm"
                      @cancel="() => console.log('Edit cancelled')"
                    />
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
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.d-flex {
  display: flex;
}

.justify-end {
  justify-content: flex-end;
}

.mb-4 {
  margin-block-end: 16px;
}

.text-red {
  color: red;
}
</style>
