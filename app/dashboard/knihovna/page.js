import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import BooksTable from '@/components/table/booksTable';

export default async function Page() {

  const session = await getServerSession(authOptions);
  const clearance = session?.user?.clearance;

  return (
   
      <div className="flex w-full flex-col">
        <span className="text-2xl">Knihovna</span>
        <div className="flex justify-center">
          {
          (clearance === 'editor' || clearance === 'admin') ? 
           <BooksTable /> : <Rejected />
          }
        </div>
      </div>
   
  );
}
