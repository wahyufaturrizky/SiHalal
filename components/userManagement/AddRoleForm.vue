<script setup lang="ts">
const emit = defineEmits(["visible"]);
const closeDialog = () => {
  emit("visible", false);
};
const formSubmit = () => {
  console.log("submit bro");
  console.log("parent", parentCheckbox);
  console.log("childddddd", childItems);
  emit("visible", false);
};
const formEdit = () => {
  console.log("submit bro");
  console.log("parent", parentCheckbox);
  console.log("childddddd", childItems);
  emit("visible", false);
};

const props = defineProps({
  action: {
    type: Boolean,
    default: true,
  },
});
const formData = reactive({
  roleName: "",
  description: "",
});

const menuItems = ref([
  {
    label: "Registrasi SH",
    expanded: false,
    checked: false,
    children: [
      { label: "Pengajuan 2", checked: false },
      { label: "Pengajuan 3", checked: true },
      { label: "Pengajuan 5", checked: false },
    ],
  },
  {
    label: "Pengajuan Self Declare",
    expanded: false,
    checked: false,
    children: [
      { label: "Pengajuan 6", checked: false },
      { label: "Pengajuan 7", checked: false },
      { label: "Pengajuan 8", checked: false },
    ],
  },
  {
    label: "Permohonan",
    expanded: false,
    checked: false,
    children: [
      { label: "Pengajuan 9", checked: false },
      { label: "Pengajuan 10", checked: false },
      { label: "Pengajuan 11", checked: false },
    ],
  },
  {
    label: "Revisi Sertifikat Halal",
    expanded: false,
    checked: false,
    children: [
      { label: "Pengajuan 12", checked: false },
      { label: "Pengajuan 13", checked: false },
      { label: "Pengajuan 14", checked: false },
    ],
  },
  {
    label: "Tagihan Invoice",
    expanded: false,
    checked: false,
    children: [],
  },
]);
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
                    padding-block: 10px;
                    padding-inline: 10px 100px;
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
                    style="
                      font-size: 16px;
                      line-height: 1.5;
                      padding-block: 10px;
                      padding-inline: 20px;
                    "
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
                      <span>{{ item.label }}</span>
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
                        padding-block: 10px;
                        padding-inline: 40px;
                      "
                    >
                      {{ child.label }}
                    </td>
                    <td
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #fafafa;
                        font-size: 16px;
                        line-height: 1.5;
                        padding-block: 10px;
                        padding-inline: 20px;
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
