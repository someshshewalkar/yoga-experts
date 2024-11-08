import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch'

const Classes = () => {
  const [classes, setClasses] = useState([])
  const[hoverdCard, setHouredCard] = useState(null)
  const axiosFetch = useAxiosFetch();
const handleHover = (index)=>{
  setHouredCard(index)
}

  useEffect(() => {
    axiosFetch.get('classes').then(res=>setClasses(res.data)).catch(err=>console.log(err)) // error yeu shkte ithe
   
  }, [])
  // console.log(classes)
  
  return (
   <div>
    <div className='mt-20 pt-3'>
      <h1 className='text-4xl font-bold text-center text-secondary'>Classes</h1>
    </div>
    <div>
      {
        classes.map((cls,index)=>{
          <div 
          key={index}
          className={`relative hover:-translate-y-2 duratino-150 hover:ring-[2px] hover:ring-secondaary w-64 h-[350px] m-auto ${cls.availableSeats <1 ? "bg-red-300" : "bg-white"} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer `} >
            <div className='relative h-48'>
              <div className={`absolute insert-0 bg-black opacity-0 transition-opacity duration-300 ${hoverdCard===index ? "opacity-60" : ""}
                 `}/>
              <img src={cls.image} alt="" className='object-cover w-full  h-full' />
            </div>
          </div>
        })
      }
    </div>
   </div>
  )
}
  
export default Classes