<script setup lang="ts">
const props = defineProps<{
  dialogVisible: boolean;
  openHandler: Function;
}>();

const emit = defineEmits(["update:handleSubmit"]);

const form = ref();
const formData = reactive({
  username: null,
  name: null,
  email: null,
  phone_number: null,
  is_verified: false,
  role: null,
});
const formRules = reactive({
  username: [(v: string) => !!v || "Username is required!"],
  name: [(v: string) => !!v || "Name is required!"],
  email: [(v: string) => !!v || "Email is required!"],
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
const handleResetForm = () => {
  Object.assign(formData, {
    username: null,
    name: null,
    email: null,
    phone_number: null,
    is_verified: false,
    role: null,
  });
};
const handleSubmitForm = async () => {
  const status = await form.value.validate();

  if (status.valid) {
    emit("update:handleSubmit", formData);
    props.openHandler();
    handleResetForm();
  }
};
</script>

<template>
  <VDialog v-model="props.dialogVisible" max-width="840px" persistent>
    <VForm ref="form" @submit.prevent="handleSubmitForm">
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h4 font-weight-bold">Add User</div>
          <VIcon @click="() => props.openHandler()" size="large">
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
            @click="() => props.openHandler()"
            >Cancel</VBtn
          >
          <VBtn type="submit" variant="flat" class="px-7"> Add </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </VDialog>
</template>
