<script setup lang="ts">
const items = ref();
const size = ref(10);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);

const loadItem = async ({
  page,
  size,
  keyword,
  nama_pu,
}: {
  page: number;
  size: number;
  keyword?: string;
  nama_pu?: string;
}) => {
  try {
    loading.value = true;

    const response = await $api("/cancelation", {
      method: "get",
      params: {
        page,
        size,
        keyword,
        nama_pu,
      },
    });

    if (response.code === 2000) {
      items.value = response.data;
      totalItems.value = response.total_item;
      loading.value = false;
      useSnackbar().sendSnackbar("Sukses update data", "success");
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      loading.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

onMounted(async () => {
  await loadItem({
    page: 1,
    size: size.value,
    keyword: "",
    nama_pu: "",
  });
});

const debouncedFetch = debounce(loadItem, 500);
</script>

<template>
  <h2 class="mt-3">Pembatalan</h2>
  <TabelCanceledFasilitasi
    :page="page"
    :size="size"
    :items="items"
    :totalitems="totalItems"
    :loading="loading"
    @updatetable="
      loadItem({
        page: 1,
        size,
        keyword,
        nama_pu,
      })
    "
    @formvalue="
      debouncedFetch({
        page,
        size,
        keyword: $event.keyword,
        nama_pu: $event.nama_pu,
      })
    "
  />
</template>
