import { onGetCurrentDomainInfo } from '@/actions/settings'
import CaseDocument from '@/components/documents'

import { redirect } from 'next/navigation'
import React from 'react'

type Props = { params: { cases: string } }

const CasesDocumentgpage = async ({ params }: Props) => {
  const cases = await onGetCurrentDomainInfo(params.cases)
  if (!cases) redirect('/dashboard')

  return (
    <>
        <CaseDocument
          id={cases.Case[0].id}
          document={cases.Case[0].Document || []}
        />
      
    </>
  )
}
export default CasesDocumentgpage
