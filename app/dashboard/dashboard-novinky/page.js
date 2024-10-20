import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import NewsMainComponent from '@/components/blog/newsMainComponent';


export default async function Page() {
  const session = await getServerSession(authOptions);
  const clearance = session?.user?.clearance;

  const tiny = true

  return (
    <div className="flex w-full flex-col">
      <span className="text-2xl">Novinky</span>
      <div className="flex justify-center mt-10 mx-4">
        {(clearance === 'editor' || clearance === 'admin') ? (
          <NewsMainComponent tiny={tiny} />
        ) : (
          <Rejected />
        )}
      </div>
    </div>
  );
}
