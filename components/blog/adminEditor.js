'use client';
import dynamic from 'next/dynamic';
import { useState} from 'react';


const TinyMceEditor = dynamic(() => import('@/components/blog/tinyMce'), {
  ssr: false, 
});


export default function AdminEditor({ editorContent, setEditorContent}) {




  return (
    <div className='flex w-full my-5 flex-col'>
    <TinyMceEditor 
      editorContent={editorContent} setEditorContent={setEditorContent}
    /> 
    </div>
  );
}



     
