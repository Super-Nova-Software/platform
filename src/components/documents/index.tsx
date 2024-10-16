"use client";
import React, { useState, useMemo } from 'react';
import { SideSheet } from '../sheet';
import { Plus } from 'lucide-react';
import { CreateDocumentForm } from './document-form';
import DocumentSidebar from './document-sidebar';
import DocumentPreview from './document-preview';
import DocumentExplorer from './document-explorer';


type Document = {
  id: string;
  name: string | null;
  file: string;
  description: string | null;
  createdAt: Date;
  // size: number;
};

type Props = {
  document: Document[];
  id: string;
};

const CaseDocument = ({ id, document }: Props) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const documentSummary = useMemo(() => {
    const totalFiles = document.length;
    const totalSize = document.reduce((acc, doc) => acc + doc?.size, 0);
    return { totalFiles, totalSize };
  }, [document]);

  const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <div className="p-4 space-y-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="font-bold text-2xl text-center sm:text-left">Documents</h2>
        <SideSheet
          description="Add a document to your case customers."
          title="Add a document"
          className="flex items-center gap-2 bg-orange-500 px-4 py-2 font-semibold rounded-lg text-sm"
          trigger={
              <><Plus size={20} /><p>Add Document</p></>
          }
        >
          <CreateDocumentForm id={id} />
        </SideSheet>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <DocumentPreview
            selectedDocument={selectedDocument}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />
        </div>
        <div className="w-full lg:w-1/6">
          <DocumentExplorer document={document} setSelectedDocument={setSelectedDocument} />
        </div>
        <div className="lg:w-1/6">
          <DocumentSidebar documentSummary={documentSummary} formatSize={formatSize} />
        </div>

      </div>
    </div>
  );
};

export default CaseDocument;
