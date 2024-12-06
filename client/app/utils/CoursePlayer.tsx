import { FC } from "react";

type Props = {
    videoUrl: string;
    title: string;
}
const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
    return (
        <div>CoursePlayer</div>
    )
}
export default CoursePlayer