'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useRef, useEffect, useState, useMemo } from 'react';
import { useTheme } from 'next-themes'; 

export default function TinyMceEditor({ editorContent, setEditorContent }) {
  const editorRef = useRef(null);
  const { resolvedTheme } = useTheme();  
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    setIsDarkMode(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  const editorConfig = useMemo(() => ({
    language: 'cs',
    height: 600,
    menubar: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    skin: isDarkMode ? 'oxide-dark' : 'oxide',
    content_css: isDarkMode ? 'dark' : 'default',
    toolbar: 'undo redo |' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | link',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  }), [isDarkMode]);

  return (
    <div className='flex flex-col dark:bg-black w-full'>
      <Editor
        apiKey='cjooqu0rw6078wn0qbepsryqlc3wwl4ubib23zsjie8s0op2'
        onInit={(_evt, editor) => editorRef.current = editor}
        value={editorContent}  
        onEditorChange={handleEditorChange} 
        init={editorConfig}  
        key={isDarkMode} 
      />
    </div>
  );
}
