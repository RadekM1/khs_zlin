import NewsFeed from '@/components/index/newsFeed';
import Logo from '../components/index/logo';
import ArticleFeed from '@/components/index/articleFeed';
import ImgBtnsArticles from '@/components/index/imgBtnsArticles';

export default function LandingPart() {
  return (
    <>
      <div className="flex flex-col flex-grow max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto">
        <div aria-hidden="true" className="flex justify-center flex-wrap flex-grow mt-16">
          <Logo />
        </div>
        <div className="flex relative flex-grow gap-6 flex-col lg:flex-row w-full">
          <div className="lg:w-1/2 w-full">
            <div className="flex relative justify-center">
              <ArticleFeed />
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-[#121212] lg:w-1/2 w-full">
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
          <div className='mb-20'></div>

        </div>
        
        

      
    </>
  );
}
