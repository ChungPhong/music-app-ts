interface FilterStatus {
  name: string;
  status: string;
  class: string;
}

interface Query {
  status?: string; // Có thể không có giá trị (undefined)
}

const filterStatusHelpers = (query: Query): FilterStatus[] => {
  let filterStatus: FilterStatus[] = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status === query.status
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status === "");
    filterStatus[index].class = "active";
  }

  return filterStatus;
};

export default filterStatusHelpers;
