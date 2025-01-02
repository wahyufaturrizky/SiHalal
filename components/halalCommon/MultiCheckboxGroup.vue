<script setup lang="ts">
const data = [
  {
    id: 1,
    title: "modul 1",
    child: [
      { id: 11, arr: 1, title: "action 1" },
      { id: 12, arr: 2, title: "action 2" },
      { id: 13, arr: 3, title: "action 3" },
    ],
  },
  {
    id: 2,
    title: "modul 2",
    child: [
      { id: 21, arr: 4, title: "action 4" },
      { id: 22, arr: 5, title: "action 5" },
      { id: 23, arr: 6, title: "action 6" },
    ],
  },
  {
    id: 3,
    title: "modul 3",
    child: [
      { id: 31, arr: 7, title: "action 7" },
      { id: 32, arr: 8, title: "action 8" },
      { id: 33, arr: 9, title: "action 9" },
    ],
  },
];

const selectedChildren: number[] = [];
const childValue = ref([]);

const selectChildren = (childId: number, event: any) => {
  if (event.target.checked) {
    selectedChildren.push(childId);
  } else {
    const select = selectedChildren.indexOf(childId);

    selectedChildren.splice(select, 1);
  }
  console.log(selectedChildren);
  console.log("value = ", childValue.value);
};
</script>

<template>
  <VVirtualScroll :items="data" :height="250">
    <template #default="{ item }">
      <VExpansionPanels variant="accordion" title="test 1">
        <VExpansionPanel :key="item.id">
          <VExpansionPanelTitle>
            <!--
              <div>
              <VCheckbox :label="item.title" />
              </div>
            -->
            {{ item.title }}
          </VExpansionPanelTitle>
          <VExpansionPanelText>
            <div style="padding-inline-start: 2rem">
              <VCheckbox
                v-for="i in item.child"
                :id="i.id.toString()"
                :key="i.id"
                v-model="childValue[i.arr - 1]"
                :label="i.title"
                @change="selectChildren(i.id, $event)"
              />
            </div>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </template>
  </VVirtualScroll>
</template>
