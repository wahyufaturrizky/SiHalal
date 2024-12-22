<script setup lang="ts">
const items = [
  {
    index: 1,
    role_name: 'Verificator Self Declare',
    menu: '10 Acess Menu(s)',
    action: 'true',
  },
  {
    index: 2,
    role_name: 'Komisi fatwa',
    menu: '5 Acess Menu(s)',
    action: 'true',
  },
  {
    index: 3,
    role_name: 'Auditor',
    menu: '2 Acess Menu(s)',
    action: 'true',
  },
  {
    index: 4,
    role_name: 'Verifikator BPJPH',
    action: 'true',
  },
]

const tableHeader = [
  { title: 'No', value: 'index' },
  { title: 'Role Name', value: 'role_name' },
  { title: 'Menu', value: 'menu' },
  { title: 'Action', value: 'action', fixed: true },
]

const navigateAction = (id: string) => {
  navigateTo(`/user-management/role/${id}`)
}
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <h2> User</h2>
        <VCard class="w-100">
          <VCardItem>
            <VRow>
              <VCol cols="11">
                <h2>
                  User List
                </h2>
              </VCol>

              <VCol cols="1">
                <HalalModal
                  title="Add Role"
                  parent-btn-label="Add User"
                  :card-width="700"
                >
                  <template #content>
                    <AddRoleForm />
                  </template>
                </HalalModal>
              </VCol>
            </VRow>

            <VRow>
              <VCol cols="7">
                <VTextField
                  placeholder="Search Data"
                  density="compact"
                  append-inner-icon="mdi-magnify"
                />
              </VCol>
            </VRow>

            <VRow>
              <VCol>
                <VDataTable :items="items" />

                <VDataTableServer
                  :headers="tableHeader"
                  :items="items"
                >
                  <template #item.action="{ item }">
                    <VBtn
                      color="primary"
                      variant="plain"
                    >
                      <VIcon>mdi-dots-vertical</VIcon>
                      <VMenu>
                        <VCard>
                          <!--
                            <FormEditAspekLegal
                            :is-editable="props.isEditable"
                            :initial-data="item"
                            @confirm="updateAspekLegal"
                          -->
                          <!-- /> -->
                          <VBtn
                            variant="text"
                            prepend-icon="ri-edit-line"
                            block
                          >
                            <!-- :disabled="!props.isEditable" -->
                            <!-- @click="openDialog" -->
                            Ubah
                          </VBtn>
                          <!-- :disabled="!props.isEditable" -->
                          <VBtn
                            variant="text"
                            color="error"
                            prepend-icon="ri-delete-bin-6-line"
                            block
                          >
                            <!-- @click="deleteAspekLegal(item.no)" -->
                            Hapus
                          </VBtn>
                        </VCard>
                      </VMenu>
                    </VBtn>
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCardItem>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
