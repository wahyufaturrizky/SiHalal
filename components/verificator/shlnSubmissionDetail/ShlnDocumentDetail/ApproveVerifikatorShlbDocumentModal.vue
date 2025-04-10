<script setup lang="ts">
import { useDisplay } from "vuetify";

const route = useRoute();
const shlnId = (route.params as any).id;

const props = defineProps<{
  item: any;
  reqfile: any;
}>();

const emit = defineEmits(["refresh"]);

const { item, reqfile } = props || {};

const isVisible = ref(false);
const loading = ref(false);
const openDialog = () => {
  isVisible.value = true;
};

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("id", shlnId);
    formData.append("file", file);
    formData.append("type", "sample");
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

const saveReqDocument = async () => {
  try {
    loading.value = true;
    console.log("@reqfile", reqfile);

    let fileDoc: any;
    if (reqfile) {
      fileDoc = await uploadDocument(reqfile);
      if (fileDoc.code != 2000) {
        isVisible.value = false;
        loading.value = false;
        useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
        return;
      }
    }

    const { type, no } = item || {};
    console.log(item);

    const response: any = await $api(
      "/shln/submission/document/add-requirement",
      {
        method: "post",
        body: {
          id: shlnId,
          id_loa: type == "Letter of Application / LoA" ? no : "",
          id_nib: type == "NIB" ? no : "",
          file_url_loa:
            type == "Letter of Application / LoA"
              ? fileDoc
                ? fileDoc.data.file_url
                : ""
              : "",
          file_url_nib:
            type == "NIB" ? (fileDoc ? fileDoc.data.file_url : "") : "",
          comment_loa: "",
          comment_nib: "",
          is_return: false,
          is_accept: true,
        },
      }
    );

    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      loading.value = false;
      isVisible.value = false;
    } else {
      emit("refresh");
      useSnackbar().sendSnackbar("berhasil menyimpan data!", "success");
      isVisible.value = false;
      loading.value = false;
    }
  } catch (error) {
    isVisible.value = false;
    loading.value = false;
    useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
  }
};

const { mdAndUp } = useDisplay();

const dialogMaxWidth = computed(() => {
  return mdAndUp ? 700 : "90%";
});
</script>

<template>
  <VItemGroup class="cursor-pointer" @click="openDialog">
    <div class="d-flex gap-1">
      <VIcon color="success" icon="fa-check"></VIcon>
      <p class="text-success">Approve</p>
    </div>
  </VItemGroup>
  <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
    <template #default>
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Approve Confirmation</h3></VCol>
            <VCol cols="2" style="display: flex; justify-content: end"
              ><VIcon
                class="cursor-pointer"
                @click="isVisible = false"
                size="small"
                icon="fa-times"
              ></VIcon
            ></VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <p>Are you sure you want to approve this document?</p>
        </VCardText>
        <VCardActions>
          <VBtn
            variant="outlined"
            @click="isVisible = false"
            :disabled="loading"
            >Cancel</VBtn
          >
          <VBtn
            variant="elevated"
            color="#49A84C"
            @click="saveReqDocument"
            :loading="loading"
            :disabled="loading"
            >{{ loading ? "Loading..." : "Approve" }}</VBtn
          >
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
