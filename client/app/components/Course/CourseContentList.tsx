import { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type Props = {
    data: any;
    activeVideo?: number;
    setActiveVideo?: any;
    isDemo?: any;
}
const CourseContentList: FC<Props> = (props) => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(
        new Set<string>()
    );

    // Find unique video sections
    const videoSections: string[] = [
        ...new Set<string>(props.data?.map((item: any) => item.videoSection))
    ];

    let totalCount: number = 0; // Total number of videos from previous sections

    const toggleSection = (section: string) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section);
        } else {
            newVisibleSections.add(section);
        }

        setVisibleSections(newVisibleSections)
    }

    return (
        <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
            {videoSections.map((section: string, sectionIndex: number) => {
                const isSectionVisible = visibleSections.has(section);

                // filter videos by section
                const sectionVideos: any[] = props.data.filter(
                    (item: any) => item.videoSection === section
                );

                const sectionVideoCount: number = sectionVideos.length;
                const sectionVideoLength: number = sectionVideos.reduce(
                    (totalLength: number, item: any) => totalLength + item.videoLength, 0
                );

                const sectionStartIndex: number = totalCount;
                totalCount += sectionVideoCount;

                const sectionContentHours: number = sectionVideoLength / 60;

                return (
                    <div className={`${!props.isDemo && 'border-b border-[#ffffff8e] pb-2'}`} key={section}>
                        <div className="w-full flex">
                            {/* Render video section */}
                            <div className="w-full flex justify-between items-center">
                                <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
                                <button
                                    className="mr-4 cursor-pointer text-black dark:text-white"
                                    onClick={() => toggleSection(section)}
                                >
                                    {isSectionVisible ? (
                                        <BsChevronUp size={20} />
                                    ) : (
                                        <BsChevronDown size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <h5 className="text-black dark:text-white">
                            {sectionVideoCount} Lessons . {"  "}
                            {
                                sectionVideoLength < 60
                                    ? sectionVideoLength
                                    : sectionContentHours.toFixed(2)
                            }{" "}
                            {sectionVideoLength > 60 ? "hours" : "minutes"}
                        </h5>
                        <br />
                        {isSectionVisible && (
                            <div className="w-full">
                                {sectionVideos.map((item: any, index: number) => {
                                    const videoIndex: number = sectionStartIndex + index;
                                    const contentLength: number = item.videoLength / 60;
                                    return (
                                        <div
                                            className={`w-full ${videoIndex === props.activeVideo ? 'bg-slate-800' : ""} cursor-pointer transition-all p-2`}
                                            key={item._id}
                                            onClick={() => props.isDemo ? null : props?.setActiveVideo(videoIndex)}
                                        >

                                        </div>
                                    )
                                })

                                }
                            </div>
                        )

                        }
                    </div>
                )
            })}
        </div>
    )
}
export default CourseContentList