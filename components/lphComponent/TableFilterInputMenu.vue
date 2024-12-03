<script setup lang="ts"></script>

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
            <div class="text-h6 mb-1">Channel</div>
            <VSelect
              density="compact"
              model-value="Samua"
              menu-icon="fa-chevron-down"
              rounded="xl"
            />
          </VCol>
        </VRow>
        <VRow no-gutters class="mb-3">
          <VCol>
            <div class="text-h6 mb-1">Skala Usaha</div>
            <VSelect
              density="compact"
              model-value="Samua"
              menu-icon="fa-chevron-down"
              rounded="xl"
            />
          </VCol>
        </VRow>
        <VRow no-gutters class="mb-3">
          <VCol>
            <div class="text-h6 mb-1">Pusat</div>
            <VSelect
              density="compact"
              model-value="Samua"
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
