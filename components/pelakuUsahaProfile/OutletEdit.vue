<script setup lang="ts">
import type { outlet } from "@/stores/interface/pelakuUsahaProfileIntf";

const panelOpen = ref(0);

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
  { title: "Action", key: "action" },
];

const props = defineProps({
  outletData: {
    type: Object as outlet | any,
    required: true,
  },
});

const items = ref([]);

const store = pelakuUsahaProfile();
const snackbar = useSnackbar();

const handleAddAspekLegalConfirm = (formData) => {
  console.log("Add confirmed:", formData);

  const submitApi = $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/add-outlet`,
    {
      method: "POST",
      body: {
        name: formData.namaOutlet,
        address: formData.alamatOutlet,
        city: formData.kabKota,
        province: formData.provinsi,
        country: formData.negara,
        zip_code: formData.kodePos,
      },
    }
  ).then((val: any) => {
    if (val.code == 2000) {
      store.fetchProfile();
      snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
    } else {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    }
  });
};

const handleEditOutletConfirm = (formData, id_outlet) => {
  console.log("Add confirmed:", formData);

  const submitApi = $api(`/pelaku-usaha-profile/update-outlet`, {
    method: "POST",
    body: {
      id_profile: store.profileData?.id,
      id_outlet: id_outlet,
      name: formData.namaOutlet,
      address: formData.alamatOutlet,
      city: formData.kabKota,
      province: formData.provinsi,
      country: formData.negara,
      zip_code: formData.kodePos,
    },
  })
    .then((val: any) => {
      if (val.code == 2000) {
        store.fetchProfile();
        snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
      } else {
        snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
      }
    })
    .catch((e) => {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    });
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Outlet</h3></VCol>
        <VCol
          cols="6"
          style="display: flex; justify-content: end; align-items: center"
        >
          <DataOuletModal
            mode="add"
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
          <!-- <UploadOutlet></UploadOutlet> -->
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="tableOutletHeader"
        :items="props.outletData ? props.outletData : []"
      >
        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.action="{ item }">
          <VMenu :close-on-content-click="false">
            <template #activator="{ props }">
              <VBtn icon variant="text" v-bind="props">
                <VIcon>mdi-dots-vertical</VIcon>
              </VBtn>
            </template>
            <VList>
              <VListItem>
                <VListItemTitle>
                  <!-- <FormEditOutlet :initial-data="item"></FormEditOutlet> -->
                  <DataOuletModal
                    mode="edit"
                    :initial-data="item"
                    @confirm-edit="handleEditOutletConfirm"
                  ></DataOuletModal>
                </VListItemTitle>
              </VListItem>
              <!-- <VListItem @click="handleDelete(item)">
                <VListItemTitle class="text-red">
                  <VIcon color="red" class="mr-2"> mdi-delete </VIcon>
                  Hapus
                </VListItemTitle>
              </VListItem> -->
            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
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
