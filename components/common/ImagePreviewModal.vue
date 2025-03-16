<template>
  <VDialog>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-if="props.namabahan"
        v-bind="activatorProps"
        color="primary"
        variant="text"
        @click="preview(props.namabahan)"
      >
        <template #default>
          <VIcon color="primary" size="large" icon="fa-picture-o"></VIcon>
        </template>
      </v-btn>
      <p v-else>-</p>
    </template>
    <template v-slot:default="{ isActive }">
      <VCard>
        <VCardTitle>{{ props.cardTitle }}</VCardTitle>
        <VCardItem>
          <VImg
            v-if="props.namabahan"
            :src="uriPreview"
            contain
            max-height="400"
          ></VImg>
        </VCardItem>
      </VCard>
    </template>
  </VDialog>
</template>
<script setup lang="ts">
const props = defineProps({
  namabahan: {
    required: true,
  },
  cardTitle: {
    type: String,
    required: true,
  },
  docQuery: {
    type: String,
  },
});

const uriPreview = ref();

const preview = async (filename: string) => {
  const tmp = props.docQuery ? props.docQuery : undefined;
  const blobUri = await previewAsModal(filename, tmp);

  if (blobUri?.status == 200) {
    uriPreview.value = blobUri?.uri;
  } else {
    useSnackbar().sendSnackbar("Tidak bisa mendapatkan file", "error");
  }
};
</script>
