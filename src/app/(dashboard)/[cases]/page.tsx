import { onGetCurrentDomainInfo } from '@/actions/settings'
import SettingsForm from '@/components/forms/settings/form'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = { params: { cases: string } }

const DomainSettingsPage = async ({ params }: Props) => {
  const cases = await onGetCurrentDomainInfo(params.cases)
  if (!cases) redirect('/dashboard')

  return (
    <>
    <SettingsForm
      plan={cases.subscription?.plan!}
      id={cases.Case[0].id}
      name={cases.Case[0].name}
    />
    </>
  )
}
export default DomainSettingsPage
