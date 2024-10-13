import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import AdminCalendar from '@/components/dashboard/adminCalendar';

export default async function Page() {

  const session = await getServerSession(authOptions);
  const clearance = session?.user?.clearance;

  return (
   
      <div className="flex w-full flex-col">
        <span className="text-2xl">Kalendář akcí</span>
        <div className="flex justify-center mx-2">
          {
          (clearance === 'editor' || clearance === 'admin') ? 
          <AdminCalendar /> : <Rejected />
          }
        </div>
      </div>
   
  );
}
