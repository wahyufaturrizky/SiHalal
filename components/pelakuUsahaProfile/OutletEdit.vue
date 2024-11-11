<script setup lang="ts">
const panelOpen = ref(0);

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
];

const items = ref([]);
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <div class="header">
          <h2>Outlet</h2>
          <div class="button-group">
            <button class="btn-tambah">Tambah +</button>
            <button class="btn-upload">Upload ↓</button>
          </div>
        </div>
      </VExpansionPanelTitle>

      <VExpansionPanelText>
        <div class="empty-state-frame">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3213/3213083.png"
            alt="Empty mailbox"
            class="mailbox-icon"
          />
          <span class="empty-text">Data Kosong</span>
        </div>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
}

.button-group {
  display: flex;
  gap: 8px;
}

.btn-tambah {
  border: none;
  border-radius: 6px;
  background: #8b5cf6;
  color: white;
  cursor: pointer;
  padding-block: 8px;
  padding-inline: 16px;
}

.btn-upload {
  border: 1px solid #8b5cf6;
  border-radius: 6px;
  background: white;
  color: #8b5cf6;
  cursor: pointer;
  padding-block: 8px;
  padding-inline: 16px;
}

.empty-state-frame {
  display: flex;
  box-sizing: border-box;
  flex: none;
  flex-direction: column;
  flex-grow: 0;
  align-items: center;
  align-self: stretch;
  order: 1;
  padding: 12px;
  border: 1px solid #eae9eb;
  border-radius: 8px;
  block-size: 147px;
  gap: 16px;
  inline-size: 100%;
  margin-block: 16px;
}

.mailbox-icon {
  block-size: 48px;
  inline-size: 48px;
  opacity: 0.6;
}

.empty-text {
  color: #6b7280;
  font-size: 14px;
}

:deep(.v-expansion-panel-title) {
  padding: 16px;
}

:deep(.v-expansion-panel-text__wrapper) {
  padding-block: 0;
  padding-inline: 16px;
}
</style>
