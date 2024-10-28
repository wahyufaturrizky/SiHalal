<script setup lang="ts">
const items = [
  {
    'No': 1,
    'NIP': '1232131jnjadd',
    'Nama Jabatan': '2024-10-05',
    'No. Handphone': '2024-12-05',
    'Nama Lengkap': 'wdbadbaiwd',
    'Username': 'awdbuabdiawbdi',
  },
]
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <VCard class="w-100">
          <VCardTitle>Role Management</VCardTitle>
          <VCardItem>
            <VRow>
              <VCol class="v-align-end">
                <HalalModal
                  title="Add Role"
                  parent-btn-label="Add Role"
                  :card-width="700"
                >
                  <template #content>
                    <AddRoleForm />
                  </template>
                </HalalModal>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VTextField
                  label="Searching"
                  clearable
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTable :items="items" />
              </VCol>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
