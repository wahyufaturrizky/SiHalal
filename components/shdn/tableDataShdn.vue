<script setup lang="ts">
const props = defineProps({
  onSubmit: {
    type: Function,
    default: () => { },
    required: false,
  },
  onAdd: {
    type: Function,
    default: () => { },
    required: false,
  },
  onEdit: {
    type: Function,
    default: () => { },
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  withDownloadButton: {
    type: Boolean,
    required: true,
  },
  withApproveButton: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <slot name="headerDialog" />
  <br>
  <div class="border rounded">
    <VDataTable
      :items-per-page="-1"
      hide-default-footer=""
      :headers="props.data.label"
      :items="props.data.value"
    >
      <template #item.address="{ item }">
        <div class="mw-300">
          {{ item.address }}
        </div>
      </template>
      <template #item.publication="{ item }">
        <VCheckbox true-value="true" />
      </template>
    </VDataTable>
  </div>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}
.p0 {
  padding-left: 2px !important;
};
.ml5 {
  margin-left: 5px;
}
.textRed {
  color: #E1442E;
}
.h-20 {
  height: 20px;
}
.mw30 {
  min-width: 20rem !important;
}
.mw-300 {
  max-width: 300px;
  min-width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-wrap: wrap;
}
</style>
