<script setup lang="ts">
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

const comment = ref("");

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

    const response: any = await $api(
      "/shln/submission/document/add-requirement",
      {
        method: "post",
        body: {
          id: shlnId,
          id_loa: type == "LOA" ? no : "",
          id_nib: type == "NIB" ? no : "",
          file_url_loa:
            type == "LOA" ? (fileDoc ? fileDoc.data.file_url : "") : "",
          file_url_nib:
            type == "NIB" ? (fileDoc ? fileDoc.data.file_url : "") : "",
          comment_loa: type == "LOA" ? comment.value : "",
          comment_nib: type == "NIB" ? comment.value : "",
          is_return: true,
          is_accept: false,
        },
      }
    );

    if (response.code != 2000) {
      useSnackbar().sendSnackbar("ada kesalahan, gagal menyimpan!", "error");
      loading.value = false;
      isVisible.value = false;
      comment.value = "";
    } else {
      comment.value = "";
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

const openDialog = () => {
  isVisible.value = true;
};
</script>

<template>
  <VItemGroup class="cursor-pointer" @click="openDialog">
    <div class="d-flex gap-1">
      <VIcon color="primary" icon="fa-history"></VIcon>
      <p class="text-primary">Return</p>
    </div>
  </VItemGroup>
  <VDialog v-model="isVisible">
    <template #default>
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="10"><h3>Return Confirmation</h3></VCol>
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
          <VRow>
            <VCol cols="12">
              <p>Are you sure you want to approve this document?</p>
            </VCol>
          </VRow>
          <VRow>
            <VCol
              ><VTextarea
                v-model="comment"
                placeholder="Input Return Note (Opsional)"
              ></VTextarea
            ></VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VBtn
            variant="outlined"
            :disabled="loading"
            @click="isVisible = false"
            >Cancel</VBtn
          >
          <VBtn
            :loading="loading"
            variant="elevated"
            color="#49A84C"
            @click="saveReqDocument"
            >{{ loading ? "Loading..." : "Yes, Return" }}</VBtn
          >
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
