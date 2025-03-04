import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi"
import { FC, useState } from "react"
import Loader from "../Loader/Loader"
import Heading from "@/app/utils/Heading"
import Header from "../Header"
import Footer from "../Footer"
import CourseDetails from './CourseDetails'

type Props = {
    id: string
}
const CourseDetailsPage: FC<Props> = ({ id }) => {
    console.log(id)
    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);
    return (
        <>
            {
                isLoading ? (<Loader />) :
                    (
                        <div>
                            <Heading
                                title={data.course.name + "- Learniverse"}
                                description={"Learniverse is a programming community which is developed by Shahinur Alam Bhuiyan for helping programmers."}
                                keywords={data?.course?.tags}
                            />
                            <Header
                                route={route}
                                setRoute={setRoute}
                                open={open}
                                setOpen={setOpen}
                                activeItem={1}
                            />
                            <CourseDetails
                                data={data.course}
                            />
                            <Footer />
                        </div>
                    )
            }
        </>
    )
}
export default CourseDetailsPage