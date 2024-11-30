'use client'

import { FC } from "react"
import Heading from "../utils/Heading"
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'

type Props = {}
const page: FC<Props> = (props) => {
    return (
        <div>
            <Heading
                title="Learniverse - Admin"
                description="Learniverse is a platform for students to learn and get help from teachers."
                keywords='Programming, MERN, Redux, Development, Machine Learning'
            />
            <div className="flex h-[200vh]">
                <div className=" 1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%]">

                </div>
            </div>
        </div>
    )
}
export default page 