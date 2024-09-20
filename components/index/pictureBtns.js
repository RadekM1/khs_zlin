


const images = [
    {
      url: '/static/images/buttons/breakfast.jpg',
      title: 'Breakfast',
    },
    {
      url: '/static/images/buttons/burgers.jpg',
      title: 'Burgers',
      width: '30%',
    },
    {
      url: '/static/images/buttons/camera.jpg',
      title: 'Camera',
      width: '30%',
    },
  ];
export default function PictureBtns () {



    return (
        <>
            <div className="grid grid-cols-2 mt-10 md:mt-5 lg:grid-cols-4 w-full gap-4" >
                <div className="bg-gray-400">
                    test
                </div>
                <div className="bg-gray-300">
                    test
                </div>
                <div className="bg-gray-500">
                    test
                </div>
                <div className="bg-gray-600">
                    test
                </div>
            </div>
        </>
    )
}