import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

type Props = {
  register: UseFormRegister<FieldValues>
  userType: 'owner' | 'lawyer' | 'client'
  setUserType: React.Dispatch<React.SetStateAction<'owner' | 'lawyer' | 'client'>>
}

const TypeSelectionForm = ({ register, setUserType, userType }: Props) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Create an account</h2>
      <p className="text-iridium md:text-sm">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="I own a Law firm"
        text="Setting up my account for my company."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="lawyer"
        title="Im a lawyer"
        text="Setting up my account as a lawyer account."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="client"
        title="Im a client"
        text="Looking to find a lawyer."
      />
    </>
  )
}

export default TypeSelectionForm
