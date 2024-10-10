import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import Profile from '@/components/dashboard/profile';

export default async function Page() {

  const session = await getServerSession(authOptions);
  const clearance = session?.user?.clearance;

  return (
   
      <div className="flex w-full flex-col">
        <span className="text-2xl">Uživatelský účet</span>
        <div className="flex justify-center mx-10">
          {
          (session) ? 
           <Profile /> : <Rejected />
          }
        </div>
      </div>
   
  );
}
