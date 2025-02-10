<script setup lang="ts">
import type { factory } from "@/stores/interface/pelakuUsahaProfileIntf";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const snackbar = useSnackbar();
const panelOpen = ref(0);

const addPabrikRef = ref();
const editPabrikRef = ref();

const tablePabrikHeader = [
  { title: "No", key: "no" },
  { title: "detail-pu.pu-pj-nama", key: "name" },
  { title: "detail-pu.pu-profil-address", key: "address" },
  { title: "detail-pu.pu-legal-action", key: "action" },
];

const props = defineProps({
  pabrikData: {
    type: Object as factory | any,
    required: true,
  },
});

const store = pelakuUsahaProfile();

function handleEdit(item, idPabrik) {
  console.log("Edit item:", item);

  const submitApi = $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/${idPabrik}/update-factory`,
    {
      method: "PUT",
      body: {
        name: item.namaPabrik,
        address: item.alamatPabrik,
        city: item.kabKota,
        province: item.provinsi,
        country: item.negara,
        zip_code: item.kodePos,
        status: item.statusPabrik,
      },
    }
  )
    .then((val: any) => {
      if (val.code == 2000) {
        // store.updateFactory(item.id, item);
        store.fetchProfile();
        snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
        editPabrikRef.value.hideErrorProhbName();
        editPabrikRef.value.closeDialog();
      } else if (val.code == 4007) {
        editPabrikRef.value.showErrorProhbName();
      } else {
        snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
      }
    })
    .catch((e) => {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    });
}

function handleDelete(item) {
  console.log("Delete item:", item);

  const submitApi = $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/${item.id}/delete-factory`,
    {
      method: "DELETE",
    }
  )
    .then((val: any) => {
      if (val.code == 2000) {
        store.fetchProfile();
        snackbar.sendSnackbar("Berhasil Menghapus Data ", "success");
      } else {
        snackbar.sendSnackbar("Gagal Menghapus Data ", "error");
      }
    })
    .catch((e) => {
      snackbar.sendSnackbar("Gagal Menghapus Data ", "error");
    });
}

const handleAddAspekLegalConfirm = (formData) => {
  console.log("Add confirmed:", formData);

  const submitApi = $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/add-factory`,
    {
      method: "POST",
      body: {
        name: formData.namaPabrik,
        address: formData.alamatPabrik,
        city: formData.kabKota,
        province: formData.provinsi,
        country: formData.negara,
        zip_code: formData.kodePos,
        status: formData.statusPabrik,
        // lokasiPabrik: '',
      },
    }
  )
    .then((val: any) => {
      if (val.code == 2000) {
        store.fetchProfile();
        snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
        addPabrikRef.value.hideErrorProhbName();
        addPabrikRef.value.closeDialog();
      } else if (val.code == 4007) {
        addPabrikRef.value.showErrorProhbName();
      } else {
        snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
      }
    })
    .catch((e) => {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    });
};

const initialDataForEdit = (item: any) => ({
  id: item.id,
  idPerson: store.profileData?.id,
});
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6">
          <div class="text-h4 font-weight-bold">
            {{ t("detail-pu.pu-fac-title") }}
          </div>
        </VCol>
        <VCol cols="6" style="display: flex; justify-content: end;">
          <DataPabrikModal
            ref="addPabrikRef"
            mode="add"
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="tablePabrikHeader"
        :items="props.pabrikData"
        item-value="no"
        class="elevation-1"
      >
        <template #header.name="{ column }">
          {{ t(column.title) }}
        </template>

        <template #header.address="{ column }">
          {{ t(column.title) }}
        </template>

        <template #header.action="{ column }">
          {{ t(column.title) }}
        </template>

        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #[`item.action`]="{ item }">
          <VMenu :close-on-content-click="false">
            <template #activator="{ props }">
              <VBtn icon variant="text" v-bind="props">
                <VIcon>mdi-dots-vertical</VIcon>
              </VBtn>
            </template>
            <VList>
              <VListItem>
                <VListItemTitle>
                  <!-- <VIcon class="mr-2"> mdi-pencil </VIcon>
                    Ubah -->
                  <DataPabrikModal
                    ref="editPabrikRef"
                    mode="edit"
                    :initial-data="initialDataForEdit(item)"
                    @confirm-edit="handleEdit"
                    @cancel="() => console.log('Edit cancelled')"
                  />
                </VListItemTitle>
              </VListItem>
              <VListItem @click="handleDelete(item)">
                <VListItemTitle class="text-red">
                  <VIcon color="red" class="mr-2"> mdi-delete </VIcon>
                    {{t('detail-pu.pu-legal-modal-hapus')}}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
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
