'use client'
import { FC } from "react"
import Heading from "../../../app/utils/Heading"
import AdminProtected from "../../../app/hooks/adminProtected"
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import CreateCourse from '../../components/Admin/Course/CreateCourse'
import DashboardHeader from "../../../app/components/Admin/DashboardHeader"

type Props = {}
const page: FC<Props> = () => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="Learniverse - Admin"
                    description="Learniverse is a platform for students to learn and get help from teachers."
                    keywords='Programming, MERN, Redux, Development, Machine Learning'
                />
                <div className="flex">
                    <div className=" 1500px:w-[16%] w-1/5">
                        <AdminSidebar />
                    </div>
                    <div className="w-[85%]">
                        <DashboardHeader />
                        <CreateCourse />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page