<script setup lang="ts">
import LPHDetailLayout from "@/layouts/LPHDetailLayout.vue";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  onComplete: {
    type: Function,
    default: () => {},
    required: false,
  },

  onInputBahan: {
    type: Function,
    default: () => {},
    required: false,
  },
});

const route = useRoute();
const { t } = useI18n();
const isViewOnly = (route?.query as any)?.isViewOnly;
const store = useMyTabEditRegulerStore();
const id = route?.params?.id;
const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);
const loading = ref(false);
const dataPengajuan = ref<any>({});
const dataProduk = ref<any>([]);
const lovAuditor = ref<any>([]);
const dataPemeriksaanProduk = ref<any>(null);
const selectedAudiotor = ref<any>(null);
const loadingAuditor = ref(false);
const selectedFile = ref(null);
const selectedAuditResult = ref(null);
const dokumenLama = ref<any>([]);
const isUpdateDataModalOpen = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
const isUpdateDataMappingModalOpen = ref(false);
const isUpdateDataProdukModalOpen = ref(false);
const isUpdateDataPabrikModalOpen = ref(false);
const isUpdateDataOutletModalOpen = ref(false);
const productItems = ref<any>([]);
const bahanSelected = ref([]);
const tabAddBahan = ref("1");
const fileTemplateProduct = ref("");
const listPreview = ref([]);
const visiblePreview = ref(false);
const addDialog = ref(false);
const reRender = ref(false);
const titleDialog = ref("");
const confirmSaveDialog = ref(false);
const dataProductClasification = ref([]);
const loadingRincian = ref(false);
const listRincian = ref([]);
const labelSaveBtn = ref("");
const hideFooterBtn = ref(false);
const totalItems = ref(0);
const page = ref(1);
const isAddFactoryModalOpen = ref(false);
const isAddOutletModalOpen = ref(false);
const isEditFactoryModalOpen = ref(false);
const isEditOutletModalOpen = ref(false);
const isUpdateDataPuModalOpen = ref(false);
const draftCertif = ref("");
const pageProduct = ref(1)
const pageSizeProduct = ref(10)
const totalProduct = ref(0);
const totalPagePageProduct = ref(1);

const listFactory = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    { title: "Nama", key: "nama", nowrap: true },
    { title: "Alamat", key: "alamat", nowrap: true },
    { title: "Status", key: "status_milik", nowrap: true },
    { title: "Action", key: "publication", sortable: false, nowrap: true },
  ],
  value: props?.listFactory || [],
});

const listFactoryNoTaken = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    { title: "Nama", key: "nama", nowrap: true },
    { title: "Alamat", key: "alamat", nowrap: true },
    { title: "Status", key: "status_milik", nowrap: true },
    { title: "Action", key: "actions", sortable: false, nowrap: true },
  ],
  value: props?.listFactoryNoTaken || [],
});

const listOutlet = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    { title: "Nama", key: "nama", nowrap: true },
    { title: "Alamat", key: "alamat", nowrap: true },
    { title: "Action", key: "publication", sortable: false, nowrap: true },
  ],
  value: props?.listOutlet || [],
});

const EditProdukModalOpen = ref(false);

const { refresh } = await useAsyncData("list-product", async () => {
  return store.getProduct(id);
});

const itemDetail = ref<any>({});
const itemDetailFasilitas = ref<any>({});

const tanggalMulai = ref("");
const tanggalSelesai = ref("");

// const openInputBahan = (id) => {
//   (isUpdateDataProdukModalOpen.value = false), (selectedIdProd.value = id);
//   showInputBahan.value = true;
// };

const formData = ref({
  kode_rincian: "",
  nama_produk: "",
  foto_produk: "",
  kode_rincian_desc: "",
});

const formDataPabrik = ref({
  idPabrik: "",
  idReg: "",
  name: "",
  address: "",
  regency: "",
  provinsi: "",
  country: "",
  zipCode: "",
  status: "",
  idFas: "",
  fasilId: "",
});

const formDataPU = ref({
  nama_pu: "",
  nama_pu_sh: "",
  alamat: "",
  kota: "",
  provinsi: "",
  negara: "",
  kodepos: "",
  skala_usaha: "",
});

const toggle = () => {
  addDialog.value = false;
};

const pabrikHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "name" },
  { title: "Alamat", key: "address" },
  { title: "Status", key: "status" },
  { title: "Action", value: "action", sortable: false, nowrap: true },
];

// const toggleAdd = () => {
//   isUpdateDataProdukModalOpen.value = false;
// };

// const toggleAdd = (type: string) => {
//   addDialog.value = true;
//   titleDialog.value = `Tambah ${type}`;
//   labelSaveBtn.value =
//     type === "Data Bahan"
//       ? t("pengajuan-reguler.reguler_form-bahan-produk-popupproduk-produp2")
//       : t("pengajuan-reguler.reguler-form--bahan-add");
// };

watch(tanggalMulai, (newVal) => {
  localStorage.setItem("tanggalMulai", newVal);
});

watch(tanggalSelesai, (newVal) => {
  localStorage.setItem("tanggalSelesai", newVal);
});

const formatDateTime = (date) => {
  return new Date(date).toISOString();
};

const previewProductHeader = ref([
  {
    title: "No",
    key: "no",
  },
  {
    title: "Nama Produk",
    key: "reg_prod_name",
  },
  {
    title: "Action",
    key: "actionProduct",
  },
]);

const auditResults = ref([
  { label: "Lulus", value: "PR001" },
  { label: "Tidak Lulus", value: "PR002" },
]);

const formUploadLaporan = ref<{ filename: string }>({ filename: "" });

const laporanAudit = ref({
  label: [
    { title: "No.", key: "index", nowrap: true },
    { title: "Filename", key: "filename", nowrap: true },
    {
      title: "Action",
      value: "actions",
      sortable: false,
      nowrap: true,
    },
  ],
  value: [],
});

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const uploadedFile = ref<{ name: string; file: File | null }>({
  name: "",
  file: null,
});

const downloadForms = reactive({
  sttd: "",
  sertifikasi_halal: "",
  hasil_audit: "",
}) as Record<string, string>;

const assignAuditorHeader: any[] = [
  { title: "No", key: "index" },
  { title: "Nama", key: "nama" },
  { title: "Tanggal Lahir", key: "tanggal_lahir" },
  { title: "No Reg", key: "no_reg" },
  { title: "Action", key: "actions", align: "center", sortable: false },
];

const assignAuditorData = ref([
  { name: "Idris", birthDate: "02/10/2000", regisNumber: "SK-896376-3028" },
]);

const newAuditorData = {
  name: "Aliando Syakir",
  birthDate: "02/10/2000",
  regisNumber: "SK-896376-3028",
};

const assignedAuditor = ref(null);
const isAssignModalOpen = ref(false);
const isUpdateModalOpen = ref(false);
const isUploadModalOpen = ref(false);

const handleOpenAssignModal = () => {
  isAssignModalOpen.value = !isAssignModalOpen.value;
};

const handleOpenUpdateModal = () => {
  isUpdateModalOpen.value = !isUpdateModalOpen.value;
};

const handleOpenUploadModal = () => {
  isUploadModalOpen.value = !isUploadModalOpen.value;
  selectedFile.value = null;
};

const resetForm = () => {
  formUploadLaporan.value = {
    filename: "",
  };
};

const downloadTemplate = async (file: any) => {
  await downloadDocument(file, "FILES");
};

const uploadedFileProduct = ref({
  name: "",
  file: null,
});

const handleSubmit = () => {
  confirmSaveDialog.value = false;
};

const dataPengajuanRef = ref();

const dataPengajuanEmitted = ref();

const handleDataPengajuanEmitted = (value: any) => {
  dataPengajuanEmitted.value = value;
};

// const productName = ref({
//   label: [
//     { title: "No.", key: "no", nowrap: true },
//     { title: "Nama Produk", key: "nama", nowrap: true },
//     { title: "Foto Produk", key: "foto", nowrap: true },
//     { title: "Jumlah Bahan", key: "qtyBahan", nowrap: true },
//     // { title: 'Jumlah Bahan', key: 'qtyBahan', nowrap: true },
//     {
//       title: "Action",
//       key: "actionV3",
//       value: "actionPopOver4",
//       sortable: false,
//       nowrap: true,
//       popOver: true,
//     },
//   ],
//   value: [],
// });

const productName: any[] = [
  { title: "No", key: "no" },
  { title: "Nama Produk", key: "nama", nowrap: true },
  { title: "Foto", key: "foto", nowrap: true },
  { title: "Jumlah Bahan  ", key: "qty_bahan", nowrap: true },
  { title: "Action", key: "actions", align: "center", nowrap: true },
];

const openMappingPabrik = () => {
  modalContent.value = "mapping_pabrik";
  isUpdateDataMappingModalOpen.value = true;
};

const openEditProduk = () => {
  modalTitle.value = "Tambah Nama Produk";
  isUpdateDataProdukModalOpen.value = true;
  getListProducts();
};

const openEditPabrik = () => {
  modalTitle.value = "Update Pabrik";
  isUpdateDataPabrikModalOpen.value = true;
  getFactoryAndOutlet("FAPAB");
};

const openEditOutlet = () => {
  modalTitle.value = "Update Outlet";
  isUpdateDataOutletModalOpen.value = true;
  getFactoryAndOutlet("FAOUT");
};

// const openModalAddFactory = () => {
//   isAddFactoryModalOpen.value = !isAddFactoryModalOpen.value;
//   getListFacNotTaken("FAPAB");
// };

const HandleEditPabrik = async (fasId) => {
  await getDetailFasilitasPabrik(fasId);
  isEditFactoryModalOpen.value = !isEditFactoryModalOpen.value;
};

const HandleEditOutlet = async (fasId) => {
  await getDetailFasilitasOutlet(fasId);
  isEditOutletModalOpen.value = !isEditOutletModalOpen.value;
};

const openEditProfile = () => {
  getDetailData("pengajuan");
  isUpdateDataPuModalOpen.value = !isUpdateDataPuModalOpen.value;
};

const handleEditProduct = async (productId) => {
  await getDetailProduk(productId, "edit");
  EditProdukModalOpen.value = true;
};

const openModalAddOutlet = () => {
  isAddOutletModalOpen.value = !isAddOutletModalOpen.value;
};

const openModalAddFactory2 = () => {
  isAddFactoryModalOpen.value = !isAddFactoryModalOpen.value;
};

const handleRemoveFile = async (uploadedFile: any) => {
  try {
    if (!uploadedFile.id_hasil_doc) {
      useSnackbar().sendSnackbar("Data tidak valid", "error");

      return;
    }

    const response: any = await $api(
      "/reguler/lph/laporan-audit/remove-laporan",
      {
        method: "DELETE",
        body: { id: uploadedFile.id, id_hasil_doc: uploadedFile.id_hasil_doc },
      }
    );

    if (response?.code === 2000) {
      getListLaporan();
      useSnackbar().sendSnackbar("Sukses menghapus data", "success");
    } else {
      useSnackbar().sendSnackbar("Gagal menghapus data", "error");
    }
  } catch (error) {
    console.error("Error menghapus file:", error);
    useSnackbar().sendSnackbar("Terjadi kesalahan saat menghapus", "error");
  }
};

const handleRemoveFiles = () => {
  uploadedFile.value.name = "";
  uploadedFile.value.file = null;
  formData.value.foto_produk = "";
};

const getTemplateFileProduct = async (productId: string, type: string) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-bahan/products/template-product",
    {
      method: "get",
    }
  );

  if (response.code === 2000) fileTemplateProduct.value = response.data.file;
};

const handleUploadFileProduct = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];

    uploadedFile.value.name = fileData.name;
    uploadedFile.value.file = fileData;
    try {
      loading.value = true;

      const response = await uploadDocumentProduct(fileData);
      if (response.code === 2000) {
        addDialog.value = false;
        uploadedFileProduct.value.file = response.data.file_url;
        listPreview.value = response?.data?.validated_produk;
        visiblePreview.value = true;
        titleDialog.value = "Preview Produk";
        loading.value = false;
      } else {
        useSnackbar().sendSnackbar(
          response.errors?.list_error?.join(),
          "error"
        );
        loading.value = false;
      }
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  }
};

const uploadDocumentProduct = async (file: any) => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    return await $api(
      "/reguler/pelaku-usaha/tab-bahan/products/upload-product",
      {
        method: "post",
        body: formData,
      }
    );
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};

const handleAddAuditor = () => {
  dataPemeriksaanProduk.value?.auditor.push(selectedAudiotor.value);
  assignAuditorData.value.push(newAuditorData);
};

const handleDeleteAuditor = (index: number) => {
  dataPemeriksaanProduk.value.auditor.splice(index, 1);
};

const handleSaveAuditor = async () => {
  if (process.client) {
    localStorage.setItem(
      "lovAuditor",
      JSON.stringify(dataPemeriksaanProduk.value.auditor)
    );
    localStorage.setItem("tanggalMulai", tanggalMulai.value);
    localStorage.setItem("tanggalSelesai", tanggalSelesai.value);
  }
};

const getDraftSertif = async () => {
  try {
    const response: any = await $api("/reguler/lph/draft-certif", {
      method: "get",
      params: { id },
    });

    if (response?.code === 2000) {
      draftCertif.value = response?.data?.file;

      return response?.data;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const bulkInsert = async () => {
  try {
    const body: any[] = [];

    listPreview.value.forEach((el: any) => {
      if (el.Passed) {
        body.push({
          reg_prod_name: el.HalalCertificateRegulerProduk?.reg_prod_name,
        });
      }
    });

    const endpoint =
      body.length > 0
        ? "/reguler/pelaku-usaha/tab-bahan/products/bulkInsert-product"
        : "/reguler/pelaku-usaha/tab-bahan/products/bulkInsert";

    const response: any = await $api(endpoint, {
      method: "put",
      params: { id_reg: id },
      body,
    });

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Sukses menambah data", "success");

      reRender.value = !reRender.value;
      visiblePreview.value = false;
      uploadedFileProduct.value = { name: "", file: null };
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat bulk insert:", error);
    useSnackbar().sendSnackbar("Gagal menambah data", "error");
  }
};

const handleUploadFileFoto = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];

    uploadedFile.value.name = fileData.name;
    uploadedFile.value.file = fileData;
    try {
      const response = await uploadDocument(fileData);
      if (response.code === 2000) {
        formData.value.foto_produk = response.data.file_url;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const uploadDocument = async (file: File) => {
  try {
    const formData = new FormData();

    formData.append("id", String(id));
    formData.append("file", file);
    formData.append("type", "produk");

    const response = await $api("/shln/submission/document/upload", {
      method: "POST",
      body: formData,
    });

    if (response.code === 2000) {
      return response.data.file_url;
    } else {
      useSnackbar().sendSnackbar("Gagal mengunggah file!", "error");
      throw new Error("File upload failed");
    }
  } catch (error) {
    useSnackbar().sendSnackbar(
      "Ada kesalahan saat mengunggah file, gagal menyimpan!",
      "error"
    );
    console.error("Upload Error:", error);
    throw error;
  }
};

const handleUploadFile = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const fileData = target.files[0];

  // 🔹 Validasi format & ukuran file
  if (fileData.type !== "application/pdf") {
    useSnackbar().sendSnackbar("File harus dalam format PDF!", "error");

    return;
  }
  if (fileData.size > MAX_FILE_SIZE) {
    useSnackbar().sendSnackbar("Ukuran file maksimal 20MB!", "error");

    return;
  }

  uploadedFile.value = { name: fileData.name, file: fileData };

  try {
    const fileUrl = await uploadDocument(fileData);

    formUploadLaporan.value.filename = fileUrl;
    useSnackbar().sendSnackbar("File berhasil diunggah!", "success");
  } catch (error) {
    console.error("Upload Error:", error);
  }
};

const handleSaveFileUpload = async () => {
  if (!formUploadLaporan.value.filename) {
    useSnackbar().sendSnackbar(
      "Harap unggah file sebelum menyimpan!",
      "warning"
    );

    return;
  }

  if (!id) {
    useSnackbar().sendSnackbar("ID tidak valid!", "error");
    console.error("Error: ID is undefined or null");

    return;
  }

  if (!selectedAuditResult.value) {
    useSnackbar().sendSnackbar("Harap pilih hasil audit!", "warning");

    return;
  }

  try {
    const fileResponse = await $api(
      "/reguler/lph/laporan-audit/upload-laporan-audit",
      {
        method: "POST",
        query: { id },
        body: JSON.stringify(formUploadLaporan.value),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (fileResponse.code !== 2000) {
      useSnackbar().sendSnackbar("Gagal menyimpan laporan audit!", "error");
      console.error("API Error:", fileResponse);

      return;
    }

    const auditResponse = await $api(
      "/reguler/lph/laporan-audit/save-audit-result",
      {
        method: "POST",
        query: { id },
        body: { hasil_audit: selectedAuditResult.value },
      }
    );

    if (auditResponse.code === 2000) {
      resetForm();
      useSnackbar().sendSnackbar(
        "Sukses menyimpan laporan audit dan hasil audit!",
        "success"
      );
    } else {
      useSnackbar().sendSnackbar("Gagal menyimpan hasil audit!", "error");
      console.error("API Error:", auditResponse);
    }

    getListLaporan();
  } catch (error) {
    useSnackbar().sendSnackbar("Terjadi kesalahan saat menyimpan!", "error");
    console.error("Request Error:", error);
  }
};

const handleInputBahan = async (selected, idProduk) => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/product/add-ingredient",
      {
        method: "post",
        body: selected,
        query: {
          id_reg: id,
          product_id: idProduk,
        },
      } as any
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      getListProducts();
      await refresh();
    }

    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    console.log(error);
  } finally {
    store.isAllBahanSelected();
  }
};

// const handleAddIngredient = async (payload: any, idProduct: string) => {
//   try {
//     const response: any = await $api(
//       `/self-declare/business-actor/product/add-ingredient`,
//       {
//         method: "post",
//         body: payload,
//         query: {
//           id_reg: id,
//           product_id: idProduct,
//         },
//       } as any
//     );

//     if (response.code === 2000) {
//       useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
//       handleDetailProduct(id);
//       await refresh();
//     }
//     return response;
//   } catch (error) {
//     useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
//     console.log(error);
//   } finally {
//     store.isAllBahanSelected();
//   }
// };

const handleUpdateStatus = async () => {
  if (!process.client) return;

  const auditorToAdd = localStorage.getItem("lovAuditor");
  const dataArray = JSON.parse(auditorToAdd) || [];

  const startDate = formatDateTime(localStorage.getItem("tanggalMulai"));
  const endDate = formatDateTime(localStorage.getItem("tanggalSelesai"));

  if (!startDate || !endDate) {
    return useSnackbar().sendSnackbar(
      "Tanggal mulai dan selesai harus diisi!",
      "error"
    );
  }
  if (dataArray.length === 0) {
    return useSnackbar().sendSnackbar(
      "Harap isi auditor terlebih dahulu",
      "error"
    );
  }

  const ids = dataArray.map((item) => item.id_auditor || null);

  try {
    const responseAuditor = await $api("/reguler/auditor/assign", {
      method: "post",
      query: { id },
      body: { id_auditor: ids },
    });

    if (responseAuditor.code !== 2000)
      return useSnackbar().sendSnackbar("Gagal menyimpan auditor", "error");

    useSnackbar().sendSnackbar("Berhasil menambah auditor", "success");

    const responseTanggal = await $api("/reguler/auditor/assign-dates", {
      method: "post",
      query: { id },
      body: {
        jadwal_awal: startDate,
        jadwal_akhir: endDate,
      },
    });

    if (responseTanggal.code === 2000) {
      useSnackbar().sendSnackbar(
        "Berhasil menyimpan tanggal pemeriksaan",
        "success"
      );
    } else {
      return useSnackbar().sendSnackbar("Gagal menyimpan tanggal", "error");
    }

    const response = await $api("/reguler/lph/post-audit/kirim", {
      method: "put",
      body: {
        id_reg: id,
        keterangan: "update",
      },
    });

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar("Sukses kirim data", "success");

      return response?.data;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    console.error("Error saat menyimpan data:", error);
    useSnackbar().sendSnackbar(
      "Terjadi kesalahan saat menyimpan data",
      "error"
    );
  }
};

const loadItemProductClasifications = async () => {
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/clasification/${id}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      dataProductClasification.value = response.data || [];

      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const deleteProduct = async (productId: string) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-bahan/products/remove",
    {
      method: "delete",
      params: { id_reg: id, product_id: productId },
    }
  );

  if (response.code === 2000) {
    getListProducts(), (reRender.value = !reRender.value);
    useSnackbar().sendSnackbar("Sukses menghapus data", "success");
  } else {
    useSnackbar().sendSnackbar("Bahan tidak dapat dihapus", "error");
  }
};

// const deletePabrik = async (pabrikId: string) => {
//   const response: any = await $api(
//     "/reguler/pelaku-usaha/delete-factory",
//     {
//       method: "DELETE",
//       body: { id: pabrikId }
//     }
//   );

//   if (response.code === 2000) {
//     await getFactoryAndOutlet('FAPAB');
//     reRender.value = !reRender.value;
//     useSnackbar().sendSnackbar("Sukses menghapus data", "success");
//   } else {
//     useSnackbar().sendSnackbar("Data tidak dapat dihapus", "error");
//   }
// };

const loadItemProductRincian = async (kode_rincian: string) => {
  loadingRincian.value = true;
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/rincian/${kode_rincian}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      listRincian.value = response.data || [];
      loadingRincian.value = false;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingRincian.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan aaa", "error");
    loadingRincian.value = false;
  }
};

const addProduct = async () => {
  if (titleDialog.value === "Tambah Nama Produk") {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-bahan/products/create",
      {
        method: "post",
        params: { id_reg: id },
        body: {
          kode_rincian: formData.value.kode_rincian,
          nama_produk: formData.value.nama_produk,
          foto_produk: formData.value.foto_produk || uploadedFile.value.name,
        },
      }
    );

    if (response.code === 2000) {
      formData.value = {
        kode_rincian: "",
        nama_produk: "",
        foto_produk: uploadedFile.value.file || uploadedFile.value.name || null,
      };
      uploadedFile.value = {
        name: "",
        file: "",
      };
      getListProducts(), (addDialog.value = false);
      reRender.value = !reRender.value;
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  }
};

// const addPabrik = async (item) => {

//   const body = {
//     id_reg: id,
//     id_pabrik: [item.id],
//   };

//   const response: any = await $api("/reguler/pelaku-usaha/add-factory", {
//     method: "post",
//     body,
//   });

//   if (response.code === 2000) {
//     isAddFactoryModalOpen.value = false;
//     addDialog.value = false;
//     reRender.value = !reRender.value;
//     useSnackbar().sendSnackbar("Sukses menambah data", "success");
//   } else {
//     console.error("Gagal menambah data:", response);
//     useSnackbar().sendSnackbar("Gagal menambah data", "error");
//   }
// };

const updateProduct = async () => {
  try {
    const response = await $api(
      "/reguler/pelaku-usaha/tab-bahan/products/update",
      {
        method: "PUT",
        params: { id_reg: id, product_id: itemDetail.value.id },
        body: {
          kode_rincian: formData.value.kode_rincian,
          nama_produk: formData.value.nama_produk,
          foto_produk: formData.value.foto_produk || uploadedFile.value.name,
        },
      }
    );

    if (response.code === 2000) {
      await getListProducts();

      formData.value = {
        kode_rincian: "",
        nama_produk: "",
        foto_produk: null,
        merek: "",
      };

      uploadedFile.value = {
        name: "",
        file: "",
      };

      addDialog.value = false; // Tutup modal
      reRender.value = !reRender.value; // Paksa re-render UI jika diperlukan

      useSnackbar().sendSnackbar("Sukses memperbarui data", "success");
    } else {
      useSnackbar().sendSnackbar("Gagal memperbarui data", "error");
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui produk:", error);
    useSnackbar().sendSnackbar(
      "Terjadi kesalahan saat memperbarui produk",
      "error"
    );
  }
};

const updateDataPU = async () => {
  try {
    const response = await $api("/reguler/lph/update-pu", {
      method: "PUT",
      params: { id_reg: id },
      body: {
        nama_pu_sh: formDataPU.value.nama_pu_sh,
        alamat: formDataPU.value.alamat,
        kota: formDataPU.value.kota,
        provinsi: formDataPU.value.provinsi,
        negara: formDataPU.value.negara,
        kodepos: formDataPU.value.kodepos,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.code === 2000) {
      // formDataPU.value = {
      //   nama_pu: "",
      //   nama_pu_sh: "",
      //   alamat: "",
      //   kota: "",
      //   provinsi: "",
      //   negara: "",
      //   kodepos: "",
      //   skala_usaha: "",
      // };

      addDialog.value = false;
      reRender.value = !reRender.value;

      useSnackbar().sendSnackbar("Sukses memperbarui data", "success");
    } else {
      console.error("Gagal memperbarui data:", response);
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat memperbarui data:", error);
  }
};

const getDetailProduk = async (productId, type) => {
  const response = await $api(
    "/reguler/pelaku-usaha/tab-bahan/products/detail",
    {
      method: "get",
      params: { id_reg: id, product_id: productId },
    }
  );

  if (response.code === 2000) {
    itemDetail.value = response.data || {};

    formData.value = {
      kode_rincian_desc: response.data.koderincian_desc,
      kode_rincian: response.data.koderincian,
      nama_produk: response.data.nama,
    };

    uploadedFile.value = {
      name: response.data.foto_produk,
      file: response.data.foto_produk,
    };
  }
};

const getDetailFasilitasPabrik = async (fasId) => {
  const response = await $api(
    "/reguler/lph/update-fasilitas/detail-fasilitas-pabrik",
    {
      method: "get",
      params: { id_reg: id, id_pabrik: fasId },
    }
  );

  if (response.code === 2000) {
    itemDetailFasilitas.value = response.data || {};

    formDataPabrik.value = {
      name: response.data.nama,
      address: response.data.alamat,
      country: response.data.negara,
      provinsi: response.data.provinsi,
      regency: response.data.kab_kota,
      zipCode: response.data.kode_pos,
      status: response.data.status_milik,
      fasilId: response.data.fasil_id,
      idReg: response.data.id_reg,
      idPabrik: response.data.id_pabrik,
      idFas: response.data.id_fas,
    };
  }
};

const getDetailFasilitasOutlet = async (fasId) => {
  const response = await $api(
    "/reguler/lph/update-fasilitas/detail-fasilitas-outlet",
    {
      method: "get",
      params: { id_reg: id, id_pabrik: fasId },
    }
  );

  if (response.code === 2000) {
    itemDetailFasilitas.value = response.data || {};

    formDataPabrik.value = {
      name: response.data.nama,
      address: response.data.alamat,
      country: response.data.negara,
      provinsi: response.data.provinsi,
      regency: response.data.kab_kota,
      zipCode: response.data.kode_pos,
      status: response.data.status_milik,
      fasilId: response.data.fasil_id,
      idReg: response.data.id_reg,
      idPabrik: response.data.id_pabrik,
      idFas: response.data.id_fas,
    };
  }
};


const getDetailData = async (type: string) => {
  try {
    if (type === 'produk') {
        const response: any = await $api("/reguler/lph/detail-payment", {
          method: "get",
          params: {
            url: `${LIST_INFORMASI_PEMBAYARAN}/${id}/${type}`,
            page: pageProduct.value,
            size: pageSizeProduct.value
          },
        });
        if (response.code === 2000) {
          totalProduct.value = response?.totalItems;
          totalPagePageProduct.value = response?.totalPages;
          return response.data;
        } else {
          const snackbar = useSnackbar();
  
          snackbar.sendSnackbar("Ada Kesalahan", "error");
        }
    } else {
      const response: any = await $api("/reguler/lph/detail-payment", {
        method: "get",
        params: { url: `${LIST_INFORMASI_PEMBAYARAN}/${id}/${type}` },
      });
  
      if (response.code === 2000) {
        const data = response?.data;
  
        if (type === "pengajuan") {
          formDataPU.value = data;
        }
        if (type === "pemeriksaanproduk") {
          const noDaftar = data?.no_pendaftaran?.no_daftar;
          if (noDaftar) await OldDoc(noDaftar);
          else console.error("noDaftar tidak ditemukan dalam response API");
        }
  
        return data;
      } else {
        const snackbar = useSnackbar();
  
        snackbar.sendSnackbar("Ada Kesalahan", "error");
      }
    }
  } catch (error) {
    const snackbar = useSnackbar();

    snackbar.sendSnackbar(`Ada Kesalahan: ${error.message || error}`, "error");
  }
};

const getListProducts = async () => {
  try {
    const response = await $api(
      "/reguler/pelaku-usaha/tab-bahan/products/list",
      {
        method: "get",
        query: {
          id_reg: id,
        },
      }
    );

    if (response.code === 2000) {
      if (Array.isArray(response.data) && response.data.length > 0) {
        response.data.map((item) => {
          item.qtyBahan =
            item.bahan_selected !== null ? item.bahan_selected.length : 0;
        });
      }

      productItems.value = response.data || [];
      totalItems.value = productItems.value.length; // 🔥 Hitung total item
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const OldDoc = async (noDaftar: string) => {
  const url = `https://prod-api.halal.go.id/v1/referensi/dokumen_reguler?no_daftar=${noDaftar}`;

  // console.log("berhasil");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    dokumenLama.value = data.data;

    return data;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);

    return null;
  }
};

const getFactoryAndOutlet = async (type: string) => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/list-fac-out", {
      method: "get",
      params: { id_reg: id, type },
    });

    if (response?.code === 2000) {
      if (type === "FAPAB") {
        if (response.data.length > 0) {
          response.data.forEach((el: any) => (el.checked = false));
          listFactory.value.value = response.data;
        }
      } else {
        response.data.forEach((el: any) => (el.checked = false));
        listOutlet.value.value = response?.data;
      }

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getListFacNotTaken = async (type: string) => {
  try {
    const response: any = await $api(
      "/reguler/pelaku-usaha/list-fasilitas-not-taken",
      {
        method: "get",
        params: { id_reg: id, type },
      }
    );

    if (response?.code === 2000) {
      if (type === "FAPAB") {
        if (response.data.length > 0) {
          response.data.forEach((el: any) => (el.checked = false));
          listFactoryNoTaken.value.value = response.data;
        }
      } else {
        response.data.forEach((el: any) => (el.checked = false));

        // listOutlet.value = response?.data;
      }

      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleDownloadForm = async (fileName: string, param: string) => {
  return await downloadDocument(fileName, param);
};

const handleDownloadFormDokumenLama = async (fileName: string) => {
  window.open(fileName, "_blank");
};

const getListAuditor = async (type?: string) => {
  try {
    const response: any = await $api("/reguler/list", {
      method: "get",
      params: {
        url: `api/v1/halal-certificate-reguler/lph/pemeriksaan/${id}/auditor`,
      },
    });

    if (response?.code === 2000) {
      lovAuditor.value = response.data;

      return response?.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getListLaporan = async () => {
  laporanAudit.value = {
    ...laporanAudit.value,
    value: [],
  };

  const response: any = await $api(
    "/reguler/lph/laporan-audit/list-laporan-audit",
    {
      method: "get",
      query: { id },
    }
  );

  if (response.code === 2000) {
    laporanAudit.value = {
      ...laporanAudit.value,
      value: response.data,
    };
    if (response.data.length > 0) {
      downloadForms.hasil_audit = response.data[0].filename;
      uploadedFile.value.file = response.data[0].filename;
    }
  }

  return response || [];
};

// const getDownloadForm = async (docName: string, propName: string) => {
//   const result: any = await $api(`/self-declare/submission/${id}/file`, {
//     method: "get",
//     query: {
//       document: docName,
//     },
//   });

//   if (result?.code === 2000) downloadForms[propName] = result?.data?.file || "";
// };

const handleInputAuditor = async (val: any) => {
  try {
    const response: any = await $api("/reguler/list", {
      method: "get",
      params: {
        url: `api/v1/halal-certificate-reguler/lph/pemeriksaan/${id}/auditor`,
        keyword: val,
      },
    });

    if (response?.code === 2000) {
      lovAuditor.value = response.data;

      return response?.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const fetchHasilAudit = async () => {
  try {
    const response = await $api("/reguler/lph/laporan-audit/get-hasil-audit", {
      method: "get",
      query: { id },
    });

    if (response.code == 2000) {
      if (response.data.length > 0)
        selectedAuditResult.value = response.data[0].hasil_audit;
    }
  } catch (error) {
    console.error("Gagal mengambil hasil audit:", error);
  }
};

onMounted(async () => {
  loading.value = true;

  if (process.client) {
    tanggalMulai.value = localStorage.getItem("tanggalMulai") || "";
    tanggalSelesai.value = localStorage.getItem("tanggalSelesai") || "";
  }

  const responseData = await Promise.allSettled([
    getDetailData("pengajuan"),
    getDetailData("produk"),
    getDetailData("pemeriksaanproduk"),
    getListAuditor(),
    fetchHasilAudit(),
    getListLaporan(),
    getTemplateFileProduct(),
    loadItemProductClasifications(),
    getDraftSertif(),

    // getDownloadForm("file_laporan", "file_laporan"),
    // getDownloadForm("file_kh", "file_kh"),
  ]);

  dataPengajuan.value = responseData?.[0]?.value || {};
  dataProduk.value = responseData?.[1]?.value || [];
  
  dataPemeriksaanProduk.value = responseData?.[2]?.value || {};
  localStorage.setItem(
    "lovAuditor",
    JSON.stringify(responseData?.[2]?.value.auditor)
  );
  loading.value = false;
});

const handlePageChange = async (payload: any) => {
  pageProduct.value = payload?.page;
  pageSizeProduct.value = payload?.itemsPerPage;
  const response = await getDetailData("produk")
  if (response)
    dataProduk.value = response;
}
</script>

<template>
  <div v-if="!loading">
    <DialogSaveDataPengajuan
      title="Simpan Perubahan"
      :is-open="confirmSaveDialog"
      :toggle="() => (confirmSaveDialog = false)"
      :on-save="() => handleSubmit()"
    />
    <DialogPreviewBahan
      :title="titleDialog"
      :is-open="visiblePreview"
      :toggle="() => (visiblePreview = false)"
      :label-save-btn="`Unggah (${
        titleDialog === 'Preview Bahan'
          ? `${listPreview.filter((a: any) => a.Passed).length} Bahan`
          : `${listPreview.filter((a: any) => a.Passed).length} Produk`
      })`"
      label-back-btn="Batal"
      :on-save="bulkInsert"
      hide-footer
    >
      <template #content>
        <div v-if="titleDialog === 'Preview Produk'">
          <PreviewBahanTable
            :preview-header="previewProductHeader"
            :list-preview="listPreview"
          />
        </div>
        <!--
          <div v-else>
          <PreviewBahanTable
          :previewHeader="previewHeader"
          :listPreview="listPreview"
          />
          </div>
        -->
      </template>
    </DialogPreviewBahan>
    <DialogWithAction
      :title="titleDialog"
      :is-open="addDialog"
      :toggle="toggle"
      :label-save-btn="labelSaveBtn"
      :label-back-btn="
        t('pengajuan-reguler.reguler_form-bahan-produk-popupbahan-cancel')
      "
      :on-save="addProduct"
      :hide-footer="hideFooterBtn"
    />
    <LPHDetailLayout>
      <template #page-title>
        <VRow no-gutters>
          <VCol>
            <h1>Detail Pemeriksaan</h1>
          </VCol>
          <VCol cols="auto" class="d-flex align-center">
            <VBtn
              variant="outlined"
              class="me-2"
              @click="previewDocument(draftCertif, 'FILES')"
            >
              Lihat Draft Sertif
            </VBtn>
            <VMenu open-on-hover>
              <template #activator="{ props }">
                <VBtn v-bind="props" variant="outlined" class="me-2">
                  Update Data
                </VBtn>
              </template>
              <VList>
                <VListItem @click="openMappingPabrik">
                  <VListItemTitle>Mapping Pabrik</VListItemTitle>
                </VListItem>
                <VListItem @click="openEditProduk">
                  <VListItemTitle>Edit Produk</VListItemTitle>
                </VListItem>
                <VListItem @click="openEditPabrik">
                  <VListItemTitle>Update Pabrik</VListItemTitle>
                </VListItem>
                <VListItem @click="openEditOutlet">
                  <VListItemTitle>Update Outlet</VListItemTitle>
                </VListItem>
                <VListItem @click="openEditProfile">
                  <VListItemTitle>Edit Data Pengajuan</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>

            <VBtn
              text="Assign Auditor"
              variant="outlined"
              class="me-2"
              @click="handleOpenAssignModal"
            />
            <VBtn
              text="Update Laporan"
              variant="outlined"
              class="me-2"
              @click="handleOpenUploadModal"
            />
            <VBtn text="Update Status" @click="handleOpenUpdateModal" />
          </VCol>
        </VRow>
      </template>
      <template #left-content>
        <VExpansionPanels
          v-model="openedLeftPanels"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
          multiple
        >
          <VExpansionPanel :value="0" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Daftar Pengajuan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelDaftarPengajuan
                type="READ"
                :data-pengajuan="dataPengajuan"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Pengajuan Sertifikasi
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelPengajuanSertifikasi :data-pengajuan="dataPengajuan" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelDaftarProduk :data="dataProduk" :page="pageProduct" :per-page="pageSizeProduct" :total="totalProduct" :handlePageChange="handlePageChange" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="3" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Jadwal Audit
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelJadwalAudit :data="dataPemeriksaanProduk?.jadwal_audit" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="4" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Auditor
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelAuditorTable :data="dataPemeriksaanProduk?.auditor" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="5" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Hasil Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelHasilPemeriksaan
                type="EDIT"
                :data="dataPemeriksaanProduk?.hasil_pemeriksaan"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </template>
      <template #right-content>
        <VExpansionPanels
          v-model="openedRightPanels"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
          multiple
        >
          <VExpansionPanel :value="0" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Dokumen Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow align="center">
                <VCol cols="5" class="text-h6"> Hasil Audit </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <!--
                    <VBtn rounded="xl" density="compact" class="px-2">
                    <template #default>
                    <VIcon icon="fa-download" />
                    </template>
                    </VBtn>
                  -->
                  <VBtn
                    :color="downloadForms.hasil_audit ? 'primary' : '#A09BA1'"
                    density="compact"
                    class="px-2"
                    @click="
                      downloadForms.hasil_audit
                        ? handleDownloadForm(downloadForms.hasil_audit, 'FILES')
                        : null
                    "
                  >
                    <template #default>
                      <VIcon icon="fa-download" />
                    </template>
                  </VBtn>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              No. Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelNoPendaftaran
                :data="dataPemeriksaanProduk?.no_pendaftaran"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow>
                <VCol>
                  {{ formatToIDR(dataPemeriksaanProduk?.total_biaya) }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <VExpansionPanels>
          <VExpansionPanel
            v-if="dokumenLama.length > 0"
            :value="2"
            class="pt-3 mt-10"
          >
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Dokumen Lama
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow
                v-for="(item, idx) in dokumenLama"
                :key="idx"
                align="center"
              >
                <VCol cols="5" class="text-h6">
                  {{ item.ref_desc }}
                </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <VBtn
                    :color="item?.file_dok ? 'primary' : '#A09BA1'"
                    density="compact"
                    class="px-2"
                    @click="
                      item?.file_dok
                        ? handleDownloadFormDokumenLama(item.file_download)
                        : null
                    "
                  >
                    <template #default>
                      <VIcon icon="fa-download" />
                    </template>
                  </VBtn>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <div class="mt-10">
          <PanelTracking :data="dataPemeriksaanProduk?.tracking" />
        </div>
      </template>
    </LPHDetailLayout>

    <VDialog v-model="isUploadModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Upload Laporan Audit</div>
          <VIcon @click="handleOpenUploadModal"> fa-times </VIcon>
        </VCardTitle>

        <VCardText>
          <!-- Form Upload File -->
          <VRow class="mb-4 align-center">
            <VCol cols="3">
              <div class="text-body-1 font-weight-medium">Upload File</div>
            </VCol>
            <VCol cols="9">
              <VTextField
                v-if="uploadedFile.file"
                :model-value="uploadedFile.name"
                density="compact"
                placeholder="No file chosen"
                rounded="xl"
                class="mb-2"
              >
                <template #append-inner>
                  <VIcon
                    icon="fa-trash"
                    color="error"
                    class="cursor-pointer"
                    @click="handleRemoveFile(uploadedFile)"
                  />
                </template>
              </VTextField>

              <VFileInput
                v-else
                class="custom-file-input"
                density="compact"
                rounded="xl"
                label="Pilih File"
                accept="application/pdf"
                @change="handleUploadFile"
              >
                <template #append-inner>
                  <VBtn rounded="s-0 e-xl" text="Choose" />
                </template>
              </VFileInput>
              <div class="text-caption text-grey-darken-1 mt-1">
                * Hanya file PDF dengan ukuran maksimal 20MB
              </div>
            </VCol>
          </VRow>

          <!-- Form Pilih Hasil Audit -->
          <VRow class="mb-4 align-center">
            <VCol cols="3">
              <div class="text-body-1 font-weight-medium">
                Pilih Hasil Audit
              </div>
            </VCol>
            <VCol cols="9">
              <VSelect
                v-model="selectedAuditResult"
                :items="auditResults"
                item-title="label"
                item-value="value"
                density="compact"
                rounded="xl"
                label="Pilih Hasil Audit"
              />
            </VCol>
          </VRow>

          <VDivider class="my-4" />

          <!-- Tabel Data Laporan Audit -->
          <div class="text-h5 font-weight-bold mb-3">Data Laporan Audit</div>
          <VDataTable
            disable-sort
            :headers="laporanAudit.label"
            :items="laporanAudit.value"
            hide-default-footer
          >
            <template #item.index="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.actions="{ item }">
              <VIcon
                icon="mdi-delete"
                color="error"
                class="cursor-pointer"
                @click="() => handleRemoveFile(item)"
              />
            </template>
          </VDataTable>
        </VCardText>

        <VCardActions class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenUploadModal"
          >
            Batal
          </VBtn>
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="handleSaveFileUpload"
          >
            Simpan
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="isUpdateDataModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle>{{ modalTitle }}</VCardTitle>
        <VCardText>
          {{ modalContent }}
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="isUpdateDataModalOpen = false">
            Tutup
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="isAssignModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Update Auditor</div>
          <VIcon @click="handleOpenAssignModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow class="mb-1">
            <VCol>
              <div class="text-h6 mb-1">Auditor</div>
              <VAutocomplete
                v-model="selectedAudiotor"
                :items="lovAuditor"
                item-title="nama"
                item-value="id_auditor"
                density="compact"
                placeholder="Cari auditor"
                :loading="loadingAuditor"
                return-object
                class="mb-5"
                @input="handleInputAuditor"
                @update:model-value="(v) => (assignedAuditor = v)"
              >
                <template #item="{ props, item }">
                  <VListItem v-bind="props" :title="(item.raw as any).nama" />
                </template>
              </VAutocomplete>
              <div class="d-flex justify-end">
                <VBtn
                  :disabled="!assignedAuditor"
                  text="Tambah"
                  @click="handleAddAuditor"
                />
              </div>
            </VCol>
          </VRow>
          <VRow class="mb-5">
            <VCol>
              <VDataTable
                disable-sort
                class="auditor-table"
                :headers="assignAuditorHeader"
                :items="dataPemeriksaanProduk?.auditor"
                hide-default-footer
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.tanggal_lahir="{ item }">
                  {{ formatDateId(item.tanggal_lahir) }}
                </template>
                <template #item.actions>
                  <VIcon
                    icon="mdi-delete"
                    color="error"
                    @click="() => handleDeleteAuditor(index)"
                  />
                </template>
              </VDataTable>
            </VCol>
          </VRow>
          <VRow class="mb-5">
            <VCol>
              <div class="text-h6 mb-1">Tanggal Mulai</div>
              <VTextField
                v-model="tanggalMulai"
                type="date"
                density="compact"
                placeholder="Pilih tanggal mulai"
              />
            </VCol>
            <VCol>
              <div class="text-h6 mb-1">Tanggal Selesai</div>
              <VTextField
                v-model="tanggalSelesai"
                type="date"
                density="compact"
                placeholder="Pilih tanggal selesai"
              />
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenAssignModal"
          >
            Batal
          </VBtn>
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleSaveAuditor(), handleOpenAssignModal()]"
          >
            Simpan
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog
      v-model="isUpdateDataMappingModalOpen"
      max-width="840px"
      persistent
    >
      <VCard>
        <VCardTitle class="d-flex justify-space-between align-center" />
        <ProdukRegulerEdit
          v-if="modalContent === 'mapping_pabrik'"
          :isviewonly="isViewOnly"
        />
        <p v-else>
          {{ modalContent }}
        </p>
        <VCardActions>
          <VSpacer />
          <VBtn color="primary" @click="isUpdateDataMappingModalOpen = false">
            Tutup
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="isUpdateModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Update Status</div>
          <VIcon @click="handleOpenUpdateModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              Pastikan sudah memilih auditor untuk pengajuan ini dan sudah meng
              upload laporan audit.
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenUpdateModal"
          >
            Batal
          </VBtn>
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleUpdateStatus(), handleOpenUpdateModal()]"
          >
            Kirim
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>

  <VDialog v-model="isUpdateDataProdukModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <div>
        <div class="d-flex justify-center">
          <VTabs
            v-model="tabAddBahan"
            align-tabs="center"
            bg-color="#f0dcf5"
            class="border pa-2"
            style="border-radius: 40px"
            height="auto"
          >
            <VTab
              value="1"
              base-color="#f0dcf5"
              active-color="primary"
              style="border-radius: 40px"
              hide-slider
              color="primary"
              variant="flat"
              height="40px"
            >
              <span>Unggah File </span>
            </VTab>
            <VTab
              value="2"
              active-color="primary"
              base-color="#f0dcf5"
              style="border-radius: 40px"
              hide-slider
              variant="flat"
              height="40px"
            >
              <span> Tambah Manual </span>
            </VTab>
          </VTabs>
        </div>

        <div class="mt-5">
          <div v-show="tabAddBahan === '1'">
            <VRow no-gutters class="mb-4">
              <VCol cols="6" class="d-flex align-center">
                <span> Unduh template acuan "unggah produk" </span>
              </VCol>
              <VCol cols="6">
                <VBtn
                  append-icon="mdi-download"
                  @click="() => downloadTemplate(fileTemplateProduct)"
                >
                  Unduh
                </VBtn>
              </VCol>
            </VRow>
            <VRow no-gutters>
              <VCol cols="6" class="d-flex align-center">
                <span> Unggah Produk </span>
              </VCol>
              <VCol cols="6">
                <VTextField
                  v-if="uploadedFileProduct.file"
                  :model-value="uploadedFileProduct.name"
                  density="compact"
                  placeholder="No file choosen"
                  rounded="xl"
                  max-width="400"
                >
                  <template #append-inner>
                    <VIcon
                      icon="fa-trash"
                      color="error"
                      class="cursor-pointer"
                      @click="handleRemoveFiles"
                    />
                  </template>
                </VTextField>
                <VFileInput
                  v-else
                  :model-value="uploadedFileProduct.file"
                  class="custom-file-input mt-5"
                  density="compact"
                  rounded="xl"
                  label="No file choosen"
                  max-width="400"
                  prepend-icon=""
                  @change="handleUploadFileProduct"
                >
                  <template #append-inner>
                    <VBtn rounded="e-xl" text="Choose" />
                  </template>
                </VFileInput>
              </VCol>
            </VRow>
          </div>

          <div class="mt-10">
            <div v-show="tabAddBahan === '2'">
              <label>Klasifikasi Produk</label>
              <VSelect
                outlined
                placeholder="pilih klasifikasi produk"
                density="compact"
                :loading="loadingRincian"
                item-title="name"
                item-value="code"
                :items="dataProductClasification"
                @update:model-value="loadItemProductRincian"
              />
              <br />
              <label>Rincian Produk</label>
              <VSelect
                v-model="formData.kode_rincian_desc"
                outlined
                placeholder="pilih rincian produk"
                density="compact"
                :loading="loadingRincian"
                item-title="name"
                item-value="code"
                :items="listRincian"
              />
              <br />
              <label>Nama Produk</label>
              <VTextField
                v-model="formData.nama_produk"
                class="-mt-10"
                density="compact"
                placeholder="Isi Nama Produk"
              />
              <div class="d-flex justify-space-between mt-5">
                <label> Upload Foto </label>
                <VCol cols="6">
                  <VTextField
                    v-if="uploadedFile.file"
                    :model-value="uploadedFile.name"
                    density="compact"
                    placeholder="No file choosen"
                    rounded="xl"
                    max-width="400"
                  >
                    <template #append-inner>
                      <VIcon
                        icon="fa-trash"
                        color="error"
                        class="cursor-pointer"
                        @click="handleRemoveFiles"
                      />
                    </template>
                  </VTextField>
                  <VFileInput
                    v-else
                    :model-value="uploadedFile.file"
                    class="custom-file-input"
                    density="compact"
                    rounded="xl"
                    label="No file choosen"
                    max-width="400"
                    prepend-icon=""
                    @change="handleUploadFileFoto"
                  >
                    <template #append-inner>
                      <VBtn rounded="s-0 e-xl" text="Choose" />
                    </template>
                  </VFileInput>
                </VCol>
              </div>
              <div class="d-flex justify-end mt-5">
                <div class="d-flex justify-end mt-5">
                  <VBtn
                    color="primary"
                    @click="
                      () => {
                        titleDialog = 'Tambah Nama Produk';
                        addProduct();
                      }
                    "
                  >
                    Tambah Produk
                  </VBtn>
                </div>
              </div>
            </div>
          </div>
        </div>

        <VDataTable
          disable-sort
          v-model:page="page"
          class="domestic-table border rounded mt-5"
          :headers="productName"
          :items="productItems || []"
          :items-per-page="10"
          :items-length="totalItems"
          show-current-page
        >
          <template #body="{ items }">
            <tr v-if="items.length === 0">
              <td colspan="7" class="text-center">
                <div class="pt-2">
                  <img src="~/assets/images/empty-data.png" alt="Data Kosong" />
                  <div class="pt-2 font-weight-bold">Data Kosong</div>
                </div>
              </td>
            </tr>
            <tr v-for="(item, idx) in items" :key="idx">
              <td>{{ (page - 1) * 5 + idx + 1 }}</td>
              <td>{{ item.nama }}</td>
              <td class="text-center">
                <VBtn
                  :color="item.foto ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                  @click="
                    item.foto ? handleDownloadForm(item.foto, 'FILES') : null
                  "
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </td>
              <td>{{ item.jumlah_bahan }}</td>
              <td class="text-center">
                <VMenu>
                  <template #activator="{ props }">
                    <VIcon
                      icon="fa-ellipsis-v"
                      color="primary"
                      class="cursor-pointer"
                      v-bind="props"
                    />
                  </template>
                  <VList>
                    <LPHInputBahan
                      :product-name="item.nama"
                      :product-id="item.id"
                      :bahan-selected="item.bahan_selected"
                      embedded-in-module="pelakuSelfDec"
                      @submit="handleInputBahan"
                    />
                    <VListItem
                      prepend-icon="mdi-pen"
                      title="Edit"
                      @click="handleEditProduct(item.id)"
                    />
                    <VListItem
                      prepend-icon="fa-trash"
                      title="Hapus"
                      @click="deleteProduct(item.id)"
                    />
                  </VList>
                </VMenu>
              </td>
            </tr>
          </template>
        </VDataTable>
        <div class="d-flex justify-end">
          <VBtn
            color="primary"
            class="mt-2"
            @click="isUpdateDataProdukModalOpen = false"
          >
            Tutup
          </VBtn>
        </div>
      </div>
    </VCard>
  </VDialog>

  <VDialog v-model="EditProdukModalOpen" max-width="840px" persistent>
    <VCard class="pa-4">
      <div>
        <div class="d-flex justify-center">
          <VTabs
            v-model="tabAddBahan"
            align-tabs="center"
            bg-color="#f0dcf5"
            class="border pa-2"
            style="border-radius: 40px"
            height="auto"
          >
            <span> Tambah Manual </span>
          </VTabs>
        </div>

        <div class="mt-10">
          <div>
            <label>Klasifikasi Produk</label>
            <VSelect
              outlined
              placeholder="pilih klasifikasi produk"
              density="compact"
              :loading="loadingRincian"
              item-title="name"
              item-value="code"
              :items="dataProductClasification"
              @update:model-value="loadItemProductRincian"
            />
            <br />
            <label>Rincian Produk</label>
            <VSelect
              v-model="formData.kode_rincian_desc"
              outlined
              placeholder="pilih rincian produk"
              density="compact"
              :loading="loadingRincian"
              item-title="name"
              item-value="code"
              :items="listRincian"
            />
            <br />
            <label>Nama Produk</label>
            <VTextField
              v-model="formData.nama_produk"
              class="-mt-10"
              density="compact"
              placeholder="Isi Nama Produk"
            />
            <div class="d-flex justify-space-between mt-5">
              <label> Upload Foto </label>
              <VCol cols="6">
                <VTextField
                  v-if="uploadedFile.file"
                  :model-value="uploadedFile.name"
                  density="compact"
                  placeholder="No file choosen"
                  rounded="xl"
                  max-width="400"
                >
                  <template #append-inner>
                    <VIcon
                      icon="fa-trash"
                      color="error"
                      class="cursor-pointer"
                      @click="handleRemoveFiles"
                    />
                  </template>
                </VTextField>
                <VFileInput
                  v-else
                  :model-value="uploadedFile.file"
                  class="custom-file-input"
                  density="compact"
                  rounded="xl"
                  label="No file choosen"
                  max-width="400"
                  prepend-icon=""
                  @change="handleUploadFileFoto"
                >
                  <template #append-inner>
                    <VBtn rounded="s-0 e-xl" text="Choose" />
                  </template>
                </VFileInput>
              </VCol>
            </div>
            <div class="d-flex justify-end mt-5">
              <div class="d-flex justify-end mt-5">
                <VBtn
                  color="grey"
                  variant="outlined"
                  class="mr-2"
                  @click="EditProdukModalOpen = false"
                >
                  Tutup
                </VBtn>
                <VBtn
                  color="primary"
                  @click="
                    () => {
                      updateProduct();
                      EditProdukModalOpen = false;
                    }
                  "
                >
                  Simpan
                </VBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VCard>
  </VDialog>

  <VDialog v-model="isUpdateDataPabrikModalOpen" max-width="840px" persistent>
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        {{ modalTitle }}
        <VBtn icon @click="isUpdateDataPabrikModalOpen = false">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex justify-end">
          <!-- <VBtn color="primary" variant="outlined" @click="openModalAddFactory"> -->
            <VBtn color="primary" variant="outlined" @click="openModalAddFactory2">
            <VIcon class="mr-2"> fa-plus </VIcon>
            Tambah
          </VBtn>
        </div>
        <VDataTable
          disable-sort
          :id="id"
          v-model:page="page"
          class="domestic-table border rounded mt-5"
          :headers="listFactory.label"
          :items="listFactory.value || []"
          :items-per-page="10"
        >
          <template #body="{ items }">
            <tr v-if="items.length === 0">
              <td colspan="7" class="text-center">
                <div class="pt-2">
                  <img src="~/assets/images/empty-data.png" alt="Data Kosong" />
                  <div class="pt-2 font-weight-bold">Data Kosong</div>
                </div>
              </td>
            </tr>
            <tr v-for="(item, idx) in items" :key="idx">
              <td>{{ (page - 1) * 10 + idx + 1 }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.alamat }}</td>
              <td>{{ item.status_milik }}</td>
              <td class="text-center">
                <VMenu>
                  <template #activator="{ props }">
                    <VIcon
                      icon="fa-ellipsis-v"
                      color="primary"
                      class="cursor-pointer"
                      v-bind="props"
                    />
                  </template>
                  <VList>
                    <VListItem
                      prepend-icon="mdi-pen"
                      title="Edit"
                      @click="HandleEditPabrik(item.id)"
                    />
                    <!-- <VListItem prepend-icon="fa-trash" title="Hapus" @click="deletePabrik(item.id)" /> -->
                  </VList>
                </VMenu>
              </td>
            </tr>
          </template>
        </VDataTable>
      </VCardText>

      <VCardActions class="d-flex justify-end">
        <VBtn color="primary" @click="isUpdateDataPabrikModalOpen = false">
          Tutup
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- <VDialog v-model="isAddFactoryModalOpen" max-width="840px" persistent>
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        {{ modalTitle }}
        <VBtn icon @click="isAddFactoryModalOpen = false">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex justify-end" />
        <VDataTable
          disable-sort
          :id="id"
          v-model:page="page"
          class="domestic-table border rounded mt-5"
          :headers="listFactoryNoTaken.label"
          :items="listFactoryNoTaken.value || []"
          :items-per-page="10"
        >
          <template #body="{ items }">
            <tr v-if="items.length === 0">
              <td colspan="7" class="text-center">
                <div class="pt-2">
                  <img src="~/assets/images/empty-data.png" alt="Data Kosong" />
                  <div class="pt-2 font-weight-bold">Data Kosong</div>
                </div>
              </td>
            </tr>
            <tr v-for="(item, idx) in items" :key="item.id">
              <td>{{ (page - 1) * 10 + idx + 1 }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.alamat }}</td>
              <td>{{ item.status_milik }}</td>
              <td>
                <VIcon
                  icon="mdi-arrow-right"
                  color="primary"
                  size="x-large"
                  @click="addPabrik(item)"
                />
              </td>
            </tr>
          </template>
        </VDataTable>
      </VCardText>

      <VCardActions class="d-flex justify-end">
        <VBtn color="primary" @click="isAddFactoryModalOpen = false">
          Tutup
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog> -->

  <VDialog v-model="isAddFactoryModalOpen" max-width="840px" persistent>
    <VCard>
      <VCardText>
        <FormTambahPabrikLPH
          :initial-data="{ idReg: id }"
          @close="  isAddFactoryModalOpen = false"
        />
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog v-model="isEditFactoryModalOpen" max-width="840px" persistent>
    <VCard>
      <VCardText>
        <FormEditPabrikLPH
          :initial-data="formDataPabrik"
          @close="isEditFactoryModalOpen = false"
        />
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog v-model="isUpdateDataPuModalOpen" max-width="840px" persistent>
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        Update Data Perusahaan
      </VCardTitle>
      <VCardText>
        <VForm>
          <div class="form-group">
            <VTextField
              v-model="formDataPU.nama_pu"
              label="Nama Perusahaan"
              disabled
              class="mb-3"
            />
            <VTextField
              v-model="formDataPU.nama_pu_sh"
              label="Nama Perusahaan (tampil di sertifikat)"
              class="mb-3"
            />
            <VTextField
              v-model="formDataPU.alamat"
              label="Alamat"
              class="mb-3"
            />
            <VTextField
              v-model="formDataPU.kota"
              label="Kota/Kabupaten"
              class="mb-3"
            />
            <VTextField
              v-model="formDataPU.provinsi"
              label="Provinsi"
              class="mb-3"
            />
            <VTextField
              v-model="formDataPU.negara"
              label="Negara"
              class="mb-3"
            />
            <VTextField
              v-model="formDataPU.kodepos"
              label="Kode Pos"
              class="mb-3"
            />
            <VTextField
              v-model="formDataPU.skala_usaha"
              label="Skala Usaha"
              disabled
              class="mb-3"
            />
          </div>
        </VForm>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn color="primary" @click="isUpdateDataPuModalOpen = false">
          Tutup
        </VBtn>
        <VBtn variant="flat" class="px-4" color="primary" @click="updateDataPU">
          Simpan
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VDialog v-model="isUpdateDataOutletModalOpen" max-width="840px" persistent>
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center">
        {{ modalTitle }}
        <VBtn icon @click="isUpdateDataOutletModalOpen = false">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText>
        <div class="d-flex justify-end">
          <VBtn color="primary" variant="outlined" @click="openModalAddOutlet">
            <VIcon class="mr-2"> fa-plus </VIcon>
            Tambah
          </VBtn>
        </div>
        <VDataTable
          :id="id"
          v-model:page="page"
          class="domestic-table border rounded mt-5"
          :headers="listOutlet.label"
          :items="listOutlet.value || []"
          :items-per-page="10"
        >
          <template #body="{ items }">
            <tr v-if="items.length === 0">
              <td colspan="7" class="text-center">
                <div class="pt-2">
                  <img src="~/assets/images/empty-data.png" alt="Data Kosong" />
                  <div class="pt-2 font-weight-bold">Data Kosong</div>
                </div>
              </td>
            </tr>
            <tr v-for="(item, idx) in items" :key="idx">
              <td>{{ (page - 1) * 10 + idx + 1 }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ item.alamat }}</td>
              <td class="text-center">
                <VMenu>
                  <template #activator="{ props }">
                    <VIcon
                      icon="fa-ellipsis-v"
                      color="primary"
                      class="cursor-pointer"
                      v-bind="props"
                    />
                  </template>
                  <VList>
                    <VListItem
                      prepend-icon="mdi-pen"
                      title="Edit"
                      @click="HandleEditOutlet(item.id)"
                    />
                    <!-- <VListItem prepend-icon="fa-trash" title="Hapus" @click="deletePabrik(item.id)" /> -->
                  </VList>
                </VMenu>
              </td>
            </tr>
          </template>
        </VDataTable>
      </VCardText>

      <VCardActions class="d-flex justify-end">
        <VBtn color="primary" @click="isUpdateDataOutletModalOpen = false">
          Tutup
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <VDialog v-model="isEditOutletModalOpen" max-width="840px" persistent>
    <VCard>
      <VCardText>
        <FormEditOutletLPH
          :initial-data="formDataPabrik"
          @close="isEditOutletModalOpen = false"
        />
      </VCardText>
    </VCard>
  </VDialog>

  <VDialog v-model="  isAddOutletModalOpen" max-width="840px" persistent>
    <VCard>
      <VCardText>
        <FormTambahOutletLPH
          :initial-data="{ idReg: id }"
          @close="  isAddOutletModalOpen = false"
        />
      </VCardText>
    </VCard>
  </VDialog>

</template>

<style scoped lang="scss">
:deep(
    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active + .v-expansion-panel
  ) {
  margin-block-start: 40px !important;
}

:deep(.v-data-table.auditor-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      position: sticky;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }

    tbody > tr > td:last-of-type {
      position: sticky;
      background: white;
      border-inline-start: 1px solid rgba(#000, 0.12);
      inset-inline-end: 0;
    }
  }
}
</style>
