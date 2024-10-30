<template>
  <label :class="{ active: isSelected }" class="radio-item">
    <span class="radio-text">{{ props.label }}</span>
    <input
      class="radio-circle"
      type="radio"
      :value="value"
      :checked="isSelected"
      @change="select"
    />
  </label>
</template>

<script lang="ts" setup>
type RadioButtonProps = {
  label: String;
  value: any;
};
const props = defineProps<RadioButtonProps>();

const selectedValue = inject<any>("selectedValue");
const updateSelectedValue = inject("updateSelectedValue") as (
  value: any
) => void;

const isSelected = computed(() => selectedValue?.value === props.value);
function select() {
  updateSelectedValue(props.value);
}
</script>

<style scoped>
.radio-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Align text to the left and circle to the right */
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.radio-circle {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #5e3052; /* Border color for unselected state */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  margin-left: auto; /* Pushes the circle to the right edge */
}

.radio-circle::after {
  content: "";
  width: 12px;
  height: 12px;
  background-color: #5e3052; /* Dot color for selected state */
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.radio-circle:checked {
  border-color: #5e3052;
}

.radio-circle:checked::after {
  opacity: 1;
}

.radio-item.active {
  border-color: rgba(
    var(--v-theme-primary)
  ); /* Border color for selected item */
}

.radio-text {
  font-size: 1rem;
  color: #333;
  margin-right: 2rem;
}
</style>
