import React ,{useState, useEffect} from 'react'
import Product from './Product'
import axios from 'axios';

const Products = () => {

  const [data, setData] = useState([])

  useEffect(()=>{
    const getItems = async() =>{
      try {
        const res = await axios.get("http://localhost:5000/connect/products?new=true")
        setData(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getItems()
  },[])

  return (
    <div>
      <h1 className='px-[20px] text-[#ffffff] font-semibold'>new books</h1>
    <div className='p-[20px] flex flex-wrap gap-10 items-center justify-between'>{
      data.map((item)=>(
        <Product item={item} key={item.id}/>
        ))
        }
    </div>
      </div>
  )
}

export default Products