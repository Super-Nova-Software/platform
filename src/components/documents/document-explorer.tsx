"use client";
import React from 'react';
import { Button } from '../ui/button';

type Document = {
  id: string;
  name: string | null;
};

type Props = {
  document: Document[];
  setSelectedDocument: (doc: Document) => void;
};

const DocumentExplorer = ({ document, setSelectedDocument }: Props) => (
  <div className="mt-6">
    <h4 className="text-md font-semibold mb-2">Data Explorer</h4>
    <ul className="space-y-2">
      {document.map((doc) => (
        <li key={doc.id}>
          <Button
            className="hover:underline text-sm block w-full text-left"
            onClick={() => setSelectedDocument(doc)}
            variant={"ghost"}
          >
            {doc.name || 'Unnamed Document'}
          </Button>
        </li>
      ))}
    </ul>
  </div>
);

export default DocumentExplorer;
