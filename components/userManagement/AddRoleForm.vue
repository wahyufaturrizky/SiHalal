<script setup lang="ts">
const emit = defineEmits(["visible", "add", "edit"]);

const closeDialog = () => {
  emit("visible", false);
};
const refVForm = ref<VForm>();

const formSubmit = async () => {
  console.log(menuItems, "menu items");

  try {
    menuItems.value.forEach((el) => {
      if (el.checked === true) {
        formData.id_permission.push(el.role_id);
      }

      if (el.children !== undefined) {
        el.children.forEach((child) => {
          if (child.checked === true) {
            formData.id_permission.push(child.id_child);
          }
        });
      }
    });
    console.log(formData, "ini dari formData");

    const response: any = await $api(`/user-management/role/add`, {
      method: "post",
      body: {
        role_name: formData.roleName,
        desc: formData.description,
        id_permission: formData.id_permission,
      },
    });
    console.log(response, "response");
    formData.id_permission = [];

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Data Berhasil di ditambah", "success");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan submit", "error");
    }
    emit("add", false);
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan  submit", "error");
  }
};

const formEdit = async () => {
  console.log(menuItems, "menu items edit");

  try {
    menuItems.value.forEach((el) => {
      if (el.checked === true) {
        formData.id_permission.push(el.role_id);
      }

      if (el.children !== undefined) {
        el.children.forEach((child) => {
          if (child.checked === true) {
            formData.id_permission.push(child.id_child);
          }
        });
      }
    });
    console.log(formData, "ini dari formData edit");

    const response: any = await $api(
      `/user-management/role/edit/${props.id_role}`,
      {
        method: "post",
        body: {
          role_name: formData.roleName,
          desc: formData.description,
          id_permission: formData.id_permission,
        },
      }
    );
    console.log(response, "response");
    formData.id_permission = [];

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Data Berhasil di diubah", "success");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan edit", "error");
    }
    emit("edit", false);
  } catch (error) {
    console.log(error);
    useSnackbar().sendSnackbar("Ada Kesalahan  edit", "error");
  }
};

const props = defineProps({
  action: {
    type: Boolean,
    default: true,
  },
  id_role: {
    type: String,
  },
});

const formData = reactive({
  roleName: "",
  description: "",
  id_permission: [],
});

const menuItems = ref([
  // {
  //   role_label: "Registrasi SH",
  //   role_id: "ii2isd0sasd0",
  //   expanded: false,
  //   checked: false,
  //   children: [
  //     { label_child: "Pengajuan 2", id_child: "29sdas", checked: false },
  //     { label_child: "Pengajuan 3", id_child: "29sdax", checked: true },
  //     { label_child: "Pengajuan 5", id_child: "29sdaa", checked: false },
  //   ],
  // },
]);

const menuList = async () => {
  try {
    const response: any = await $api(
      "/user-management/role/menu-list-permission",
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      response.data.forEach((el) => {
        let temp = [];
        if (el.child !== undefined) {
          el.child.forEach((child) => {
            temp.push({
              label_child: child.name,
              id_child: child.id,
              checked: false,
            });
          });
          menuItems.value.push({
            role_label: el.name,
            role_id: el.id,
            expanded: false,
            checked: false,
            children: temp,
          });
        } else {
          menuItems.value.push({
            role_label: el.name,
            role_id: el.id,
            expanded: false,
            checked: false,
          });
        }
      });
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan  list", "error");
  }
};

const detail = async (id: any) => {
  try {
    const response: any = await $api(`/user-management/role/${id}`, {
      method: "get",
    });
    formData.roleName = response.data.name;
    formData.description = response.data.desc;

    const response2: any = await $api(
      "/user-management/role/menu-list-permission",
      {
        method: "get",
      }
    );

    const idPermissions = response.data.permissions.map(
      (i) => i.id_permissions
    );

    console.log("list id permissions ; ", idPermissions);

    console.log("response2.data ; ", response2.data);

    const item = response2.data.map((i) => ({
      role_label: i.name,
      role_id: i.id,
      expanded: false,
      checked: idPermissions.includes(i.id),
      children:
        i.child !== undefined && i.child !== null
          ? i.child.map((j) => ({
              label_child: j.name,
              id_child: j.id,
              checked: idPermissions.includes(j.id),
            }))
          : [],
    }));

    menuItems.value = item;

    console.log("item ; ", item);

    //     {
    //   role_label: "Registrasi SH",
    //   role_id: "ii2isd0sasd0",
    //   expanded: false,
    //   checked: false,
    //   children: [
    //     { label_child: "Pengajuan 2", id_child: "29sdas", checked: false },
    //     { label_child: "Pengajuan 3", id_child: "29sdax", checked: true },
    //     { label_child: "Pengajuan 5", id_child: "29sdaa", checked: false },
    //   ],
    // },

    // if (response2.code === 2000) {
    //   formData.roleName = response.data.name;
    //   formData.description = response.data.desc;

    //   response.data.forEach((el) => {
    //     let temp = [];
    //     if (el.child !== undefined) {
    //       el.child.forEach((child) => {
    //         response2.data.permissions.forEach((permit: any) => {
    //           console.log(permit.id_permissions, "ini id permission");
    //           if (permit.id_permissions === true) {
    //             temp.push({
    //               checked: true,
    //             });
    //           } else {
    //             temp.push({
    //               checked: false,
    //             });
    //             temp.push({
    //               label_child: child.name,
    //               id_child: child.id,
    //             });
    //           }
    //         });
    //       });

    //       // parent
    //       menuItems.value.push({
    //         role_label: el.name,
    //         role_id: el.id,
    //         expanded: false,
    //         checked: false,
    //         children: temp,
    //       });
    //     } else {
    //       menuItems.value.push({
    //         role_label: el.name,
    //         role_id: el.id,
    //         expanded: false,
    //         checked: false,
    //       });
    //     }
    //   });

    //   console.log(menuItems, "ini menu Items x");
    // } else {
    //   useSnackbar().sendSnackbar("Ada Kesalahan detail", "error");
    // }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan detail", "error");
  }
};

if (props.action === false) {
  console.log(props.id_role, "ini isi id rolenya");
  detail(props.id_role);
}

const toggleChildren = (item) => {
  if (item.children && item.children.length > 0) {
    item.children.forEach((child) => {
      child.checked = item.checked;
    });
  }
};
const updateParentStatus = (item) => {
  if (item.children && item.children.length > 0) {
    item.checked = item.children.every((child) => child.checked);
  }
};

const isFormValid = computed(() => {
  const hasCheckedItem = menuItems.value.some(
    (item) => item.checked || item.children?.some((child) => child.checked)
  );

  return (
    formData.roleName.trim() !== "" &&
    formData.description.trim() !== "" &&
    hasCheckedItem
  );
});

watch(
  menuItems,
  (newMenuItems) => {
    newMenuItems.forEach((item) => {
      if (item.checked && item.children) {
        item.children.forEach((child) => {
          child.checked = true;
        });
      }
    });
  },
  { deep: true }
);

onMounted(() => {
  if (props.action === true) {
    menuList();
  }
});
</script>

<template>
  <VForm ref="refVForm" @submit.prevent="() => {}">
    <VCardTitle
      class="text-h5 font-weight-bold d-flex justify-space-between align-left"
    >
      <div class="text-h4 font-weight-bold" v-if="props.action">
        Tambah Role
      </div>
      <div class="text-h4 font-weight-bold" v-if="!props.action">Ubah Role</div>
      <VBtn
        icon
        color="transparent"
        style="border: none"
        elevation="0"
        @click="closeDialog"
      >
        <VIcon color="black">ri-close-line</VIcon>
      </VBtn>
    </VCardTitle>

    <VCardItem>
      <VRow class="mb-1">
        <VCol cols="12">
          <VLabel> <b>Role Name </b></VLabel>
          <VTextField
            v-model="formData.roleName"
            placeholder="Input Role Name"
            outlined
            :rules="[requiredValidator]"
            dense
            required
            class="input-field"
          />
        </VCol>
      </VRow>
      <VRow class="mb-1">
        <VCol cols="12">
          <VLabel> <b>Description </b></VLabel>
          <v-textarea
            v-model="formData.description"
            placeholder="Input Description"
            outlined
            dense
            :rules="[requiredValidator]"
            required
            class="input-field"
          />
        </VCol>
      </VRow>

      <Vcard variant="outlined">
        <VRow>
          <VCol>
            <VTable
              style="
                border-collapse: collapse;
                max-block-size: 350px;
                overflow-y: auto;
              "
            >
              <thead style="background-color: #f6f6f6">
                <tr>
                  <th
                    class="text-left"
                    style="
                      font-size: 16px;
                      inline-size: 80%;
                      line-height: 1;
                      text-align: start;
                    "
                  >
                    Menu List
                  </th>
                  <th
                    class="text-center"
                    style="
                      font-size: 16px;
                      inline-size: 20%;
                      line-height: 1;
                      text-align: center;
                    "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in menuItems" :key="index">
                  <!-- Parent Item -->
                  <tr>
                    <td
                      class="text-left"
                      style="font-size: 16px; line-height: 1.5"
                    >
                      <v-btn
                        color="primary"
                        variant="text"
                        style="display: flex; align-items: center; padding: 0"
                        @click="item.expanded = !item.expanded"
                      >
                        <v-icon style="margin-inline-end: 8px">
                          {{
                            item.expanded
                              ? "mdi-chevron-up"
                              : "mdi-chevron-down"
                          }}
                        </v-icon>
                        <span>{{ item.role_label }}</span>
                      </v-btn>
                    </td>
                    <td
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        line-height: 1.5;
                        padding-block: 10px;
                        padding-inline: 20px;
                      "
                    >
                      <VCheckbox
                        v-model="item.checked"
                        @change="toggleChildren(item)"
                      />
                    </td>
                  </tr>

                  <!-- Child Items -->
                  <template v-if="item.expanded">
                    <tr
                      v-for="(child, childIndex) in item.children"
                      :key="`${index}-${childIndex}`"
                    >
                      <td
                        class="text-left"
                        style="
                          background-color: #fafafa;
                          color: #555;
                          font-size: 16px;
                          line-height: 1.5;
                        "
                      >
                        {{ child.label_child }}
                      </td>
                      <td
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          background-color: #fafafa;
                          font-size: 16px;
                          line-height: 1.5;
                        "
                      >
                        <VCheckbox
                          v-model="child.checked"
                          @change="updateParentStatus(item)"
                        />
                      </td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </VTable>
          </VCol>
        </VRow>
      </Vcard>
    </VCardItem>

    <div class="d-flex justify-end flex-wrap gap-4">
      <VBtn color="primary" variant="outlined" @click="closeDialog">
        Batal
      </VBtn>

      <VBtn
        v-if="props.action"
        color="primary"
        type="submit"
        @click="formSubmit"
        :disabled="!isFormValid"
      >
        Tambah
      </VBtn>

      <VBtn
        v-if="!props.action"
        color="primary"
        type="submit"
        @click="formEdit"
        :disabled="!isFormValid"
      >
        Ubah
      </VBtn>
    </div>
  </VForm>
</template>
