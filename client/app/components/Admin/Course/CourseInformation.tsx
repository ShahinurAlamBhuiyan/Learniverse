'use client'
import { styles } from "../../../../app/styles/style";
import { FC, useState } from "react";

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}
const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
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
                <div>
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
            </form>
        </div>
    )
}
export default CourseInformation