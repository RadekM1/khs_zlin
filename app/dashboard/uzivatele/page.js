import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import UserTable from '@/components/table/userTable';
import Spinner from "@/components/spinners/spinnerSmallOrange";
import { Suspense } from "react";

export default async function Page() {

  const session = await getServerSession(authOptions);
  const clearance = session.user.clearance;



  return (
   <Suspense fallback={ <Spinner />} >
        <div className="flex w-full flex-col">
          <span className="text-2xl">Uživatelské účty</span>
          
          <div className="flex justify-center my-10">
            {
            
            (clearance === 'admin') ? 
            
              
                <UserTable />  : <Rejected />
          
            }
          </div>
        </div>
      </Suspense>
   
  );
}