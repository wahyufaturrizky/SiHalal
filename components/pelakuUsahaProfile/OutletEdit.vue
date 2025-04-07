<script setup lang="ts">
import type { outlet } from "@/stores/interface/pelakuUsahaProfileIntf";

const props = defineProps({
  outletData: {
    type: Object as outlet | any,
    required: true,
  },
});

const addOutletRef = ref();
const editOutletRef = ref();

const panelOpen = ref(0);

const { t } = useI18n();

const tableOutletHeader = [
  { title: "No", key: "no" },
  { title: "detail-pu.pu-out-nama", key: "name" },
  { title: "detail-pu.pu-out-address", key: "address" },
  { title: "Action", key: "action" },
];

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
      store.fetchProfile(null);
      snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
      addOutletRef.value.hideErrorProhbName();
      addOutletRef.value.closeDialog();
    } else if (val.code == 4007) {
      addOutletRef.value.showErrorProhbName();
    } else {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    }
  });
};

const handleEditOutletConfirm = (formData, id_outlet) => {
  console.log("Add confirmed:", formData);

  const submitApi = $api("/pelaku-usaha-profile/update-outlet", {
    method: "POST",
    body: {
      id_profile: store.profileData?.id,
      id_outlet,
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
        store.fetchProfile(null);
        snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
        editOutletRef.value.hideErrorProhbName();
        editOutletRef.value.closeDialog();
      } else if (val.code == 4007) {
        editOutletRef.value.showErrorProhbName();
      } else {
        snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
      }
    })
    .catch((e) => {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    });
};

function handleDelete(item) {
  console.log("Delete item:", item);

  const submitApi = $api(`pelaku-usaha-profile/delete-outlet`, {
    method: "POST",
    body: {
      id_profile: store.profileData?.id,
      id_outlet: item.id,
    },
  })
    .then((val: any) => {
      if (val.code == 2000) {
        store.fetchProfile(null);
        snackbar.sendSnackbar("Berhasil Menghapus Data ", "success");
      } else {
        snackbar.sendSnackbar("Gagal Menghapus Data ", "error");
      }
    })
    .catch((e) => {
      snackbar.sendSnackbar("Gagal Menghapus Data ", "error");
    });
}
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6">
          <div class="text-h4 font-weight-bold">Outlet</div>
        </VCol>
        <VCol
          cols="6"
          style="display: flex; align-items: center; justify-content: end"
        >
          <DataOuletModal
            ref="addOutletRef"
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
        <template #header.name="{ column }">
          <div>
            {{ t(column.title) }}
          </div>
        </template>

        <template #header.address="{ column }">
          <div>
            {{ t(column.title) }}
          </div>
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
                <!-- <FormEditOutlet :initial-data="item" /> -->

                <DataOuletModal
                  ref="editOutletRef"
                  mode="edit"
                  :initial-data="item"
                  @confirm-edit="handleEditOutletConfirm"
                />
              </VListItem>

              <VListItem>
                <DeleteConfirmation @delete-confirm="handleDelete(item)" />
              </VListItem>
              <!--
                <VListItem>
                <DeleteConfirmation @delete-confirm="handleDelete(item)" />
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
              -->
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
