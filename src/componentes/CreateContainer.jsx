import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {MdFastfood,MdCloudUpload,MdDelete, MdFoodBank} from 'react-icons/md';
import { categorias } from '../utils/data';
import Loader from './Loader';

import { storage } from "../firebase.config";
import { ref, getDownloadURL, uploadBytesResumable, getStorage, deleteObject, } from "firebase/storage";
import { guardarItem } from '../utils/firebaseFunctions';

const CreateContainer = () => {

  const [titulo, setTitulo] = useState("");
  const [calorias, setCalorias] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState(null);
  const [imagenActivo, setImagenActivo] = useState(null);
  const [campos, setCampos] = useState(false);
  const [alertaEstatus, setAlertaEstatus] = useState("danger");
  const [msj, setMsj] = useState(false);
  const [cargando, setCargando] = useState(false);


const subirArchivo = (e) => {
  setCargando(true);
  const storage = getStorage();
  const archivo = e.target.files[0];
  const storageRef = ref(storage, `imagenes/${Date.now()}-${archivo.name}`);

  const uploadTask = uploadBytesResumable(storageRef, archivo);

uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('La subida esta ' + progress + '% hecha');
    switch (snapshot.state) {
      case 'paused':
        console.log('La subida esta pausada');
        break;
      case 'running':
        console.log('La subida esta corriendo');
        break;
    }
  },
  (error) => {
        console.log(error);
        setCampos(true);
        setMsj('Ocurrior un error mientras se subía el archivo: intente denuevo');
        setAlertaEstatus('danger');
        setTimeout(() => {
          setCampos(false);
          setCargando(false);
        },4000);
      }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImagenActivo(downloadURL);
         setCargando(false);
         setCampos(true);
         setMsj('imagen subida satisfactoriamente');
         setAlertaEstatus('satisfactorio');
         setTimeout(() => {
           setCampos(false);
         }, 4000);
    });
  }
);
};

  // const subirArchivo = (e) => {
  //   setCargando(true);
  //   const archivo = e.target.files[0];
  //   const storageRef = ref(Storage, `imagenes/${Date.now()}-${archivo.name}`);
  //   const subirTarea = uploadBytesResumable(storageRef, archivo);

  //   subirTarea.on(
  //     'state_changed',
  //      (snapshot) => {
  //       const subirProgreso = 
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   }, 
  //   (error) => {
  //     console.log(error);
  //     setCampos(true);
  //     setMsj('Ocurrior un error mientras se subía el archivo: intente denuevo');
  //     setAlertaEstatus('danger');
  //     setTimeout(() => {
  //       setCampos(false);
  //       setCargando(false);
  //     },4000);
  //   }, 
  //   () => {
  //     getDownloadURL(subirTarea.snapshot.ref).then((downloadURL) => {
  //       setImagenActivo(downloadURL);
  //       setCargando(false);
  //       setCampos(true);
  //       setMsj('imagen subida satisfactoriamente');
  //       setAlertaEstatus('satisfactorio');
  //       setTimeout(() => {
  //         setCampos(false);
  //       }, 4000);
  //     });
  //   })
  // };

  const eliminarArchivo = () => {
    setCargando(true);
    const deleteRef = ref(storage, imagenActivo);
    deleteObject(deleteRef).then(() => {
      setImagenActivo(null)
      setCargando(false)
      setCampos(true);
      setMsj('imagen eliminada satisfactoriamente');
      setAlertaEstatus('satisfactorio');
      setTimeout(() => {
        setCampos(false);
      }, 4000);
    })
    
  };

  const guardarDetalles = () => {
    setCargando(true);
    try {
      if((!titulo || !calorias || !imagenActivo || !precio || !categoria)){
        setCampos(true);
        setMsj('Campos requerido, no pueden estar vacíos');
        setAlertaEstatus('danger');
        setTimeout(() => {
        setCampos(false);
        setCargando(false);
      },4000);
    }else {
      const data = {
        id : `${Date.now()}`,
        titulo : titulo,
        imagenURL : imagenActivo,
        categoria : categoria,
        calorias : calorias,
        qty : 1,
        precio : precio
      }
      guardarItem(data)
      setCargando(false)
      setCampos(true);
      setMsj('Item creado satisfactoriamente');
      setAlertaEstatus('satisfactorio');
      borrarData();
      setTimeout(() => {
        setCampos(false);
      }, 4000);
    }   
    } catch (error) {
      console.log(error);
      setCampos(true);
      setMsj('Ocurrior un error mientras se subía el archivo: intente denuevo');
      setAlertaEstatus('danger');
      setTimeout(() => {
        setCampos(false);
        setCargando(false);
      },4000);
    }
  };

  const borrarData = () => {
    setTitulo("");
    setImagenActivo(null);
    setCalorias("");
    setPrecio("");
    setCategoria("Selecciona una Categoría");
  };

  return (
    <div className='w-full min-h-screen flex 
    items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border 
      border-gray-300 rounded-lg p-4 flex flex-col 
      items-center justify-center gap-4'>
        {campos && (
            <motion.p 
            initial={{ opacity : 0 }} 
            animate={{ opacity : 1 }} 
            exit={{ opacity : 0 }} 
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                alertaEstatus === 'danger' 
                  ? 'bg-red-400 text-red-800' 
                  : 'bg-emerald-400 text-emerald-800'
              }`} 
              >
                {msj}
            </motion.p>
          )}

        <div className='w-full py-2 border-b border-gray-300 flex
        items-center gap-2'>
          <MdFastfood className='text-xl text-gray-700'/>
          <input 
            type="text" 
            required 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder='coloque un titulo...' 
            className='w-full h-full text-lg bg-transparent
            outline-none border-none placeholder:text-gray-400
            text-textColor'
          />
        </div>

        <div className='w-full'>
          <select onChange={(e) => setCategoria(e.target.value)}
          className='outline-none w-full text-base border-b-2
          border-gray-200 p-2 rounded-md cursor-pointer'>
            <option value="other" className='bg-white'>seleccione una categoría
            </option>
            {categorias && categorias.map(item =>(
              <option key={item.id} className='text-base border-0
              outline-none capitalize bg-white text-headingColor'
                value={item.urlParamName}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className='group flex justify-center items-center flex-col
        border-2 border-dotted border-gray-300 w-full h-225 md:h-420
        cursor-pointer rounded-lg'>
          {cargando ? (
          <Loader />
          ) : (
            <>
              {!imagenActivo ? (  
                <>
                  <label className='w-full h-full flex flex-col items-center
                  justify-center cursor-pointer'>
                    <div className='w-full h-full flex flex-col items-center
                    justify-center'>
                      <MdCloudUpload className='text-gray-500 text-3xl
                      hover:text-gray-700' />
                      <p className='text-gray-500 hover:text-gray-700'>
                        click aquí para subir un archivo
                      </p>
                    </div>
                    <input 
                    type="file" 
                    name='subirarchivo' 
                    accept='image/*'
                    onChange={subirArchivo} 
                    className='w-0 h-0' 
                    />
                    </label>
                  </>
                ) : (
                  <>
                    <div className='relative h-full'>
                      <img 
                        src={imagenActivo} 
                        alt="imagen subida"
                        className='w-full h-full object-cover' 
                      />
                      <button 
                        type='button' 
                        className='absolute bottom-3
                        right-3 p-3 rounded-full bg-red-500 text-xl
                        cursor pointer outline-none hover:shadow-md 
                        duration-500 transition-all ease-in-out'
                        onClick={eliminarArchivo}
                      >
                        <MdDelete className=' text-white'/>
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className='w-full flex flex-col md:flex-row items-center gap-3'>
            <div className='w-full py-2 border-b border-gray-300 flex
            items-center gap-2'>
              <MdFoodBank className='text-gray-700 text-2xl'/>
              <input 
              type="text" 
              required
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)} 
              placeholder='calorias'
              className='w-full h-full text-lg bg-transparent outline-none
              border-none placeholder:text-gray-400 text-textColor' 
              />
            </div>

            <div className='w-full py-2 border-b border-gray-300 flex
            items-center gap-2'>
              <MdFoodBank className='text-gray-700 text-2xl'/>
              <input 
              type="text" 
              required
              value={precio}
              onChange={(e) => setPrecio(e.target.value)} 
              placeholder='precio'
              className='w-full h-full text-lg bg-transparent outline-none
              border-none placeholder:text-gray-400 text-textColor' 
              />
            </div>
          </div>

          <div className='flex items-center w-full'>
            <button type='button' className='ml-0 md:ml-auto w-full md:w-auto
            border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg
            text-lg text-white font-semibold' onClick={guardarDetalles}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

export default CreateContainer
