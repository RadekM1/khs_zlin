import Image from "next/image"

export default function Logo () {

  

    return (
        <div className="flex"> 
            <div className="flex flex-center w-full transition filter ease-in-out duration-500 dark:brightness-75 ">
                <Image
                    src="https://storage.googleapis.com/khs-zlin/main_launch.png"
                    alt="Landing Image"
                    width={1700}
                    height={100}
                    priority
                />
            </div>
        </div>

    )
}