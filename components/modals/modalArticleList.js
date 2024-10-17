'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import ArticleTable from '../table/articleTable';

export default function ModalRental({ open, setIdToEdit, setOpen, setTitle, setCategory, setGallery, setThumbnail, setAccount, setEditActive, setEditorContent}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full mx-5 md:mx-10 lg:mx-32 items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg dark:bg-gray-900 bg-white text-left shadow-xl transition-all w-full max-w-none sm:my-8"
          >
            <div className="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <ArticleTable setIdToEdit={setIdToEdit} setTitle={setTitle} setEditActive={setEditActive} setAccount={setAccount} setEditorContent={setEditorContent} setThumbnail={setThumbnail} setGallery={setGallery} setCategory={setCategory} setOpen={setOpen}  />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full text-white justify-center rounded-md bg-orange-400 dark:bg-orange-800 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-orange-900 sm:mt-0 sm:w-auto"
              >
                Zavřít
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
