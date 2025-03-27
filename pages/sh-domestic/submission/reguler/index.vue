<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable array-callback-return -->
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const searchQuery = ref("");
const loading = ref<boolean>(false);
const page = ref<number>(1);
const size = ref<number>(10);
const totalItems = ref<number>(0);
const data = ref<any[]>([]);
const listOss = ref<any[]>([]);

const store = pelakuUsahaProfile();

const headers = [
  { title: "No", key: "no" },
  {
    title: "pengajuan-reguler.reguler-list-head-nodaftar",
    key: "no_daftar",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-list-head-tgldaftar",
    key: "tgl_daftar",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-list-head-namapu",
    key: "nama_pu",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-list-head-jnsdaftar",
    key: "jenis_daftar",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-list-head-jnsproduk",
    key: "jenis_produk",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-list-head-status",
    key: "newStatus",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-list-head-action",
    value: "action",
    sortable: false,
    nowrap: true,
  },
];

const getChipColor = (status: string) => {
  if (status === "Draf") return "primary";
  else if (status === "Micre") return "success";

  return "success";
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
    loading.value = true;
    const response: any = await $api("/reguler/pelaku-usaha", {
      method: "get",
      params: {
        page: pageNumber,
        size: sizeData,
        keyword,
      },
    });

    if (response?.code === 2000) {
      response?.data?.map((item: any) => {
        item.newStatus = [item?.jenis_usaha, item?.jumlah_produk, item.status];
      });
      data.value = response.data;
      totalItems.value = response.total_item;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } finally {
    loading.value = false;
  }
};

const getListOss = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/list-oss", {
      method: "get",
    });

    if (response?.code === 2000) listOss.value = response?.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const debouncedFetch = debounce(loadItem, 500);
const handleInput = (e: any) => {
  debouncedFetch(page.value, size.value, searchQuery.value);
};

const newRegister = async (type: string, id: string) => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/draft", {
      method: "post",
      body: {
        type,
        id,
      },
    });

    if (response?.code === 2000) {
      router.push(
        `/sh-domestic/submission/reguler/${response?.data?.certificate_halal?.id_reg}`
      );
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const additionalRegister = () => {};

onMounted(async () => {
  await Promise.allSettled([getListOss(), store.fetchProfile(null)]);
});
</script>

<template>
  <div>
    <!-- <KembaliButton class="no-padding" /> -->
    <h1 style="font-size: 32px">
      {{ t("pengajuan-reguler.reguler-list-title") }}
    </h1>
    <br />

    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h4 font-weight-bold">
          {{ t("pengajuan-reguler.reguler-list-subtitle") }}
        </div>
        <NewRegulerSertificationHalalDialog
          :new-register="newRegister"
          :additional-register="additionalRegister"
          :data="listOss"
        />
      </VCardTitle>
      <VCardItem>
        <VTextField
          v-model="searchQuery"
          density="compact"
          :placeholder="t('shln-invoice.invoice-list-cari')"
          append-inner-icon="ri-search-line"
          style="max-inline-size: 100%"
          @input="handleInput"
        />
      </VCardItem>
      <VCardItem>
        <VDataTableServer
          v-model:items-per-page="size"
          v-model:page="page"
          :loading="loading"
          loading-text="Loading..."
          :headers="headers"
          :items="data"
          :items-length="totalItems"
          class="elevation-1 custom-table"
          @update:options="loadItem(page, size, searchQuery)"
        >
          <template #header.no_daftar="{ column }">
            <div class="font-bold">{{ t(column.title) }}</div>
          </template>

          <template #header.tgl_daftar="{ column }">
            <div class="font-bold">{{ t(column.title) }}</div>
          </template>

          <template #header.nama_pu="{ column }">
            <div class="font-bold">{{ t(column.title) }}</div>
          </template>

          <template #header.jenis_daftar="{ column }">
            <div class="font-bold">{{ t(column.title) }}</div>
          </template>

          <template #header.jenis_produk="{ column }">
            <div class="font-bold">{{ t(column.title) }}</div>
          </template>

          <template #header.newStatus="{ column }">
            <div class="font-bold">{{ t(column.title) }}</div>
          </template>

          <template #header.action="{ column }">
            <div class="font-bold">{{ t(column.title) }}</div>
          </template>
          <template #item.no="{ index }">
            <label>{{ index + 1 }}</label>
          </template>
          <template #item.tgl_daftar="{ item }">
            <div v-if="item.tgl_daftar">
              {{ formatDateIntl(new Date(item.tgl_daftar)) }}
            </div>
            <div v-else>-</div>
          </template>
          <template #[`item.newStatus`]="{ item }">
            <div class="d-flex">
              <VChip
                v-for="(status, index) in item.newStatus"
                :key="index"
                :color="getChipColor(status)"
                label
                class="ma-1"
              >
                {{ status }}
              </VChip>
            </div>
          </template>
          <template #item.action="{ item }">
            <VIcon
              color="primary"
              style="cursor: pointer"
              class="ic-center"
              @click="
                navigateTo(`/sh-domestic/submission/reguler/${item.id_reg}`)
              "
            >
              ri-arrow-right-line
            </VIcon>
          </template>
        </VDataTableServer>
      </VCardItem>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.ic-center {
  display: flex;
  place-self: center;
}

.no-padding {
  padding-inline-start: 0 !important;
}
</style>
