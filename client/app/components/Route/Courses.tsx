import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi"
import { FC, useEffect, useState } from "react"

type Props = {}
const Courses: FC<Props> = () => {
    const { data, isLoading } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        setCourses(data?.courses)
    }, [data])

    return (
        <div>
            <div className="w-[90%] 800px:w-[80%] m-auto">
                <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-black tracking-tight font-[700]">
                    Expand Your Career {" "}
                    <span className="dark:text-[#46e256] text-[crimson]">Opportunity</span> <br />
                    Opportunity With Our Courses
                </h1>
            </div>
        </div>
    )
}
export default Courses