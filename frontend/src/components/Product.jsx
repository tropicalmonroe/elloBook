import React from 'react'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';
import { format } from "timeago.js"

const Product = ({ item }) => {
  return (
    <div className='flex'>
        <div className=' flex-1 relative block'>
            <img className='w-[100%] cursor-pointer flex h-[50vh] object-cover rounded-2xl' src={item.coverPhotoURL} alt="books" />
            <div className='absolute top-0 left-0 w-[50%] h-[50vh] ml-[50%] bg-[#1c1c1c]'>
              <div className='relative flex flex-col items-center justify-center mt-[20%]'>
                <h3 className='text-[#f76434]'>Author:</h3>
               <h1 className='text-[#ffe6dc] text-xl'>{item.author}</h1>
               <h3 className='text-[#f76434] mt-3'>Reading Level:</h3>
               <h1 className='text-[#cffafa] text-xl'>"{item.readingLevel}"</h1>
               <h3 className='text-[#f76434] mt-3'>Date Created:</h3>
               <p className='text-[#cffafa] text-xl'>{format(item.createdAt)}</p>
              </div>
            </div>
        <div className=' flex-1 py-[0px] '>
            <h4 className='text-xl font-semibold text-center ml-1 text-[#ffffff]'>{item.title}</h4>
          <Link to={`/product/${item._id}`}>
          <div className='w-[40%] cursor-pointer h-[15%] absolute -mt-52 rounded-3xl flex bg-[#FAAD00] items-center justify-center m-[10px] hover:transition ease-in duration-700 hover:bg-[#5ACCCC]'>
            <div className='flex items-center'>
            <AutoStoriesIcon/>
            <p className='ml-1 text-sm font-semibold hover:text-white hover:transition ease-in duration-400'>|| Read More</p>
            </div>
          </div>
          </Link>
        </div>
        </div>
    </div>
  )
}

export default Product