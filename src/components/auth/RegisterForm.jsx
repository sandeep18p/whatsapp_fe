import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../utils/validation';
import Authinput from './Authinput';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; 
import PulseLoader from 'react-spinners/PulseLoader';
import { changeStatus, registerUser } from '../../feature/userSlice';
import Picture from './Picture';
import axios from 'axios';

const cloud_name =  process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;



const RegisterForm = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [picture, setPicture]=useState();
  const[readablePicture, setReadablePicture]= useState("");
  const { status, error } = useSelector((state) => state.user);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {

    // dispatch(registerUser({data, picture: ""})); isme me backend me data req.data me jaa ra  video 29 15:57
    dispatch(changeStatus("loading"));
    if(picture){
      //upload to the cloudinary and then register user
       await uploadImage().then(async (response)=>{
        let res= await dispatch(registerUser({...data, picture: response.secure_url}));
        // console.log(res);
        if(res?.payload?.user){ navigate("/");}  
       });
    }else{
      let res = await dispatch(registerUser({...data, picture: ""}));
      console.log(res);
      if(res?.payload?.user){ navigate("/");}  
    } 
    
  };
   //upload image
   const uploadImage =  async()=>{
  
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file",picture);
    const {data}=await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    console.log(data);
    return data;
   }
  return (
    <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
      <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
        <div className='text-center dark:text-dark_text_1'>
          <h2 className='mt-6 text-3xl font-bold'>Welcome</h2>
          <p className='mt-2 text-sm'>Sign up</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-6'>
          <Authinput
            name='name'
            type='text'
            placeholder='Full Name'
            register={register}
            error={errors?.name?.message}
          />
          <Authinput
            name='email'
            type='text'
            placeholder='Email address'
            register={register}
            error={errors?.email?.message}
          />
          <Authinput
            name='status'
            type='text'
            placeholder='Status (Optional)'
            register={register}
            error={errors?.status?.message}
          />
          <Authinput
            name='password'
            type='password'
            placeholder='Password'
            register={register}
            error={errors?.password?.message}
          />
           {/* picture */}
           <Picture readablePicture={readablePicture} setPicture={setPicture}
           setReadablePicture={setReadablePicture}></Picture>

          {/* //error from state and axios */}
       {error ? (
        <div>
          <p className='text-red-400'>{error}</p>
        </div>
       ) : null }
          <button
            className='w-full justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300'
            type='submit'
          >
            {status === 'loading' ? <PulseLoader color='#fff' size={16} /> : 'Sign up'}
          </button>
    <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1" ><span>have an account ?</span>
    <Link href="/login" className="hover:undeline cursor-pointer transition ease-in duration-300">Sign in</Link></p>      
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
