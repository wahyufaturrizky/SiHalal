<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
const storeDataMaster = dataMasterStore();

const legalHeader = [
  { title: "No", key: "no" },
  { title: "pu-detail.pu-legal-jenis", key: "type" },
  { title: "pu-detail.pu-legal-nodoc", key: "doc_number" },
  { title: "pu-detail.pu-legal-tgl", key: "date" },
  { title: "pu-detail.pu-legal-tgl-exp", key: "expiration_date" },
  { title: "pu-detail.pu-legal-issuer", key: "publishing_agency" },
  { title: "pu-detail.pu-legal-action", key: "action" },
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
  )
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

const handleEditAspekLegalConfirm = (formData) => {
  console.log("Edit confirmed:", formData);

  const submitApi = $api(`/pelaku-usaha-profile/update-legal`, {
    method: "post",
    body: {
      id_profile: store.profileData?.id,
      legal_id: formData.id,
      document_type: formData.type,
      document_number: formData.doc_number,
      date: new Date(formData.date).toISOString(),
      valid_date: new Date(formData.expiration_date).toISOString(),
      publish_agency: formData.publishing_agency,
    },
  })
    .then((val: any) => {
      if (val.code == 2000) {
        store.updateLegal(formData.id, formData);
        snackbar.sendSnackbar("Berhasil Menambahkan Data ", "success");
      } else {
        snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
      }
    })
    .catch((e) => {
      snackbar.sendSnackbar("Gagal Menambahkan Data ", "error");
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

const convertDocType = (type: string | null) => {
  if (type.includes("LGL")) {
    return storeDataMaster.masterJnlgl.filter((val) => val.code == type)[0]
      ?.name;
  }
  return type;
};

onMounted(() => {
  storeDataMaster.initMasterData();
});
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="6">
          <div class="text-h4 font-weight-bold">Aspek Legal</div>
        </VCol>
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
        <template #header.type="{ column }">
          {{ t(column.title) }}
        </template>

        <template #header.doc_number="{ column }">
          {{ t(column.title) }}
        </template>

        <template #header.date="{ column }">
          {{ t(column.title) }}
        </template>

        <template #header.expiration_date="{ column }">
          {{ t(column.title) }}
        </template>

        <template #header.publishing_agency="{ column }">
          {{ t(column.title) }}
        </template>

        <template #header.action="{ column }">
          {{ t(column.title) }}
        </template>

        <template #item.no="{ index }">
          {{ index + 1 }}
        </template>
        <template #item.type="{ item }">
          {{ convertDocType(item.type) }}
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
                  v-if="item?.type !== 'NIB'"
                  mode="edit"
                  :initial-data="initialDataAspekLegal(item)"
                  @confirm-edit="handleEditAspekLegalConfirm"
                  @cancel="() => console.log('Edit cancelled')"
                />
              </VListItem>
              <VListItem
                v-if="item?.type !== 'NIB'"
                @click="handleDelete(item)"
              >
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
