<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  questions: {
    type: Array<string>,
    required: true,
  },
  submit: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:dialogVisible"]);

const { t } = useI18n()

const localDialogVisible = ref(props.dialogVisible);
const answers = ref(Array(props.questions.length).fill(null));
const isAllAnswered = computed(() => answers.value.some((el) => el == null));

watch(
  () => props.dialogVisible,
  (newVal) => {
    localDialogVisible.value = newVal;
  }
);

watch(localDialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});

const closeDialog = () => {
  localDialogVisible.value = false;
};

const handleSubmit = () => {
  props.submit(answers.value);
  answers.value = Array(props.questions.length).fill(null);
  closeDialog();
};
</script>

<template>
  <VDialog v-model="localDialogVisible" max-width="50%">
    <VCard class="pa-8">
      <VCardTitle>
        <span class="text-h5">Kuisioner Self Declare</span>
      </VCardTitle>
      <VCardText>
        <VForm>
          <div v-for="(question, index) in questions" :key="index" class="pa-2">
            <div class="d-flex">
              <div class="pe-1">
                {{ `${index + 1}.` }}
              </div>
              <div>{{ `${t(question) ? t(question) : question}` }}</div>
            </div>
            <VRadioGroup v-model="answers[index]" inline class="ps-2">
              <VRadio label="Yes" value="yes" />
              <VRadio label="No" value="no" />
            </VRadioGroup>
          </div>
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn @click="closeDialog" variant="outlined" color="error">
          {{t('common.cancel')}}
        </VBtn>
        <VBtn
          color="primary"
          @click="handleSubmit"
          variant="flat"
          :disabled="isAllAnswered"
        >
        {{t('common.save')}}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped></style>
