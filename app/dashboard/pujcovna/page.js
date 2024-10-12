import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import RentalTable from '@/components/table/rentalTable';


export default async function Page() {

  const session = await getServerSession(authOptions);
  const clearance = session?.user?.clearance;

  return (
   
      <div className="flex w-full flex-col">
        <span className="text-2xl">Seznam článků</span>
        <div className="flex justify-center">
          {
          (clearance === 'editor' || clearance === 'admin') ? 
           <RentalTable /> : <Rejected />
          }
        </div>
      </div>
   
  );
}
