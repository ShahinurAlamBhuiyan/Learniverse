'use client'
import { useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
import { styles } from "../../../../app/styles/style";
import { FC, useEffect, useState } from "react";

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}
const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const { data, isLoading } = useGetHeroDataQuery("Categories");
    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories)
        }
    }, [data])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result })
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className={`${styles.label}`}>
                        Course Name
                    </label>
                    <input
                        className={`${styles.input}`}
                        type="name"
                        name=""
                        id="name"
                        required
                        value={courseInfo.name}
                        placeholder="MERN stack LMS platform with Next 15"
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                    />
                </div>
                <br />
                <div className="mb-5">
                    <label className={`${styles.label}`}>
                        Course Description
                    </label>
                    <textarea
                        className={`${styles.input} !h-min !py-2`}
                        name=""
                        id=""
                        cols={30}
                        rows={8}
                        placeholder="Write something amazing..."
                        value={courseInfo.description}
                        onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                    />
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>
                            Course Price
                        </label>
                        <input
                            className={`${styles.input}`}
                            type="number"
                            name=""
                            id="price"
                            placeholder="22"
                            required
                            value={courseInfo.price}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className={`${styles.label} w-[50%]`}>
                            Estimated Price (optional)
                        </label>
                        <input
                            className={`${styles.input}`}
                            type="number"
                            name=""
                            id="price"
                            placeholder="89"
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                        />
                    </div>
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>
                            Course Tags
                        </label>
                        <input
                            className={`${styles.input}`}
                            type="text"
                            name=""
                            id="tags"
                            placeholder="MERN, Next 15, Socket.io, tailwindCss, LMS"
                            required
                            value={courseInfo.tags}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className={`${styles.label} w-[50%]`}>
                            Course Categories
                        </label>
                        <select
                            className={`${styles.input}`}
                            value={courseInfo.categories}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, categories: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((item: any) => (
                                <option value={item.title} key={item._id}>
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`${styles.label}`}>
                            Course Level
                        </label>
                        <input
                            className={`${styles.input}`}
                            type="text"
                            name=""
                            id="level"
                            placeholder="Beginner/Intermediate/Expert"
                            required
                            value={courseInfo.level}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className={`${styles.label} w-[50%]`}>
                            Demo Url
                        </label>
                        <input
                            className={`${styles.input}`}
                            type="text"
                            name=""
                            id="price"
                            placeholder="eer74fd"
                            value={courseInfo.demoUrl}
                            onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                        />
                    </div>
                </div>
                <br />
                <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <img
                                className="max-h-full w-full object-cover"
                                src={courseInfo.thumbnail}
                                alt={courseInfo.title} />
                        ) : (
                            <span className="text-black dark:text-white">
                                Drag and drop your thumbnail here or click to browse
                            </span>
                        )}
                    </label>
                </div>
                <br />
                <div className="w-full flex items-center justify-end">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
                    />
                </div>
                <br />
                <br />
            </form>
        </div>
    )
}
export default CourseInformation