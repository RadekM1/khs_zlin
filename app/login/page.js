'use client'

import PassField from "@/components/auth-form/passField";
import UserField from "@/components/auth-form/userField";
import { MdAdminPanelSettings } from "react-icons/md";
import { useState, useEffect } from "react";
import SpinnerSmallOrange from "@/components/spinners/spinnerSmallOrange";
import InputField from "@/components/auth-form/inputField";
import Link from "next/link";

export default function page() {

{/* ověření přihlášení */}
const [errorEmail, setErrorEmail] = useState(undefined)
const [emailErrorMessage, setEmailErrorMessage] = useState(undefined)


{/* ověření zapomenuté heslo */}
const [forgotenErrorMessage, setForgotenErrorMessage] = useState(undefined)
const [errorForgoten, setErrorForgoten] = useState(false)


const [forgotenVisible, setForgotenVisible] = useState('hidden')
const [disableForgotenBtn, setDisableForgotenBtn] = useState(true)


{/* ověření odeslat login */}
const [disabledLogin, setDisabledLogin] = useState(true)
  
  
  {/* proměnné formuláře */}
  const [user, setUser] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  
  
    {/* plnič proměnných */}
  const handleChange = (e, id) => {
    const tempVal = e.target.value
    const tempId = id

    switch(tempId){
      case 'user': {
        setUser(tempVal);
        break;
      } 
      case 'password': setPassword(tempVal);break;
      case 'forgoten': setEmail(tempVal);break;
      default: break;
    }
  }

  {/* kontrola formuláře */}
  useEffect(()=>{
    if(user && !validateEmail(user)){
      setErrorEmail(true)
      setEmailErrorMessage('nevyhovující formát')
    }
    else if (user && validateEmail(user)){
      setErrorEmail(false)
      setEmailErrorMessage(undefined)
    }
    if(email && !validateEmail(email)){
      setErrorForgoten(true)
      setForgotenErrorMessage('nevyhovující formát')
    }
    else if (email && validateEmail(email)){
      setErrorForgoten(false)
      setForgotenErrorMessage(undefined)
    }
  }, [user, email,errorEmail ])

 
 
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user && password && (!errorEmail || errorEmail === false) ){
      console.log('všechno cajk')
    }
    console.log('všecko špatně')
  }

  const handlePassReset = () => {
    console.log('reset handler')
  }

  const handleForgotenVisibility = () => {
    setForgotenVisible('')
  }

    return (
      <div className="flex w-full flex-col text-center justify-center items-center">
        <div className="flex justify-center flex-row items-center mb-4">
          <MdAdminPanelSettings className=" mr-2 w-8 h-8" />
          <div className="text-2xl">Přihlášení</div>
        </div>
        <div className="flex flex-col items-center mx-10">
          <div className="rounded-2xl p-3 flex flex-col items-center">
            <form onSubmit={handleSubmit}>
            <div className="w-full max-w-sm">
              <UserField 
              error={errorEmail} 
              handleChange={handleChange} 
              />
              <span className="text-xs text-red-400">{emailErrorMessage}</span>
            </div>
            <div className="mt-4" >
              <PassField 
              id='password' 
              label='Heslo' 
              handleChange={handleChange} 
              />
            </div>
            <div className="mt-4">
              <button 
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-100 dark:disabled:bg-gray-600 disabled:border-gray-200 dark:disabled:border-gray-500 text-white dark:disabled:text-gray-400 py-2 px-4 border border-orange-600 rounded"

              >
                <div className="flex h-min flex-row">
                Přihlásit 
                </div>
              </button>
            </div>
            </form>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center   w-full">
            <div className="text-sm mb-10 flex w-full flex-col text-center justify-center mt-4">
              <div>
                <a href="#" onClick={()=>handleForgotenVisibility()} className="hover:text-orange-600 dark:hover:text-orange-200">Zapomenuté heslo ?</a>
                </div>
              <form className={` mt-2 flex-col text-center ${forgotenVisible}`}  onSubmit={handlePassReset}>
                <InputField handleChange={handleChange} error={errorForgoten} id='forgoten' label='zadejte email' />
                <span className="text-red-500">{forgotenErrorMessage}</span><br/>
                <span className="text-xs text-start text-gray-500 dark:text-gray-400">
                  Zadejte váš email, pokud se nalézá <br/> v databázi, bude odeslána žádost na obnovu hesla.


                </span>
                <div>
                  <button type="submit" className=" mt-2 dark:bg-orange-900  dark:hover:bg-orange-950 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-100 dark:disabled:bg-gray-600 disabled:border-gray-200 dark:disabled:border-gray-500 text-white dark:disabled:text-gray-400 py-2 px-4 border border-orange-600 rounded" >
                    odeslat
                  </button>
                </div>
              </form>
            </div>
              <div className="w-full md:1/2 text-center mt-4">
                <Link href={'/registration'} className="hover:text-orange-600 dark:hover:text-orange-200 " >
                  Zaregistrovat
                </Link>
              </div>
          </div>
          <div>
            <div className=" mt-10">
              <label htmlFor="login_confirm">Potvrdit příhlášení</label>
              <input id="login_confirm" value='unchecked' onClick={()=>{setDisabledLogin(true); setDisableForgotenBtn(true)}} type="checkbox" />
            </div>
          </div>
        </div>
  
    );
}
