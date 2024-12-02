<script setup lang="ts">
import { ref } from 'vue'
import { Bahan, Produk } from '#components'

const activeTab = ref(-1)
const approveRequirements = ref(false)

const tabList = ref([
  'Data Pengajuan', 'Komitmen dan Tanggung Jawab', 'Bahan', 'Proses', 'Produk', 'Pemantauan dan Evaluasi', 'Dokumen',
])

onMounted(() => {
  activeTab.value = 0
})
</script>

<template>
  <VContainer>
    <KembaliButton class="pl0" />
    <div class="headerSection">
      <h3 class="text-h3 font-weight-bold">
        Ubah Data
      </h3>
      <div v-if="activeTab === 4 || activeTab === 5 || activeTab === 6">
        <VRow>
          <VCol>
            <VBtn
              color="#E1442E"
              variant="outlined"
              style="border-color: #E1442E !important;"
            >
              Batal
            </VBtn>
          </VCol>
          <VCol>
            <VBtn variant="elevated">
              Simpan Perubahan
            </VBtn>
          </VCol>
        </VRow>
      </div>
    </div>
    <br>
    <VRow>
      <VCol
        cols="12"
        class="pl0"
      >
        <VTabs
          v-model="activeTab"
          align-tabs="start"
          class="w-100"
        >
          <VTab
            v-for="(item, index) in tabList"
            :key="item"
            :value="index"
          >
            {{ item }}
          </VTab>
        </VTabs>
      </VCol>
    </VRow>
    <br>
    <VTabsItems v-model="activeTab">
      <VTabItem>
        <div v-if="activeTab === 0">
          <DataPengajuan />
        </div>
        <div v-if="activeTab === 1">
          <div v-if="!approveRequirements">
            <KomitmenDanTanggungJawab :on-complete="() => approveRequirements = true" />
          </div>
          <div v-else>
            <ListKomitmenDanTanggungJawab />
          </div>
        </div>
        <div v-if="activeTab === 2">
          <Bahan />
        </div>
        <div v-if="activeTab === 3">
          <div v-if="!approveRequirements">
            <ProsesLayanan :on-complete="() => approveRequirements = true" />
          </div>
          <div v-else>
            <ListProses />
          </div>
        </div>
        <div v-if="activeTab === 4">
          <Produk />
        </div>
      </VTabItem>
    </VTabsItems>
  </VContainer>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}
.pl0 {
  padding-left: 0px !important;
}
.headerSection {
  display: flex;
  justify-content: space-between
}
</style>
