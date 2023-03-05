import React from 'react'
import Delivery from '../img/delivery.png'

const MainContainer = () => {
  return (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
    <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
      <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
        <p className='text-base text-orange-500 font-semibold'>Entrega en Moto</p>
        <div className='w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl'>
          <img 
            src={Delivery}
            className= "w-full h-full object-contain"
            alt="delivery" 
          />
        </div>
      </div>

      <p className='text-[2.5rem] md:text-[4.5rem] font-bold tracking-wide text-headingColor'>
        El delivery mas rápido en 
        <span className='text-orange-600 text-[3rem] md:text-[5rem]'> Tu Ciudad</span>
      </p>
      <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima reiciendis eaque accusamus excepturi necessitatibus expedita voluptatum, nesciunt nulla suscipit odit magnam perspiciatis, est aliquam itaque quam incidunt quidem quaerat ullam.
      </p>

      <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Pedir Ahora</button>

    </div>
    <div className='py-2 bg-blue-400 flex-1'></div>
  </div>
  );
};

export default MainContainer
