import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import Profile from '@/components/dashboard/profile';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const clearance = session?.user?.clearance;

  // Pokud není session k dispozici (uživatel není přihlášen)
  if (!session) {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <span className="text-2xl">Musíte být přihlášeni, abyste viděli tento obsah.</span>
      </div>
    );
  }


  if (clearance === 'rejected') {
    return <Rejected />;
  }

  return (
    <div className="flex w-full flex-col">

      <div className="flex justify-center md:mx-5">
        {/* Vykreslení profilu uživatele */}
        <Profile session={session} />
      </div>
    </div>
  );
}
