import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';

export default async function Page() {

  const session = await getServerSession(authOptions);
  const clearance = session?.user?.clearance;

  return (
   
      <div className="flex w-full flex-col">
        <span className="text-2xl">Seznam článků</span>
        <div className="flex justify-center mx-10">
          {
          (clearance === 'editor' || clearance === 'admin') ? 
           <p className="text-start my-5">CHRÁNĚNÁ KOMPONENTA</p> : <Rejected />
          }
        </div>
      </div>
   
  );
}
