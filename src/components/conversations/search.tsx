import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<FieldValues>
  cases?:
    | {
        name: string
        id: string
        description: string | null
        icon: string | null
      }[]
    | undefined
}

const ConversationSearch = ({ register, cases }: Props) => {
  return (
    <div className="flex flex-col py-3">
      <select
        {...register('domain')}
        className="px-3 py-4 text-sm border-[1px] rounded-lg mr-5"
      >
        <option
          disabled
          selected
        >
          Cases name
        </option>
        {cases?.map((caseItem) => (
          <option
            value={caseItem.id}
            key={caseItem.id}
          >
            {caseItem.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ConversationSearch
