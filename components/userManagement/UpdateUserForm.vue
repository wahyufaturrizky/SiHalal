<script setup lang="ts">
const props = defineProps<{
  detail?: any;
}>();

onMounted(() => {
  console.log("props", props?.detail);
});

const emit = defineEmits(["submit:update"]);
const isModalOpen = ref(false);

const handleLoadUserDetail = () => {
  // load user detail here for update
};

const form = ref();
const formData = reactive({
  username: props?.detail?.username || null,
  name: props?.detail?.nama || null,
  email: props?.detail?.nama || null,
  password: props?.detail?.password || null,
  phone_number: props?.detail?.phone_no || null,
  is_verified: props?.detail?.is_verify || false,
  role: props?.detail?.role || null,
});
const formRules = reactive({
  username: [(v: string) => !!v || "Username is required!"],
  name: [(v: string) => !!v || "Name is required!"],
  email: [(v: string) => !!v || "Email is required!"],
  password: [(v: string) => !!v || "Password is required!"],
  phoneNumber: [(v: string) => !!v || "Phone number is required!"],
  role: [(v: string) => !!v || "Role is required!"],
});
const roleDropdown = ref([
  { title: "Pelaku Usaha", value: "Pelaku Usaha" },
  { title: "Verifikator HLN", value: "Verifikator HLN" },
  { title: "Keuangan", value: "Keuangan" },
  { title: "Verifikator Fasilitator", value: "Verifikator Fasilitator" },
  { title: "Fasilitator", value: "Fasilitator" },
  { title: "Pendamping", value: "Pendamping" },
  { title: "Verifikator Self-Declare", value: "Verifikator Self-Declare" },
  { title: "Komite Fatwa", value: "Komite Fatwa" },
  { title: "Verifikator Reguler", value: "Verifikator Reguler" },
  { title: "Lembaga Penjamin Halal", value: "Lembaga Penjamin Halal" },
  { title: "Auditor", value: "Auditor" },
  { title: "Komisi Fatwa", value: "Komisi Fatwa" },
  { title: "Admin", value: "Admin" },
  { title: "Verifikator BPJPH", value: "Verifikator BPJPH" },
]);

const handleGeneratePassword = () => {
  // generate password here
};
const handleSubmitForm = async () => {
  const status = await form.value.validate();

  if (status.valid) {
    emit("submit:update", formData);
    isModalOpen.value = false;
  }
};
</script>

<template>
  <VDialog v-model="isModalOpen" max-width="840px">
    <template #activator="{ props }">
      <VListItem
        v-bind="props"
        class="cursor-pointer"
        @click="handleLoadUserDetail"
      >
        <template #prepend>
          <VIcon icon="fa-rotate-right" :size="16" />
        </template>
        <VListItemTitle>Reset Password</VListItemTitle>
      </VListItem>
    </template>
    <template #default="{ isActive }">
      <VForm ref="form" @submit.prevent="handleSubmitForm">
        <VCard class="pa-4">
          <VCardTitle class="d-flex justify-space-between align-center">
            <div class="text-h4 font-weight-bold">Edit User</div>
            <VIcon @click="isActive.value = false" size="large">
              mdi-close-thick
            </VIcon>
          </VCardTitle>
          <VCardItem>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold mb-1">Username</div>
                <VTextField
                  autofocus
                  v-model="formData.username"
                  :rules="formRules.username"
                  placeholder="Input username"
                  density="compact"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold mb-1">Name</div>
                <VTextField
                  v-model="formData.name"
                  :rules="formRules.name"
                  placeholder="Input name"
                  density="compact"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold mb-1">Email</div>
                <VTextField
                  v-model="formData.email"
                  :rules="formRules.email"
                  type="email"
                  placeholder="Input email"
                  density="compact"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold mb-1">Password</div>
                <VTextField
                  v-model="formData.password"
                  :rules="formRules.password"
                  type="password"
                  placeholder="Input password"
                  density="compact"
                >
                  <template #append>
                    <VBtn @click="handleGeneratePassword">Generate</VBtn>
                  </template>
                </VTextField>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold mb-1">Phone Number</div>
                <VTextField
                  v-model="formData.phone_number"
                  :rules="formRules.phoneNumber"
                  placeholder="Input phone number"
                  density="compact"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold">Is Verify?</div>
                <VCheckbox
                  v-model="formData.is_verified"
                  :label="formData.is_verified ? 'Yes' : 'No'"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold mb-1">Role</div>
                <VSelect
                  v-model="formData.role"
                  :rules="formRules.role"
                  :items="roleDropdown"
                  placeholder="Select role"
                  density="compact"
                  menu-icon="fa-chevron-down"
                  clearable
                />
              </VCol>
            </VRow>
          </VCardItem>
          <VCardActions class="mt-7 pe-5">
            <VBtn
              variant="outlined"
              class="px-4 me-3"
              @click="isActive.value = false"
              >Cancel</VBtn
            >
            <VBtn type="submit" variant="flat" class="px-7"> Save </VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </template>
  </VDialog>
</template>
