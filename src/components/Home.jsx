/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React,{useEffect,useState}from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/antd/dist/antd.css';
import { Table,Modal,Button,Spin,Space,Checkbox,Form, Input ,message, Tag} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { TextField } from '@fluentui/react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Uri from '../Uri';

const { confirm } = Modal;

function Home(props) {
  const [rootUri,setRootUri] = useState();

  const [dataContact,setDataContact] = useState([]);

  const [visible,setVisible]= useState();

  const { Column, ColumnGroup } = Table;

  const [loading,setLoading]=useState(true);

  const [editing,setEditing]=useState();

  const initUser =  {id:null , name:"", phone:""};

  const [newUser, setNewUser] = useState(initUser);
  
  const [idDelete,setIdDelete] = useState();

  const [elementBold, setElementBold] = useState();

  let history = useHistory();
 


  const handleDelete = (id) =>{
    // eslint-disable-next-line no-restricted-globals
    setVisible(true);

    console.log(id);

    setIdDelete(id);
   
  }


  const handleOk = async (id) =>{
    // console.log(id);
    await axios.delete(Uri.rooturi + Uri.deleteData + id);

    message.success('Delete success');

    setVisible(false);

    getData();
  }

  function handleCancel(){

    setVisible(false);

    getData();
    
  }
  

  


  const handleEdit = (id) =>{


    history.push(`EditContacts/${id}`);
    
    // setEditing(true);

  }


  const getData = async() =>{
    await axios
    .get(Uri.rooturi + Uri.getData )
    .then(function(response){
      const data = response.data;
      // console.log(data)
      setDataContact(data);

      setLoading(false);
      })
      .catch(function(error){
        console.log(error);
      })
      .then(function(){
        
      })
  }

   async function loadData(){
         await axios 
         .get(Uri.rooturi + Uri.getData)
          .then(function(response){
            const data = response.data;
            // console.log(data);
            
            setDataContact(data);

            setLoading(false);

            setEditing(false);
            })
            .catch(function(error){
              console.log(error);
            })
            .then(function(){
              
            })

            setRootUri(Uri.rooturi + Uri.getData);
  }

  // function notification(){

  //   let notify = props.location.state;

  //   // console.log(notify);
  //   if(notify.success){
  //       message.success('Save success');
  //   }else if(notify.update){
  //       message.success('Update success');
  //   }else{
  //     console.log("Hello");
  //   }

  // }
  useEffect(() => {

  //  loadData();
  //  notification();


  }, [])

  // console.log(dataContact)

  return (
  
    <div className="App">
      <div className="container">
        <div className="row">
          {/* <div className="col-lg-4">
            {editing ?  
              <>
                <h1 className="text-center">Edit Contact</h1>
                <form onSubmit={handleUpdate}>
                  <TextField label="Name" type="text" name="name" onChange={handleChange} value={newUser.name}/>
                  <TextField label="Phone" type="text" name="phone"  className="mb-3" onChange={handleChange}
                  value={newUser.phone}/>
                  <Button type="primary" htmlType="submit"  >Edit</Button>
                </form>
              </>
            :
            <>
            <h1 className="text-center">Add Contact</h1>
              <form onSubmit={handleInsert}>
                <TextField label="Name" type="text" name="name" onChange={handleChange} value={newUser.name}/>
                <TextField label="Phone" type="text" name="phone"  className="mb-3" onChange={handleChange}
                value={newUser.phone}/>
                <Button type="primary" htmlType="submit" >Submit</Button>
              </form>
            </>
            }
            
          </div> */}
          <div className="col-lg-12">
          {elementBold.map(a=>(
            <span>{a.nama}</span>
          ))}
            <h1 className="text-center">Table Contact</h1>
            <Button type="primary" icon={<UserAddOutlined />} className='my-3'>
                <Link to="/CreateContacts" className='text-white'>Add</Link>
            </Button>
              <div className="text-center">
              {loading ? 
                <Spin size='large'/>
              :
              <Table dataSource={dataContact} >
                <Column title="Name" dataIndex="name" key="age" />
                <Column title="Phone" dataIndex="phone" key="phone" />
                <Column 
                    title="Roles" 
                    dataIndex="roles" 
                    key="roles" 
                    render={(text,record)=>(
                    //   <>
                    //   {console.log(text)}
                    //   </>
                    text.map(t=>(
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
                  render={(text,record)=>(
                        <>
                        {/* {console.log(record.id)} */}
                          <Button style={{marginRight:10}} type="primary" primary onClick={()=>handleEdit(record.id)}>
                            {/* <Link to={`EditContacts/${record.id}`} >Edit</Link> */}
                            Edit
                          </Button>
                          <Button style={{marginRight:10}} type="primary" danger onClick={()=>handleDelete(record.id)}>
                            Danger
                          </Button>
                        <Modal
                            title="Confirm Delete"
                            visible={visible}
                            onOk={(e)=>handleOk(idDelete)}
                            // confirmLoading={confirmLoading}
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
