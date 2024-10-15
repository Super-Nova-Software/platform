import { onGetCurrentDomainInfo } from '@/actions/settings'
import BotTrainingForm from '@/components/forms/settings/bot-training'
import SettingsForm from '@/components/forms/settings/form'
import InfoBar from '@/components/infobar'
import ProductTable from '@/components/products'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = { params: { domain: string } }

const DomainSettingsPage = async ({ params }: Props) => {
  const cases = await onGetCurrentDomainInfo(params.domain)
  if (!cases) redirect('/dashboard')

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <SettingsForm
          plan={cases.subscription?.plan!}
          // chatBot={domain.Case[0].}
          id={cases.Case[0].id}
          name={cases.Case[0].name}
        />
        <BotTrainingForm id={cases.Case[0].id} />
        <ProductTable
          id={cases.Case[0].id}
          document={cases.Case[0].Document || []}
        />
      </div>
    </>
  )
}

export default DomainSettingsPage
