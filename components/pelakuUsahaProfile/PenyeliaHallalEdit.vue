<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps({
  fileSkBlob: {
    type: String,
    required: true,
  },
  dataProfile: {
    type: Object,
    required: false,
  },
});

const panelOpenPenyeliaHallal = ref(0);

const { t } = useI18n();

const isNoNeedValidation =
  props?.dataProfile?.skala_usaha === "JU.4" ||
  props?.dataProfile?.skala_usaha === "JU.3";

const tableHeaders = [
  { title: "No", key: "no", align: "start", sortable: false },
  {
    title: "detail-pu.pu-ph-nama",
    key: "nama",
    align: "start",
    sortable: false,
  },
  {
    title: "detail-pu.pu-ph-download-skph",
    key: "unduh_skph",
    align: "start",
    sortable: false,
  },
  {
    title: "detail-pu.pu-ph-download-spph",
    key: "unduh_spph",
    align: "start",
    sortable: false,
  },
  {
    title: "detail-pu.pu-ph-download-ktp",
    key: "unduh_ktp",
    align: "start",
    sortable: false,
  },
  {
    title: "detail-pu.pu-ph-ktp",
    key: "no_ktp",
    align: "start",
    sortable: false,
  },
  { title: "Action", key: "actions", align: "end", sortable: false },
];

const store = pelakuUsahaProfile();

const snackbar = useSnackbar();

const uploadDocument = async (file, type: string) => {
  try {
    const formData = new FormData();

    formData.append("id", store.profileData?.id);
    formData.append("file", file);
    formData.append("type", type);

    return await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};

// const downloadDOcument = async (filename: string) => {
//   try {
//     const response = await $api("/shln/submission/document/download", {
//       method: "post",
//       body: {
//         filename,
//       },
//     });
//     window.open(response.url, "_blank", "noopener,noreferrer");
//   } catch (error) {
//     useSnackbar().sendSnackbar("Ada Kesalahan", "error");
//   }
// };

async function handleAddAspekLegalConfirm(item) {
  // console.log("executed emit", item.namaPenyelia);
  try {
    if (isNoNeedValidation) {
      // console.log("step 0", item);
      let payload = {
        id_number: item.noKtp,
        phone_number: item.noKontak,
        name: item.namaPenyelia,
        religion: item.agamaPenyelia,
        sk_number: item.nomorSk,
        sk_date: `${parseFlexibleDate(item.tanggalSk)
          .toISOString()
          .substring(0, 19)}Z`,
      };
      if (item.certificate_date) {
        payload = {
          ...payload,
          certificate_date: `${parseFlexibleDate(item.tanggalSertifikat)
            .toISOString()
            .substring(0, 19)}Z`,
        };
      }
      if (item.certificate_number) {
        payload = {
          ...payload,
          certificate_number: item.certificate_number,
        };
      }
      if (item.sertifikatKompetensi) {
        const skkFile = await uploadDocument(item.sertifikatKompetensi, "skk");
        if (skkFile.code != 2000) {
          return;
        } else {
          payload = {
            ...payload,
            skph_file: skkFile.data.file_url,
          };
        }
      }
      if (item.skpFile) {
        const skpFile = await uploadDocument(item.sertifikatPelatihan, "skp");
        if (skpFile.code != 2000) {
          return;
        } else {
          payload = {
            ...payload,
            spph_file: skpFile.data.file_url,
          };
        }
      }
      if (item.ktpFile) {
        const ktpFile = await uploadDocument(item.ktpFile, "ktp");
        if (ktpFile.code != 2000) {
          return;
        } else {
          payload = {
            ...payload,
            ktp_file: ktpFile.data.file_url,
          };
        }
      }

      const response = await $api(
        `/pelaku-usaha-profile/${store.profileData?.id}/add-supervisor`,
        {
          method: "post",
          body: payload,
        }
      );

      // loadReqDialog.value = false;
      if (response.code != 2000) {
        useSnackbar().sendSnackbar(
          "Silahkan hubungi BPJPH untuk menambahkan Penyelia",
          "error"
        );

        return;
      }
      await store.fetchProfile(null);

      // useMyUpdateSubmissionEditStore().setData("document");
      useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
    } else {
      const skkFile = await uploadDocument(item.sertifikatKompetensi, "skk");
      if (skkFile.code != 2000) return;

      const skpFile = await uploadDocument(item.sertifikatPelatihan, "skp");
      if (skpFile.code != 2000) return;

      const ktpFile = await uploadDocument(item.ktpFile, "ktp");
      if (ktpFile.code != 2000) return;

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
            certificate_date: `${parseFlexibleDate(item.tanggalSertifikat)
              .toISOString()
              .substring(0, 19)}Z`,
            sk_number: item.nomorSk,
            sk_date: `${parseFlexibleDate(item.tanggalSk)
              .toISOString()
              .substring(0, 19)}Z`,
            skph_file: skkFile.data.file_url,
            spph_file: skpFile.data.file_url,
            ktp_file: ktpFile.data.file_url,
          },
        }
      );

      // loadReqDialog.value = false;
      if (response.code != 2000) {
        useSnackbar().sendSnackbar(
          "Silahkan hubungi BPJPH untuk menambahkan Penyelia",
          "error"
        );

        return;
      }
      await store.fetchProfile(null);

      // useMyUpdateSubmissionEditStore().setData("document");
      useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
    }
  } catch (error) {
    // console.log("ERROR : ", error)
    // loadReqDialog.value = false;
    if (error.data?.data?.code === 4001) {
      useSnackbar().sendSnackbar(
        "Silahkan hubungi BPJPH untuk menambahkan Penyelia",
        "error"
      );
    } else {
      useSnackbar().sendSnackbar(
        "Silahkan hubungi BPJPH untuk menambahkan Penyelia",
        "error"
      );
    }
  }
}

const handleEditEmitted = async (item, idPenyelia) => {
  const currentDataPenyelia = store.supervisorData.find(
    (penyelia) => penyelia.id === idPenyelia
  );

  console.log("edit emitted", item, currentDataPenyelia);

  try {
    let skkFileUrl = item.sertifikatKompetensi?.name || "";
    if (
      item.sertifikatKompetensi?.name &&
      item.sertifikatKompetensi.name !== currentDataPenyelia?.file_skph
    ) {
      const res = await uploadDocument(item.sertifikatKompetensi, "skk");

      skkFileUrl = res?.data.file_url;
      if (res?.code != 2000) return;
    }

    let skpFileUrl = item.sertifikatPelatihan?.name || "";
    if (
      item.sertifikatPelatihan?.name &&
      item.sertifikatPelatihan.name !== currentDataPenyelia?.file_spph
    ) {
      const res = await uploadDocument(item.sertifikatPelatihan, "skp");

      skpFileUrl = res?.data.file_url;
      if (res?.code != 2000) return;
    }

    let ktpFileUrl = item.ktpFile?.name ?? "";
    if (
      item.ktpFile?.name &&
      item.ktpFile.name !== currentDataPenyelia?.file_ktp
    ) {
      const res = await uploadDocument(item.ktpFile, "ktp");

      ktpFileUrl = res?.data.file_url;
      if (res?.code != 2000) return;
    }

    const response = await $api(
      `/pelaku-usaha-profile/${store.profileData?.id}/penyelia/${idPenyelia}/update`,
      {
        method: "put",
        body: {
          id_number: item.noKtp,
          phone_number: item.noKontak,
          name: item.namaPenyelia,
          religion: item.agamaPenyelia,
          certificate_number: item.nomorSertifikat,
          certificate_date: `${parseFlexibleDate(item.tanggalSertifikat)
            .toISOString()
            .substring(0, 19)}Z`,
          sk_number: item.nomorSk,
          sk_date: `${parseFlexibleDate(item.tanggalSk)
            .toISOString()
            .substring(0, 19)}Z`,
          skph_file: skkFileUrl,
          spph_file: skpFileUrl,
          ktp_file: ktpFileUrl,
        },
      }
    );

    // loadReqDialog.value = false;
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");

      return;
    }
    await store.fetchProfile(null);

    // useMyUpdateSubmissionEditStore().setData("document");
    useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
  } catch (error) {
    // loadReqDialog.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
};

function handleDelete(item) {
  // console.log("Delete item:", item);

  const submitApi = $api(
    `/pelaku-usaha-profile/${store.profileData?.id}/penyelia/${item.id}/delete`,
    {
      method: "DELETE",
    }
  )
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

const downloadSkHandler = () => {
  if (props.fileSkBlob != null) window.open(props.fileSkBlob);
};
</script>

<template>
  <VCard>
    <VCardTitle>
      <VRow>
        <VCol cols="8" style="display: inline-flex; align-items: center">
          <div class="text-h4 font-weight-bold mr-4">
            {{ t("detail-pu.pu-ph-title") }}
          </div>
          <!--
            <VChip
            color="primary"
            style="
            background-color: #652672;
            color: white !important;
            border-radius: 10px;
            "
            >
            SK Penetapan Penyelia Halal
            </VChip>
          -->

          <VBtn
            density="compact"
            variant="flat"
            color="primary"
            @click="downloadSkHandler"
          >
            {{ t("detail-pu.pu-edit-sk") }}
          </VBtn>
        </VCol>
        <VCol cols="4" style="display: flex; justify-content: end">
          <DataPenyeliaHalalModal
            mode="add"
            :data="props.dataProfile"
            @click.stop
            @confirm-add="handleAddAspekLegalConfirm"
            @cancel="() => console.log('Add cancelled')"
          />
        </VCol>
      </VRow>
    </VCardTitle>
    <VCardItem>
      <VTable>
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header.key">
              {{ t(header.title) ? t(header.title) : header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in store.supervisorData" :key="item.id">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
              <div v-if="!item.file_skph">-</div>
              <VBtn
                v-else
                variant="text"
                color="purple"
                class="px-0"
                @click="downloadDocument(item.file_skph, 'FILES')"
              >
                <VIcon color="purple" class="mr-1"> mdi-download </VIcon>
                file
              </VBtn>
            </td>
            <td>
              <div v-if="!item.file_spph">-</div>
              <VBtn
                v-else
                variant="text"
                color="purple"
                class="px-0"
                @click="downloadDocument(item.file_spph, 'FILES')"
              >
                <VIcon color="purple" class="mr-1"> mdi-download </VIcon>
                file
              </VBtn>
            </td>
            <td>
              <div v-if="!item.file_ktp">-</div>
              <VBtn
                v-else
                variant="text"
                color="purple"
                class="px-0"
                @click="downloadDocument(item.file_ktp, 'FILES')"
              >
                <VIcon color="purple" class="mr-1"> mdi-download </VIcon>
                file
              </VBtn>
            </td>
            <td>{{ item.ktp_no }}</td>
            <td>
              <VMenu :close-on-content-click="false" persistent>
                <template #activator="{ props }">
                  <VBtn icon variant="text" v-bind="props">
                    <VIcon>mdi-dots-vertical</VIcon>
                  </VBtn>
                </template>
                <VList>
                  <VListItem>
                    <VListItemTitle>
                      <DataPenyeliaHalalModal
                        mode="edit"
                        :initial-data="item"
                        @confirm-edit="handleEditEmitted"
                        @cancel="() => console.log('Add cancelled')"
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
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardItem>
  </VCard>
  <!--
    <VExpansionPanels v-model="panelOpenPenyeliaHallal">
    <VExpansionPanel>
    <VExpansionPanelTitle>

    </VExpansionPanelTitle>
    <VExpansionPanelText>

    </VExpansionPanelText>
    </VExpansionPanel>
    </VExpansionPanels>
  -->
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
