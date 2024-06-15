import React, {useState, useEffect} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Product = () => {

  const [data, setData] = useState({})
  const navigate = useNavigate()
  const location = useLocation();
  const id = (location.pathname.split("/")[2])


  useEffect(()=>{
    const Idcheck = async() =>{
    try {
      const res = await axios.get("https://ellobook.onrender.com/connect/products/find/"+id)
      setData(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  Idcheck()
  },[id])

  const handleEdit = ()=> {
    navigate("/edit/"+id)
  }

  const handleDelete = async()=>{
    const confirm = window.confirm(`Are you sure you want to delete ${data.title}?`)
    if (confirm) { 
    try {
      await axios.delete(`https://ellobook.onrender.com/connect/products/${_id}`);
      navigate('/products') //after deletion
    } catch (error) {
      console.log(error);
    }
  }
  }

  return (
    <div>
        <div className='p-[50px] flex gap-10'>
            {/*images*/}
            <div className='flex-1'>
                <img className='w-[100%] h-[80vh] object-cover rounded-xl' src={data.coverPhotoURL} alt="image" />
            </div>
            {/*info*/}
            <div className='flex-1 p-0 px-[50px]'>
                <h1 className=' font-semibold text-3xl text-[#CFFAFA]'>{data.title}</h1>
                <h2 className=' mt-[2px] font-semibold text-2xl mb-[30px] text-[#ffffff]'>{data.author}
                </h2>
                <div className='flex flex-col'>
                <span className=' font-semibold text-2xl text-[#ffffff] mr-5'>Reading Level: </span>
                <span className='font-bold text-3xl text-[#f76434]'>"{data.readingLevel}"</span>
                </div>
                <div className='w-[100%] flex items-start gap-3 justify-between flex-col mt-3'>
                <div className='flex mt-4 bg-[#eee] w-[13vw] px-4 rounded-2xl items-center gap-5'>
              <div className='flex flex-col items-center justify-center' onClick={handleEdit}>
              <EditNoteIcon sx={{color: "#4aa088", cursor:"pointer"}}/>
              <h5 className=' text-base text-[#53c2c2] uppercase'>Edit</h5>
              </div>
                  <div className='flex flex-col items-center justify-center' onClick={handleDelete}>
              <DeleteIcon sx={{color: "#f73434", cursor:"pointer"}}/>
              <h5 className=' text-base text-[#53c2c2] uppercase'>Delete</h5>
              </div>
            </div>
            
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product