<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

import { useDisplay } from 'vuetify'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

let QuillEditor

const props = defineProps({
  role: {
    type: Array,
    required: false,
  },
  refresh: {
    type: Function,
    required: false,
  },
})

const isVisible = ref(false)

const body = ref<any>({
  detail: '',
  role: [],
  status: false,
})

const openDialog = () => {
  isVisible.value = true
}

const onCancel = () => {
  body.value = {
    detail: '',
    role: [],
    status: false,
  }
  isVisible.value = false
}

const addAnnouncement = async () => {
  const payload = {
    announcement: body.value?.detail,
    is_active: body.value?.status,
    id_role: body.value?.role,
  }

  try {
    const response: any = await $api('/announcement/add', {
      method: 'post',
      body: payload,
    })

    if (response.code === 2000) {
      isVisible.value = false
      props.refresh()
      useSnackbar().sendSnackbar('Data Successfully Added', 'success')
    }
  }
  catch (err) {
    return err
  }
}

const { mdAndUp } = useDisplay()

const dialogMaxWidth = computed(() => {
  return mdAndUp.value ? 750 : '90%'
})

onMounted(async () => {
  QuillEditor = (await import('@vueup/vue-quill')).QuillEditor
})

const editorOptions = {
  theme: 'snow', // Choose a theme: snow, bubble, or core
  placeholder: 'Deskripsi...',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }], // Alignment
      ['clean'], // Clear formatting
    ],
  },
}

const onTextChange = (newValue: any) => {
  body.value.detail = newValue
}
</script>

<template>
  <div class="mb-2">
    <VBtn
      variant="flat"
      append-icon="fa-plus"
      @click="openDialog"
    >
      Add Announcement
    </VBtn>
    <VDialog
      v-model="isVisible"
      :max-width="dialogMaxWidth"
    >
      <VCard class="pa-2">
        <div
          class="d-flex"
          style="justify-content: space-between;"
        >
          <VCardTitle>Add Announcement</VCardTitle>
          <DialogCloseBtn
            variant="text"
            size="default"
            @click="isVisible = false"
          />
        </div>
        <div class="pa-4 ga-2">
          <label>Detail Announcement</label>
          <QuillEditor
            v-model:content="body.detail"
            :options="editorOptions"
            theme="snow"
            content-type="html"
            output="html"
            style="min-height: 100px;"
            @update:content="onTextChange"
          />
        </div>
        <div class="pa-4 ga-2">
          <label>Role</label>
          <VSelect
            v-model="body.role"
            :items="props?.role"
            item-title="name"
            placeholder="Pilih role"
            item-text="name"
            item-value="id"
            multiple
          />
        </div>
        <div class="pa-4 ga-2">
          <label>Status</label>
          <VSwitch
            v-model="body.status"
            density="compact"
            :label="body.status ? 'Active' : 'Inactive'"
            :class="body.status ? 'custom-true' : 'custom-false'"
          />
        </div>
        <div
          style="align-self: self-end;"
          class="d-flex gap-5"
        >
          <VBtn
            variant="outlined"
            @click="onCancel"
          >
            Cancel
          </VBtn>
          <VBtn
            type="submit"
            variant="flat"
            @click="addAnnouncement"
          >
            Add
          </VBtn>
        </div>
      </VCard>
    </VDialog>
  </div>
</template>
