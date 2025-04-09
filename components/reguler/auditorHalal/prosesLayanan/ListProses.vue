<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

const props = defineProps({
  isviewonly: {
    type: Boolean,
  },
});

const { isviewonly } = props || {};

const route = useRoute();
const id = route.params.id;
const addDialog = ref(false);
const titleDialog = ref("");
const labelSaveBtn = ref("Tambah");
const confirmSaveDialog = ref(false);
const tabs = ref<string | number>(-1);
const loading = ref(false);
const listFactory = ref<any[]>([]);
const catatanProduk = ref<any[]>([]);
const selectedProduct = ref<any>({});
const listProduk = ref<any>([]);
const page = ref(1);
const size = ref(10);

const formAddLayout = ref({
  file_layout: "",
  nama_pabrik: "",
  id_pabrik: "",
});

const selectedFactory = ref({});
const detailItem = ref({});

const catatan = ref({
  name: null,
  type: null,
  process: "",
  diagramProcess: [],
  file: null,
});

const payloadHasilProduksi = ref({
  nama_produk: "",
  jumlah: "",
  tanggal_produksi: "",
  tanggal_kadaluarsa: "",
  file_dok: "",
});

const payloadHasilDistribusi = ref({
  nama_produk: "",
  jumlah: "",
  tanggal: "",
  tujuan: "",
  file_dok: "",
});

const uploadedFile = ref({
  name: "",
  file: null,
});

const resetForm = () => {
  formAddLayout.value = {
    file_layout: "",
    nama_pabrik: "",
    id_pabrik: "",
  };
  payloadHasilProduksi.value = {
    nama_produk: "",
    jumlah: "",
    tanggal_produksi: "",
    tanggal_kadaluarsa: "",
    file_dok: "",
  };
  payloadHasilDistribusi.value = {
    nama_produk: "",
    jumlah: "",
    tanggal: "",
    tujuan: "",
    file_dok: "",
  };
  tabs.value = "1";
  uploadedFile.value = {
    name: "",
    file: null,
  };
  selectedProduct.value = {};
};

const handleRemoveFile = () => {
  uploadedFile.value.name = "";
  uploadedFile.value.file = null;
};

onMounted(() => {
  tabs.value = 0;
});

const documentList = ref([
  { nama: "Izin Edar", fileName: "Surat Izin Usaha.pdf", file: null },
  { nama: "Izin Masuk", fileName: "", file: null },
]);

const layoutData = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    { title: "Nama Pabrik", key: "nama_pabrik", nowrap: true },
    { title: "File Layout Pabrik", key: "file_layout", nowrap: true },
    {
      title: "Action",
      value: "action",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
  totalItem: 0,
});

const materialAndProduct = ref([
  {
    label: [
      { title: "No.", key: "no", nowrap: true },
      { title: "Nama", key: "nama_bahan", nowrap: true },
      { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
      { title: "Jumlah", key: "jumlah", nowrap: true },
      { title: "Tanggal Masuk", key: "tanggal_masuk", nowrap: true },
      { title: "Tanggal Keluar", key: "tanggal_keluar", nowrap: true },
      { title: "File Dokumen", key: "file_dok", nowrap: true },
      {
        title: "Action",
        value: "actionEdit",
        sortable: false,
        nowrap: true,
        popOver: true,
      },
    ],
    value: [],
    totalItem: 0,
  },
  {
    label: [
      { title: "No.", key: "no", nowrap: true },
      { title: "Nama", key: "nama_produk", nowrap: true },
      { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
      { title: "Jumlah", key: "jumlah", nowrap: true },
      { title: "Tanggal Masuk", key: "tanggal_masuk", nowrap: true },
      { title: "Tanggal Keluar", key: "tanggal_keluar", nowrap: true },
      { title: "File Dokumen", key: "file_dok", nowrap: true },
      {
        title: "Action",
        value: "actionEdit",
        sortable: false,
        nowrap: true,
        popOver: true,
      },
    ],
    value: [],
    totalItem: 0,
  },
]);

const processProduction = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    { title: "Nama Produk", key: "nama_produk", nowrap: true },
    { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
    { title: "Diagram Alur Proses", key: "narasi", nowrap: true },
    { title: "File Dokumen", key: "file_dok", nowrap: true },
    {
      title: "Action",
      value: "actionEdit",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
  totalItem: 0,
});

const catatanHasilProduksi = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    { title: "Nama Produk", key: "nama_produk", nowrap: true },
    { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
    { title: "Jumlah", key: "jumlah", nowrap: true },
    { title: "Tanggal Produksi", key: "tanggal_produksi", nowrap: true },
    { title: "Tanggal Kadaluarsa", key: "tanggal_kadaluarsa", nowrap: true },
    { title: "File Dokumen", key: "file_dok", nowrap: true },
    {
      title: "Action",
      value: "actionEdit",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
  totalItem: 0,
});

const catatanDistribusi = ref({
  label: [
    { title: "No.", key: "no", nowrap: true },
    { title: "Nama Produk", key: "nama_produk", nowrap: true },
    { title: "Tipe Penambahan", key: "tipe_penambahan", nowrap: true },
    { title: "Jumlah", key: "jumlah", nowrap: true },
    { title: "Tanggal Distribusi", key: "tanggal", nowrap: true },
    { title: "Tujuan", key: "tujuan", nowrap: true },
    { title: "File Dokumen", key: "file_dok", nowrap: true },
    {
      title: "Action",
      value: "actionEdit",
      sortable: false,
      nowrap: true,
      popOver: true,
    },
  ],
  value: [],
  totalItem: 0,
});

const toggleAdd = (type: string) => {
  labelSaveBtn.value = "Tambah";
  editAddtype.value = false;
  addDialog.value = true;
  titleDialog.value = `Tambah ${type}`;
};

const toggleEdit = (item: any, type: string) => {
  if (type === "Diagram Alur Proses") {
    catatan.value = {
      name: item?.nama_produk,
      type: null,
      process: "",
      diagramProcess: item?.narasi ? [item?.narasi] : [],
      file: item?.file_dok,
    };
    uploadedFile.value = {
      file: item?.file_dok,
      name: item?.file_dok,
    };
    detailItem.value = item;
  } else if (type === "Catatan Hasil Produksi") {
    payloadHasilProduksi.value = {
      nama_produk: item?.nama_produk,
      jumlah: item?.jumlah,
      tanggal_produksi: item?.tanggal_produksi,
      tanggal_kadaluarsa: item?.tanggal_kadaluarsa,
      file_dok: item?.file_dok,
      id_hasil_produksi: item?.id_hasil_produksi,
    };
    uploadedFile.value = {
      file: item?.file_dok,
      name: item?.file_dok,
    };
    detailItem.value = item;
  } else if (type === "Catatan Distribusi") {
    payloadHasilDistribusi.value = {
      nama_produk: item?.nama_produk,
      jumlah: item?.jumlah,
      tanggal: item?.tanggal,
      tujuan: item?.tujuan,
      file_dok: item?.file_dok,
    };
    uploadedFile.value = {
      file: item?.file_dok,
      name: item?.file_dok,
    };
    selectedProduct.value = {
      nama_produk: item?.nama_produk,
      jumlah: item?.jumlah,
      tanggal: item?.tanggal,
      tujuan: item?.tujuan,
      file_dok: item?.file_dok,
      id_reg_prod: item?.id_reg_prod,
    };
    detailItem.value = item;
  } else {
    detailItem.value = item;
  }
  addDialog.value = true;
  titleDialog.value = `Ubah ${type}`;
};

const typeAdd = ref("");
const editAddtype = ref(false);
const toggleEdit2Table = (item: any, index: number) => {
  typeAdd.value = item?.tipe_penambahan;
  editAddtype.value = true;
  if (typeAdd.value === "Manual") {
    tabs.value = 2;
  }
  selectedProduct.value = {
    nama_produk: item?.nama_produk,
    jumlah: item?.jumlah,
    tanggal: item?.tanggal,
    tujuan: item?.tujuan,
    file_dok: item?.file_dok,
    id_reg_prod: item?.id_reg_prod,
  };
  console.log(typeAdd.value, "ini typenya di value");
  detailItem.value = item;
  addDialog.value = true;
  labelSaveBtn.value = "Ubah";
  titleDialog.value =
    index === 0 ? "Ubah Catatan Bahan" : "Ubah Catatan Produk";
};

const uploadFile = (event: Event, index: string | number) => {
  const fileUpload = event.target.files[0];
  if (fileUpload) {
    documentList.value[0].fileName = fileUpload.name;
    documentList.value[0].file = fileUpload;
  }
};

const handleSubmit = () => {
  confirmSaveDialog.value = false;

  // submit simpan
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

const handleSelectFile = (newFile: any, type: string) => {
  if (!newFile) return;

  const validFileTypes = ["image/jpeg", "image/png"].includes(newFile.type);
  if (!validFileTypes)
    useSnackbar().sendSnackbar(
      `Upload ${type} dalam bentuk gambar berformat png/jpg/jpeg`,
      "error"
    );
};

const handleUploadFile = async (event: any) => {
  if (event?.target?.files.length) {
    const fileData = event.target.files[0];

    if (["image/jpeg", "image/png"].includes(fileData.type)) {
      uploadedFile.value.name = fileData.name;
      uploadedFile.value.file = fileData;
      try {
        const response = await uploadDocument(fileData);
        if (response.code === 2000) {
          formAddLayout.value = {
            ...formAddLayout.value,
            file_layout: response.data.file_url,
          };
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const pageLayout = ref(1);
const sizeLayout = ref(10);
const pageCatatanBahan = ref(1);
const sizeCatatanBahan = ref(10);
const pageCatatanProduk = ref(1);
const sizeCatatanProduk = ref(10);

const getListLayout = async (page = 1, size = 10) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-proses/list-layout",
    {
      method: "get",
      query: { id, page, size },
    }
  );

  if (response.code === 2000) {
    layoutData.value = {
      ...layoutData.value,
      value: response.data,
      totalItem: response.total_data,
    };
  }

  return response || [];
};

const pageDiagramAlur = ref(1);
const itemsPerPageDiagramAlur = ref(10);

const getListDigaramAlur = async (page = 10, size = 10) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-proses/diagram-alur/list",
    {
      method: "get",
      query: {
        id,
        page,
        size,
      },
    }
  );

  if (response.code === 2000) {
    processProduction.value = {
      ...processProduction.value,
      value: response.data,
      totalItem: response.total_data,
    };
  }

  return response || [];
};

const getListHasilProduksi = async (page = 1, size = 10) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-proses/hasil-produksi/list",
    {
      method: "get",
      query: { id, page, size },
    }
  );

  if (response.code === 2000) {
    catatanHasilProduksi.value = {
      ...catatanHasilProduksi.value,
      value: response.data,
      totalItem: response.total_data,
    };
  }

  return response || [];
};

const getListCatatanDistribusi = async (page = 1, size = 10) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-proses/catatan-distribusi/list",
    {
      method: "get",
      query: { id, page, size },
    }
  );

  if (response.code === 2000) {
    catatanDistribusi.value = {
      ...catatanDistribusi.value,
      value: response.data,
      totalItem: response.total_data,
    };
  }

  return response || [];
};

const getListFactory = async () => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-proses/list-factory",
    {
      method: "get",
      query: {
        id,
        page: page.value,
        size: size.value,
      },
    }
  );

  if (response.code === 2000) {
    listFactory.value = response.data;
    selectedFactory.value = response.data?.[0];
  }

  return response || [];
};

const getListProduct = async () => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-proses/list-product",
    {
      method: "get",
      query: {
        id,
        page: page.value,
        size: size.value,
      },
    }
  );

  if (response.code === 2000) {
    listProduk.value = response.data || [];
    selectedProduct.value = response.data?.[0] || {};
  }

  return response || [];
};

const getCatatanBahanOrProduk = async (page, size, type) => {
  if (type == 0) await getListCatatanBahan(page, size);

  await getListCatatanProduk(page, size);
};

const getListCatatanBahan = async (page, size) => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-proses/list-catatan-bahan",
    {
      method: "get",
      query: { id, page, size },
    }
  );

  if (response.code === 2000) {
    console.log(response);
    materialAndProduct.value[0].value = response.data;
    materialAndProduct.value[0].totalItem = response.total_data;
  }

  return response || [];
};

const getListCatatanProduk = async () => {
  const response: any = await $api(
    "/reguler/pelaku-usaha/tab-proses/list-catatan-produk",
    {
      method: "get",
      query: {
        id,
        page: pageCatatanProduk.value,
        size: sizeCatatanProduk.value,
      },
    }
  );

  if (response.code === 2000) {
    catatanProduk.value = response.data;
    materialAndProduct.value[1].value = response.data;
    materialAndProduct.value[1].totalItem = response.total;
  }

  return response || [];
};

const addProcess = () => {
  catatan.value.diagramProcess.push(catatan.value.process);
  catatan.value.process = "";
};

const formattedArray = computed({
  get() {
    if (catatan.value.diagramProcess !== []) {
      return catatan.value.diagramProcess
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n");
    }
  },
  set(value) {
    if (catatan.value.diagramProcess.length > 0) {
      catatan.value.diagramProcess = value
        .split("\n")
        .map((item) => item.replace(/^\d+\.\s*/, ""));
    }
  },
});

const handleAddOrEdit = async () => {
  if (titleDialog.value === "Ubah Catatan Bahan") {
    let body: any = {};
    if (tabs.value === "2") {
      body = {
        id_bahan: detailItem.value?.id_bahan,
        jumlah: +detailItem.value.jumlah,
        tanggal_masuk: formatDateId(detailItem.value.tanggal_masuk),
        tanggal_keluar: formatDateId(detailItem.value.tanggal_keluar),
      };
    } else {
      body = {
        nama_produk: detailItem.value.nama_bahan,
        file_dok: formAddLayout.value.file_layout,
      };
    }

    if (detailItem.value?.id_bahan_penyimpanan !== "") {
      const response: any = await $api(
        "/reguler/pelaku-usaha/tab-proses/update-product",
        {
          method: "put",
          query: { id, id_narasi: detailItem.value?.id_bahan_penyimpanan },
          body,
        }
      );

      if (response.code === 2000) {
        resetForm();
        addDialog.value = false;
        getListLayout();
        getListFactory();
        getListCatatanBahan(pageCatatanBahan.value, sizeCatatanBahan.value);
        useSnackbar().sendSnackbar("Sukses menambah data", "success");
      }
    } else {
      const response: any = await $api(
        "/reguler/pelaku-usaha/tab-proses/add-product",
        {
          method: "post",
          query: { id },
          body,
        }
      );

      if (response.code === 2000) {
        resetForm();
        addDialog.value = false;
        getListLayout();
        getListFactory();
        getListCatatanBahan(pageCatatanBahan.value, sizeCatatanBahan.value);
        useSnackbar().sendSnackbar("Sukses menambah data", "success");
      }
    }
  } else if (titleDialog.value === "Ubah Catatan Produk") {
    let body: any = {};
    if (tabs.value === "2") {
      console.log(selectedProduct.value, "selectedProduct");
      body = {
        id_produk: detailItem.value.id_reg_prod,
        jumlah: +detailItem.value.jumlah,
        tanggal_masuk: formatDateId(detailItem.value.tanggal_masuk),
        tanggal_keluar: formatDateId(detailItem.value.tanggal_keluar),
      };
    } else {
      body = {
        nama_produk: detailItem.value.nama_produk,
        file_dok: formAddLayout.value.file_layout,
      };
    }

    if (detailItem.value?.id_prod_penyimpanan !== "") {
      const response: any = await $api(
        "/reguler/pelaku-usaha/tab-proses/update",
        {
          method: "put",
          query: { id, id_narasi: detailItem.value?.id_prod_penyimpanan },
          body,
        }
      );

      if (response.code === 2000) {
        resetForm();
        addDialog.value = false;
        getListLayout();
        getListFactory();
        getListCatatanBahan(pageCatatanBahan.value, sizeCatatanBahan.value);
        getListCatatanProduk();
        useSnackbar().sendSnackbar("Sukses menambah data", "success");
      }
    } else {
      const response: any = await $api(
        "/reguler/pelaku-usaha/tab-proses/add-catatan-product",
        {
          method: "post",
          query: { id },
          body,
        }
      );

      if (response.code === 2000) {
        resetForm();
        addDialog.value = false;
        getListLayout();
        getListFactory();
        getListCatatanBahan(pageCatatanBahan.value, sizeCatatanBahan.value);
        getListCatatanProduk();
        useSnackbar().sendSnackbar("Sukses menambah data", "success");
      }
    }
  } else if (titleDialog.value === "Tambah Diagram Alur Proses") {
    let body: any = {};
    if (tabs.value === "2") {
      body = {
        nama_produk: catatan.value.name,
        narasi: formattedArray.value,
      };
    } else {
      body = {
        nama_produk: catatan.value.name,
        file_dok: formAddLayout.value.file_layout,
      };
    }

    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-proses/diagram-alur/add",
      {
        method: "post",
        query: { id },
        body,
      }
    );

    if (response.code === 2000) {
      resetForm();
      addDialog.value = false;
      getListDigaramAlur(pageDiagramAlur.value, itemsPerPageDiagramAlur.value);
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else if (titleDialog.value === "Ubah Diagram Alur Proses") {
    let body: any = {};
    if (tabs.value === "2") {
      body = {
        nama_produk: catatan.value.name,
        narasi: formattedArray.value,
      };
    } else {
      body = {
        nama_produk: catatan.value.name,
        file_dok: formAddLayout.value.file_layout,
      };
    }

    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-proses/diagram-alur/update",
      {
        method: "put",
        query: { id, id_narasi: detailItem.value?.id_narasi },
        body,
      }
    );

    if (response.code === 2000) {
      resetForm();
      addDialog.value = false;
      getListDigaramAlur(pageDiagramAlur.value, itemsPerPageDiagramAlur.value);
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else if (titleDialog.value === "Tambah Catatan Hasil Produksi") {
    let body: any = {};
    if (tabs.value === "2") {
      body = {
        id_produk: selectedProduct.value.id,
        jumlah: +selectedProduct.value?.jumlah,
        tanggal_produksi: formatDateId(selectedProduct.value?.tanggal_masuk),
        tanggal_kadaluarsa: formatDateId(selectedProduct.value?.tanggal_keluar),

        // nama_produk: payloadHasilProduksi.value?.nama_produk,
      };
    } else {
      body = {
        nama_produk: payloadHasilProduksi.value?.nama_produk,
        file_dok: formAddLayout.value.file_layout,
      };
    }

    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-proses/hasil-produksi/add",
      {
        method: "post",
        query: {
          id,
          page: page.value,
          size: size.value,
        },
        body,
      }
    );

    if (response.code === 2000) {
      resetForm();
      addDialog.value = false;
      getListHasilProduksi();
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else if (titleDialog.value === "Ubah Catatan Hasil Produksi") {
    console.log(selectedProduct.value, "selectedProduct", detailItem.value);
    let body: any = {};
    if (tabs.value === "2") {
      body = {
        id_produk: selectedProduct?.value?.id_reg_prod,
        jumlah: +selectedProduct.value?.jumlah,
        tanggal_produksi: formatDateId(selectedProduct.value?.tanggal_masuk),
        tanggal_kadaluarsa: formatDateId(selectedProduct.value?.tanggal_keluar),

        // nama_produk: payloadHasilProduksi.value?.nama_produk,
      };
    } else {
      body = {
        nama_produk: payloadHasilProduksi.value?.nama_produk,
        file_dok: formAddLayout.value.file_layout || uploadedFile.value?.file,
      };
    }

    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-proses/hasil-produksi/update",
      {
        method: "put",
        query: { id, id_narasi: detailItem.value?.id_hasil_produksi },
        body,
      }
    );

    if (response.code === 2000) {
      resetForm();
      addDialog.value = false;
      getListHasilProduksi();
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else if (titleDialog.value === "Tambah Catatan Distribusi") {
    let body: any = {};
    if (tabs.value === "2") {
      body = {
        id_produk: selectedProduct.value.id_reg_prod,
        jumlah: +selectedProduct.value?.jumlah,
        tanggal: formatDateId(selectedProduct.value?.tanggal),
        tujuan: selectedProduct.value?.tujuan,

        // nama_produk: payloadHasilProduksi.value?.nama_produk,
      };
    } else {
      body = {
        nama_produk: payloadHasilDistribusi.value?.nama_produk,
        file_dok: formAddLayout.value.file_layout,
      };
    }

    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-proses/catatan-distribusi/add",
      {
        method: "post",
        query: { id },
        body,
      }
    );

    if (response.code === 2000) {
      resetForm();
      addDialog.value = false;
      getListCatatanDistribusi();
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else if (titleDialog.value === "Ubah Catatan Distribusi") {
    let body: any = {};
    if (tabs.value === "2") {
      body = {
        id_produk: selectedProduct.value.id,
        jumlah: +selectedProduct.value?.jumlah,
        tanggal: formatDateId(selectedProduct.value?.tanggal),
        tujuan: selectedProduct.value?.tujuan,

        // nama_produk: payloadHasilProduksi.value?.nama_produk,
      };
    } else {
      body = {
        nama_produk: payloadHasilDistribusi.value?.nama_produk,
        file_dok:
          formAddLayout.value.file_layout || payloadHasilDistribusi.value?.file,
      };
    }

    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-proses/catatan-distribusi/update",
      {
        method: "put",
        query: { id, id_narasi: detailItem.value?.id_prod_distribusi },
        body,
      }
    );

    if (response.code === 2000) {
      resetForm();
      addDialog.value = false;
      getListCatatanDistribusi();
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } else {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-proses/add-layout",
      {
        method: "post",
        query: { id },
        body: formAddLayout.value,
      }
    );

    if (response.code === 2000) {
      resetForm();
      addDialog.value = false;
      getListLayout();
      getListFactory();
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  }
};

const onDelete = async (item: any) => {
  try {
    const response: any = await $api(
      "/reguler/pelaku-usaha/tab-proses/remove-layout",
      {
        method: "delete",
        body: { id, id_reg_layout: item.id_reg_layout },
      }
    );

    if (response.code === 2000) {
      resetForm();
      addDialog.value = false;
      getListLayout();
      useSnackbar().sendSnackbar("Sukses menambah data", "success");
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  loading.value = true;
  await Promise.allSettled([
    getListLayout(),
    getListFactory(),
    getListCatatanBahan(pageCatatanBahan.value, sizeCatatanBahan.value),
    getListCatatanProduk(),
    getListDigaramAlur(pageDiagramAlur.value, itemsPerPageDiagramAlur.value),
    getListHasilProduksi(),
    getListCatatanDistribusi(),
    getListProduct(),
  ]);
  loading.value = false;
});

watch(selectedFactory, () => {
  formAddLayout.value = {
    ...formAddLayout.value,
    nama_pabrik: selectedFactory.value?.nama,
    id_pabrik: selectedFactory.value?.id_pabrik,
  };
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
    <DialogWithAction
      :title="titleDialog"
      :is-open="addDialog"
      :label-save-btn="labelSaveBtn"
      :toggle="() => (addDialog = false)"
      :on-save="handleAddOrEdit"
    >
      <template #content>
        <div v-if="titleDialog === 'Tambah Layout'">
          <p class="label-pengajuan">Pabrik</p>
          <VSelect
            v-model="selectedFactory"
            :items="listFactory"
            outlined
            placeholder="pilih pabrik"
            item-title="nama"
            item-value="nama_pabrik"
            default-value="'pilih'"
            return-object
          />
          <br />
          <VRow class="mb-3" align="center">
            <VCol cols="6">
              <label> Unggah Layout </label>
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
                accept="image/png, image/jpeg"
                @change="handleUploadFile"
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
                  File layout harus dalam bentuk gambar berformat (jpeg/jpg/png)
                </template>
              </VAlert>
            </VCol>
          </VRow>
        </div>
        <div v-if="titleDialog === 'Ubah Catatan Bahan'">
          <div class="d-flex justify-center">
            <!-- batas add -->

            <VTabs
              v-model="tabs"
              v-if="editAddtype === false"
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
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
            <!-- batas edit -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype"
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
                v-if="typeAdd === 'Unggah'"
              >
                <span>Unggah File </span>
              </VTab>
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
                v-if="typeAdd === 'Manual'"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsItems v-model="tabs">
            <VTabItem>
              <div v-if="tabs === '2'" class="mt-5">
                <label>Nama Produk</label>
                <VTextField
                  v-model="detailItem.nama_bahan"
                  class="-mt-10"
                  placeholder="isi judul"
                  disabled
                />
                <br />
                <label class="label-pengajuan"> Jumlah </label>
                <VTextField
                  v-model="detailItem.jumlah"
                  class="-mt-10"
                  placeholder="isi nama bahan"
                />
                <VRow class="mt-2">
                  <VCol>
                    <label>Tanggal Masuk</label>
                    <VueDatePicker
                      id="tanggalDocument"
                      v-model="detailItem.tanggal_masuk"
                      teleport-center
                      :enable-time-picker="false"
                      placeholder="tanggal masuk"
                      required
                    />
                  </VCol>
                  <VCol>
                    <label>Tanggal Keluar</label>
                    <VueDatePicker
                      id="tanggalDocument"
                      v-model="detailItem.tanggal_keluar"
                      teleport-center
                      :enable-time-picker="false"
                      placeholder="tanggal masuk"
                      required
                    />
                  </VCol>
                </VRow>
              </div>
              <div v-else class="mt-10">
                <label>Nama Bahan</label>
                <VTextField
                  v-model="detailItem.nama_bahan"
                  class="-mt-10"
                  placeholder="isi judul"
                  disabled
                />
                <br />
                <VRow class="mb-3" align="center">
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
                      accept="image/png, image/jpeg"
                      @change="handleUploadFile"
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
                        File foto harus dalam bentuk gambar berformat
                        (jpeg/jpg/png)
                      </template>
                    </VAlert>
                  </VCol>
                </VRow>
              </div>
            </VTabItem>
          </VTabsItems>
        </div>
        <div v-if="titleDialog === 'Ubah Catatan Produk'">
          <div class="d-flex justify-center">
            <!-- batas add -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype === false"
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
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
            <!-- batas edit -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype"
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
                v-if="typeAdd === 'Unggah'"
              >
                <span>Unggah File </span>
              </VTab>
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
                v-if="typeAdd === 'Manual'"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsItems v-model="tabs">
            <VTabItem>
              <div v-if="tabs === '2'" class="mt-5">
                <label>Nama Produk</label>
                <VTextField
                  v-model="detailItem.nama_produk"
                  class="-mt-10"
                  placeholder="isi judul"
                  disabled
                />
                <br />
                <label class="label-pengajuan"> Jumlah </label>
                <VTextField
                  v-model="detailItem.jumlah"
                  class="-mt-10"
                  placeholder="isi nama bahan"
                />
                <VRow class="mt-2">
                  <VCol>
                    <label>Tanggal Masuk</label>
                    <VueDatePicker
                      id="tanggalDocument"
                      v-model="detailItem.tanggal_masuk"
                      teleport-center
                      :enable-time-picker="false"
                      placeholder="tanggal masuk"
                      required
                    />
                  </VCol>
                  <VCol>
                    <label>Tanggal Keluar</label>
                    <VueDatePicker
                      id="tanggalDocument"
                      v-model="detailItem.tanggal_keluar"
                      teleport-center
                      :enable-time-picker="false"
                      placeholder="tanggal masuk"
                      required
                    />
                  </VCol>
                </VRow>
              </div>
              <div v-else class="mt-10">
                <label>Nama</label>
                <VTextField
                  v-model="detailItem.nama_produk"
                  class="-mt-10"
                  placeholder="isi judul"
                  disabled
                />
                <br />
                <VRow class="mb-3" align="center">
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
                      accept="image/png, image/jpeg"
                      @change="handleUploadFile"
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
                        File foto harus dalam bentuk gambar berformat
                        (jpeg/jpg/png)
                      </template>
                    </VAlert>
                  </VCol>
                </VRow>
              </div>
            </VTabItem>
          </VTabsItems>
        </div>
        <div
          v-if="
            titleDialog === 'Tambah Diagram Alur Proses' ||
            titleDialog === 'Ubah Diagram Alur Proses'
          "
        >
          <div class="d-flex justify-center">
            <!-- batas add -->
            <!-- {{editAddtype}} -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype === false"
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
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
            <!-- batas edit -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype"
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
                v-if="typeAdd === 'Unggah'"
              >
                <span>Unggah File </span>
              </VTab>
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
                v-if="typeAdd === 'Manual'"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsItems v-model="tabs">
            <VTabItem>
              <div v-if="tabs === '2'" class="mt-5">
                <div>
                  <br />
                  <label>Judul Proses</label>
                  <VTextField
                    v-model="catatan.name"
                    class="-mt-10"
                    placeholder="isi judul"
                  />
                  <br />
                  <label>Proses</label>
                  <VTextField
                    v-model="catatan.process"
                    placeholder="Isi Process"
                    class="mb-1"
                  />
                  <div class="d-flex justify-end mt-3">
                    <VBtn
                      color="primary"
                      variant="outlined"
                      @click="addProcess"
                    >
                      Tambah Proses
                    </VBtn>
                  </div>
                  <br />
                  <label>Detail Proses</label>
                  <VTextarea
                    id="diagramProcess"
                    v-model="formattedArray"
                    placeholder="Isi Process"
                    class="mb-2"
                  />
                </div>
              </div>
              <div v-else class="mt-10">
                <label>Judul Proses</label>
                <VTextField
                  v-model="catatan.name"
                  class="-mt-10"
                  placeholder="isi judul"
                />
                <br />
                <VRow class="mb-3" align="center">
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
                      accept="image/png, image/jpeg"
                      @change="handleUploadFile"
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
                        File foto harus dalam bentuk gambar berformat
                        (jpeg/jpg/png)
                      </template>
                    </VAlert>
                  </VCol>
                </VRow>
              </div>
            </VTabItem>
          </VTabsItems>
        </div>
        <div
          v-if="
            titleDialog === 'Tambah Catatan Hasil Produksi' ||
            titleDialog === 'Ubah Catatan Hasil Produksi'
          "
        >
          <div class="d-flex justify-center">
            <!-- batas add -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype === false"
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
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
            <!-- batas edit -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype"
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
                v-if="typeAdd === 'Unggah'"
              >
                <span>Unggah File </span>
              </VTab>
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
                v-if="typeAdd === 'Manual'"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsItems v-model="tabs">
            <VTabItem>
              <div v-if="tabs === '2'" class="mt-5">
                <div>
                  <br />
                  <label>Nama Produk</label>
                  <VSelect
                    v-model="payloadHasilProduksi.nama_produk"
                    :items="listProduk"
                    outlined
                    placeholder="pilih pabrik"
                    item-title="nama"
                    item-value="id"
                    default-value="'pilih'"
                    return-object
                    :disabled="titleDialog === 'Ubah Catatan Hasil Produksi'"
                  />
                  <br />
                  <label>Jumlah</label>
                  <VTextField
                    v-model="selectedProduct.jumlah"
                    class="-mt-10"
                    placeholder="isi judul"
                  />
                  <VRow class="mt-2">
                    <VCol>
                      <label>Tanggal Produksi</label>
                      <VueDatePicker
                        id="tanggalDocument"
                        v-model="selectedProduct.tanggal_masuk"
                        teleport-center
                        :enable-time-picker="false"
                        placeholder="tanggal masuk"
                        format="dd/MM/yyyy"
                        required
                      />
                    </VCol>
                    <VCol>
                      <label>Tanggal Kadaluarsa</label>
                      <VueDatePicker
                        id="tanggalDocument"
                        v-model="selectedProduct.tanggal_keluar"
                        teleport-center
                        :enable-time-picker="false"
                        placeholder="tanggal masuk"
                        format="dd/MM/yyyy"
                        required
                      />
                    </VCol>
                  </VRow>
                </div>
              </div>
              <div v-else class="mt-10">
                <label>Judul Proses</label>
                <VTextField
                  v-model="payloadHasilProduksi.nama_produk"
                  class="-mt-10"
                  placeholder="isi judul"
                  :disabled="titleDialog === 'Ubah Catatan Hasil Produksi'"
                />
                <br />
                <VRow class="mb-3" align="center">
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
                      accept="image/png, image/jpeg"
                      @change="handleUploadFile"
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
                        File foto harus dalam bentuk gambar berformat
                        (jpeg/jpg/png)
                      </template>
                    </VAlert>
                  </VCol>
                </VRow>
              </div>
            </VTabItem>
          </VTabsItems>
        </div>
        <div
          v-if="
            titleDialog === 'Tambah Catatan Distribusi' ||
            titleDialog === 'Ubah Catatan Distribusi'
          "
        >
          <div class="d-flex justify-center">
            <!-- batas add -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype"
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
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
            <!-- batas edit -->
            <VTabs
              v-model="tabs"
              v-if="editAddtype"
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
                v-if="typeAdd === 'Unggah'"
              >
                <span>Unggah File </span>
              </VTab>
              <VTab
                value="2"
                active-color="primary"
                base-color="#f0dcf5"
                style="border-radius: 40px;"
                hide-slider
                variant="flat"
                height="40px"
                v-if="typeAdd === 'Manual'"
              >
                <span> Tambah Manual </span>
              </VTab>
            </VTabs>
          </div>
          <VTabsItems v-model="tabs">
            <VTabItem>
              <div v-if="tabs === '2'" class="mt-5">
                <div>
                  <br />
                  <label>Nama Produk</label>
                  <VSelect
                    v-model="payloadHasilDistribusi.nama_produk"
                    :items="listProduk"
                    outlined
                    placeholder="pilih pabrik"
                    item-title="nama"
                    item-value="id"
                    default-value="'pilih'"
                    :disabled="titleDialog === 'Ubah Catatan Distribusi'"
                  />
                  <br />
                  <label>Jumlah</label>
                  <VTextField
                    v-model="selectedProduct.jumlah"
                    class="-mt-10"
                    placeholder="isi judul"
                  />
                  <br />
                  <label>Tanggal</label>
                  <VueDatePicker
                    id="tanggalDocument"
                    v-model="selectedProduct.tanggal"
                    teleport-center
                    :enable-time-picker="false"
                    placeholder="tanggal masuk"
                    format="dd/MM/yyyy"
                    required
                  />
                  <br />
                  <label>Tujuan</label>
                  <VTextField
                    v-model="selectedProduct.tujuan"
                    class="-mt-10"
                    placeholder="isi judul"
                  />
                </div>
              </div>
              <div v-else class="mt-10">
                <label>Judul Proses</label>
                <VTextField
                  v-model="payloadHasilDistribusi.nama_produk"
                  class="-mt-10"
                  placeholder="isi judul"
                  :disabled="titleDialog === 'Ubah Catatan Distribusi'"
                />
                <br />
                <VRow class="mb-3" align="center">
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
                      accept="image/png, image/jpeg"
                      @change="handleUploadFile"
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
                        File foto harus dalam bentuk gambar berformat
                        (jpeg/jpg/png)
                      </template>
                    </VAlert>
                  </VCol>
                </VRow>
              </div>
            </VTabItem>
          </VTabsItems>
        </div>
      </template>
    </DialogWithAction>
    <TableData
      :on-submit="() => (confirmSaveDialog = true)"
      :on-add="() => toggleAdd('Layout')"
      :on-edit="(item:any) => toggleEdit(item, 'Layout')"
      :on-delete="onDelete"
      :data="layoutData"
      title="Layout / Denah Ruang Produksi"
      with-add-button
      :hide-default-footer="false"
      :isviewonly="isviewonly"
      table-type="server"
      :load-server-item="getListLayout"
    />
    <br />
    <TableDataWith2Table
      :isviewonly="isviewonly"
      :on-submit="() => (confirmSaveDialog = true)"
      :on-edit="(item:any, index:number) => toggleEdit2Table(item, index)"
      :data="materialAndProduct"
      :hide-default-footer="false"
      table-type="server"
      :load-server-item="getCatatanBahanOrProduk"
      title="Catatan Penyimpanan Bahan dan Produk"
    >
      <template #subTitle1>
        <p class="label-pengajuan font-weight-bold mt-2">
          Tambah Catatan Bahan
        </p>
      </template>
      <template #subTitle2>
        <p class="label-pengajuan font-weight-bold mt-5">
          Tambah Catatan Produk
        </p>
      </template>
    </TableDataWith2Table>
    <br />
    <TableData
      :on-submit="() => (confirmSaveDialog = true)"
      :on-add="() => toggleAdd('Diagram Alur Proses')"
      :on-edit="(item: any) => toggleEdit(item, 'Diagram Alur Proses')"
      :data="processProduction"
      title="Diagram Alur Proses Produksi"
      with-add-button
      :hide-default-footer="false"
      :isviewonly="isviewonly"
      table-type="server"
      :server-function="getListDigaramAlur"
    />
    <br />
    <TableData
      :on-submit="() => (confirmSaveDialog = true)"
      :on-edit="(item: any) => toggleEdit(item, 'Catatan Hasil Produksi')"
      :on-add="() => toggleAdd('Catatan Hasil Produksi')"
      :data="catatanHasilProduksi"
      title="Catatan Hasil Produksi"
      :hide-default-footer="false"
      table-type="server"
      with-add-button
      :isviewonly="isviewonly"
      :server-function="getListHasilProduksi"
    />
    <br />
    <TableData
      :on-submit="() => (confirmSaveDialog = true)"
      :on-edit="(item: any) => toggleEdit(item, 'Catatan Distribusi')"
      :on-add="() => toggleAdd('Catatan Distribusi')"
      :data="catatanDistribusi"
      title="Catatan Distribusi / Penjualan Produk"
      with-add-button
      :hide-default-footer="false"
      table-type="server"
      :isviewonly="isviewonly"
      :server-function="getListCatatanDistribusi"
    />
  </div>
</template>

<style scoped lang="scss">
.text-center {
  text-align: center;
}

.bgContent {
  border-radius: 10px;
  background-color: #f0e9f1;
}

.progress-text {
  font-size: 14px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
}

.custom-date-input .v-input__control {
  position: relative;
}

.custom-date-input input[type="date"] {
  padding-inline-end: 40px; /* Ensure there is space on the right for the icon */
}

.custom-date-input .v-input__icon--append {
  inset-inline-end: 0;
}
</style>

<style lang="css">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
