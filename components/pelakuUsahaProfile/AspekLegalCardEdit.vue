<script setup lang="ts">
import type { legal } from "@/stores/interface/pelakuUsahaProfileIntf";

const snackbar = useSnackbar();

const panelOpen = ref(0);

const props = defineProps({
  aspekLegalData: {
    type: Object as legal | any,
    required: true,
  },
});

const store = pelakuUsahaProfile();

const legalHeader = [
  { title: "No", key: "no" },
  { title: "Jenis", key: "type" },
  { title: "No. Dokumen", key: "doc_number" },
  { title: "Tanggal", key: "date" },
  { title: "Masa Berlaku", key: "expiration_date" },
  { title: "Instansi Penerbit", key: "publishing_agency" },
  { title: "Action", key: "action" },
];

function handleDelete(item) {
  console.log("Delete item:", item);
  const submitApi = $api(`pelaku-usaha-profile/delete-legal`, {
    method: "post",
    body: {
      id: store.profileData?.id,
      id_legal: item.id,
    },
  })
    .then((val: any) => {
      if (val.code == 2000) {
        store.deleteLegal(item.id);
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

  // store.setLegal(formData)

  const submitApi = $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/add-legal`,
    {
      method: "POST",
      body: {
        document_type: formData.type,
        document_number: formData.doc_number,
        date: new Date(formData.date).toISOString().substring(0, 10),
        valid_date: new Date(formData.expiration_date)
          .toISOString()
          .substring(0, 10),
        publish_agency: formData.publishing_agency,
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

const handleEditAspekLegalConfirm = (formData) => {
  console.log("Edit confirmed:", formData);

  const submitApi = $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/${formData.id}/update-legal`,
    {
      method: "PUT",
      body: {
        document_type: formData.type,
        document_number: formData.doc_number,
        date: new Date(formData.date).toISOString(),
        valid_date: new Date(formData.expiration_date).toISOString(),
        publish_agency: formData.publishing_agency,
      },
    }
  ).then((val: any) => {
    if (val.code == 2000) {
      store.updateLegal(formData.id, formData);
      snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
    } else {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
    }
  });
};

const initialDataAspekLegal = (item: any) => ({
  id: item.id,
  doc_number: item.doc_number,
  expiration_date: new Date(item.expiration_date)
    .toISOString()
    .substring(0, 10),
  date: new Date(item.date).toISOString().substring(0, 10),
  publishing_agency: item.publishing_agency,
  type: item.type,
});
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6"><h3>Aspek Legal</h3></VCol>
        <VCol cols="6" style="display: flex; justify-content: end">
          <AspekLegalModal
            mode="add"
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VDataTable
        :headers="legalHeader"
        :items="props.aspekLegalData"
        class="elevation-1"
      >
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
                <!-- <VListItemTitle>
                    <VIcon class="mr-2"> mdi-pencil </VIcon>
                    Ubah
                  </VListItemTitle> -->
                <AspekLegalModal
                  mode="edit"
                  :initial-data="initialDataAspekLegal(item)"
                  @confirm-edit="handleEditAspekLegalConfirm"
                  @cancel="() => console.log('Edit cancelled')"
                />
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
