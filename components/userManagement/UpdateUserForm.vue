<script setup lang="ts">
const props = defineProps<{
  userId: string;
}>();

const emit = defineEmits(["submit:update"]);
const isModalOpen = ref(false);

const handleLoadUserDetail = async () => {
  try {
    const response: any = await $api("/admin/users/detail", {
      method: "get",
      query: {
        user_id: props.userId,
      },
    } as any);

    if (response.code === 2000) {
      Object.assign(formData, response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

const form = ref();
const formData = reactive({
  username: null,
  name: null,
  email: null,
  password: null,
  phone_no: null,
  is_verify: false,
  roles: [],
});
const formRules = reactive({
  username: [(v: string) => !!v || "Username is required!"],
  name: [(v: string) => !!v || "Name is required!"],
  email: [(v: string) => !!v || "Email is required!"],
  phoneNumber: [(v: string) => !!v || "Phone number is required!"],
  role: [(v: string) => !!v || "Role is required!"],
});
const roleDropdown = ref([]);

const showPassword = ref(false);
const handleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
const handleGeneratePassword = async () => {
  try {
    const response: any = await $api("/admin/users/gen-password", {
      method: "post",
    } as any);

    if (response.code === 2000) {
      formData.password = response.data.password;
    }
  } catch (error) {
    console.error(error);
  }
};
const handleSubmitForm = async () => {
  const status = await form.value.validate();

  if (status.valid) {
    const payload = {
      email: formData.email,
      id_role: formData.roles,
      is_verify: formData.is_verify,
      name: formData.name,
      phone_no: formData.phone_no,
      username: formData.username,
      password: formData.password,
    };
    emit("submit:update", payload);
    isModalOpen.value = false;
  }
};

const handleLoadRoles = async () => {
  try {
    const response: any = await $api("/admin/users/list-role", {
      method: "get",
    } as any);

    if (response.code === 2000) {
      roleDropdown.value = response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleLoadRoles();
});
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
          <VIcon icon="mdi-pencil" />
        </template>
        <VListItemTitle>Edit</VListItemTitle>
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
                  placeholder="Input password"
                  density="compact"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="handleShowPassword"
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
                  v-model="formData.phone_no"
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
                  v-model="formData.is_verify"
                  :label="formData.is_verify ? 'Yes' : 'No'"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12">
                <div class="font-weight-bold mb-1">Role</div>
                <VSelect
                  v-model="formData.roles"
                  :rules="formRules.role"
                  :items="roleDropdown"
                  item-value="id"
                  item-title="name"
                  placeholder="Select role"
                  density="compact"
                  menu-icon="fa-chevron-down"
                  clearable
                  multiple
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
