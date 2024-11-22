<script setup lang="ts">
interface RegistrationDetail {
  label: string
  value: string
}

const props = withDefaults(defineProps<Props>(), {
  details: () => [],
})

const registrationDetails = ref<RegistrationDetail[]>([
  {
    label: 'Name',
    value: 'Yopi Syukur',
  },
  {
    label: 'Position',
    value: 'Penanggung Jawab',
  },
  {
    label: 'Email',
    value: 'yopisyukur@gmail.com',
  },
  {
    label: 'Phone No.',
    value: '08123456789',
  },
  {
    label: 'Address',
    value: 'Jl. Percetakan Negara Raya B/8/6, DKI Jakarta',
  },
])

// Optional: Accept props if data needs to be passed from parent
interface Props {
  details?: RegistrationDetail[]
}

// Use props data if provided
watchEffect(() => {
  if (props.details.length > 0)
    registrationDetails.value = props.details
})
</script>

<template>
  <VContainer class="pa-0">
    <VCard
      variant="flat"
      class="pa-4"
    >
      <VCardText class="pa-0">
        <VList
          density="compact"
          class="pa-0"
        >
          <VListItem
            v-for="(item, index) in registrationDetails"
            :key="index"
            class="px-0"
          >
            <template #prepend>
              <div class="text-grey-darken-1 min-w-[120px]">
                {{ item.label }}
              </div>
            </template>
            <template #default>
              <div class="text-left">
                : {{ item.value }}
              </div>
            </template>
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
