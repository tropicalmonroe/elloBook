import React, {useState, useEffect} from 'react'
import Announce from '../components/Announce'
import {Link, useNavigate } from 'react-router-dom'
import Products from '../components/Products'
import axios from 'axios'

const ProductList = () => {
  
  const navigate = useNavigate()
  
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  
    useEffect(()=>{
      const getTitleandAuthor = async () =>{
        try {
          const res = await axios.get('http://localhost:5000/connect/products/')
          setData(res.data)
        } catch (error) {
          console.log("Something went wrong, Try Again", error);
        }
      }
      getTitleandAuthor()
    },[])

  const handleItemClick = (item) => {
    navigate(`/product/${item._id}`)
  }

  const filterData = query === ""
    ? []
    : data.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <>
    <Announce/>
    <div className='w-full h-full px-20'>
        <div className='flex flex-col justify-center items-center gap-[0.5rem] pt-[60px] mb-11'>
          <div className='flex gap-3 mb-5'>
            <Link to="/new">
          <button className='p-1 w-[10vw] uppercase text-base bg-[#eee] font-semibold rounded-xl
           hover:transition duration-500 hover:bg-[#1c1c1c] hover:text-[#eee]'>add book</button>
          </Link>
          
          </div>
        <div className='m-[20px]'>
          <input type="text" placeholder='Search Books...' className='p-[10px] w-[30vw] focus:outline-none px-3 text-sm rounded-3xl' 
          onChange={(e)=>setQuery(e.target.value)}
          />
          <ul className='text-center list-none bg-[#ffffff] mt-2 rounded-xl'>{
          filterData.map((item, id)=>(
            <li key={item._id} onClick={()=>handleItemClick(item)} className='mb-[5px] text-[1.2rem] py-1 text-[#444] cursor-pointer font-light capitalize tracking-tighter'>{item.title}
            <div className='text-sm text-[#888]'>{item.author}</div></li>
            ))
            }
          </ul>
        </div>
        </div>
        <Products/>
    </div>
    </>
  )
}

export default ProductList