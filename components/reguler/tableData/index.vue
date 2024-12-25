<script setup lang="ts">
const props = defineProps({
  onSubmit: {
    type: Function,
    default: () => {},
    required: false,
  },
  onAdd: {
    type: Function,
    default: () => {},
    required: false,
  },
  onDetail: {
    type: Function,
    default: () => {},
    required: false,
  },
  onEdit: {
    type: Function,
    default: () => {},
    required: false,
  },
  onDelete: {
    type: Function,
    default: () => {},
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  data: {
    type: Array,
    required: false,
  },
  withAddButton: {
    type: Boolean,
    required: false,
  },
  withSaveButton: {
    type: Boolean,
    required: false,
  },
  withApproveButton: {
    type: Boolean,
    required: false,
  },
  withAddButtonBahan: {
    type: Boolean,
    required: false,
  },
  reRender: {
    type: Boolean,
    required: false,
  },
  refresh: {
    type: Function,
    default: () => {},
    required: false,
  },
  hideDefaultFooter: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const route = useRoute()

const id = route.params.id

const ingredientItems = ref<Bahan[]>(props?.data?.value || [])
const productItems = ref<any[]>([])
const dialogEdit = ref(false)
const loading = ref(false)
const itemDetail = ref<any>({})

const handleCheck = (item: any) => {
  if (item.checked)
    item.checked = false
  else
    item.checked = true
}

const getListIngredients = async () => {
  props.refresh()
  try {
    const response: any = await $api(
      '/self-declare/business-actor/ingredient/list',
      {
        method: 'get',
        query: {
          id_reg: id,
        },
      },
    )

    if (response.code === 2000)
      ingredientItems.value = response.data

    return response
  }
  catch (error) {
    console.log(error)
  }
}

const getListProducts = async () => {
  try {
    const response: any = await $api(
      '/reguler/pelaku-usaha/tab-bahan/products/list',
      {
        method: 'get',
        query: {
          id_reg: id,
        },
      },
    )

    if (response.code === 2000) {
      productItems.value = response.data || []
    }
    return response
  } catch (error) {
    console.log(error)
  }
}

const handleDownload = async (item: any) => {
  try {
    const response = await $api('/shln/submission/document/download', {
      method: 'post',
      body: {
        filename: item,
      },
    })

    if (response.url)
      window.open(response.url, '_blank', 'noopener,noreferrer')
  }
  catch (error) {
    console.log(error)
  }
}

const handleDownloadV2 = async (filename: string) => {
  try {
    const response = await $api('/shln/submission/document/download', {
      method: 'post',
      body: {
        filename: filename,
      },
    })

    if (response.url)
      window.open(response.url, '_blank', 'noopener,noreferrer')
  }
  catch (error) {
    console.log(error)
  }
}

const editDaftarBahan = async () => {
  const payload = {
    jenis_bahan: itemDetail.value?.jenis_bahan,
    nama_bahan: itemDetail.value?.nama_bahan,
    kelompok: itemDetail.value?.kelompok,
    merek: itemDetail.value?.merek,
    produsen: itemDetail.value?.produsen,
    no_sertifikat: '',
  }

  const response: any = await $api(
    '/reguler/pelaku-usaha/tab-bahan/ingredients/edit-ingredients',
    {
      method: 'put',
      query: { id_reg: id, product_id: itemDetail?.value.id },
      body: payload,
    },
  )

  if (response.code === 2000) {
    formData.value = {
      kode_rincian: '',
      nama_produk: '',
      foto_produk: null,
    }
    useSnackbar().sendSnackbar('Sukses menambah data', 'success')
    getListIngredients()
    dialogEdit.value = false
  }
}

const deleteIngredient = async (productId: string) => {
  const response: any = await $api(
    '/reguler/pelaku-usaha/tab-bahan/ingredients/remove',
    {
      method: 'delete',
      params: { id_reg: id, product_id: productId },
    },
  )

  if (response.code === 2000) {
    getListIngredients()
    useSnackbar().sendSnackbar('Sukses menghapus data', 'success')
  }
}

const handleDelete = (item: any) => {
  if (props.title === 'Daftar Nama Bahan dan Kemasan')
    deleteIngredient(item?.id)
  else
    props.onDelete(item)
}

const detailClicked = (item: any) => {
  if (props?.title === 'Daftar Nama Produk') {
    props.onEdit(item)
  }
  else {
    dialogEdit.value = true
    itemDetail.value = item
  }
}

onMounted(() => {
  if (props?.title === 'Daftar Nama Bahan dan Kemasan')
    getListIngredients()
  else if (props?.title === 'Daftar Nama Produk')
    getListProducts()
})

watch(() => props.reRender, async () => {
  loading.value = true
  await Promise.allSettled([
    getListIngredients(),
    getListProducts(),
  ])
  loading.value = false
})
</script>

<template>
  <VDialog
    v-model="dialogEdit"
    max-width="60svw"
  >
    <VCard>
      <ContentDialogDataBahan
        dialog-type="edit"
        :data="itemDetail"
        :re-render="reRender"
        :toggle="() => dialogEdit = false"
        @loadList="getListIngredients()"
      />
    </VCard>
  </VDialog>
  <VCard
    v-if="!loading"
    class="pa-4"
  >
    <VCardTitle>
      <div class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">{{ props.title }}</span>
        <div class="d-flex justify-space-between gap-4">
          <div v-if="withAddButtonBahan">
            <TambahBahanModal @loadList="getListIngredients()"></TambahBahanModal>
          </div>
          <VBtn
            v-if="withAddButton"
            variant="outlined"
            append-icon="ri-add-line"
            @click="props.onAdd"
          >
            Tambah
          </VBtn>
          <VBtn
            v-if="withSaveButton"
            variant="flat"
            @click="props.onSubmit"
          >
            {{ withApproveButton ? "Saya Setuju" : "Simpan" }}
          </VBtn>
        </div>
      </div>
      <slot name="headerDialog" />
    </VCardTitle>
    <VCardText>
      <br />
      <VRow>
        <VDataTable
          class="border rounded"
          :items-per-page="-1"
          :hide-default-footer="props?.hideDefaultFooter"
          :headers="props.data.label"
          :items="
            props?.title === 'Daftar Nama Bahan dan Kemasan'
              ? ingredientItems
              : props.title === 'Daftar Nama Produk'
                ? productItems : props?.data.value
          "
        >
          <template #item.no="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
          <template #item.addType="{ item }">
            <div>
              {{ item?.FileDok !== '' ? 'Unggah' : 'Manual' }}
            </div>
          </template>
          <template #item.religion>
            <label>Islam</label>
          </template>
          <template #item.productType="{ item }">
            <div>
              {{ item.productType }}
            </div>
          </template>
          <template #item.productName="{ item }">
            <div>
              {{ item.productName }}
            </div>
          </template>
          <template #item.tgl_pembelian="{ item }">
            <div>
              {{ formatDateIntl(new Date(item.tgl_pembelian)) }}
            </div>
          </template>
          <template #item.tanggal_produksi="{ item }">
            <div v-if="item.tanggal_produksi">
              {{ formatDateIntl(new Date(item.tanggal_produksi)) }}
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #item.tanggal_kadaluarsa="{ item }">
            <div v-if="item.tanggal_kadaluarsa">
              {{ formatDateIntl(new Date(item.tanggal_kadaluarsa)) }}
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #item.tanggal="{ item }">
            <div v-if="item.tanggal">
              {{ formatDateIntl(new Date(item.tanggal)) }}
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #item.materialTypeLong="{ item }">
            <div class="mw30">
              {{ item.materialTypeLong }}
            </div>
          </template>
          <template #item.publication="{ item }">
            <!-- <VCheckbox true-value="true" /> -->
            <VCheckbox
              v-model="item.checked"
              @change="() => handleCheck(item)"
            />
          </template>
          <template #item.action="{ item }">
            <DialogDeleteAuditPengajuan
              title="Hapus Bahan"
              button-text="Ya, Hapus"
              :content="props?.title"
              :on-delete="() => props?.onDelete(item)"
            >
              <template #contentDelete>
                <p>Apakah anda yakin menghapus data ini?</p>
              </template>
            </DialogDeleteAuditPengajuan>
          </template>
          <template #item.actionEdit="{ item }">
            <Vbtn variant="plain" class="cursor-pointer" @click="() => props.onEdit(item)">
              <VIcon end icon="ri-pencil-line" color="#652672" />
            </Vbtn>
          </template>
          <template #item.actionPopOver2="{ item }">
            <VMenu>
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  append-icon="ri-more-2-line"
                  variant="plain"
                />
              </template>
              <VList>
                <VListItem class="p0">
                  <VListItemTitle>
                    <Vbtn
                      variant="plain"
                      class="cursor-pointer"
                      @click="() => props.onEdit(item)"
                    >
                      <VRow>
                        <VCol sm="4">
                          <VIcon end icon="ri-pencil-line" />
                        </VCol>
                        <VCol>
                          <label class="cursor-pointer">Ubah </label>
                        </VCol>
                      </VRow>
                    </Vbtn>
                  </VListItemTitle>
                </VListItem>
                <VListItem class="p0">
                  <div class="d-flex -ml10">
                    <DialogDeleteAuditPengajuan
                      title="Hapus Bahan"
                      button-text="Ya, Hapus"
                      :content="props?.title"
                      :on-delete="() => props?.onDelete(item)"
                      with-label-header="true"
                    >
                      <template #contentDelete>
                        <p>Apakah anda yakin menghapus data ini?</p>
                      </template>
                    </DialogDeleteAuditPengajuan>
                  </div>
                </VListItem>
              </VList>
            </VMenu>
          </template>
          <template #item.actionPopOver3="{ item }">
            <VMenu>
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  append-icon="ri-more-2-line"
                  variant="plain"
                />
              </template>
              <VList>
                <VListItem class="p0">
                  <VListItemTitle>
                    <Vbtn
                      variant="plain"
                      class="cursor-pointer"
                      @click="() => props.onDetail(item)"
                    >
                      <VRow>
                        <VCol sm="4">
                          <VIcon end icon="ri-arrow-right-line" />
                        </VCol>
                        <VCol>
                          <label class="cursor-pointer">Detail </label>
                        </VCol>
                      </VRow>
                    </Vbtn>
                  </VListItemTitle>
                </VListItem>
                <VListItem class="p0">
                  <VListItemTitle>
                    <Vbtn
                      variant="plain"
                      class="cursor-pointer"
                      @click="() => detailClicked(item)"
                    >
                      <VRow>
                        <VCol sm="4">
                          <VIcon end icon="ri-pencil-line" />
                        </VCol>
                        <VCol>
                          <label class="cursor-pointer">Ubah </label>
                        </VCol>
                      </VRow>
                    </Vbtn>
                  </VListItemTitle>
                </VListItem>
                <VListItem class="p0 d-flex">
                  <div class="d-flex -ml10">
                    <DialogDeleteAuditPengajuan
                      title="Hapus Bahan"
                      button-text="Ya, Hapus"
                      :content="props?.title"
                      :on-delete="() => handleDelete(item)"
                      with-label-header="true"
                    >
                      <template #contentDelete>
                        <p>Apakah anda yakin menghapus data ini?</p>
                      </template>
                    </DialogDeleteAuditPengajuan>
                  </div>
                </VListItem>
              </VList>
            </VMenu>
          </template>
          <template #item.foto="{ item }">
            <Vbtn
              v-if="item.foto"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
              @click="() => handleDownload(item.foto)"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" />
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>-</label>
            </div>
          </template>
          <template #item.file_dok="{ item }">
            <Vbtn
              v-if="item.file_dok"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
              @click="() => handleDownload(item.file_dok)"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" />
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>-</label>
            </div>
          </template>
          <template #item.file_skph="{ item }">
            <Vbtn
              v-if="item.file_skph"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
              @click="() => handleDownload(item.file_skph)"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" />
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>-</label>
            </div>
          </template>
          <template #item.file_spph="{ item }">
            <Vbtn
              v-if="item.file_spph"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
              @click="() => handleDownload(item.file_spph)"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" />
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>-</label>
            </div>
          </template>
          <template #item.file_ktp="{ item }">
            <Vbtn
              v-if="item.file_ktp"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
              @click="() => handleDownload(item.file_ktp)"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" />
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>-</label>
            </div>
          </template>
          <template #item.file_layout="{ item }">
            <Vbtn
              v-if="item.file_layout"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
              @click="() => handleDownload(item.file_layout)"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" />
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>-</label>
            </div>
          </template>
          <template #item.FileDok="{ item }">
            <Vbtn
              v-if="item.FileDok"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
              @click="() => handleDownload(item.FileDok)"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" />
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>-</label>
            </div>
          </template>
          <template #item.foto2="{ item }">
            <Vbtn
              v-if="item.id_reg"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
              @click="() => handleDownloadV2(item)"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" />
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>Kosong</label>
            </div>
          </template>
          <template #item.foto3="{ item }">
            <Vbtn
              v-if="item.file_dok"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" @click="() => handleDownloadV2(item.file_dok)"/>
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>Kosong</label>
            </div>
          </template>

          <template #item.foto4="{ item }">
            <Vbtn
              v-if="item.ttd_pj"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" @click="() => handleDownloadV2(item.ttd_pj)"/>
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>Kosong</label>
            </div>
          </template>

          <template #item.foto5="{ item }">
            <Vbtn
              v-if="item.ttd_ph"
              class="d-flex gap-3 cursor-pointer"
              style="margin-left: -10px"
            >
              <div>
                <VIcon end icon="ri-file-3-line" color="#652672" @click="() => handleDownloadV2(item.ttd_ph)"/>
              </div>
              <label class="cursor-pointer">file</label>
            </Vbtn>
            <div v-else>
              <label>Kosong</label>
            </div>
          </template>

          <template #item.actionV2="{ item }">
            <v-btn color="primary" variant="plain">
              <VIcon>mdi-dots-vertical</VIcon>
              <VMenu activator="parent" :close-on-content-click="true">
                <VCard>
                  <VBtn
                    variant="text"
                    color=primary
                    prepend-icon="ri-pencil-line"
                    @click="() => props.onEdit(item)"
                    block
                  >
                    Edit
                  </VBtn>
                  <VBtn
                    variant="text"
                    color="error"
                    prepend-icon="ri-delete-bin-6-line"
                    @click="() => props.onDelete(item)"
                    block
                  >
                    Hapus
                  </VBtn>
                </VCard>
              </VMenu>
            </v-btn>
          </template>
        </VDataTable>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.required {
  color: red;
  font-size: 12px;
}
.p0 {
  padding-left: 2px !important;
}
.ml5 {
  margin-left: 5px;
}
.textRed {
  color: #e1442e;
}
.h-20 {
  height: 20px;
}
.mw30 {
  min-width: 20rem !important;
}
.-ml10 {
  margin-left: -10px;
}
</style>
