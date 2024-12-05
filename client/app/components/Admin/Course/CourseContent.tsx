'use client'
import { styles } from "../../../../app/styles/style";
import { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}
const CourseContent: FC<Props> = ({ active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit }) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );
    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed]
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    }

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    }

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    }

    const newContentHandler = (item: any) => {

    }

    return (
        <div className="w-[80%] m-auto mt-24 p-3">
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
                    return (
                        <>
                            <div
                                className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? 'mt-10' : 'mb-0'}`}
                            >
                                {
                                    showSectionInput && (
                                        <>
                                            <div className="w-full flex items-center">
                                                <input
                                                    type="text"
                                                    className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px] " : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                    value={item.videoSection}
                                                    onChange={(e) => {
                                                        const updateData = [...courseContentData]
                                                        updateData[index].videoSection = e.target.value;
                                                        setCourseContentData(updateData)
                                                    }}
                                                />
                                                <BsPencil
                                                    className="cursor-pointer dark:text-white text-black"
                                                />
                                            </div>
                                            <br />
                                        </>
                                    )
                                }
                                <div className="flex w-full items-center justify-between my-0">
                                    {isCollapsed[index] ? (
                                        <>
                                            {item.title ? (
                                                <p className="font-Poppins dark:text-white text-black">
                                                    {index + 1}. {item.title}
                                                </p>
                                            ) : <></>}
                                        </>
                                    ) : (
                                        <div></div>
                                    )}

                                    {/* arrow button for collapsed video content  */}
                                    <div className="flex items-center">
                                        <AiOutlineDelete
                                            className={`dark:text-white text-black text-[20px] mr-2 ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                            onClick={() => {
                                                if (index > 0) {
                                                    const updateData = [...courseContentData];
                                                    updateData.splice(index, 1);
                                                    setCourseContentData(updateData);
                                                }
                                            }}
                                        />
                                        <MdOutlineKeyboardArrowDown
                                            fontSize={"large"}
                                            className="dark:text-white text-black"
                                            style={{
                                                transform: isCollapsed[index]
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)"
                                            }}
                                            onClick={() => handleCollapseToggle(index)}
                                        />
                                    </div>
                                </div>
                                {!isCollapsed[index] && (
                                    <>
                                        <div className="my-3">
                                            <label className={styles.label}>Video Title</label>
                                            <input
                                                type="text"
                                                className={`${styles.input}`}
                                                value={item.title}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData]
                                                    updateData[index].title = e.target.value;
                                                    setCourseContentData(updateData)
                                                }}
                                                placeholder="Project Plan..."
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className={styles.label}>Video Url</label>
                                            <input
                                                type="text"
                                                className={`${styles.input}`}
                                                value={item.videoUrl}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData]
                                                    updateData[index].videoUrl = e.target.value;
                                                    setCourseContentData(updateData)
                                                }}
                                                placeholder="sdder"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className={styles.label}>Video Description</label>
                                            <textarea
                                                rows={8}
                                                cols={30}
                                                className={`${styles.input} !h-min py-2`}
                                                value={item.description}
                                                onChange={(e) => {
                                                    const updateData = [...courseContentData]
                                                    updateData[index].description = e.target.value;
                                                    setCourseContentData(updateData)
                                                }}
                                                placeholder="sdder"
                                            />
                                            <br />
                                        </div>
                                        {
                                            item?.links.map((link: any, linkIndex: number) => (
                                                <div className="mb-3 block" key={linkIndex}>
                                                    <div className="w-full flex items-center justify-between">
                                                        <label className={styles.label}>
                                                            Link {linkIndex + 1}
                                                        </label>
                                                        <AiOutlineDelete
                                                            className={`dark:text-white text-black text-[20px] ${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"}`}
                                                            onClick={() =>
                                                                linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)
                                                            }
                                                        />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className={`${styles.input}`}
                                                        value={link.title}
                                                        onChange={(e) => {
                                                            const updateData = [...courseContentData];
                                                            updateData[index].links[linkIndex].title = e.target.value;
                                                            setCourseContentData(updateData)
                                                        }}
                                                        placeholder="Source Code... (Link title)"
                                                    />
                                                    <input
                                                        type="url"
                                                        className={`${styles.input} mt-6`}
                                                        value={link.url}
                                                        onChange={(e) => {
                                                            const updateData = [...courseContentData];
                                                            updateData[index].links[linkIndex].url = e.target.value;
                                                            setCourseContentData(updateData)
                                                        }}
                                                        placeholder="Source Code Url... (Link title)"
                                                    />
                                                </div>
                                            ))}
                                        <br />
                                        <div className="inline-block mb-4">
                                            <p
                                                className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                                onClick={() => handleAddLink(index)}
                                            >
                                                <BsLink45Deg className="mr-2" /> Add Link
                                            </p>
                                        </div>
                                    </>
                                )}
                                <br />
                                {/* add new content */}
                                {index === courseContentData.length - 1 && (
                                    <div>
                                        <p
                                            className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                            onClick={(e: any) => newContentHandler(item)}
                                        >
                                            <AiOutlinePlusCircle className="mr-2" /> Add New Content
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                })}
            </form>
        </div>
    )
}
export default CourseContent