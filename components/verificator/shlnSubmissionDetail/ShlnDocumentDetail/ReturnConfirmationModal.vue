<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const route = useRoute();

const inputValue = ref("");
const loading = ref(false);
const isActive = ref(false);

const router = useRouter();

const putVerificatorDocumentLOAReturn = async (comment: string[]) => {
  try {
    loading.value = true;

    const res = await $api(
      `/shln/verificator/document/loa/return/${route.params.id}`,
      {
        method: "put",
        body: {
          comment,
          loadid: props.id,
        },
      }
    );

    if (res?.code === 2000) router.go(-1);
    else useSnackbar().sendSnackbar("Gagal menambahkan data", "error");

    inputValue.value = "";
    isActive.value = false;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    inputValue.value = "";
    isActive.value = false;
    loading.value = false;
  }
};

const onConfirm = () => {
  putVerificatorDocumentLOAReturn(inputValue.value);
};
</script>

<template>
  <VDialog>
    <template #activator="{ props: openModal }">
      <VBtn
        v-bind="openModal"
        density="compact"
        variant="outlined"
        append-icon="fa-undo"
      >
        Return
      </VBtn>
    </template>
    <template #default="{ isActive }">
      <VCard max-width="50svw">
        <VCardTitle>
          <VRow>
            <VCol cols="10">
              <h3>Return Confirmation</h3>
            </VCol>
            <VCol cols="2" style="display: flex; justify-content: end">
              <VIcon
                size="small"
                icon="fa-times"
                @click="isActive.value = false"
              />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <p><b>Are you sure you want to Return this submission?</b></p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <VTextarea
                v-model="inputValue"
                clearable
                auto-grow
                dense
                outlined
                :style="{ maxWidth: '100%' }"
                placeholder="Input Return Notes (Optional)"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VBtn variant="outlined" @click="isActive.value = false">
            Cancel
          </VBtn>
          <VBtn :disabled="loading" variant="elevated" @click="onConfirm">
            {{ loading ? "Loading..." : "Yes, Return" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
