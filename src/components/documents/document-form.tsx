'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { ErrorMessage } from '@hookform/error-message'
import { Loader } from '@/components/loader'
import FormGenerator from '../forms/form-generator'
import { UploadIcon } from 'lucide-react'
import { useProducts } from '@/hooks/settings/use-settings'

type CreateProductFormProps = {
  id: string
}

export const CreateDocumentForm = ({ id }: CreateProductFormProps) => {
  const { onCreateNewProduct, register, errors, loading } = useProducts(id)
  return (
    <form
      className="mt-3 w-full flex flex-col gap-5 py-10"
      onSubmit={onCreateNewProduct}
    >
      <FormGenerator
        inputType="input"
        register={register}
        label="Name"
        name="name"
        errors={errors}
        placeholder="Your document name"
        type="text"
      />
      <div className="flex flex-col items-start">
        <Label
          htmlFor="upload-product"
          className="flex gap-2 p-3 rounded-lg bg-peach cursor-pointer font-semibold text-sm items-center"
        >
          <Input
            {...register('file')}
            className="hidden"
            type="file"
            id="upload-product"
          />
          <UploadIcon />
          Upload
        </Label>
        <ErrorMessage
          errors={errors}
          name="file"
          render={({ message }) => (
            <p className="text-red-400 mt-2">
              {message === 'Required' ? '' : message}
            </p>
          )}
        />
      </div>
      <FormGenerator
        inputType="input"
        register={register}
        label="Description"
        name="description"
        errors={errors}
        placeholder="General case file"
        type="text"
      />
      <Button
        type="submit"
        className="w-full"
      >
        <Loader loading={loading}>Create Document</Loader>
      </Button>
    </form>
  )
}
