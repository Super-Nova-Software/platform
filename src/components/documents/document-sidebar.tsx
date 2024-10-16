"use client";
import React from 'react';
import { Button } from '../ui/button';

type DocumentSummary = {
  totalFiles: number;
  totalSize: number;
};

type Props = {
  documentSummary: DocumentSummary;
  formatSize: (bytes: number) => string;
};

const DocumentSidebar = ({ documentSummary, formatSize }: Props) => (
  <div className="space-y-4 border-t lg:border-t-0 lg:border-l p-4">
    <h3 className="text-lg font-semibold mb-4">Files</h3>

    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium">Files</p>
        <p>{documentSummary.totalFiles} files</p>
      </div>

      <div>
        <p className="text-sm font-medium">Size</p>
        <p>{formatSize(documentSummary.totalSize)}</p>
      </div>

      <div>
        <p className="text-sm font-medium">Type</p>
        <p>csv</p>
      </div>

      <div>
        <p className="text-sm font-medium">License</p>
        <a href="#" className="hover:underline">
          Attribution 4.0 International (CC BY 4.0)
        </a>
      </div>
    </div>

    <div className="mt-6">
      <h4 className="text-md font-semibold mb-2">Summary</h4>
      <p>{documentSummary.totalFiles} files</p>
      <p>27 columns (placeholder)</p>
    </div>

    <div className="mt-6">
      <Button className="w-full py-2 rounded-lg "
      variant={"secondary"}
      >
        Download All
      </Button>
    </div>
  </div>
);

export default DocumentSidebar;
