import { Button, Form, Input, Modal, Radio, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { addKieuDang, deleteKieuDang, getKieuDang, updateKieuDang } from '../service/KieuDangService';

const KieuDang = () => {
    const [kieuDang, setKieuDang] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [value, setValue] = useState(1);
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [updattingKieuDang, setUpdattingDeGiay] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(null);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const trangThai = (status) => {
        return status === 0 ? "Không sử dụng" : "Đang sử dụng";
    }

    useEffect(() => {
        getAllKieuDang();
    }, []);

    const getAllKieuDang = async () => {
        try {
            const result = await getKieuDang();
            const dataKieuGiang = result.data.map((item, index) => ({
                key: index,
                ID: item.id,
                MA: item.ma,
                TEN: item.ten,
                TRANG_THAI: item.trangThai,
            }));
            setKieuDang(dataKieuGiang);
        } catch (error) {
            message.error("Lỗi load table kiểu dáng");
        }
    };

    const creatKieuDang = async () => {
        if (!ma || !ten) {
            message.error("Không được để trống mã và tên");
        }
        const newTrangThai = value === 1 ? 1 : 0;
        const newKieuDang = {
            ma: ma,
            ten: ten,
            trangThai: newTrangThai,
        };
        try {
            await addKieuDang(newKieuDang);
            message.success("Thêm mới kiểu dáng thành công");
            getAllKieuDang();
            setMa("");
            setTen("");
            setValue(0);
        } catch (error) {
            message.error("Lỗi không thể thêm kiểu dáng của giày");
        }
    };

    const removeKieuDang = async (record) => {
        await deleteKieuDang(record.ID);
        message.success("Xóa kiểu dáng thành công !");
        getAllKieuDang();
    };

    const editingKieuDang = (record) => {
        setUpdattingDeGiay(record);
        setMa(record.MA);
        setTen(record.TEN);
        setValue(record.TRANG_THAI === 0 ? 2 : 1);
        setIsModalVisible(true);
    };

    const editingKieuDangButton = async () => {
        const newTrangThai = value === 1 ? 1 : 0;
        const editKieuDang = {
            ma: ma,
            ten: ten,
            trangThai: newTrangThai
        };
        try {
            await updateKieuDang(updattingKieuDang.ID, editKieuDang);
            message.success("Cập nhật kiểu dáng thành công");
            getAllKieuDang();
            setIsModalVisible(false);
            setMa("");
            setTen("");
        } catch (error) {
            message.error("Không thể cập nhật kiểu dáng của giày");
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', marginLeft: '200px' }}>
                <Input placeholder='Mã Kiểu Dáng' value={ma} onChange={(e) => setMa(e.target.value)} />
                <br /><br />
                <Input placeholder='Tên Kiểu Dáng' value={ten} onChange={(e) => setTen(e.target.value)} />
                <br /><br />
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Còn</Radio>
                    <Radio value={2}>Hết</Radio>
                </Radio.Group>
                <br /><br />
                <Button type="primary" onClick={creatKieuDang}>
                    Add
                </Button>
                <br /><br />
                <Table pagination={{ pageSize: 5, defaultPageSize: 5 }} rowSelection={{ selectedRowKeys, onChange: onSelectChange }} columns={[
                    {
                        title: 'ID',
                        dataIndex: 'ID',
                    },
                    {
                        title: 'MA',
                        dataIndex: 'MA',
                    },
                    {
                        title: 'TEN',
                        dataIndex: 'TEN',
                    },
                    {
                        title: 'TRANG THAI',
                        dataIndex: 'trang_thai',
                        render: (text, record) => trangThai(record.TRANG_THAI)
                    },
                    {
                        title: 'ACTION',
                        key: 'action',
                        render: (text, record) => (
                            <Space size="middle">
                                <Button onClick={() => editingKieuDang(record)}>Update</Button>
                                <Button onClick={() => removeKieuDang(record)}>Delete</Button>
                            </Space>
                        ),
                    },
                ]} dataSource={kieuDang} />
            </div>
            <Modal title="Update Kích Cỡ" open={isModalVisible} onOk={editingKieuDangButton} onCancel={() => setIsModalVisible(false)}>
                <Form>
                    <Form.Item label="Mã Kiểu Dáng">
                        <Input value={ma} onChange={(e) => setMa(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Tên Kiểu Dáng">
                        <Input value={ten} onChange={(e) => setTen(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Trạng Thái">
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Đang sử dụng</Radio>
                            <Radio value={2}>Không sử dụng</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default KieuDang