import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import ArticlesMainComponent from '@/components/blog/articlesMainComponent';

export default async function Page() {

  const session = await getServerSession(authOptions);
  const clearance = session?.user?.clearance;

  return (
   
      <div className="flex w-full flex-col">
        <span className="text-2xl">Články</span>
        <div className="flex justify-center mx-4 mt-10">
          {
          (clearance === 'editor' || clearance === 'admin' || clearance === 'member') ? 
           <ArticlesMainComponent /> : <Rejected />
          }
        </div>
      </div>
   
  );
}
