import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi"
import { FC, useEffect, useState } from "react"
import CourseCard from '../CourseCard/CourseCard'

type Props = {}
const Courses: FC<Props> = () => {
    const { data, isLoading } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses] = useState<any[]>([]);
    const [route, setRoute] = useState<any[]>([]);

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
                <br /><br />
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                    {courses &&
                        courses.map((item: any, index: number) => (
                            <CourseCard
                                item={item}
                                key={index}
                            />
                        ))

                    }
                </div>
            </div>
        </div>
    )
}
export default Courses