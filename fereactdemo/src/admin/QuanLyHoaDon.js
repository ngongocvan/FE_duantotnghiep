import React, { useState, useRef, useEffect } from "react";
import {
    DatePicker,
    Input,
    Select,
    Space,
    Button,
    Table,
    Modal,
    Form,
    message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./quanlyhoadon.css";
import { detailHoaDon, getHoaDon, updateHoaDon } from "../service/HoaDonService";
import moment from 'moment';
const QuanLyHoaDon = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null); // Khai báo searchInput
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [data, setData] = useState([]);
    const [isViewOnly, setIsViewOnly] = useState(false);
    const mapTrangThai = (trangThai) => {
        switch (trangThai) {
            case 0:
                return "Đã đặt";
            case 1:
                return "Đã đóng gói";
            case 2:
                return "Đang giao";
            case 3:
                return "Đã hủy";
            default:
                return "Unknown";
        }
    };
    useEffect(() => {
        fetchHoaDon();
    }, []);

    const fetchHoaDon = async () => {
        try {
            const result = await getHoaDon();
            const formattedData = result.data.map((item) => ({
                key: item.id,
                order_id: item.id,
                user: item.tenNguoiNhan,
                user_phone: item.sdtNguoiNhan,
                order_on: item.ngayTao ? moment(item.ngayTao).format('DD/MM/YYYY') : 'N/A',
                status: mapTrangThai(item.trangThai),
                trangThai: item.trangThai, // Lưu trạng thái số để dễ cập nhật
            }));
            setData(formattedData);
        } catch (error) {
            console.error("Lỗi khi fetch dữ liệu: ", error);
            message.error("Lỗi khi tải dữ liệu!");
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput} // Đảm bảo searchInput được tham chiếu đúng
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const handleEdit = async (record) => {
        try {
            const response = await detailHoaDon(record.order_id);
            const hoaDon = response.data;
            setEditingRecord({
                ...record,
                trangThai: hoaDon.trangThai,
                ngayTao: hoaDon.ngayTao ? moment(hoaDon.ngayTao) : null,
            });
            form.setFieldsValue({
                status: mapTrangThai(hoaDon.trangThai),
                user: hoaDon.tenNguoiNhan,
                user_phone: hoaDon.sdtNguoiNhan,
                order_on: hoaDon.ngayTao ? moment(hoaDon.ngayTao) : null,
            });
            setIsViewOnly(true);
            setIsModalVisible(true);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết hóa đơn:", error);
            message.error("Có lỗi xảy ra khi lấy chi tiết hóa đơn!");
        }
    };

    const handleSave = () => {
        form.validateFields().then(async (values) => {
            const trangThaiMoi = chuyenDoiTrangThai(values.status);

            try {
                await updateHoaDon(editingRecord.order_id, {
                    trangThai: trangThaiMoi,
                    tenNguoiNhan: values.user,
                    sdtNguoiNhan: values.user_phone,
                    ngayTao: values.order_on ? values.order_on.format('YYYY-MM-DD') : null,
                });

                await fetchHoaDon();

                setIsModalVisible(false);
                message.success("Cập nhật hóa đơn thành công!");
            } catch (error) {
                console.error("Lỗi khi cập nhật hóa đơn:", error);
                message.error("Có lỗi xảy ra khi cập nhật hóa đơn!");
            }
        });
    };

    const chuyenDoiTrangThai = (trangThai) => {
        switch (trangThai) {
            case "Đã đặt": return 0;
            case "Đã đóng gói": return 1;
            case "Đang giao": return 2;
            case "Đã hủy": return 3;
            default: return 0;
        }
    };

    const handleDelete = () => {
        Modal.confirm({
            title: "Are you sure you want to delete these orders?",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                const newData = data.filter(
                    (item) => !selectedRowKeys.includes(item.key)
                );
                setData(newData);
                setSelectedRowKeys([]); // Bỏ chọn tất cả các checkbox sau khi xóa
                setSelectAll(false); // Bỏ chọn checkbox chọn tất cả
                message.success("Orders deleted successfully!");
            },
        });
    };

    const handleDeleteSingle = (key) => {
        Modal.confirm({
            title: "Are you sure you want to delete this order?",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                const newData = data.filter((item) => item.key !== key);
                setData(newData);
                // Nếu hàng bị xóa là một trong những hàng đã chọn, cập nhật trạng thái của selectedRowKeys
                if (selectedRowKeys.includes(key)) {
                    setSelectedRowKeys(selectedRowKeys.filter((item) => item !== key));
                    setSelectAll(false);
                }
                message.success("Order deleted successfully!");
            },
        });
    };

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectedRowKeys(checked ? data.map((item) => item.key) : []);
        setSelectAll(checked);
    };

    const columns = [
        {
            title: "Order ID",
            dataIndex: "order_id",
            key: "order_id",
            width: "30%",
            ...getColumnSearchProps("order_id"),
        },
        {
            title: "User Name",
            dataIndex: "user",
            key: "user",
            width: "20%",
            ...getColumnSearchProps("user"),
        },
        {
            title: "User Phone",
            dataIndex: "user_phone",
            key: "user_phone",
            ...getColumnSearchProps("user_phone"),
        },
        {
            title: "Ordered On",
            dataIndex: "order_on",
            key: "order_on",
            ...getColumnSearchProps("order_on"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            ...getColumnSearchProps("status"),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button type="danger" onClick={() => handleDeleteSingle(record.key)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    const handleRowSelect = (key) => {
        const newSelectedRowKeys = selectedRowKeys.includes(key)
            ? selectedRowKeys.filter((item) => item !== key)
            : [...selectedRowKeys, key];
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectAll(newSelectedRowKeys.length === data.length);
    };

    return (
        <div>
            <div className="hd_content">
                <p style={{ fontSize: "20px" }}>QuanLyHoaDon</p>
            </div>
            <div className="action_hoadon">
                <div style={{ display: "flex", gap: "30px" }}>
                    <div className="filter">
                        <p>Filter by Status</p>
                        <Select
                            defaultValue="---All---"
                            style={{ width: 120 }}
                            onChange={(value) => console.log(`selected ${value}`)}
                            options={[
                                { value: "Đã đặt", label: "Đã đặt" },
                                { value: "Đã đóng gói", label: "Đã đóng gói" },
                                { value: "Đang giao", label: "Đang giao" },
                                { value: "Đã hủy", label: "Đã hủy" },
                            ]}
                        />
                    </div>
                    <div className="filter">
                        <p>Filter by Date</p>
                        <DatePicker
                            onChange={(date) => {
                                if (date && date.isValid()) {
                                    console.log("Valid Date:", date.format("YYYY-MM-DD"));
                                } else {
                                    console.log("Invalid Date");
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="filter_right">
                    <Button type="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
            <div className="order_container">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="key"
                    rowSelection={{
                        selectedRowKeys,
                        onChange: (keys) => {
                            setSelectedRowKeys(keys);
                            setSelectAll(keys.length === data.length);
                        },
                    }}
                    pagination={{ pageSize: 5 }} // Thay đổi số lượng hàng trên mỗi trang
                />
            </div>

            <Modal
                title="Chi tiết và Cập nhật Hóa đơn"
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="status" label="Trạng thái">
                        <Select
                            options={[
                                { value: "Đã đặt", label: "Đã đặt" },
                                { value: "Đã đóng gói", label: "Đã đóng gói" },
                                { value: "Đang giao", label: "Đang giao" },
                                { value: "Đã hủy", label: "Đã hủy" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="user" label="Tên người nhận">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="user_phone" label="Số điện thoại">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="order_on" label="Ngày đặt">
                        <DatePicker format="DD/MM/YYYY" disabled />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default QuanLyHoaDon;