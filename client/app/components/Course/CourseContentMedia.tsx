import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { useAddNewQuestionMutation } from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai";

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user: any;
    refetch: any;
}
const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo, user, refetch }: Props) => {
    const [activeBar, setActiveBar] = useState(0)
    const [question, setQuestion] = useState('')
    const [rating, setRating] = useState(0)
    const [answer, setAnswer] = useState('')
    const [answerId, setAnswerId] = useState("")
    const [review, setReview] = useState('')
    const [addNewQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useAddNewQuestionMutation({});

    const isReviewExists = data?.reviews?.find(
        (item: any) => item.user._id === user._id
    )

    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Question can't be empty!");
        } else {
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            refetch();
            toast.success('Question added successfully!')
        }

        if (error) {
            if ('data' in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error])

    const handleAnswerSubmit = () => {
        console.log('first')
    }

    return (
        <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />

            <div className="w-full flex items-center justify-between my-3">
                <div
                    className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`}
                    onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson
                </div>
                <div
                    className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"}`}
                    onClick={() => setActiveVideo(
                        data && data.length - 1 === activeVideo
                            ? activeVideo
                            : activeVideo + 1
                    )}
                >
                    <AiOutlineArrowRight className="ml-2" />
                    Next Lesson
                </div>
            </div>
            <h1 className="pt-2 text-[25px] font-[600] text-black dark:text-white">{data[activeVideo].title}</h1>
            <br />
            <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : 'text-black dark:text-white'}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {activeBar === 0 && (
                <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">{data[activeVideo]?.description}</p>
            )}

            {activeBar === 1 && (
                <div>
                    {data[activeVideo]?.links.map((item: any, index: number) => (
                        <div className="mb-5">
                            <h2 className="800px:text-[20px] 800px:inline-block  text-black dark:text-white">{item.title && item.title + " :"}</h2>
                            <a href={item.url} className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2">
                                {item.url}
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {activeBar === 2 && (
                <>
                    <div className="flex w-full">
                        <Image
                            src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"}
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <textarea name="" id=""
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            cols={40}
                            rows={5}
                            placeholder="Write your question..."
                            className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                        />
                    </div>

                    <div className="w-full flex justify-end">
                        <div
                            className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreationLoading && 'cursor-not-allowed'}`}
                            onClick={questionCreationLoading ? () => { } : handleQuestion}
                        >
                            Submit
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full h-[1px] bg-[#ffffff3b]">

                    </div>
                    <div>
                        <CommentReply
                            data={data}
                            activeVideo={activeVideo}
                            answer={answer}
                            setAnswer={setAnswer}
                            handleAnswerSubmit={handleAnswerSubmit}
                            user={user}
                            setAnswerId={setAnswerId}
                        />
                    </div>
                </>
            )}

            {activeBar === 3 && (
                <div className="w-full">
                    <>
                        {!isReviewExists && (
                            <>
                                <div className="flex w-full">
                                    <Image
                                        src={
                                            user.avatar
                                                ? user.avatar.url
                                                : 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png'
                                        }
                                        width={50}
                                        height={50}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                    />
                                    <div className="w-full">
                                        <h5 className="pl-3 text-[20px] font-medium dark:text-white text-black">
                                            Give a Rating <span className="text-red-500">
                                                *
                                            </span>
                                        </h5>

                                        <div className="flex w-full ml-2 pb-3">
                                            {[1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                                <AiFillStar
                                                    key={i}
                                                    className="mr-1 cursor-pointer"
                                                    color="rgb(246, 186, 0)"
                                                    size={25}
                                                    onClick={() => setRating(i)}
                                                />
                                            ) : (
                                                <AiOutlineStar
                                                    key={i}
                                                    className="mr-1 cursor-pointer"
                                                    color="rgb(246, 186, 0)"
                                                    size={25}
                                                    onClick={() => setRating(i)}
                                                />
                                            ))}
                                        </div>
                                        <textarea
                                            name=""
                                            id=""
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            cols={40}
                                            rows={5}
                                            placeholder="Write your comment..."
                                            className="outline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex justify-end">
                                    <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2`}
                                    // onClick={isLoading ? null : handleReviewSubmit}
                                    >
                                        Submit
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                </div>
            )}
        </div>
    )
};


const CommentReply = ({ data, activeVideo, answer, setAnswer, user, setAnswerId, handleAnswerSubmit }: any) => {
    console.log(data[activeVideo].questions[0])
    return (
        <>
            <div className="w-full my-3">
                {
                    data[activeVideo]?.questions.map((item: any, index: any) => (
                        <CommentItem
                            key={index}
                            data={data}
                            activeVideo={activeVideo}
                            item={item}
                            index={index}
                            answer={answer}
                            setAnswer={setAnswer}
                            handleAnswerSubmit={handleAnswerSubmit}
                        />
                    ))
                }
            </div>
        </>
    )
}


const CommentItem = ({ data, activeVideo, item, answer, setAnswer, handleAnswerSubmit }: any) => {
    console.log(item)
    return (
        <>
            <div className="my-4">
                <div className="flex mb-2">
                    {/* <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            <h1 className="uppercase text-[18px]">
                                {item?.user.name.slice(0, 2)}
                            </h1>
                        </div>
                    </div> */}
                    <Image
                        src={item.user.avatar ? item.user.avatar.url : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"}
                        width={50}
                        height={50}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                    <div className="pl-3">
                        <h5 className="text-[20px]">{item?.user.name}</h5>
                        <p>{item?.question}</p>
                        <small className="text-[#ffffff83]">
                            {format(item?.createdAt)} •
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CourseContentMedia