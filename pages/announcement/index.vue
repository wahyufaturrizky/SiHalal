<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable array-callback-return -->
<script setup lang="ts">
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let QuillEditor;
const searchQuery = ref("");
const loading = ref<boolean>(false);
const isVisible = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const totalItems = ref<number>(0);
const data = ref<any[]>([]);
const listRole = ref<any[]>([]);
const roleDropdown = ref([]);
const selectedItem = ref("");

const detailData = ref({
  announcement: null,
  id: null,
  is_active: false,
  role: [],
});

const headers = [
  { title: "No.", key: "no" },
  { title: "Pengumuman", key: "no_daftar", nowrap: true },
  { title: "Role", key: "tgl_daftar", nowrap: true },
  { title: "Status", key: "nama_pu", nowrap: true },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

const getChipColor = (status: string) => {
  if (status) return "primary";

  return "warning";
};

const navigateTo = (url: string) => {
  window.location.href = url;
};

const loadItem = async (
  pageNumber: number,
  sizeData: number,
  keyword: string = ""
) => {
  try {
    const response: any = await $api("/announcement/list", {
      method: "get",
      params: {
        page: pageNumber,
        size: sizeData,
        search: keyword,
      },
    });

    if (response?.code === 2000) {
      data.value = response.data;
      totalItems.value = response.total_item;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
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

const getListRole = async () => {
  try {
    const response: any = await $api("/announcement/role", {
      method: "get",
    });

    if (response?.code === 2000) listRole.value = response?.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleInput = (e: any) => {
  loading.value = true;
  debounce(loadItem(page.value, size.value, e.target.value), 500);
  loading.value = false;
};

const onEdit = (item: any) => {
  detailData.value = {
    announcement: item.announcement,
    id: item.id,
    is_active: item.is_active,
    role: item.role.map((el: any) => el.id_role || null),
  };
  isVisible.value = true;
};

const onDelete = async (item: any) => {
  try {
    const response: any = await $api("/announcement/remove", {
      method: "delete",
      query: { id: item.id },
    });

    if (response?.code === 2000) {
      loadItem(page.value, size.value, searchQuery.value);
      isVisible.value = false;
      useSnackbar().sendSnackbar("Data Successfully Deleted", "success");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const onSubmitEdit = async () => {
  const payload = {
    announcement: detailData.value.announcement,
    is_active: detailData.value.is_active,
    id_role: detailData.value.role,
  };

  try {
    const response: any = await $api("/announcement/edit", {
      method: "put",
      body: payload,
      query: { id: detailData.value.id },
    });

    if (response?.code === 2000) {
      loadItem(page.value, size.value, searchQuery.value);
      isVisible.value = false;
      useSnackbar().sendSnackbar("Data Successfully Edited", "success");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  loading.value = true;
  QuillEditor = (await import("@vueup/vue-quill")).QuillEditor;
  await Promise.allSettled([
    loadItem(page.value, size.value, searchQuery.value),
    getListRole(),
    handleLoadRoles(),
  ]);
  loading.value = false;
});

const formRules = reactive({
  role: [(v: string) => !!v || "Role is required!"],
});

const editorOptions = {
  theme: "snow", // Choose a theme: snow, bubble, or core
  placeholder: "Deskripsi...",
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }], // Alignment
      ["clean"], // Clear formatting
    ],
  },
};

const onTextChange = (newValue: any) => {
  detailData.value.announcement = newValue;
};
</script>

<template>
  <div v-if="loading">
    <VSkeletonLoader v-for="i in 1" :key="i" type="table" />
  </div>
  <VContainer v-else-if="!loading">
    <VDialog v-model="isVisible" :max-width="dialogMaxWidth">
      <VCard class="pa-2">
        <div class="d-flex" style="justify-content: space-between">
          <VCardTitle>Edit Announcement</VCardTitle>
          <DialogCloseBtn
            variant="text"
            size="default"
            @click="isVisible = false"
          />
        </div>
        <div class="pa-4 ga-2">
          <label>Detail Announcement</label>
          <QuillEditor
            v-model:content="detailData.announcement"
            :options="editorOptions"
            theme="snow"
            content-type="html"
            output="html"
            :styles="{ minHeight: '100px' }"
            @update:content="onTextChange"
          />
        </div>
        <div class="pa-4 ga-2">
          <label>Role</label>
          <VSelect
            v-model="detailData.role"
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
        </div>
        <div class="pa-4 ga-2">
          <label>Status</label>
          <VSwitch
            v-model="detailData.is_active"
            density="compact"
            :label="detailData.is_active ? 'Active' : 'Inactive'"
            :class="detailData.is_active ? 'custom-true' : 'custom-false'"
          />
        </div>
        <div style="align-self: self-end" class="d-flex gap-5">
          <VBtn variant="outlined" @click="isVisible = false"> Cancel </VBtn>
          <VBtn type="submit" variant="flat" @click="onSubmitEdit"> Save </VBtn>
        </div>
      </VCard>
    </VDialog>
    <h1 style="font-size: 32px">Announcement</h1>
    <br />

    <VCard class="pa-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h4 font-weight-bold">Announcement List</div>
        <AddAnnouncement
          :role="listRole"
          :refresh="() => loadItem(page, size, searchQuery)"
        />
      </VCardTitle>
      <VCardItem>
        <VTextField
          v-model="searchQuery"
          density="compact"
          placeholder="Search Data"
          append-inner-icon="ri-search-line"
          style="max-inline-size: 100%"
          @input="handleInput"
        />
      </VCardItem>
      <VCardItem>
        <VDataTable
          disable-sort
          :headers="headers"
          :items="data"
          item-value="no"
          class="elevation-1 border rounded"
          @update:options="loadItem(page, size, searchQuery)"
        >
          <template #body="{ items }">
            <div
              v-if="items.length === 0"
              class="pt-2"
              style="justify-items: center"
            >
              <img src="~/assets/images/empty-data.png" alt="empty_data" />
              <div class="pt-2 pb-2 font-weight-bold">Data Kosong</div>
            </div>
            <tr v-for="(item, idx) in data" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>
                <div v-html="item.announcement" />
              </td>
              <td>
                {{ item.role.map((element: any) => element.name).join(", ") }}
              </td>
              <td>
                {{ item.role.map((element: any) => element.name).join(", ") }}
              </td>
              <td>
                <VChip :color="getChipColor(item.is_active)" label class="ma-1">
                  {{ item.is_active ? "Active" : "Inactive" }}
                </VChip>
              </td>
              <td>
                <VMenu>
                  <template #activator="{ props }">
                    <VIcon
                      icon="fa-ellipsis-v"
                      color="primary"
                      class="cursor-pointer"
                      v-bind="props"
                      @click="selectedItem = item.id"
                    />
                  </template>
                  <VList>
                    <VListItem
                      prepend-icon="mdi-pencil"
                      title="Edit"
                      @click="() => onEdit(item)"
                    />
                    <div class="pr-4">
                      <DialogDeleteRole
                        :on-delete="() => onDelete(item)"
                        title="Delete Confirmation"
                      />
                    </div>
                  </VList>
                </VMenu>
              </td>
            </tr>
          </template>
        </VDataTable>
      </VCardItem>
    </VCard>
  </VContainer>
</template>

<style lang="scss" scoped>
.ic-center {
  display: flex;
  place-self: center;
}
.no-padding {
  padding-left: 0px !important;
}
</style>
