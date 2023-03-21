/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/antd/dist/antd.css';
import { Table, Modal, Button, Spin, Space, Checkbox, Form, Input, message, Tag } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { TextField } from '@fluentui/react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Uri from '../Uri';

function Home(props) {

  const Column = Table;
  const [dataContact, setDataContact] = useState([]);
  const [visible, setVisible] = useState();
  const [loading, setLoading] = useState(true);
  const [idDelete, setIdDelete] = useState();

  const history = useHistory();

  const handleDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    setVisible(true);
    console.log(id);
    setIdDelete(id);
  }


  const handleOk = async (id) => {
    // console.log(id);
    await axios.delete(Uri.rooturi + Uri.deleteData + id);
    message.success('Delete success');
    setVisible(false);
    getData();
  }

  function handleCancel() {
    setVisible(false);
    getData();
  }

  const handleEdit = (id) => {
    history.push(`EditContacts/${id}`);
  }


  const getData = async () => {
    await axios
      .get(Uri.rooturi + Uri.getData)
      .then(function (response) {
        const data = response.data;
        setDataContact(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      })
  }
  useEffect(() => {
    getData();
  }, []);

  return (

    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="text-center">Contact</h1>
            <Button type="primary" icon={<UserAddOutlined />} className='my-3'>
              <Link to="/CreateContacts" className='text-white'>Add</Link>
            </Button>
            <div className="text-center">
              {loading ?
                <Spin size='large' />
                :
                <Table dataSource={dataContact} >
                  <Column title="Name" dataIndex="name" key="age" />
                  <Column title="Phone" dataIndex="phone" key="phone" />
                  <Column
                    title="Roles"
                    dataIndex="roles"
                    key="roles"
                    render={(text, record) => (
                      text?.map(t => (
                        <Tag color={t.color} key={t.id}>
                          {t.role.toUpperCase()}
                        </Tag>
                      ))
                    )}
                  />
                  <Column
                    title="Action"
                    dataIndex="action"
                    key="id"
                    render={(text, record) => (
                      <>
                        <Button style={{ marginRight: 10 }} type="primary" primary onClick={() => handleEdit(record.id)}>
                          Edit
                        </Button>
                        <Button style={{ marginRight: 10 }} type="primary" danger onClick={() => handleDelete(record.id)}>
                          Delete
                        </Button>
                        <Modal
                          title="Confirm Delete"
                          visible={visible}
                          onOk={(e) => handleOk(idDelete)}
                          onCancel={handleCancel}
                        >
                          <p>Do you Want to delete these data ?</p>
                        </Modal>
                      </>
                    )}
                  />
                </Table>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
