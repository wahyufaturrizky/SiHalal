<script setup lang="ts">

const filter = ref({
  jenisProduk: 'Semua',
  fasilitas: 'Semua',
  lembaga: 'Semua',
  pendamping: 'Semua'
})

const emit = defineEmits(['updateFilter']);

watch(
  filter,
  (newFilter) => {
    emit('updateFilter', newFilter);
  },
  { deep: true }
);
</script>

<template>
  <VMenu :close-on-content-click="false">
    <template #activator="{ props }">
      <VTextField
        placeholder="Filter"
        density="compact"
        rounded="xl"
        append-inner-icon="mdi-filter"
        v-bind="props"
      />
    </template>
    <VCard min-width="360px" class="mt-2">
      <VCardText>
        <VRow no-gutters class="mb-3">
          <VCol>
            <div class="text-h6 mb-1">Jenis Produk</div>
            <VSelect
              density="compact"
              v-model="filter.jenisProduk"
              :items="['Semua', 'produk 1', 'produk 2']"
              menu-icon="fa-chevron-down"
              rounded="xl"
            />
          </VCol>
        </VRow>
        <VRow no-gutters class="mb-3">
          <VCol>
            <div class="text-h6 mb-1">Fasilitas</div>
            <VSelect
              density="compact"
              v-model="filter.fasilitas"
              :items="['Semua', 'fasilitas 1', 'fasilitas 2']"
              menu-icon="fa-chevron-down"
              rounded="xl"
            />
          </VCol>
        </VRow>
        <VRow no-gutters class="mb-3">
          <VCol>
            <div class="text-h6 mb-1">Lembaga</div>
            <VSelect
              density="compact"
              v-model="filter.lembaga"
              :items="['Semua', 'lembaga 1', 'lembaga 2']"
              menu-icon="fa-chevron-down"
              rounded="xl"
            />
          </VCol>
        </VRow>
        <VRow no-gutters class="mb-3">
          <VCol>
            <div class="text-h6 mb-1">Pendamping</div>
            <VSelect
              density="compact"
              v-model="filter.pendamping"
              :items="['Semua', 'lembaga 1', 'lembaga 2']"
              menu-icon="fa-chevron-down"
              rounded="xl"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VMenu>
</template>

<style scoped></style>
