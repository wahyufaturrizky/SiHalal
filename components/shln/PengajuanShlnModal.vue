<script setup lang="ts">
const headerTable = [
  { title: "No", key: "no" },
  { title: "Submission No", key: "registration_no" },
  { title: "Importer Name", key: "importer_name" },
  { title: "NIB / Business Id No", key: "nib" },
  { title: "HCB", key: "hcb" },
  { title: "Registration Date", key: "regist_date" },
  { title: "Submit Date", key: "submit_date" },
  { title: "Verificator", key: "verificator" },
  { title: "Status", key: "status" },
  { title: "Action", key: "data-table-select" },
];

const items = [
  {
    id: 1,
    registration_no: "1",
    importer_name: "imp 1",
    nib: "112233",
    hcb: "54433",
    regist_date: "05/05/2000",
    submit_date: "05/06/2021",
    verificator: "saya",
    status: "Submitted",
  },
  {
    id: 2,
    registration_no: "1",
    importer_name: "imp 1",
    nib: "112233",
    hcb: "54433",
    regist_date: "05/05/2000",
    submit_date: "05/06/2021",
    verificator: "saya",
    status: "Submitted",
  },
];

const tableSelected = ref([]);
</script>

<template>
  <VDialog max-width="70svw" max-height="60svh">
    <template #activator="{ props: openModal }">
      <VBtn v-bind="openModal"> Add Submission </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard>
        <VCardTitle style="margin-block-start: 2svh; margin-inline: 1svw">
          <VRow>
            <VCol cols="10">
              <h3>Submission</h3>
            </VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              <VTextField
                width="30svw"
                append-inner-icon="mdi-magnify"
                density="compact"
                placeholder="Search data"
              />
            </VCol>
          </VRow>

          <!-- ====== datatable ======= -->
          <VRow>
            <VCol>
              <VDataTableServer
                :items-per-page-options="[10, 25, 50, 100]"
                v-model="tableSelected"
                :items="items"
                :headers="headerTable"
                :items-length="10"
                :show-select="true"
              >
                <template #item.status="{ item }">
                  <VChip
                    style="
                      border-radius: 10px;
                      background-color: #edf6ed;
                      color: #49a84c;
                      outline: auto;
                    "
                    variant="elevated"
                  >
                    {{ item.status }}
                  </VChip>
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCardText>
        <template #actions>
          <div>
            <VBtn
              width="87px"
              height="40px"
              variant="outlined"
              @click="isActive.value = false"
            >
              Cancel
            </VBtn>
            <VBtn
              width="103px"
              height="40px"
              variant="flat"
              @click="isActive.value = false"
            >
              Add
              {{ tableSelected.length > 0 ? `(${tableSelected.length})` : "" }}
            </VBtn>
          </div>
        </template>
      </VCard>
    </template>
  </VDialog>
</template>
