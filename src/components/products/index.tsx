import React from 'react'
import TabsMenu from '../tabs/intex'
import { SideSheet } from '../sheet'
import { Plus } from 'lucide-react'
import { CreateProductForm } from './product-form'
import { TabsContent } from '../ui/tabs'
import { DataTable } from '../table'
import { TableCell, TableRow } from '../ui/table'
import Image from 'next/image'
import { getMonthName } from '@/lib/utils'
import { string } from 'zod'

type Props = {
  document: {
    id: string
    name: string | null
    file: string
    description: string | null
    createdAt: Date
  }[]
  id: string
}

const ProductTable = ({ id, document }: Props) => {
  return (
    <div>
      <div className='py-4'>
        <h2 className="font-bold text-2xl">Documents</h2>
        <p className="text-sm font-light">Add documents related to this case.</p>
      </div>
      <TabsMenu
        className="w-full flex justify-start"
        triggers={[
          {
            label: 'All products',
          },
          { label: 'Live' },
          { label: 'Deactivated' },
        ]}
        button={
          <div className="flex-1 flex justify-end">
            <SideSheet
              description="Add products to your store and set them live to accept payments from
          customers."
              title="Add a product"
              className="flex items-center gap-2 bg-orange px-4 py-2 text-black font-semibold rounded-lg text-sm"
              trigger={
                <>
                  <Plus
                    size={20}
                    className="text-white"
                  />
                  <p className="text-white">Add Document</p>
                </>
              }
            >
              <CreateProductForm id={id} />
            </SideSheet>
          </div>
        }
      >
        <TabsContent value="All products">
          <DataTable headers={['Featured Image', 'Name', 'Description', 'Created']}>
            {document.map((documentItem) => (
              <TableRow key={documentItem.id}>
                <TableCell>
                  <Image
                    src={`https://ucarecdn.com/${documentItem.file}/`}
                    width={50}
                    height={50}
                    alt="image"
                  />
                </TableCell>
                <TableCell>{documentItem.name}</TableCell>
                <TableCell>{documentItem.description}</TableCell>
                <TableCell className="text-right">
                  {documentItem.createdAt.getDate()}{' '}
                  {getMonthName(documentItem.createdAt.getMonth())}{' '}
                  {documentItem.createdAt.getFullYear()}
                </TableCell>
              </TableRow>
            ))}
          </DataTable>
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default ProductTable
