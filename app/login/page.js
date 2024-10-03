'use client'

import InputField from "@/components/auth-form/inputField";
import PassField from "@/components/auth-form/passField";
import ClassicBtn from "@/components/btns/classicBtn";
import UserField from "@/components/auth-form/userField";

export default function page() {
    return (
      
      <div className="flex w-full flex-col justify-center">
        <span className="text-2xl">Přihlášení</span>
        <div className="flex mx-10 flex-col justify-center">
          <div className="mt-10 border-gray-300 rounded-2xl justify-center flex-col flex ">
            <div className="flex-col" >
              <div className="ml-2">
                <InputField/>
                <PassField/>
                <UserField/>
              </div>
            </div>
            <div>
              <ClassicBtn />
            </div>
          </div>
          <div>
            zapomenuté heslo
          </div>
          <div>
            zadejte váš email, pokud se nalézá v databázi bude odesláno resetování hesla
          </div>
          <div>
            vábnička na boty
          </div>
        </div>
      </div>
    );
  }
