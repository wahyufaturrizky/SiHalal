<script setup lang="ts">
const emit = defineEmits(["visible"]);

const closeDialog = () => {
  emit("visible", false);
};

const formSubmit = () => {
  // console.log("submit bro");
  // console.log("parent", parentCheckbox);
  // console.log("childddddd", childItems);
  emit("visible", false);
};

const formEdit = () => {
  // console.log("submit bro");
  // console.log("parent", parentCheckbox);
  // console.log("childddddd", childItems);
  emit("visible", false);
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
});

const menuItems = ref([
  {
    role_label: "Registrasi SH",
    role_id: "ii2isd0sasd0",
    expanded: false,
    checked: false,
    children: [
      { label_child: "Pengajuan 2", id_child: "29sdas", checked: false },
      { label_child: "Pengajuan 3", id_child: "29sdax", checked: true },
      { label_child: "Pengajuan 5", id_child: "29sdaa", checked: false },
    ],
  },
  {
    role_label: "Pengajuan Self Declare",
    role_id: "ii2isd0sasd0x",
    expanded: false,
    checked: false,
    children: [
      { label_child: "Pengajuan 6", id_child: "28sdas", checked: false },
      { label_child: "Pengajuan 7", id_child: "28sdas", checked: false },
      { label_child: "Pengajuan 8", id_child: "28sdas", checked: false },
    ],
  },
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
        // console.log(el.child,'ini el apa aja')
        let temp = [];
        if (el.child !== undefined) {
          el.child.forEach((child) => {
            console.log(child, "el child");
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
        console.log(menuItems);
      });
    }
  } catch (error) {
    console.log(error, "ini error");
    useSnackbar().sendSnackbar("Ada Kesalahan  list", "error");
  }
};

// el.child.map((el2:any)=>{
//   // console.log(el2,'ini apa')
// })

const detail = async (id: any) => {
  try {
    const response: any = await $api(`/user-management/role/${id}`, {
      method: "get",
    });

    if (response.code === 2000) {
      formData.roleName = response.data.name;
      formData.description = response.data.desc;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan detail", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan detail", "error");
  }
};

if (props.action === false) {
  console.log(props.id_role, "ini isi id rolenya");
  detail(props.id_role);
}

onMounted(() => {
  menuList();
});
</script>

<template>
  <VForm>
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
            required
            class="input-field"
          />
        </VCol>
      </VRow>
      <VRow style="margin-block-end: 20px">
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
                    line-height: 1.5;
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
                    line-height: 1.5;
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
                          item.expanded ? "mdi-chevron-up" : "mdi-chevron-down"
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
                    <VCheckbox v-model="item.checked" />
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
                      <VCheckbox v-model="child.checked" />
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </VTable>
        </VCol>
      </VRow>
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
      >
        Tambah
      </VBtn>
      <VBtn
        v-if="!props.action"
        color="primary"
        type="submit"
        @click="formEdit"
      >
        Ubah
      </VBtn>
    </div>
  </VForm>
</template>

