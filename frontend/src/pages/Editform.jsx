import React, { useState, useEffect } from 'react';
import axios from 'axios';
import app from '../firebase'
import { useParams, useNavigate } from 'react-router-dom';
import { getStorage } from 'firebase/storage';

const Editform = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title: '',
        author: '',
        readingLevel: '',
        coverPhotoURL: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/connect/products/find/${id}`);
                setData(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const storage = getStorage(app)
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
            console.log('Uploaded a file');
            fileRef.getDownloadURL().then(url => {
                setData({
                    ...data,
                    coverPhotoURL: url
                });
            });
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/connect/products/${id}`, data);
            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full h-full px-20'>
            <h1 className='text-center text-lg text-[#ffffff] mt-10'>Edit Book</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-[#2f2f2f] items-center px-10 rounded-3xl py-5 mt-10">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={data.title}
                        onChange={handleInputChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-[#cffafa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={data.author}
                        onChange={handleInputChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="author" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-[#cffafa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="readingLevel"
                        id="readingLevel"
                        value={data.readingLevel}
                        onChange={handleInputChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="readingLevel" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-[#cffafa] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reading Level</label>
                </div>

                <div className="flex items-center gap-3 mb-5">
                    <input type="file" id="file" onChange={handleImageChange} className='text-white cursor-pointer' />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    );
};

export default Editform;
