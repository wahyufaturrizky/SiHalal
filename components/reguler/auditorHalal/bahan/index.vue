<!-- eslint-disable camelcase -->
<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  onComplete: {
    type: Function,
    default: () => {},
    required: false,
  },
  isviewonly: {
    type: Boolean,
  },
});

const emit = defineEmits();
const { t } = useI18n();
const route = useRoute();
const store = useMyTabEditRegulerStore();

const id = route.params.id;

const addDialog = ref(false);
const confirmSaveDialog = ref(false);
const titleDialog = ref("");
const labelSaveBtn = ref("");
const fileTemplate = ref("");
const fileTemplateProduct = ref("");
const hideFooterBtn = ref(false);
const visiblePreview = ref(false);
const tabs = ref(-1);
const tabAddBahan = ref(-1);
const file = ref<File | null>(null);
const dataProductClasification = ref([]);
const listPreview = ref([]);
const listRincian = ref([]);
const loading = ref(false);
const loadingRincian = ref(false);
const reRender = ref(false);
const tabBahan = ref(0);
const dataCertifHalal = ref("");
const isNotAllowedProduct = ref(false);

const catatan = ref<any>({
  name: "",
  process: "",
});

const itemDetail = ref<any>({});

const formData = ref({
  kode_rincian: "",
  nama_produk: "",
  foto_produk: null,
});

const formDataCatatan = ref({
  id_reg_bahan: id,
  nama: "",
  jumlah: 0,
  tgl_pembelian: "",
  file_dok: "",
});

const formBahandanKemasan = ref({});

const uploadedFile = ref({
  name: "",
  file: null,
});

const uploadedFileBahan = ref({
  name: "",
  file: null,
});

const uploadedFileProduct = ref({
  name: "",
  file: null,
});

const handleRemoveFile = () => {
  uploadedFile.value.name = "";
  uploadedFile.value.file = null;
  uploadedFileBahan.value.name = "";
  uploadedFileBahan.value.file = null;
  formData.value.foto_produk = "";
};

const documentList = ref([
  { nama: "Izin Edar", fileName: "Surat Izin Usaha.pdf", file: null },
  { nama: "Izin Masuk", fileName: "", file: null },
]);

const pengisianValue = ref("Unggah Foto");

const materialName = ref<any>({
  label: [
    { title: "No.", key: "no", nowrap: true },
    {
      title: "pengajuan-reguler.reguler-form--bahan-jenisbahan",
      key: "jenis_bahan",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form--bahan-namabahan",
      key: "nama_bahan",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form--bahan-produsen",
      key: "produsen",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form--bahan-nosert",
      key: "no_sertifikat",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler-form--bahan-aksi",
      key: "action",
      value: "actionPopOver3",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
});

const previewHeader = ref([
  {
    title: "No",
    key: "no",
  },
  {
    title: "Nama Bahan",
    key: "reg_nama_bahan",
  },
  {
    title: "No. Sertifikat",
    key: "no_sertifikat_halal",
  },
  {
    title: "Jenis Bahan",
    key: "kelompok",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
  },
]);

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

const productName = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    { title: "Nama Produk", key: "nama", nowrap: true },
    { title: "Foto Produk", key: "foto", nowrap: true },
    { title: "Jumlah Bahan", key: "qtyBahan", nowrap: true },

    // { title: 'Jumlah Bahan', key: 'qtyBahan', nowrap: true },
    {
      title: "Action",
      key: "actionV3",
      value: "actionPopOver4",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
});

const payNote = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    {
      title: "pengajuan-reguler.reguler_form-bahan-buy-nama",
      key: "nama",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler_form-bahan-buy-tipepenambahan",
      key: "addType",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler_form-bahan-buy-jumlah",
      key: "jumlah",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler_form-bahan-buy-tanggalpembelian",
      key: "tgl_pembelian",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler_form-bahan-buy-filedok",
      key: "FileDok",
      nowrap: true,
    },
    {
      title: t("pengajuan-reguler.reguler_form-bahan-buy-aksi"),
      key: "actionEdit",
      value: "actionEdit",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
});

const materialCheck = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    {
      title: "pengajuan-reguler.reguler_form-bahan-produk-popupproduk-prodname",
      key: "nama",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler_form-bahan-pemeriksaan-tipepenambahan",
      key: "addType",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler_form-bahan-pemeriksaan-lokasi",
      key: "lokasi",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler_form-bahan-pemeriksaan-tglpembelian",
      key: "tgl_pembelian",
      nowrap: true,
    },
    {
      title: "pengajuan-reguler.reguler_form-bahan-pemeriksaan-filedok",
      key: "FileDok",
      nowrap: true,
    },
    {
      title: t("pengajuan-reguler.reguler_form-bahan-pemeriksaan-aksi"),
      value: "actionEdit",
      key: "actionEdit",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
});

const toggleAdd = (type: string) => {
  addDialog.value = true;
  titleDialog.value = `Tambah ${type}`;
  labelSaveBtn.value =
    type === "Data Bahan"
      ? t("pengajuan-reguler.reguler_form-bahan-produk-popupproduk-produp2")
      : t("pengajuan-reguler.reguler-form--bahan-add");
};

const toggleEdit = (item: any, type: string) => {
  tabBahan.value = "1";
  itemDetail.value = item;
  uploadedFileBahan.value.file = item.FileDok;
  uploadedFileBahan.value.name = item.FileDok;
  addDialog.value = true;
  titleDialog.value = `Ubah ${type}`;
  labelSaveBtn.value = "Ubah";
};

const toggleDetail = (item: any, type: string) => {
  itemDetail.value = item;
  addDialog.value = true;
  titleDialog.value = `Detail ${type}`;
  labelSaveBtn.value = "Detail";
};

const uploadDocument = async (file: any) => {
  try {
    const formData = new FormData();

    formData.append("id", String(id));
    formData.append("file", file);
    formData.append("type", "produk");

    return await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};

const uploadDocumentBahan = async (file: any) => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    return await $api("/reguler/pelaku-usaha/tab-bahan/products/upload", {
      method: "post",
      body: formData,
    });
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
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

const handleUploadFile = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];

    uploadedFile.value.name = fileData.name;
    uploadedFile.value.file = fileData;
    try {
      const response = await uploadDocument(fileData);
      if (response.code === 2000)
        formData.value.foto_produk = response.data.file_url;
    } catch (error) {
      console.log(error);
    }
  }
};

const handleUploadFileBahan = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];

    uploadedFile.value.name = fileData.name;
    uploadedFile.value.file = fileData;
    try {
      loading.value = true;

      const response = await uploadDocumentBahan(fileData);
      if (response.code === 2000) {
        addDialog.value = false;
        uploadedFileBahan.value.file = response.data.file_url;
        listPreview.value = response?.data?.validated_bahan;
        visiblePreview.value = true;
        titleDialog.value = "Preview Bahan";
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

const toggle = () => {
  addDialog.value = false;
};

const handleSubmit = () => {
  confirmSaveDialog.value = false;
};

const getListCatatan = async () => {
  try {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-bahan/catatan/list",
      {
        method: "get",
        params: { id },
      }
    );

    if (response.code === 2000) {
      payNote.value = {
        ...payNote.value,
        value: response.data || [],
      };

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

const getListFormulir = async () => {
  try {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-bahan/formulir/list",
      {
        method: "get",
        query: { id },
      }
    );

    if (response.code === 2000) {
      materialCheck.value = {
        ...materialCheck.value,
        value: response.data || [],
      };

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

const getChannel = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/detail", {
      method: "get",
      params: { id },
    });
    if (response.code === 2000) {
      dataCertifHalal.value = response?.data?.certificate_halal;
      return response?.data?.certificate_halal;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemProductClasifications = async () => {
  try {
    const params = {};
    const productCode = await getChannel();
    dataCertifHalal.value = productCode;

    const response = await $api(
      `/reguler/auditor/combobox-product-klasifikasi`,
      {
        method: "get",
        params: {
          idLayanan: productCode?.id_produk,
        },
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

const loadItemProductRincian = async (kode_rincian: string) => {
  loadingRincian.value = true;
  try {
    const response = await $api(`/reguler/auditor/combobox-product-rincian`, {
      method: "get",
      params: {
        idLayanan: kode_rincian,
      },
    });

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

const getListIngredients = async () => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/ingredient/list",
      {
        method: "get",
        query: {
          id_reg: id,
        },
      }
    );    

    if (response.code === 2000) {
      materialName.value = {
        ...materialName.value,
        value: response.data || [],
      };

      if (response.data !== null) {
        const jenisBahan = response.data?.map((i) =>
          i.jenis_bahan?.toLowerCase()
        );
        if (
          dataCertifHalal?.value?.jenis_layanan === "Makanan" ||
          dataCertifHalal?.value?.jenis_layanan === "Minuman"
        ) {
          if (
            ["Bahan", "Cleaning Agent", "Kemasan"].every((item) =>
              jenisBahan.includes(item?.toLowerCase())
            )
          ) {
            let count = 0
            jenisBahan.map((element: any) => {
              
              if (element === 'bahan') {
                count ++
              }
            })
            if (count < 3) {
              emit("failed", 'Bahan minimal 3');
            } else {
              emit("complete", true);
            }
          } else {
            const missing = ["Bahan", "Cleaning Agent", "Kemasan"].filter(
              (item) => !jenisBahan.includes(item)
            );

            emit("failed", missing);
          }
        } else {
          if (jenisBahan.length > 0) {
            emit("complete", true);
          } else {
            emit("failed", missing);
          }
        }
      } else {
        emit("failed", ["Bahan", "Cleaning Agent", "Kemasan"]);
      }
      reRender.value = !reRender.value;
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const refresh = async () => {
  await Promise.allSettled([
    getListCatatan(),
    getListFormulir(),
    getListIngredients(),
  ]);
};

const bulkInsert = async () => {
  const body: any[] = [];

  if (titleDialog.value === "Preview Bahan") {
    listPreview.value.map((a: any) => {
      if (a.Passed) {
        let payload = {
          no_sertifikat_halal:
            a.HalalCertificateRegulerBahan.no_sertifikat_halal,
          reg_publish: true,
          id_pabrik: null,
          foto_bahan: "",
          merek: a.HalalCertificateRegulerBahan?.merek,
          produsen: a.HalalCertificateRegulerBahan?.produsen,
          tgl_berlaku_sertifikat:
            a.HalalCertificateRegulerBahan?.tgl_berlaku_sertifikat,
          jenis_bahan: a.HalalCertificateRegulerBahan?.jenis_bahan,
          f_pendamping: false,
          kelompok: a.HalalCertificateRegulerBahan?.kelompok,
          id_reg: id,
          reg_nama_bahan: a.HalalCertificateRegulerBahan?.reg_nama_bahan,
        };
        if (a.HalalCertificateRegulerBahan.id_reg_bahan) {
          payload = {
            ...payload,
            id_reg_bahan: a.HalalCertificateRegulerBahan.id_reg_bahan,
          };
        }
        body.push(payload);
      }
    });

    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-bahan/products/bulkInsert",
      {
        method: "put",
        params: { id_reg: id },
        body,
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
      reRender.value = !reRender.value;
      visiblePreview.value = false;
      getListIngredients();
      getListCatatan();
      getListFormulir();
    }
  } else {
    listPreview.value.map((el: any) => {
      if (el.Passed) {
        const payload = {
          reg_prod_name: el.HalalCertificateRegulerProduk?.reg_prod_name,
        };

        body.push(payload);
      }
    });

    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-bahan/products/bulkInsert-product",
      {
        method: "put",
        params: { id_reg: id },
        body,
      }
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
      reRender.value = !reRender.value;
      visiblePreview.value = false;
      uploadedFileProduct.value = {
        name: "",
        file: null,
      };
    }
  }
};

const addProduct = async () => {
  if (titleDialog.value === "Tambah Nama Produk") {
    try {
      const { kode_rincian, nama_produk, foto_produk } = formData.value;
      if (!kode_rincian || !nama_produk || !foto_produk) {
        throw {
          message: "mandatory"
        }
      }
      const response: any = await $api(
        "/reguler/pelaku-usaha/tab-bahan/products/create",
        {
          method: "post",
          params: { id_reg: id },
          body: formData.value,
        }
      );

      if (response.code === 2000) {
        formData.value = {
          kode_rincian: "",
          nama_produk: "",
          foto_produk: uploadedFile.value.file || null,
        };
        uploadedFile.value = {
          name: "",
          file: "",
        };
        addDialog.value = false;
        reRender.value = !reRender.value;
        useSnackbar().sendSnackbar("Sukses menambah data", "success");
      }
      else {
        throw {
          message: 'mandatory'
        }
      }
    } catch (error) {
      if (error.message !== 'mandatory') {
        isNotAllowedProduct.value = true;
      }
    }
  } else if (titleDialog.value === "Ubah Nama Produk") {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-bahan/products/update",
      {
        method: "put",
        params: { id_reg: id, product_id: itemDetail.value.id },
        body: {
          kode_rincian:
            formData.value.kode_rincian || itemDetail.value.koderincian,
          nama_produk: itemDetail.value.nama,
          foto_produk: formData.value.foto_produk
            ? formData.value.foto_produk
            : uploadedFile.value.file,
          merek: itemDetail.value.merek,
        },
      }
    );

    if (response.code === 2000) {
      formData.value = {
        kode_rincian: "",
        nama_produk: "",
        foto_produk: null,
      };
      uploadedFile.value = {
        name: "",
        file: "",
      };
      addDialog.value = false;
      reRender.value = !reRender.value;
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else if (titleDialog.value === "Tambah Pembelian Bahan") {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-bahan/catatan/create",
      {
        method: "post",
        params: { id_reg: id },
        body: {
          nama: formData.value?.nama_produk,
          file_dok: formData.value?.foto_produk,
        },
      }
    );

    if (response.code === 2000) {
      formDataCatatan.value = {
        kode_rincian: "",
        nama_produk: "",
        foto_produk: null,
      };
      addDialog.value = false;
      getListCatatan();
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else if (titleDialog.value === "Ubah Pembelian Bahan") {
    let body: any = {};
    let url = "";
    let method = "";
    if (tabBahan.value === 0 || tabBahan.value === "1") {
      if (itemDetail.value?.id_reg_bahan !== "") {
        body = {
          id_reg_bahan: itemDetail.value.id_reg_bahan,
          nama: itemDetail.value.nama,
          jumlah: +itemDetail.value.jumlah,
          tgl_pembelian: formatToISOString(itemDetail.value.tgl_pembelian),
          file_dok: formData.value.foto_produk,
        };
      } else {
        body = {
          nama: itemDetail.value?.nama,
          file_dok:
            uploadedFileBahan.value.file !== null
              ? uploadedFileBahan.value.file
              : formData.value.foto_produk,
        };
      }
    } else {
      body = {
        id_reg_bahan: itemDetail.value.id_reg_bahan,
        nama: itemDetail.value.nama,
        jumlah: +itemDetail.value.jumlah,
        tgl_pembelian: formatToISOString(itemDetail.value.tgl_pembelian),
        file_dok: itemDetail.value.FileDok || "",
      };
    }

    if (itemDetail.value.id_reg_bahan_pembelian !== "") {
      method = "put";
      url = "/reguler/pelaku-usaha/tab-bahan/catatan/update";
    } else {
      method = "post";
      url = "/reguler/pelaku-usaha/tab-bahan/catatan/create";
    }

    const response: any = await $api(url, {
      method,
      params: {
        id_reg: id,
        product_id: itemDetail.value?.id_reg_bahan_pembelian,
      },
      body,
    });

    if (response.code === 2000) {
      formDataCatatan.value = {
        kode_rincian: "",
        nama_produk: "",
        foto_produk: null,
      };
      addDialog.value = false;
      reRender.value = !reRender.value;
      refresh();
      useSnackbar().sendSnackbar("Sukses merubah data", "success");
    }
  } else if (titleDialog.value === "Tambah Formulir Pemeriksaan Bahan") {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-bahan/formulir/add-formulir",
      {
        method: "post",
        params: {
          id,
        },
        body: {
          nama: formData.value?.nama_produk,
          file_dok: formData.value?.foto_produk,
        },
      }
    );

    if (response.code === 2000) {
      addDialog.value = false;
      getListFormulir();
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else if (titleDialog.value === "Ubah Formulir Pemeriksaan Bahan") {
    let body: any = {};
    let url = "";
    let method = "";
    if (tabBahan.value === 0 || tabBahan.value === "1") {
      if (itemDetail.value?.id_reg_bahan !== "") {
        body = {
          id_reg_bahan: itemDetail.value.id_reg_bahan,
          nama: itemDetail.value.nama,
          lokasi: itemDetail.value.lokasi,
          tgl_pembelian: formatToISOString(itemDetail.value.tgl_pembelian),
          file_dok: formData.value.foto_produk,
        };
      } else {
        body = {
          nama: itemDetail.value?.nama,
          file_dok:
            uploadedFileBahan.value.file !== null
              ? uploadedFileBahan.value.file
              : formData.value.foto_produk,
        };
      }
    } else {
      body = {
        id_reg_bahan: itemDetail.value.id_reg_bahan,
        nama: itemDetail.value.nama,
        lokasi: itemDetail.value.lokasi,
        tgl_pembelian: formatToISOString(itemDetail.value.tgl_pembelian),
        file_dok: itemDetail.value.FileDok || "",
      };
    }

    if (itemDetail.value.id_reg_bahan_cek !== "") {
      method = "put";
      url = "/reguler/pelaku-usaha/tab-bahan/formulir/update";
    } else {
      method = "post";
      url = "/reguler/pelaku-usaha/tab-bahan/formulir/create";
    }

    const response: any = await $api(url, {
      method,
      params: { id_reg: id, product_id: itemDetail.value?.id_reg_bahan_cek },
      body,
    });

    if (response.code === 2000) {
      formDataCatatan.value = {
        kode_rincian: "",
        nama_produk: "",
        foto_produk: null,
      };
      addDialog.value = false;
      reRender.value = !reRender.value;
      refresh();
      useSnackbar().sendSnackbar("Sukses merubah data", "success");
    }
  }
};

const getDetailProduk = async (productId: string, type: string) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-bahan/products/detail",
    {
      method: "get",
      params: { id_reg: id, product_id: productId },
    }
  );

  if (response.code === 2000) {
    itemDetail.value = response.data || {};
    uploadedFile.value = {
      name: response?.data?.foto_produk,
      file: response?.data?.foto_produk,
    };
    addDialog.value = true;
    titleDialog.value =
      type === "edit" ? "Ubah Nama Produk" : "Detail Nama Produk";
    labelSaveBtn.value = type === "edit" ? "Ubah" : "Detail";
  }
};

const getTemplateFile = async (productId: string, type: string) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-bahan/products/template",
    {
      method: "get",
    }
  );

  if (response.code === 2000) fileTemplate.value = response.data.file;
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

const deleteIngredient = async (productId: string) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-bahan/ingredients/remove",
    {
      method: "delete",
      params: { id_reg: id, product_id: productId },
    }
  );

  if (response.code === 2000) {
    reRender.value = !reRender.value;
    await refresh();
    useSnackbar().sendSnackbar("Sukses menghapus data", "success");
  } else {
    useSnackbar().sendSnackbar(response.errors?.list_error?.[0], "error");
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
    reRender.value = !reRender.value;
    useSnackbar().sendSnackbar("Sukses menghapus data", "success");
  } else {
    useSnackbar().sendSnackbar("Bahan tidak dapat dihapus", "error");
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

const downloadTemplate = async (file: any) => {
  await downloadDocument(file, "FILES");
};

const handleAddIngredient = async (payload: any, idProduct: string) => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/product/add-ingredient",
      {
        method: "post",
        body: payload,
        query: {
          id_reg: id,
          product_id: idProduct,
        },
      } as any
    );

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menambahkan data", "success");
      await refresh();
    }
    getListIngredients();

    return response;
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menambahkan data", "error");
    console.log(error);
  } finally {
    store.isAllBahanSelected();
  }
};

const handleChange = () => {
  isNotAllowedProduct.value = false;
};

onMounted(async () => {
  loading.value = true;
  tabs.value = 0;
  const response = await loadItemProductClasifications()
  
  await Promise.allSettled([
    getListCatatan(),
    getListFormulir(),
    getListIngredients(),
    getTemplateFile(),
    getTemplateFileProduct(),
  ]);
  loading.value = false;
});

watch([titleDialog, tabAddBahan], () => {
  if (
    titleDialog.value === "Tambah Data Bahan" &&
    (tabAddBahan.value === "2" || tabAddBahan.value === 2)
  )
    hideFooterBtn.value = false;
  else hideFooterBtn.value = true;
});
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
      :label-back-btn="
        t('pengajuan-reguler.reguler_form-bahan-produk-popupbahan-cancel')
      "
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
        <div v-else>
          <PreviewBahanTable
            :preview-header="previewHeader"
            :list-preview="listPreview"
          />
        </div>
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
    >
      <template #content>
        <div v-if="titleDialog === 'Detail Data Bahan'">
          <ContentDialogDataBahan dialog-type="detail" :data="itemDetail" />
        </div>
        <div v-else-if="titleDialog === 'Tambah Data Bahan'">
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
                <span> Ubah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsItems v-model="tabAddBahan">
            <VTabItem>
              <div v-if="tabAddBahan === '1'" class="mt-5">
                <VRow no-gutters class="mb-4">
                  <VCol cols="6" class="d-flex align-center">
                    <span> Unduh template acuan "unggah bahan" </span>
                  </VCol>
                  <VCol cols="6">
                    <VBtn
                      append-icon="mdi-download"
                      @click="() => downloadTemplate(fileTemplate)"
                    >
                      Unduh
                    </VBtn>
                  </VCol>
                </VRow>
                <br />
                <VRow class="mb-3" align="center">
                  <VCol cols="6">
                    <span> Unggah Bahan </span>
                  </VCol>
                  <VCol cols="6">
                    <VTextField
                      v-if="uploadedFileBahan.file"
                      :model-value="uploadedFileBahan.name"
                      density="compact"
                      placeholder="No file choosen"
                      rounded="xl"
                    >
                      <template #append-inner>
                        <VIcon
                          icon="fa-trash"
                          color="error"
                          class="cursor-pointer"
                          @click="handleRemoveFile"
                        />
                      </template>
                    </VTextField>
                    <VFileInput
                      v-else
                      :model-value="uploadedFileBahan.file"
                      class="custom-file-input"
                      density="compact"
                      rounded="xl"
                      label="No file choosen"
                      prepend-icon=""
                      @change="handleUploadFileBahan"
                    >
                      <template #append-inner>
                        <VBtn rounded="e-xl" text="Choose" />
                      </template>
                    </VFileInput>
                  </VCol>
                  <VCol cols="12">
                    <VAlert
                      type="info"
                      color="primary"
                      variant="tonal"
                      density="compact"
                      prominent
                    >
                      <template #prepend>
                        <VIcon size="24px" icon="ri-information-2-fill" />
                      </template>
                      <template #text>
                        File bahan harus berformat XLS atau XLSX
                      </template>
                    </VAlert>
                  </VCol>
                </VRow>
              </div>
              <div v-else class="mt-10">
                <TambahBahanForm
                  @load-list="
                    async () => {
                      addDialog = false;
                      reRender = !reRender;
                      getListIngredients();
                      getListFormulir();
                      getListCatatan();
                    }
                  "
                />
              </div>
            </VTabItem>
          </VTabsItems>
        </div>
        <div v-else-if="titleDialog === 'Tambah Nama Produk'">
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
                <span> Ubah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsItems v-model="tabAddBahan">
            <VTabItem>
              <div v-if="tabAddBahan === '1'" class="mt-5">
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
                <br />
                <VRow class="mb-3" align="center">
                  <VCol cols="6">
                    <span> Unggah Produk </span>
                  </VCol>
                  <VCol cols="6">
                    <VTextField
                      v-if="uploadedFileProduct.file"
                      :model-value="uploadedFileProduct.name"
                      density="compact"
                      placeholder="No file choosen"
                      rounded="xl"
                    >
                      <template #append-inner>
                        <VIcon
                          icon="fa-trash"
                          color="error"
                          class="cursor-pointer"
                          @click="handleRemoveFile"
                        />
                      </template>
                    </VTextField>
                    <VFileInput
                      v-else
                      :model-value="uploadedFileProduct.file"
                      class="custom-file-input"
                      density="compact"
                      rounded="xl"
                      label="No file choosen"
                      prepend-icon=""
                      @change="handleUploadFileProduct"
                    >
                      <template #append-inner>
                        <VBtn rounded="e-xl" text="Choose" />
                      </template>
                    </VFileInput>
                  </VCol>
                  <VCol cols="12">
                    <VAlert
                      type="info"
                      color="primary"
                      variant="tonal"
                      density="compact"
                      prominent
                    >
                      <template #prepend>
                        <VIcon size="24px" icon="ri-information-2-fill" />
                      </template>
                      <template #text>
                        File produk harus berformat XLS atau XLSX
                      </template>
                    </VAlert>
                  </VCol>
                </VRow>
              </div>
              <div v-else class="mt-10">
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
                    v-model="formData.kode_rincian"
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
                    @update:model-value="handleChange"
                  />
                  <div v-if="isNotAllowedProduct">
                    <label style="color: red; font-size: 12px"
                      >Nama Produk mengandung nama dilarang</label
                    >
                  </div>
                  <br />
                  <VRow class="mb-5" align="center">
                    <VCol cols="6">
                      <label> Upload Foto </label>
                    </VCol>
                    <VCol cols="6">
                      <VTextField
                        v-if="uploadedFile.file"
                        :model-value="uploadedFile.name"
                        density="compact"
                        placeholder="No file choosen"
                        rounded="xl"
                      >
                        <template #append-inner>
                          <VIcon
                            icon="fa-trash"
                            color="error"
                            class="cursor-pointer"
                            @click="handleRemoveFile"
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
                        prepend-icon=""
                        @change="handleUploadFile"
                        accept="image/png, image/jpeg"
                      >
                        <template #append-inner>
                          <VBtn rounded="s-0 e-xl" text="Choose" />
                        </template>
                      </VFileInput>
                    </VCol>
                    <VCol cols="12">
                      <VAlert
                        type="info"
                        color="primary"
                        variant="tonal"
                        density="compact"
                        prominent
                      >
                        <template #prepend>
                          <VIcon size="24px" icon="ri-information-2-fill" />
                        </template>
                        <template #text>
                          File foto produk harus dalam bentuk gambar berformat
                          (jpeg/jpg/png)
                        </template>
                      </VAlert>
                    </VCol>
                  </VRow>
                </div>
              </div>
            </VTabItem>
          </VTabsItems>
        </div>
        <div v-else-if="titleDialog === 'Ubah Nama Produk'">
          <div>
            <label>Kualitas Produk</label>
            <VSelect
              v-model="itemDetail.klasifikasi"
              outlined
              placeholder="pilih kualitas produk"
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
              v-model="itemDetail.koderincian_desc"
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
              v-model="itemDetail.nama"
              class="-mt-10"
              density="compact"
              placeholder="Isi Nama Produk"
            />
            <VRow class="mt-5 mb-3" align="center">
              <VCol cols="6">
                <label> Upload Foto </label>
              </VCol>
              <VCol cols="6">
                <VTextField
                  v-if="uploadedFile.file"
                  :model-value="uploadedFile.name"
                  density="compact"
                  placeholder="No file choosen"
                  rounded="xl"
                >
                  <template #append-inner>
                    <VIcon
                      icon="fa-trash"
                      color="error"
                      class="cursor-pointer"
                      @click="handleRemoveFile"
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
                  prepend-icon=""
                  @change="handleUploadFile"
                  accept="image/png, image/jpeg"
                >
                  <template #append-inner>
                    <VBtn rounded="s-0 e-xl" text="Choose" />
                  </template>
                </VFileInput>
              </VCol>
              <VCol cols="12">
                <VAlert
                  type="info"
                  color="primary"
                  variant="tonal"
                  density="compact"
                  prominent
                >
                  <template #prepend>
                    <VIcon size="24px" icon="ri-information-2-fill" />
                  </template>
                  <template #text>
                    File foto produk harus dalam bentuk gambar berformat
                    (jpeg/jpg/png)
                  </template>
                </VAlert>
              </VCol>
            </VRow>
          </div>
        </div>
        <div v-else-if="titleDialog === 'Detail Nama Produk'">
          <div>
            <label>Kualitas Produk</label>
            <VSelect
              v-model="itemDetail.klasifikasi"
              outlined
              placeholder="pilih kualitas produk"
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
              v-model="itemDetail.koderincian_desc"
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
              v-model="itemDetail.nama"
              class="-mt-10"
              density="compact"
              placeholder="Isi Nama Produk"
            />
            <VRow class="mt-5 mb-3" align="center">
              <VCol cols="6">
                <label> Upload Foto </label>
              </VCol>
              <VCol cols="6">
                <VTextField
                  v-if="uploadedFile.file"
                  :model-value="uploadedFile.name"
                  density="compact"
                  placeholder="No file choosen"
                  rounded="xl"
                />
                <VFileInput
                  v-else
                  :model-value="uploadedFile.file"
                  class="custom-file-input"
                  density="compact"
                  rounded="xl"
                  label="No file choosen"
                  prepend-icon=""
                  @change="handleUploadFile"
                  accept="image/png, image/jpeg"
                >
                  <template #append-inner>
                    <VBtn rounded="s-0 e-xl" text="Choose" />
                  </template>
                </VFileInput>
              </VCol>
              <VCol cols="12">
                <VAlert
                  type="info"
                  color="primary"
                  variant="tonal"
                  density="compact"
                  prominent
                >
                  <template #prepend>
                    <VIcon size="24px" icon="ri-information-2-fill" />
                  </template>
                  <template #text>
                    File foto produk harus dalam bentuk gambar berformat
                    (jpeg/jpg/png)
                  </template>
                </VAlert>
              </VCol>
            </VRow>
          </div>
        </div>
        <div v-else-if="titleDialog === 'Ubah Catatan'">
          <div>
            <label>Nama</label>
            <VTextField class="-mt-10" value="isi nama" />
            <br />
            <label>Jumlah</label>
            <VTextField class="-mt-10" value="12" />
            <br />
            <label>Tanggal Pembelian</label>
            <VTextField
              id="startDate"
              type="date"
              placeholder="Pilih tanggal mulai"
              clearable
            />
          </div>
        </div>
        <div v-else-if="titleDialog === 'Tambah Pembelian Bahan'">
          <div class="d-flex justify-center align-center">
            <!-- <VTabs
              v-model="tabBahan"
              align-tabs="center"
              bg-color="#f0dcf5"
              class="border pa-2"
              style="border-radius: 40px;"
              height="auto"
            >
              <VTab
                value="1"
                base-color="#f0dcf5"
                active-color="primary"
                style="border-radius: 40px;"
                hide-slider
                color="primary"
                variant="flat"
                height="40px"
              >
                <span>Unggah File </span>
              </VTab>
            </VTabs> -->
          </div>
          <VTabsWindow v-model="tabBahan">
            <VTabsWindowItem value="1">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="formData.nama_produk"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <VRow class="mt-5 mb-3" align="center">
                <VCol cols="6">
                  <label style="align-self: center"> Bukti Pembelian </label>
                </VCol>
                <VCol cols="6">
                  <VTextField
                    v-if="uploadedFileBahan.file"
                    :model-value="uploadedFileBahan.name"
                    density="compact"
                    placeholder="No file choosen"
                    rounded="xl"
                  >
                    <template #append-inner>
                      <VIcon
                        icon="fa-trash"
                        color="error"
                        class="cursor-pointer"
                        @click="handleRemoveFile"
                      />
                    </template>
                  </VTextField>
                  <VFileInput
                    v-else
                    :model-value="uploadedFileBahan.file"
                    class="custom-file-input"
                    density="compact"
                    rounded="xl"
                    label="No file choosen"
                    prepend-icon=""
                    @change="handleUploadFile"
                    accept="image/png, image/jpeg"
                  >
                    <template #append-inner>
                      <VBtn rounded="s-0 e-xl" text="Choose" />
                    </template>
                  </VFileInput>
                </VCol>
                <VCol cols="12">
                  <VAlert
                    type="info"
                    color="primary"
                    variant="tonal"
                    density="compact"
                    prominent
                  >
                    <template #prepend>
                      <VIcon size="24px" icon="ri-information-2-fill" />
                    </template>
                    <template #text>
                      File bahan harus dalam bentuk gambar berformat
                      (jpeg/jpg/png)
                    </template>
                  </VAlert>
                </VCol>
              </VRow>
            </VTabsWindowItem>
            <VTabsWindowItem value="2">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="formDataCatatan.nama"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Jumlah</label>
                <VTextField
                  v-model="formDataCatatan.jumlah"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Tanggal Pembelian</label>
                <VueDatePicker
                  id="tanggal_daftar"
                  v-model="formDataCatatan.tgl_pembelian"
                  teleport-center
                  :enable-time-picker="false"
                  format="dd-MM-yyyy"
                />
              </div>
            </VTabsWindowItem>
          </VTabsWindow>
        </div>
        <div v-else-if="titleDialog === 'Tambah Formulir Pemeriksaan Bahan'">
          <div class="d-flex justify-center align-center">
            <!-- <VTabs
              v-model="tabBahan"
              align-tabs="center"
              bg-color="#f0dcf5"
              class="border pa-2"
              style="border-radius: 40px;"
              height="auto"
            >
              <VTab
                value="1"
                base-color="#f0dcf5"
                active-color="primary"
                style="border-radius: 40px;"
                hide-slider
                color="primary"
                variant="flat"
                height="40px"
              >
                <span>Unggah File </span>
              </VTab>
            </VTabs> -->
          </div>
          <VTabsWindow v-model="tabBahan">
            <VTabsWindowItem value="1">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="formData.nama_produk"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <VRow class="mt-5 mb-3" align="center">
                <VCol cols="6">
                  <label> Pemeriksaan Bahan </label>
                </VCol>
                <VCol cols="6">
                  <VTextField
                    v-if="uploadedFileBahan.file"
                    :model-value="uploadedFileBahan.name"
                    density="compact"
                    placeholder="No file choosen"
                    rounded="xl"
                  >
                    <template #append-inner>
                      <VIcon
                        icon="fa-trash"
                        color="error"
                        class="cursor-pointer"
                        @click="handleRemoveFile"
                      />
                    </template>
                  </VTextField>
                  <VFileInput
                    v-else
                    :model-value="uploadedFileBahan.file"
                    class="custom-file-input"
                    density="compact"
                    rounded="xl"
                    label="No file choosen"
                    prepend-icon=""
                    @change="handleUploadFile"
                    accept="image/png, image/jpeg"
                  >
                    <template #append-inner>
                      <VBtn rounded="s-0 e-xl" text="Choose" />
                    </template>
                  </VFileInput>
                </VCol>
                <VCol cols="12">
                  <VAlert
                    type="info"
                    color="primary"
                    variant="tonal"
                    density="compact"
                    prominent
                  >
                    <template #prepend>
                      <VIcon size="24px" icon="ri-information-2-fill" />
                    </template>
                    <template #text>
                      File bahan harus dalam bentuk gambar berformat
                      (jpeg/jpg/png)
                    </template>
                  </VAlert>
                </VCol>
              </VRow>
            </VTabsWindowItem>
            <VTabsWindowItem value="2">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="formDataCatatan.nama"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Jumlah</label>
                <VTextField
                  v-model="formDataCatatan.jumlah"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Tanggal Pembelian</label>
                <VueDatePicker
                  id="tanggal_daftar"
                  v-model="formDataCatatan.tgl_pembelian"
                  teleport-center
                  :enable-time-picker="false"
                  format="dd-MM-yyyy"
                />
              </div>
            </VTabsWindowItem>
          </VTabsWindow>
        </div>
        <div v-else-if="titleDialog === 'Ubah Pembelian Bahan'">
          <div class="d-flex justify-center align-center">
            <VTabs
              v-model="tabBahan"
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
                v-if="itemDetail?.id_reg_bahan"
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Ubah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsWindow v-model="tabBahan">
            <VTabsWindowItem value="1">
              <div v-if="!itemDetail?.id_reg_bahan" class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="itemDetail.nama"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <VRow class="mt-5 mb-3" align="center">
                <VCol cols="6">
                  <label> Unggah Bahan </label>
                </VCol>
                <VCol cols="6">
                  <VTextField
                    v-if="uploadedFileBahan.file"
                    :model-value="uploadedFileBahan.name"
                    density="compact"
                    placeholder="No file choosen"
                    rounded="xl"
                  >
                    <template #append-inner>
                      <VIcon
                        icon="fa-trash"
                        color="error"
                        class="cursor-pointer"
                        @click="handleRemoveFile"
                      />
                    </template>
                  </VTextField>
                  <VFileInput
                    v-else
                    :model-value="uploadedFileBahan.file"
                    class="custom-file-input"
                    density="compact"
                    rounded="xl"
                    label="No file choosen"
                    prepend-icon=""
                    @change="handleUploadFile"
                    accept="image/png, image/jpeg"
                  >
                    <template #append-inner>
                      <VBtn rounded="s-0 e-xl" text="Choose" />
                    </template>
                  </VFileInput>
                </VCol>
                <VCol cols="12">
                  <VAlert
                    type="info"
                    color="primary"
                    variant="tonal"
                    density="compact"
                    prominent
                  >
                    <template #prepend>
                      <VIcon size="24px" icon="ri-information-2-fill" />
                    </template>
                    <template #text>
                      File bahan harus dalam bentuk gambar berformat
                      (jpeg/jpg/png)
                    </template>
                  </VAlert>
                </VCol>
              </VRow>
            </VTabsWindowItem>
            <VTabsWindowItem value="2">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="itemDetail.nama"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                  disabled
                />
              </div>
              <div class="mt-5">
                <label>Jumlah</label>
                <VTextField
                  v-model="itemDetail.jumlah"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <div class="mt-5">
                <label>Tanggal Pembelian</label>
                <VueDatePicker
                  id="tanggal_daftar"
                  v-model="itemDetail.tgl_pembelian"
                  teleport-center
                  :enable-time-picker="false"
                  format="dd-MM-yyyy"
                />
              </div>
            </VTabsWindowItem>
          </VTabsWindow>
        </div>
        <div v-else-if="titleDialog === 'Ubah Formulir Pemeriksaan Bahan'">
          <div class="d-flex justify-center align-center">
            <VTabs
              v-model="tabBahan"
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
                v-if="itemDetail?.id_reg_bahan"
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Ubah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsWindow v-model="tabBahan">
            <VTabsWindowItem value="1">
              <div v-if="!itemDetail?.id_reg_bahan" class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="itemDetail.nama"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                />
              </div>
              <VRow class="mt-5 mb-3" align="center">
                <VCol cols="6">
                  <label> Unggah Bahan </label>
                </VCol>
                <VCol cols="6">
                  <VTextField
                    v-if="uploadedFileBahan.file"
                    :model-value="uploadedFileBahan.name"
                    density="compact"
                    placeholder="No file choosen"
                    rounded="xl"
                  >
                    <template #append-inner>
                      <VIcon
                        icon="fa-trash"
                        color="error"
                        class="cursor-pointer"
                        @click="handleRemoveFile"
                      />
                    </template>
                  </VTextField>
                  <VFileInput
                    v-else
                    :model-value="uploadedFileBahan.file"
                    class="custom-file-input"
                    density="compact"
                    rounded="xl"
                    label="No file choosen"
                    prepend-icon=""
                    @change="handleUploadFile"
                    accept="image/png, image/jpeg"
                  >
                    <template #append-inner>
                      <VBtn rounded="s-0 e-xl" text="Choose" />
                    </template>
                  </VFileInput>
                </VCol>
                <VCol cols="12">
                  <VAlert
                    type="info"
                    color="primary"
                    variant="tonal"
                    density="compact"
                    prominent
                  >
                    <template #prepend>
                      <VIcon size="24px" icon="ri-information-2-fill" />
                    </template>
                    <template #text>
                      File bahan harus dalam bentuk gambar berformat
                      (jpeg/jpg/png)
                    </template>
                  </VAlert>
                </VCol>
              </VRow>
            </VTabsWindowItem>
            <VTabsWindowItem value="2">
              <div class="mt-5">
                <label>Nama</label>
                <VTextField
                  v-model="itemDetail.nama"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Nama"
                  disabled
                />
              </div>
              <div class="mt-5">
                <label>Lokasi</label>
                <VTextField
                  v-model="itemDetail.lokasi"
                  class="mt-2"
                  density="compact"
                  placeholder="Isi Lokasi"
                />
              </div>
              <div class="mt-5">
                <label>Tanggal Pembelian</label>
                <VueDatePicker
                  id="tanggal_daftar"
                  v-model="itemDetail.tgl_pembelian"
                  teleport-center
                  :enable-time-picker="false"
                  format="dd-MM-yyyy"
                />
              </div>
            </VTabsWindowItem>
          </VTabsWindow>
        </div>
      </template>
    </DialogWithAction>
    <TableData
      :id="props?.id"
      :on-submit="() => (confirmSaveDialog = true)"
      :on-add="() => toggleAdd('Data Bahan')"
      :on-edit="(el: any) => toggleEdit(el, 'Data Bahan')"
      :on-detail="(el: any) => toggleDetail(el, 'Data Bahan')"
      :on-delete="(item: any) => deleteIngredient(item.id)"
      :data="materialName"
      :refresh="refresh"
      :title="t('pengajuan-reguler.reguler-form--bahan-title')"
      with-add-button
      :isviewonly="isviewonly"
      :hide-default-footer="false"
      :items-per-page="10"
    >
      <template #headerDialog>
        <div class="bgContent">
          <div class="d-flex flex-wrap mt-5">
            <VIcon icon="ri-error-warning-line" color="#652672" />
            <label class="subText"
              >Jenis Bahan harus terdiri dari : Cleaning Agent, Kemasan dan
              Bahan, sebelum dapat mengisi Produk.</label
            >
          </div>
        </div>
      </template>
    </TableData>
    <br />
    <TableData
      :on-submit="() => (confirmSaveDialog = true)"
      :on-add="() => toggleAdd('Nama Produk')"
      :on-edit="(item: any) => getDetailProduk(item.id, 'edit')"
      :on-delete="(item: any) => deleteProduct(item.id)"
      :on-detail="(el: any) => getDetailProduk(el.id, 'detail')"
      :on-input-bahan="handleInputBahan"
      :data="productName"
      :re-render="reRender"
      title="Daftar Nama Produk"
      with-add-button
      :isviewonly="isviewonly"
      :input-bahan="handleAddIngredient"
      :hide-default-footer="false"
      :items-per-page="10"
    >
      <template #headerDialog>
        <div class="bgContent">
          <div class="d-flex flex-wrap mt-5">
            <VIcon icon="ri-error-warning-line" color="#652672" />
            <label class="subText"
              >Jenis Bahan harus terdiri dari : Cleaning Agent, Kemasan dan
              Bahan, sebelum dapat mengisi Produk.</label
            >
          </div>
        </div>
      </template>
    </TableData>
    <br />
    <TableData
      :on-submit="() => (confirmSaveDialog = true)"
      :on-add="() => toggleAdd('Pembelian Bahan')"
      :on-edit="(item: any) => toggleEdit(item, 'Pembelian Bahan')"
      :data="payNote"
      title="Catatan Pembelian Bahan"
      :isviewonly="isviewonly"
      with-add-button
      :hide-default-footer="false"
      :items-per-page="10"
    />
    <br />
    <TableData
      :on-submit="() => (confirmSaveDialog = true)"
      :on-add="() => toggleAdd('Formulir Pemeriksaan Bahan')"
      :on-edit="(item:any) => toggleEdit(item, 'Formulir Pemeriksaan Bahan')"
      :data="materialCheck"
      title="Formulir Pemeriksaan Bahan"
      with-add-button
      :hide-default-footer="false"
      :items-per-page="10"
    />
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.subText {
  align-content: center;
  color: #652672 !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 18px !important;
  padding-inline-start: 10px;
}

.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
  padding-inline-start: 10px;
}

.progress-text {
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}

.ml5 {
  margin-inline-start: 25px;
}

.download-template {
  border-radius: 10px;
  background-color: #652672;
  color: white;
  font-size: 16px !important;
  inline-size: fit-content;
}
</style>
