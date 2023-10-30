import React, { useState, useRef } from "react";
import { Space, Table, Tag, Input, Button, Upload, message, Modal } from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import {} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import * as XLSX from "xlsx";
const Customer = () => {
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("customers")) || [
      {
        id: 1,
        create_at: "10/24/2023",
        update_at: "10/24/2023",
        update_by: "admin",
        create_by: "admin",
        name: "Tuan",
        phone: "0564243269",
        address: "Ha Noi",
      },
      {
        id: 2,
        create_at: "10/24/2023",
        update_at: "10/24/2023",
        update_by: "admin",
        create_by: "admin",
        name: "Son ",
        phone: "0863058308",
        address: "Ha Noi",
      },
      {
        id: 3,
        create_at: "10/24/2023",
        update_at: "10/24/2023",
        update_by: "admin",
        create_by: "admin",
        name: "Sy",
        phone: "0531816432",
        address: "Ha Noi",
      },
      {
        id: 4,
        create_at: "10/24/2023",
        update_at: "10/24/2023",
        update_by: "admin",
        create_by: "admin",
        name: "Huong",
        phone: "0884136980",
        address: "Ha Noi",
      },
      {
        id: 5,
        create_at: "10/24/2023",
        update_at: "10/24/2023",
        update_by: "admin",
        create_by: "admin",
        name: "Huynh",
        phone: "0586935079",
        address: "Ha Noi",
      },
    ]
  );
  const headerXlsxFile = [
    {
      name: "sample",
      phone: "0999999999",
      address: "Viet Nam",
      note: "Note",
    },
  ];
  const [userLogged, setUserLogged] = useState(
    JSON.parse(localStorage.getItem("userLogged")) || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    updateToLocalStoreage(parsedData);

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
            className="bg-primary"
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Note",
      dataIndex: "note",
    },
    {
      title: "Create By",
      dataIndex: "create_by",
    },
    {
      title: "Update By",
      dataIndex: "update_by",
    },
    {
      title: "Create At",
      dataIndex: "create_at",
    },
    {
      title: "Update At",
      dataIndex: "update_at",
    },
  ];
  const updateToLocalStoreage = (parsedData) => {
    parsedData.map((item) => {
      const timeNow = new Date(Date.now()).toLocaleString().split(",")[0];
      const customer = {
        id: 1,
        create_at: timeNow,
        update_at: timeNow,
        update_by: userLogged[0].username,
        create_by: userLogged[0].username,

        ...item,
      };
      setData((prev) => {
        if (prev.length !== 0) {
          customer.id = prev.length + 1;
        }
        const newData = [...prev, customer];
        localStorage.setItem("customers", JSON.stringify(newData));
        return newData;
      });
    });
    message.success("Import success!");
  };
  const handleUpload = (e) => {
    try {
      if (!e.target.value.includes(".xlsx"))
        return message.error("Please import file xlsx!");
      const reader = new FileReader();
      console.log(e.target);
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setParsedData(parsedData);
      };
    } catch (err) {
      message.error("Import fail!");
    }
  };
  const createFile = () => {
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.json_to_sheet(headerXlsxFile);
    XLSX.utils.book_append_sheet(workbook, worksheet, "sample");
    XLSX.writeFile(workbook, "sample.xlsx");
  };
  return (
    <div className="">
      <Button
        type="primary"
        onClick={showModal}
        icon={<ImportOutlined />}
        className="bg-primary mb-4"
      >
        Import customer
      </Button>
      <Modal
        title="Upload file excel"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-primary" }}
        width={800}
      >
        <div className="flex justify-center gap-6 items-center flex-col bg-stone-100 py-4  border-dashed border-2 border-black-100 rounded">
          <div className="flex items-center flex-col">
            <ImportOutlined className="text-3xl text-blue-600" />
            <h2 className="font-bold text-xl">
              Choose the file to be imported
            </h2>
            <span>{}</span>
            <span className="opacity-80 text-lg">
              {"{"}
              Only.xlsx file format is supported
              {"}"}
            </span>
            {/* <span className="opacity-80 text-lg">
              Maximum upload file size is 5mb
            </span> */}
          </div>
          <div className="">
            <label
              id="file-input-label"
              for="file-input"
              className="bg-emerald-600 text-white text-xl m-auto w-36 block text-center rounded py-2 cursor-pointer"
            >
              Upload file
            </label>
            <input
              type="file"
              name="file-input"
              onChange={(e) => handleUpload(e)}
              accept=".xlsx"
              id="file-input"
              class="block file:hidden text-center"
            />
          </div>
          <div>
            <button
              type="primary"
              onClick={createFile}
              className="text-primary text-lg"
            >
              Download sample file for import
            </button>
          </div>
        </div>
      </Modal>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data}
        loading={loading}
      />
    </div>
  );
};
export default Customer;
