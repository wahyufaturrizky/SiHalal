<script setup lang="ts">
// Optional: Accept props if data needs to be passed from parent
interface Props {
  details?: RegistrationDetail[];
  data?: any;
}

interface RegistrationDetail {
  label: string;
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  details: () => [],
});

const { data } = props || {};
const { importer } = data || {};
const { name, position, email, phone_number, address } = importer || {};

const registrationDetails = ref<RegistrationDetail[]>([
  {
    label: "Name",
    value: name,
  },
  {
    label: "Position",
    value: position,
  },
  {
    label: "Email",
    value: email,
  },
  {
    label: "Phone No.",
    value: phone_number,
  },
  {
    label: "Address",
    value: address,
  },
]);

// Use props data if provided
watchEffect(() => {
  if (props.details.length > 0) registrationDetails.value = props.details;
});
</script>

<template>
  <VContainer class="pa-0">
    <VCard variant="flat" class="pa-4">
      <VCardText class="pa-0">
        <VList density="compact" class="pa-0">
          <VListItem
            v-for="(item, index) in registrationDetails"
            :key="index"
            class="px-0"
          >
            <VRow>
              <VCol sm="2" class="text-grey-darken-1">
                {{ item.label }}
              </VCol>
              <VCol sm="10" class="text-left">
                : <label>{{ item.value }}</label>
              </VCol>
            </VRow>
          </VListItem>
        </VList>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<style scoped>
.v-card {
  border: none !important;
  box-shadow: none !important;
}

:deep(.v-list-item) {
  min-block-size: 36px !important;
}

:deep(.v-list-item__prepend) {
  padding-inline-end: 0 !important;
}
</style>
