// Link of Sidebar code https://codesandbox.io/p/sandbox/sidebar-tailwind-8dkck3?file=%2Fsrc%2Fcomponents%2Fstructure.ts%3A15%2C23

const sidebarStructure = [
  {
    id: "dashboard",
    title: "Dashboard",
    name: "home",
    parent: true,
    icon: "dasbor",
    link: "/dashboard",
  },
  {
    id: "catalogue",
    title: "Catalogue",
    name: "catalogue",
    parent: true,
    icon: "catalogue",
    child: [
      {
        id: "catalogues_list",
        title: "Catalogues",
        name: "/catalogues",
        link: "catalogues_list",
        icon: "dot",
      },
      // {
      //   id: "categories_list",
      //   title: "Categories",
      //   name: "/categories",
      //   link: "categories_list",
      //   icon: "dot",
      // },
      // {
      //   id: "products_list",
      //   title: "Products",
      //   name: "/products",
      //   link: "products_list",
      //   icon: "dot",
      // },
      // {
      //   id: "old_catalogues",
      //   title: "Old Catalogue Form",
      //   name: "/old_catalogue",
      //   link: "old_catalogues",
      //   icon: "dot",
      // },
    ],
  },
  {
    id: "perusahaan",
    title: "Perusahaan",
    name: "perusahaan",
    parent: true,
    icon: "perusahaan",
    child: [
      {
        id: "profile-perusahaan",
        title: "Profil Perusahaan",
        name: "perusahaan.profil",
        link: "/dashboard/company-profile",
        icon: "dot",
      },
      {
        id: "akun-bank",
        title: "Akun Bank",
        name: "perusahaan.bank",
        link: "/dashboard/bank-account",
        icon: "dot",
      },
      {
        id: "alamat",
        title: "Alamat",
        name: "perusahaan.alamat",
        link: "/dashboard/company-address/shipping",
        icon: "dot",
        child: [
          {
            id: "alamat-pengiriman",
            title: "Alamat Pengiriman",
            name: "perusahaan.alamat.pengiriman",
            link: "/dashboard/company-address/shipping",
            icon: "dot",
          },
          {
            id: "alamat-tagihan",
            title: "Alamat Tagihan",
            name: "perusahaan.alamat.tagihan",
            link: "/dashboard/company-address/billing",
            icon: "dot",
          },
        ],
      },
      {
        id: "daftar-akun-pengguna",
        title: "Daftar Akun Pengguna",
        name: "perusahaan.akun",
        link: "/dashboard/user-account",
        icon: "dot",
      },
      {
        id: "departemen",
        title: "Departemen",
        name: "perusahaan.department",
        link: "/dashboard/department",
        icon: "dot",
      },
      {
        id: "manajemen-persetujuan",
        title: "Manajemen Persetujuan",
        name: "perusahaan.persetujuan",
        icon: "dot",
        child: [
          {
            id: "penyetuju-kategori",
            title: "Penyetuju Kategori",
            name: "perusahaan.persetujuan.kategori",
            link: "/dashboard/approval/category",
            icon: "dot",
          },
          {
            id: "penyetuju-departement",
            title: "Penyetuju Departemen",
            name: "perusahaan.persetujuan.departemen",
            link: "/dashboard/approval/department",
            icon: "dot",
          },
          {
            id: "e-procurement",
            title: "E-procurement",
            name: "perusahaan.persetujuan.proc",
            link: "/dashboard/approval/eproc",
            icon: "dot",
          },
          {
            id: "pengaturan",
            title: "Pengaturan",
            name: "perusahaan.persetujuan.config",
            link: "/dashboard/approval/configure",
            icon: "dot",
          },
        ],
      },
      {
        id: "pengaturan-pembelian",
        title: "Pengaturan Pembelian",
        name: "perusahaan.pengaturan.pembelian",
        icon: "dot",
        child: [
          {
            id: "anggaran",
            title: "Anggaran",
            name: "perusahaan.pengaturan.pembelian.anggaran",
            link: "/dashboard/purchase-setting/budget",
            icon: "dot",
          },
        ],
      },
    ],
  },
  {
    id: "mou",
    title: "MOU",
    name: "mou",
    parent: true,
    icon: "mou",
    link: "/dashboard/mou",
  },
  {
    id: "pusat-unduh-data",
    title: "Pusat Unduh Data",
    name: "pusatunduhdata",
    parent: true,
    icon: "pusatunduhdata",
    child: [
      {
        id: "unduh-data-transaksi",
        title: "Unduh Data Transaksi",
        name: "pusatunduhdata.unduhdatatransaksi",
        link: "/dashboard/download/transaction",
        icon: "dot",
      },
      {
        id: "unduh-data-perusahaan",
        title: "Unduh Data Perusahaan",
        name: "pusatunduhdata.unduhdataperusahaan",
        link: "/dashboard/download/company",
        icon: "dot",
      },
      {
        id: "unduh-data-mou",
        title: "Unduh Data MOU",
        name: "pusatunduhdata.unduhdatamou",
        link: "/dashboard/download/mou",
        icon: "dot",
      },
    ],
  },
];

export { sidebarStructure };