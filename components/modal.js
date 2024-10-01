'use client'

import ModalImage from "react-modal-image";


export default function ModalImg ({imgSrc,alt}) {
    return (
        <ModalImage
            small={imgSrc}
            large={imgSrc}
            alt={alt}
            className="rounded-2xl border-gray-300 dark:border-gray-700 dark:brightness-50 border-[1px]"
        />
    )
}