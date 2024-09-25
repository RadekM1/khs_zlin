import NewsFeed from '@/components/index/newsFeed';
import Logo from '../components/index/logo';
import ArticleFeed from '@/components/index/articleFeed';
import ImgBtnsArticles from '@/components/index/imgBtnsArticles';
import ImgBtnsNav from '@/components/index/imgBtnsNav';
import Calendar from '@/components/index/calendar';
import CalendarFeed from '@/components/index/calendarFeed';
import { FcCalendar } from "react-icons/fc";
import dayjs from 'dayjs';
import LogoCloudPartners from '@/components/index/logoCloudPartners';
import LogoCloudSponsors from '@/components/index/logoCloudSponsors';



export default function LandingPart() {

  const Months = [
    'leden', 'únor', 'březen', 'duben', 'květen', 'červen', 
    'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'
  ];
  
  const year = dayjs().year()

  
  const currentMonth = dayjs().month()

  return (
    <div className='flex w-full flex-col'>
    
      <div className="flex flex-col flex-grow max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto"> 
        <div aria-hidden="true" className="flex justify-center flex-wrap flex-grow mt-16">
          <Logo />
        </div>
        <ImgBtnsNav/>
        <div className="flex relative flex-grow gap-6 flex-col lg:flex-row w-full">
          <div className="lg:w-1/2 w-full">
            <div className="flex relative justify-center">
              <ArticleFeed />
            </div>
          </div>
          <div className=" mt-10 dark:bg-[#121212] lg:w-1/2 w-full">
            <div className="flex justify-center items-center">
              <NewsFeed />
            </div>
          </div>
        </div>
        <div>
        </div>
          <div className="w-full dark:bg-[#121212] mb-5 mt-10 text-2xl flex font-bold dark:text-white text-gray-500 justify-center text-center">
                Články dle témat
            </div>
          <ImgBtnsArticles/>
          <div>
          </div>
          <div className='mb-20'>
          </div>
          </div>
        <div className='flex w-full flex-col border-t border-1 dark:border-gray-600 bg-white dark:bg-[#191919]'>
          <div className='flex my-5 flex-col  flex-grow max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto'>
          <div className="w-full lg:px-10 dark:bg-[#191919] text-2xl flex font-bold dark:text-white text-gray-500 justify-center text-center">
            <div className=' text-gray-700 flex mt-10 w-full flex-col flex-wrap '>
              <div>
                <div className='flex mb-10 mt-3 flex-row  justify-center '>
                  <div className='flex-shrink flex'>
                    <FcCalendar  className=" self-end text-gray-400 w-8 h-8 " /> 
                  </div>
                  <div className='flex-shrink dark:text-gray-200  flex ml-5 text-lg md:text-2xl'>
                    {`Kalendář akcí pro ${Months[currentMonth]} ${year}`}
                  </div>
                </div>
              </div>
              <div className='grid lg:grid-cols-2'>
                <div className='col-auto md:mx-5 '>
                  <Calendar  />
                </div>
                <div className='col-auto md:mx-5'>
                  <CalendarFeed />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='dark:bg-black border-t  dark:border-t-gray-600 border-gray-300' >
        <LogoCloudPartners  />
      </div>
      <div className='dark:bg-black border-t  border-gray-300 dark:border-gray-600 bg-white'>
        <LogoCloudSponsors />
      </div>
    </div>
  );
}
