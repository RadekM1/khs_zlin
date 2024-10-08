'use client'

import PassField from "@/components/auth-form/passField";
import UserField from "@/components/auth-form/userField";
import { useState, useEffect } from "react";
import { FiUserPlus } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import SpinnerSmallOrange from "@/components/spinners/spinnerSmallOrange";
import { validateEmail } from "@/lib/functions/validateEmail";
import { validatePassword } from "@/lib/functions/validatePassword";



export default function Page() {

  const [errorUser, setErrorUser] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [errorPass, setErrorPass] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const [checkbox, setCheckbox] = useState(false)
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [fetching, setFetching] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)


  const handleChange = (e, id) => {
    const tempVal = e.target.value;

    switch(id){
      case 'user': setUser(tempVal); break;
      case 'password': setPassword(tempVal); break;
      case 'passwordCheck': setPasswordCheck(tempVal); break;
      default: break;
    }
  };

  useEffect(() => {

    if (user && !validateEmail(user)) {
      setUserErrorMessage('Nevyhovující formát');
      setErrorUser(true);
    } else if (user && validateEmail(user)) {
      setUserErrorMessage('');
      setErrorUser(false);
    } else if (!user) {
      setErrorUser(false);
      setUserErrorMessage('');
    }

    if(validatePassword(password)){
      setPasswordStrong(true)
      setErrorPass(false)
    }else if(!validatePassword(password)){
      setPasswordStrong(false)
      setErrorPass(true)
    }

    if(password === passwordCheck){
      setPasswordEqual(true)
      setErrorPass(false)
    } else if (password !== passwordCheck){
      setPasswordEqual(false)
      setErrorPass(true)
    }



    if(validatePassword(passwordCheck) === false || validatePassword(passwordCheck) === false){
      setPasswordEqual(false)
    }

    if(validateEmail(user) === true && validatePassword(password) === true && validatePassword(passwordCheck) === true && checkbox !== true){
      setDisabled(false)
    } else if(validateEmail(user) === false || validatePassword(password) === false || validatePassword(passwordCheck) === false || checkbox === true){
      setDisabled(true)
    }

  }, [user, password, passwordCheck, checkbox]);




  // ---------------- API ------------------------



 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user: user,
      password: password,
      operation: 'registration',
    }
      
    try{
      setDisabled(true)
      setFetching(true)
      const response = await fetch('api/users', {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
      });
    
      const result = await response.json();
      setApiResponse(result)
    } catch (error){
      let chyba = {};
      chyba['error'] = 'nepodařilo se zadat údaje do databáze'
      setApiResponse(chyba)
    } finally{
      setDisabled(false)
      setFetching(false)
    }
  };


    

  // ---------------- API ------------------------









  return (
    <div className="flex w-full flex-col text-center justify-center items-center">
      <div className="flex justify-center flex-row items-center mb-4">
        <FiUserPlus className=" mr-2 w-8 h-8" />
        <div className="text-2xl">Registrace</div>
      </div>
      <div className="flex flex-col items-center mx-10">
        <div className="rounded-2xl p-3 flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            <div className="w-full max-w-sm">
              <UserField error={errorUser} handleChange={handleChange} />
              <span className="text-xs text-red-400">{userErrorMessage}</span>
            </div>
            <div className="mt-4 flex-col">
              <div className="flex-row relative">
                <div>
                  <PassField id='password' label='Heslo' error={errorPass} handleChange={handleChange} />
                </div>
                <div className="absolute top-6 -right-5">
                  {passwordEqual && <IoShieldCheckmarkOutline className="text-green-400" />}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col relative">
              <PassField id='passwordCheck' error={errorPass} label='Ověřit heslo' handleChange={handleChange} />
              <div className="absolute top-6 -right-5">
                {passwordEqual && <IoShieldCheckmarkOutline className="text-green-400" />}
              </div>
              <div className={`${passwordEqual === false ? '' : 'hidden'} flex-wrap  text-xs text-red-400`}>
                  hesla jsou krátká, nebo rozdílná
              </div>
              <div className={`${passwordStrong === false ? '' : 'hidden'} flex-wrap  text-xs text-red-400`}>
                  heslo musí obsahovat alespoň 8 znaků, <br />
                  jedno velké písmeno a číslo
              </div>
              <div className={`flex ${passwordStrong === true ? '' : 'hidden'} justify-center mt-2 flex-row`}>
                <div className="text-xs text-green-400">dostatečná síla hesla</div>
                <div><FaShieldAlt className="text-green-400 ml-2 w-4 h-4" /></div>
              </div>
            </div>
            <div className="mt-4">
              <button 
                disabled={disabled}
                type="submit"
                className="bg-orange-500 w-[130px] hover:bg-orange-600 dark:hover:bg-orange-800 dark:bg-orange-700 disabled:bg-orange-100 dark:disabled:bg-gray-600 disabled:border-gray-200 dark:disabled:border-gray-500 text-white dark:disabled:text-gray-400 py-2 px-4 border border-orange-600 rounded"
              >
                <div className="flex h-min justify-center flex-row">
                  {fetching ? <SpinnerSmallOrange /> : 'Registrovat'}
                </div>
              </button>
            </div>
          </form>
          {apiResponse?.error &&
            <span className="mt-2 text-red-400 text-xs">
              {apiResponse.error}
            </span>
          }
          {apiResponse?.message &&
            <span className="mt-2 text-green-400 text-xs">
              {apiResponse.message}
            </span>
          }
        </div>
        <div className="hidden">
          souhlasím s podmínkami registrace
          <input type="checkbox"  
          value={checkbox}
          onChange={(e) => setCheckbox(e.target.checked)}  />
        </div>
      </div>
    </div>
  );
}
