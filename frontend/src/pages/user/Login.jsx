import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GoogleLogin from '../../components/Social/GoogleLogin'
import useAuth from '../../hooks/useAuth';

const Login = () => {

    const location = useLocation();
    const {login,error,setError,loder,setLoder} =useAuth()
    const navigate = useNavigate();

    const handleSubmit = e=>{
        setError('');
        e.preventDefault();
        const data = new FormData(e.target);
        const formData = Object.fromEntries(data)
        // console.log(formData)
        login(formData.email, formData.password).then(()=>{
            alert("Login Succesfull")
            navigate(location.state?.from || "/dashboard")
        }).catch((err)=>{
            setError(err.code)
            setLoder(false);
        })
    }
  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center'>Login </h1>
        <p className='mx-auto mt-4 max-w-md text-center text-gray-500 '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt quae molestias eum.</p>
   <div className='mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
    <form onSubmit={handleSubmit}  className='space-y-4 '>
<p className='text-center text-red-400 text-lg font-medium'>Sign in to your account</p>
<div>
    <label htmlFor='email' className='sr-only'>Email</label>
    <div className='relative'>

        <input type="email" name='email' placeholder='Enter your email' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ' />

    </div>
    
</div>

<div>
    <label htmlFor='email' className='sr-only'>Password</label>
    <div className='relative'>

        <input type="password" name='password' placeholder='Enter your password' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ' />

    </div>
    
</div>
<button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white'>Sign in</button>
<p className='text-center text-sm text-gray-500'>No account ? <Link className='underline ' to='/register'>Sign Up</Link></p>

    </form>
    <GoogleLogin/>
   </div>
    </div>
  )
}

export default Login