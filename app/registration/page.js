'use client'

import PassField from "@/components/auth-form/passField";
import UserField from "@/components/auth-form/userField";
import { useState, useEffect } from "react";
import SpinnerSmallOrange from "@/components/spinners/spinnerSmallOrange";
import { FiUserPlus } from "react-icons/fi";

export default function Page() {


  const [errorEmail, setErrorEmail] = useState(undefined)
  const [emailErrorMessage, setEmailErrorMessage] = useState(undefined)
  const [approved, setApproved] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [user, setUser] = useState(undefined)
  const [passwordCheck, setPasswordCheck] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [errorPass, setErrorPass] = useState(undefined)

  
  const handleChange = (e, id) => {
    const tempVal = e.target.value
    const tempId = id

    switch(tempId){
      case 'user': {
        setUser(tempVal);
        break;
      } 
      case 'password': setPassword(tempVal);break;
      case 'passwordCheck': setPasswordCheck(tempVal);break;
      default: break;
    }
  }



  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (email) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    return passwordRegex.test(email);
  };

  
  const handleApproved = () => {
    console.log('fire test login')
  }

  const handleSubmit = () => {
    console.log('submit is firing')
  }




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
              <UserField error={errorEmail} handleChange={handleChange} />
              <span className="text-xs text-red-400">{emailErrorMessage}</span>
            </div>
            <div className="mt-4" >
              <PassField id='password' label='Heslo' error={errorPass}  handleChange={handleChange} />
            </div>
            <div className="mt-4" >
              <PassField id='passwordCheck' error={errorPass} label='Oveřit heslo' handleChange={handleChange} />
            </div>
            <div className="mt-4">
              <button 
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-100 dark:disabled:bg-gray-600 disabled:border-gray-200 dark:disabled:border-gray-500 text-white dark:disabled:text-gray-400 py-2 px-4 border border-orange-600 rounded"
              disabled={disabled}
              onClick={()=>handleApproved()}
              >
                <div className="flex h-min flex-row">
                Registrovat 
                </div>
              </button>
            </div>
            </form>
            </div>
          </div>
          <div>
            <div className="hidden mt-10">
              <label htmlFor="login_confirm">Potvrdit registraci</label>
              <input id="login_confirm" onClick={()=>{setDisabled(true)}} type="checkbox" />
            </div>
          </div>
        </div>
  
    );
}
