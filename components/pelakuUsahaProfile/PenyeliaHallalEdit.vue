<script setup lang="ts">
const panelOpenPenyeliaHallal = ref(0);

const tableHeaders = [
  { title: "No", key: "no", align: "start", sortable: false },
  { title: "Nama", key: "nama", align: "start", sortable: false },
  { title: "Unduh SKPH", key: "unduh_skph", align: "start", sortable: false },
  { title: "Unduh SPPH", key: "unduh_spph", align: "start", sortable: false },
  { title: "Unduh KTP", key: "unduh_ktp", align: "start", sortable: false },
  { title: "No. KTP", key: "no_ktp", align: "start", sortable: false },
  { title: "Action", key: "actions", align: "end", sortable: false },
];

const items = ref([
  {
    no: 1,
    nama: "Maya",
    unduh_skph: "file",
    unduh_spph: "file",
    unduh_ktp: "file",
    no_ktp: "836287762931623",
  },
  {
    no: 2,
    nama: "Rahmi",
    unduh_skph: "file",
    unduh_spph: "file",
    unduh_ktp: "file",
    no_ktp: "123121345",
  },
]);

const store = pelakuUsahaProfile();

const uploadDocument = async (file, type: string) => {
  try {
    const formData = new FormData();
    formData.append("id", store.profileData?.id);
    formData.append("file", file);
    formData.append("type", type);
    const response = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};

const downloadDOcument = async (filename: string) => {
  try {
    const response = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename,
      },
    });
    window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const convertDate = (date: string) => {
  const input = new Date(date).toISOString();
};

async function handleAddAspekLegalConfirm(item) {
  console.log("executed emit", item.namaPenyelia);
  try {
    const skkFile = await uploadDocument(item.sertifikatKompetensi, "skk");
    if (skkFile.code != 2000) {
      return;
    }
    const skpFile = await uploadDocument(item.sertifikatPelatihan, "skp");
    if (skpFile.code != 2000) {
      return;
    }
    const ktpFile = await uploadDocument(item.ktpFile, "ktp");
    if (ktpFile.code != 2000) {
      return;
    }

    const response = await $api(
      `/pelaku-usaha-profile/${store.profileData?.id}/add-supervisor`,
      {
        method: "post",
        body: {
          id_number: item.noKtp,
          phone_number: item.noKontak,
          name: item.namaPenyelia,
          religion: item.agamaPenyelia,
          certificate_number: item.nomorSertifikat,
          certificate_date:
            new Date(item.tanggalSertifikat).toISOString().substring(0, 19) +
            "Z",
          sk_number: item.nomorSk,
          sk_date:
            new Date(item.tanggalSk).toISOString().substring(0, 19) + "Z",
          skph_file: skkFile.data.file_url,
          spph_file: skpFile.data.file_url,
          ktp_file: ktpFile.data.file_url,
        },
      }
    );
    // loadReqDialog.value = false;
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      return;
    }
    await store.fetchProfile();
    // useMyUpdateSubmissionEditStore().setData("document");
    useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
  } catch (error) {
    // loadReqDialog.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
}
</script>

<template>
  <VExpansionPanels v-model="panelOpenPenyeliaHallal">
    <VExpansionPanel>
      <VExpansionPanelTitle>
        <div class="d-flex justify-space-between align-center w-100">
          <div class="d-flex align-center">
            <h2 class="mr-4">Penyelia Halal</h2>
            <VChip color="purple" class="white--text">
              SK Penetapan Penyelia Halal
            </VChip>
          </div>
          <!-- <VBtn color="purple" class="white--text"> Tambah + </VBtn> -->
          <DataPenyeliaHalalModal
            mode="add"
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </div>
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <VTable>
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header.key">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in store.supervisorData" :key="item.id">
              <td>{{ idx + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <VBtn
                  @click="downloadDOcument(item.file_skph)"
                  variant="text"
                  color="purple"
                  class="px-0"
                >
                  <VIcon color="purple" class="mr-1"> mdi-download </VIcon>
                  file
                </VBtn>
              </td>
              <td>
                <VBtn
                  @click="downloadDOcument(item.file_spph)"
                  variant="text"
                  color="purple"
                  class="px-0"
                >
                  <VIcon color="purple" class="mr-1"> mdi-download </VIcon>
                  file
                </VBtn>
              </td>
              <td>
                <VBtn
                  @click="downloadDOcument(item.file_ktp)"
                  variant="text"
                  color="purple"
                  class="px-0"
                >
                  <VIcon color="purple" class="mr-1"> mdi-download </VIcon>
                  file
                </VBtn>
              </td>
              <td>{{ item.ktp_no }}</td>
              <td>
                <VMenu>
                  <template #activator="{ props }">
                    <VBtn icon variant="text" v-bind="props">
                      <VIcon>mdi-dots-vertical</VIcon>
                    </VBtn>
                  </template>
                  <VList>
                    <VListItem>
                      <VListItemTitle>
                        <VIcon class="mr-2"> mdi-pencil </VIcon>
                        Ubah
                      </VListItemTitle>
                    </VListItem>
                    <VListItem>
                      <VListItemTitle class="text-red">
                        <VIcon color="red" class="mr-2"> mdi-delete </VIcon>
                        Hapus
                      </VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped>
.v-expansion-panel-title {
  padding: 16px;
}

:deep(.v-table) {
  border: 1px solid #eee;
  border-radius: 8px;
}

:deep(.v-table th) {
  background: #f5f5f5;
  font-weight: bold;
  text-transform: none !important;
}

:deep(.v-btn--icon) {
  margin-inline: -8px;
}

.text-red {
  color: red;
}
</style>
