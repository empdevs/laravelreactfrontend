/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import react, {useState,useEffect}from 'react'
import '../../node_modules/antd/dist/antd.css';
import { TextField } from '@fluentui/react';
import { Button,Input ,Select, Typography, Tag, message} from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Uri from '../Uri';
import Guid from 'guid'


const CreateContacts = () =>{

    const { Option } = Select;

    const {Text} = Typography;

    const dataSource=[];

    const [ name, setName] = useState('');

    const [ phone, setPhone ] = useState('');

    const [ tagValue, setTagValue ] = useState([]);

    const [childrenTag, setChildrenTag] = useState([]);

    const [dataContact, setDataContact] = useState(dataSource);

    let [editStatus, setEditStatus] = useState();

    let [idUser, setIdUser]= useState('');

    const children = [];

    let history = useHistory();
    
    let {id} = useParams(); //edit id

    console.log(id);


    async function loadData(){

        console.log('load data');

        
        if(id){
                
            let arrTag = [];

            setIdUser(id);

            await axios
            .get(Uri.rooturi + Uri.showData + id)
            .then(function(response){
                    const data = response.data;
                    setName(data.name);
                    setPhone(data.phone);

                    data.roles.map(dr =>{
                        arrTag.push(dr.id)
                    })

                    setTagValue(arrTag);

                    setEditStatus(true);
                    
                })
        
        }

        await axios
            .get(Uri.rooturi + Uri.getData)
            .then(function(response){
            const data = response.data;
            // console.log(data)
            setDataContact(data);

            })
            .catch(function(error){
                console.log(error);
            })
            .then(function(){
                
            })

    }
    async function loadTag(){
        console.log('load Tag');

    await axios
        .get(Uri.rooturi + Uri.getRoles)
        .then(function(response){
            let tag = response.data;

            tag.map(t=>{
                console.log(t)
                children.push(<Option key={t.id} value={t.id}>
                                    <Tag color={t.color} key={t.id}>
                                        {t.role.toUpperCase()}
                                    </Tag>
                                </Option>);
                            })
           setChildrenTag(children)
        })
        .catch(function(error){
            console.log.log(error)
        })
    }
    function handleChangeName(e){

        let value = e.target.value;

        if(value){

            setName(value);

        }else{

            setName('');
        }

        // console.log(name);
    }

    function handleChangePhone(e){

        let value = e.target.value;

        if(value){

            setPhone(value);

        }else{

            setPhone('');
        }

        // console.log(phone)
    }

    const handleChangeTag = (value) =>{

        if(value){

            setTagValue(value);

        }else{

            setTagValue('');
        }
    }

    const handleUpdate = async (e) =>{

        e.preventDefault();
        
        let arrTag = [];


        if(name == "" || phone == "" || tagValue == []){

            message.warning('Enter the data first');

            return false;
        }else{
            tagValue.map(tv=>{
                arrTag.push(tv);
            })

            let data = {
                id : idUser,
                name : name,
                phone : phone,
                roles : arrTag
            }

            await axios
                .put(Uri.rooturi + Uri.updateData + idUser , data)
                .then(function(response){
                    setName('');
                    setPhone('');
                    setTagValue([]);
                })
            
                history.push({
                    pathname : "/",
                    state :  {update : true}
                });
            // console.log(data);
        }
    }
      
    const handleInsert = async (e) =>{

        e.preventDefault();

        let arrTag = [];
        
        if(name == "" || phone == "" || tagValue == []){

            message.warning('Enter the data first');

            return false;

        }else{
            
            console.log(dataContact);
            tagValue.map(tv=>{
                arrTag.push(tv);
            })
            let lastData = dataContact.pop();
            let data = {
                id:lastData.id + 1,
                name : name,
                phone : phone,
                roles : arrTag
            }
           console.log(data)
            await axios 
            .post(Uri.rooturi + Uri.insertData , data)
            .then(function(response){
                setName('');
                setPhone('');
                setTagValue([]);
            })

            
            history.push({
                pathname : "/",
                state :  {success : true}
            });

        }

        

        // if(newUser.name == "" || newUser.phone == ""){
        //    message.warning('Enter the data first');
        // }else{
        //   newUser.id = dataContact.length + 1;
        //   // console.log(newUser) object
        //   // console.log(rootUri)
        //   await axios.post(rootUri +"/store",newUser);
      
        //   message.success('Save success');
        //   setNewUser({...newUser,id:null,name:"",phone:""});
        // }
      }

       
      useEffect(()=>{
        
        loadData()
        loadTag()
    

      },[])
    //   console.log(dataContact)
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {editStatus ?
                    <>
                        <h1 className="text-center">Edit Contact</h1>
                        <form onSubmit={handleUpdate}>
                            <div>
                                <Text strong>Name</Text>
                                <Input placeholder='Name' onChange={handleChangeName} value={name} />
                            </div>
                            <div>
                                <Text strong>Phone</Text>
                                <Input placeholder='Phone' onChange={handleChangePhone} value={phone} />
                            </div>
                        
                            <Text strong> Roles</Text>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={handleChangeTag}
                                className='mb-3'
                                value={tagValue}
                                >
                                {childrenTag}
                                </Select>
                        
                            <Button type="primary" htmlType="submit" >Update</Button>

                        </form>
                    </>
                        :

                    <>
                        <h1 className="text-center">Add Contact</h1>
                        <form onSubmit={handleInsert}>
                            <div>
                                <Text strong>Name</Text>
                                <Input placeholder='Name' onChange={handleChangeName} value={name} />
                            </div>
                            <div>
                                <Text strong>Phone</Text>
                                <Input placeholder='Phone' onChange={handleChangePhone} value={phone} />
                            </div>
                        
                            <Text strong> Roles</Text>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={handleChangeTag}
                                className='mb-3'
                                value={tagValue}
                                >
                                {childrenTag}
                                </Select>
                        
                            <Button type="primary" htmlType="submit" >Submit</Button>

                        </form>
                    </>
                    }

                </div>
            </div>
        </div>
        </>
    )
}

export default CreateContacts