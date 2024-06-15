import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import app  from '../firebase';
import axios from 'axios';

const NewBook = () => {
  const [data, setData] = useState({
    title: '',
    author: '',
    readingLevel: '',
    coverPhotoURL: null
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({
      ...data,
      coverPhotoURL: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = getStorage(app)
    // Upload the file to Firebase Storage
    const coverPhotoRef = ref(storage, `covers/${data.coverPhotoURL.name}`);
    await uploadBytes(coverPhotoRef, data.coverPhotoURL);
    const coverPhotoURL = await getDownloadURL(coverPhotoRef);

    // Submit the form data along with the coverPhotoURL
    const formData = {
      title: data.title,
      author: data.author,
      readingLevel: data.readingLevel,
      coverPhotoURL
    };

    try {
      await axios.post('https://ellobook.onrender.com/connect/products/', formData);
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  return (
    <div className='w-full h-full px-20'>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-[#2f2f2f] items-center px-10 rounded-3xl py-5 mt-20">
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="title"
            id="title"
            value={data.title}
            onChange={handleInput}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-[#cffafa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="author"
            id="author"
            value={data.author}
            onChange={handleInput}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="author" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-[#cffafa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="readingLevel"
            id="readingLevel"
            value={data.readingLevel}
            onChange={handleInput}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label htmlFor="readingLevel" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-[#cffafa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reading Level</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className='text-white cursor-pointer'
          />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>
  );
}

export default NewBook;
