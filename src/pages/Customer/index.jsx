import React, { useState, useRef } from "react";
import { Space, Table, Tag, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import * as XLSX from "xlsx";

const Customer = () => {
  const [loading, setLoading] = useState(false);
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
  const [userLogged, setUserLogged] = useState(
    JSON.parse(localStorage.getItem("userLogged")) || []
  );
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
  };
  const handleUpload = (e) => {
    try {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        updateToLocalStoreage(parsedData);
        message.success("Import success!");
      };
    } catch (err) {
      message.error("Import fail!");
    }
  };
  return (
    <>
      {/* <Upload onChange={(e) => handleUploadXlsx(e)}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload> */}
      <input type="file" onChange={(e) => handleUpload(e)} className="" />
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data}
        loading={loading}
      />
      ;
    </>
  );
};
export default Customer;
