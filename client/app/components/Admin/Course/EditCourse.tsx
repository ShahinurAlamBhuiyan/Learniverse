'use client'
import { FC, useEffect, useState } from "react"
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useEditCourseMutation, useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesApi"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

type Props = {
    id: string;
}
const EditCourse: FC<Props> = ({ id }) => {

    // getting all data for filter the selected course
    const { data } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const editCourseData = data && data.courses.find((i: any) => i._id === id);

    // updating selected course
    const [editCourse, { isSuccess, error }] = useEditCourseMutation();


    // for adding selected course data to the input field
    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                categories: editCourseData.categories,
                price: editCourseData.price,
                estimatedPrice: editCourseData.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData?.thumbnail?.url
            });
            setBenefits(editCourseData.benefits);
            setPrerequisites(editCourseData.prerequisites);
            setCourseContentData(editCourseData.courseData);
        }
    }, [editCourseData]);


    useEffect(() => {
        if (isSuccess) {
            toast.success("Course updated successfully!");
            redirect("/admin/courses");
        }

        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);

    const [active, setActive] = useState(0)
    const [courseData, setCourseData] = useState({})
    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }])
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        categories: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    });
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                }
            ],
            suggestion: ""
        }
    ])

    const handleSubmit = async () => {
        // format benefits array
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));

        // format prerequisites
        const formattedPrerequisites = prerequisites.map((prereq) => ({ title: prereq.title }));

        // format course content array
        const formattedCourseContent = courseContentData.map((courseContent) => ({
            title: courseContent.title,
            videoUrl: courseContent.videoUrl,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            videoLength: courseContent.videoLength,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url
            })),
            suggestion: courseContent.suggestion
        }));

        // prepare data object
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            categories: courseInfo.categories,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseContent: formattedCourseContent
        };
        setCourseData(data);
    }

    // for edit course...not changed the function name yet...
    const handleCourseCreate = async (e: any) => {
        const data = courseData;
        await editCourse({ id: editCourseData?._id, data });
    }

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {active === 0 && (
                    <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />)}
                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />)}
                {active === 2 && (
                    <CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />)}
                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                        isEdit={true}
                    />)}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions
                    active={active}
                    setActive={setActive}
                />
            </div>
        </div>
    )
}
export default EditCourse