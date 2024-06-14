import React,{useEffect} from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Announce = () => {

  useEffect(()=> {
    Aos.init({duration: 3000})
  }, [])

  let myDate = new Date();
    let hours= myDate.getHours();
    let greet;

    if (hours < 12)
        greet =  "morning";
    else if (hours >= 12 && hours <= 17)
        greet = "afternoon";
    else if (hours >= 17 && hours <= 24)
       greet = "evening";

  return (
    <div>
        <header className='top-header px-10 h-full bg-[#FABD33]'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-6'>
                <p data-aos="fade-left" className='text-white mb-0 ml-1 text-sm font-semibold'>
                  Good {greet}, Welcome!
                </p></div>
                <div className='col-6'>
                  <p data-aos="fade-right" className='text-end text-white font-semibold mb-0 text-sm'>
                    Hotline: <a className='text-white font-semibold' href='+254722831315'>+254722831315</a>
                  </p>
                </div>
            </div>
        </div>
    </header>
    </div>
  )
}

export default Announce