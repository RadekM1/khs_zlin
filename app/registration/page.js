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
import InputField from "@/components/auth-form/inputField";
import { validateName } from "@/lib/functions/validateName";
import { MdMarkEmailRead } from "react-icons/md";
import { BsPersonLock } from "react-icons/bs";

export default function Page() {

  const [errorUser, setErrorUser] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [errorPass, setErrorPass] = useState(undefined);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const [checkbox, setCheckbox] = useState(false)
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [fetching, setFetching] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errorFirstName, setErrorFirstName] = useState(undefined)
  const [errorLastName, setErrorLastName] = useState(undefined)
  const [errorFirstNameMsg, setErrorFirstNameMsg] = useState(undefined)
  const [errorLastNameMsg, setErrorLastNameMsg] = useState(undefined)
  const [pendingReg, setPendingReg] = useState(true)


  const handleChange = (e, id) => {
    const tempVal = e.target.value;

    switch(id){
      case 'user': setUser(tempVal); break;
      case 'password': setPassword(tempVal); break;
      case 'passwordCheck': setPasswordCheck(tempVal); break;
      case 'firstName' : setFirstName(tempVal); break;
      case 'lastName' : setLastName(tempVal); break;
      default: break;
    }
  };

  useEffect(() => {

    if (firstName && !validateName(firstName).valid){
      setErrorFirstName(true)
      let temp = validateName(firstName).error
      setErrorFirstNameMsg(temp)
    } else {
      setErrorFirstName(false)
      setErrorFirstNameMsg(undefined)
    }

    if (lastName && !validateName(lastName).valid){
      setErrorLastName(true)
      let temp = validateName(lastName).error
      setErrorLastNameMsg(temp)
    } else {
      setErrorLastName(false)
      setErrorLastNameMsg(undefined)
    }
    
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

 
    if (password && validatePassword(password)) {
      setPasswordStrong(true);
      setErrorPass(false);
    } else {
      setPasswordStrong(false);

    }

    


    if (password === passwordCheck) {
      setPasswordEqual(true);
      setErrorPass(false);
    } else {
      setPasswordEqual(false);
      setErrorPass(true);
    }



   
    const isFormValid =
      validateEmail(user) &&
      validatePassword(password) &&
      passwordEqual && 
      !errorFirstName &&
      !errorLastName &&
      !checkbox;

    setDisabled(!isFormValid);  
}, [user, password, passwordCheck, checkbox, firstName, lastName, errorUser, errorPass, errorFirstName, errorLastName, passwordEqual]);

  






  // ---------------- API ------------------------



 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      user: user,
      password: password,
      operation: 'registration',
    }
    setDisabled(true)
    setFetching(true)
    try{

      const response = await fetch('api/users', {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
      });
    
      const result = await response.json();
      setApiResponse(result)
        if(!result.error){
          setPendingReg(false)
        }
          
      
      
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
          {pendingReg && 
          
          <form onSubmit={handleSubmit}>
            <div className="w-full max-w-sm  ">
              <InputField label='Jméno' widthInput='280' id='firstName' error={errorFirstName} value={firstName} handleChange={handleChange} />
            </div>
            <div className="  text-xs text-center  text-red-400 -mt-3 h-5 flex-wrap flex ">
              {errorFirstName && errorFirstNameMsg}
            </div>
            <div className="w-full max-w-sm">
              <InputField label='Příjmení' widthInput='280' error={errorLastName} id='lastName' value={lastName} handleChange={handleChange} />
            </div>  
            <div className="text-xs text-center text-red-400 -mt-3 h-5  flex-wrap flex">
              {errorLastName && errorLastNameMsg}
            </div>
            <div className="w-full mb-2 max-w-sm">
              <UserField error={errorUser} value={user} handleChange={handleChange} />
              
            </div>
            <div className="-mt-3 h-5 text-start text-xs text-red-400">
            {userErrorMessage}
            </div>
            <div className="flex-col mb-2">
              <div className="flex-row relative">
                <div>
                  <PassField id='password' label='Heslo' error={errorPass} handleChange={handleChange} />
                </div>
                <div className="absolute top-6 -right-5">
                  {password && passwordEqual && <IoShieldCheckmarkOutline className="text-green-400" />}
                </div>
              </div>
            </div>
            <div className="flex flex-col relative">
              <PassField id='passwordCheck' error={errorPass} label='Ověřit heslo' handleChange={handleChange} />
              <div className="absolute top-6 -right-5">
                {password && passwordEqual && <IoShieldCheckmarkOutline className="text-green-400" />}
              </div>
              <div className={`${passwordEqual === false ? '' : 'hidden'} flex-wrap  mb-2  text-xs text-red-400`}>
                  - hesla jsou krátká, nebo rozdílná
              </div>
              <div className={`${passwordStrong === false ? '' : 'hidden'} flex-wrap  text-xs text-red-400`}>
                  - heslo musí obsahovat alespoň 8 znaků, <br />
                  jedno velké písmeno a číslo
              </div>
              <div className={`flex ${passwordStrong === true ? '' : 'hidden'} justify-center mb-2  mt-2 flex-row`}>
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
          
          }
          {apiResponse?.error &&
            <span className="mt-2 text-red-400 text-xs">
              {apiResponse.error}
            </span>
          }
          {apiResponse?.message &&
            <span className="mt-14 flex-col items-center md:flex-row flex text-green-400 text-xl">
              {apiResponse.message}
              <MdMarkEmailRead className="ml-4 w-6 h-6 " />
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
      <div className="w-full text-center flex">
        <section className="w-full divide-y mt-10 text-center  divide-slate-200 rounded">
          <details className="group flex justify-center items-center flex-grow w-full p-4" closed>
            <summary className="items-center dark:text-gray-300 self-center justify-center flex w-full flex-grow cursor-pointer text-center list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              <BsPersonLock className="text-orange-500 h-6 w-6" />
              Ochrana osobních údajů
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac06 desc-ac06"
              >
                <title id="title-ac06">Open icon</title>
                <desc id="desc-ac06">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <div className="flex justify-center">

            <ul className="text-gray-500 md:w-1/2 text-xs text-start  self-center dark:text-gray-300">
              <li className="mt-2">
                - citlivé údaje jako email a příjmení nejsou nikde v aplikaci veřejně k dispozici
              </li>
              <li className="mt-1">
                - zadané heslo není k dispozici ani adminovi stránek, je uloženo v zašifrované podobě a má 60+ znaků
              </li >
              <li  className="mt-1">
                - při publikování článků nebo komentářů není zveřejněno vaše příjmení, příklad publikované podoby: Jan N. (první písmeno z příjmení)
              </li>
              <li className="mt-1">
                - Bylo přistoupeno v rámci účtu místo přezdívky k jménu a příjmení z důvodu navázání databáze půjčovny vybavení, knih atd. pro přehlednější evidenci.
              </li>
            </ul>

            </div>

          </details>
        </section>

        </div>
    </div>
  );
}
