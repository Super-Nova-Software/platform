import { onGetCurrentDomainInfo } from '@/actions/settings'
import BotTrainingForm from '@/components/forms/settings/bot-training'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = { params: { cases: string } }

const CasesSchedulepage = async ({ params }: Props) => {
  const cases = await onGetCurrentDomainInfo(params.cases)
  if (!cases) redirect('/dashboard')

  return (
    <>
        <BotTrainingForm id={cases.Case[0].id} />
    </>
  )
}
export default CasesSchedulepage
