'use client';
import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import Delta from 'quill-delta';

export default function ArticleSimpleEditor({ editorContent, setEditorContent, setTextFromEditor, resetEditor }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['code-block'], 
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'], 
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'code-block', 'list', 'link',
  ];

  const { quill, quillRef } = useQuill({ modules, formats });

  
  useEffect(() => {
    if (quill && editorContent !== undefined) {
      const currentContents = quill.root.innerHTML;
      if (currentContents !== editorContent) {
        quill.clipboard.dangerouslyPasteHTML(editorContent); 
      }
    }
  }, [quill, editorContent]);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const newContent = quill.root.innerHTML;
        const newPlainText = quill.getText(); 
        setEditorContent(newContent);
        setTextFromEditor(newPlainText);
      });


      quill.clipboard.addMatcher('IMG', () => {
        alert('Vkládání obrázků do textu není povoleno, nahrajte prosím fotografie jako přílohy fotogalerie');
        return new Delta();
      });

      quill.clipboard.addMatcher('VIDEO', () => {
        alert('Vkládání videí do textu není povoleno, pouze odkaz na videa (např youtube)');
        return new Delta();
      });
    }
  }, [quill, setEditorContent]);

 
  useEffect(() => {
    if (quill && resetEditor) {
      quill.setContents([]);
    }
  }, [quill, resetEditor]);

  return (
    <div className='w-full dark:text-white'>
      <div ref={quillRef} />
    </div>
  );
}
