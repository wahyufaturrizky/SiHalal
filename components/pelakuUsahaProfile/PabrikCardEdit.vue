<script setup lang="ts">
import type { factory } from "@/stores/interface/pelakuUsahaProfileIntf";
import { ref } from "vue";

const snackbar = useSnackbar();
const panelOpen = ref(0);

const tablePabrikHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
  { title: "Action", key: "action", align: "end" },
];

const props = defineProps({
  pabrikData: {
    type: Object as factory | any,
    required: true,
  },
});

const store = pelakuUsahaProfile();

function handleEdit(item) {
  console.log("Edit item:", item);

  const submitApi = $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/${item.id}/update-factory`,
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
  ).then((val: any) => {
    if (val.code == 2000) {
      store.updateFactory(item.id, item);
      snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
    } else {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    }
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
  ).then((val: any) => {
    if (val.code == 2000) {
      store.fetchProfile();
      snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
    } else {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    }
  });
};

const initialDataForEdit = (item: any) => ({
  id: item.id,
  idPerson: store.profileData?.id,
});
</script>

<template>
  <VExpansionPanels v-model="panelOpen">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <h2>Pabrik</h2>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <div class="d-flex justify-end mb-4">
          <!--
            <VBtn
            color="primary"
            outlined
            @click="() => console.log('Tambah item')"
            >
            Tambah <VIcon>mdi-plus</VIcon>
            </VBtn>
          -->
          <DataPabrikModal
            mode="add"
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </div>
        <VDataTable
          :headers="tablePabrikHeader"
          :items="props.pabrikData"
          item-value="no"
          class="elevation-1"
        >
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
                    Hapus
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </template>
        </VDataTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
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
