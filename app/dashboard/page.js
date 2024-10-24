import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Rejected from '@/components/dashboard/rejected';
import Link from 'next/link';



export default async function Page() {

  const session = await getServerSession(authOptions);
  const clearance = session.user.clearance;



  return (

        <div className="flex w-full flex-col">
          <span className="text-2xl">Uživatelské účty</span>
          
          <div className="flex justify-center my-10">
            {
            
            (session) ? 
            
              
                <div className='text-start flex flex-col'>
                    <span className='my-1'>rychlá navigace v sekci:</span>

                    

                    <Link href={'/dashboard/profil'} className='text-orange-500 underline my-1' >Profil</Link>

                    {(clearance === 'member' || clearance === 'editor' || clearance === 'admin') &&

                    <Link href={'/dashboard/dashboard-clanky'} className='text-orange-500 underline my-1' >Dashboard - články</Link>
                    }

                    {(clearance === 'editor' || clearance === 'admin') &&
                    
                        <>

                    <Link href={'/dashboard/dashboard-novinky'} className='text-orange-500 underline my-1' >Dashboard - novinky</Link>
                    <Link href={'/dashboard/kalendar'} className='text-orange-500 underline my-1' >Kalendář</Link>
                    <Link href={'/dashboard/knihovna'} className='text-orange-500 underline my-1' >Knihovna</Link>
                    <Link href={'/dashboard/pujcovna'} className='text-orange-500 underline my-1' >Půjčovna</Link>
                    </>

                    }

                    {clearance === 'admin' &&
                    <Link href={'/dashboard/uzivatele'} className='text-orange-500 underline my-1' >Uživatelé</Link>
                    }

                </div>
                
                
                
                
                
                : 
                
                
                
                
                
                <Rejected />
          
            }
          </div>
        </div>

   
  );
}