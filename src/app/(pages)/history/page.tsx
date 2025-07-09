import BodyWrapper from '@/app/BodyWrapper'
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { Share } from 'lucide-react'
import React from 'react'
import data from "../payment/data.json"

const Page = () => {
    return (
        <BodyWrapper className='p-5'>
            <div className=''>
                <div className="flex items-center w-full justify-between">
                    <div className="">
                        <h2 className='text-xl font-semibold text-zinc-800'>History</h2>
                        <p className='text-sm mt-1 text-zinc-600'>Track and manage all project history</p>
                    </div>
                    <Button> <Share /> Export</Button>
                </div>

                <div className="overflow-auto mt-8 w-full">
                     <DataTable data={data} />
                </div>
            </div>

        </BodyWrapper >
    )
}

export default Page