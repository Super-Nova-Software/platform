"use client";
import React from 'react';
import Image from 'next/image';

type Document = {
  id: string;
  file: string;
};

type Props = {
  selectedDocument: Document | null;
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const DocumentPreview = ({ selectedDocument, imageLoaded, setImageLoaded }: Props) => (
  <div className="mt-4 flex justify-center">
    {selectedDocument ? (
      <>
        {!imageLoaded && <p>Loading image...</p>}
        <Image
          src={`https://ucarecdn.com/${selectedDocument.file}/`}
          width={600}
          height={200}
          alt="Data Preview"
          className="rounded-lg object-contain max-w-full"
          onError={(e) => (e.currentTarget.src = '/default-image.png')}
          onLoadingComplete={() => setImageLoaded(true)}
        />
      </>
    ) : (
      <p className="text-center">Select a document to preview</p>
    )}
  </div>
);

export default DocumentPreview;
