'use client'
import { FC, useEffect, useState } from "react";
import axios from 'axios';

type Props = {
    videoUrl: string;
    title: string;
}
const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    })

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/get-video-cipher-otp`, {
            videoId: videoUrl
        }).then((res) => {
            setVideoData(res.data)
        })
    }, [videoUrl])
    return (
        <div style={{ paddingTop: '56.25%', position: 'relative', overflow: 'hidden' }}>
            {videoData.otp && videoData.playbackInfo !== "" && (
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=YWu8FLUqyfqqwzPw`}
                    style={{
                        border: 0,
                        width: "100%",
                        height: "100%",
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    allowFullScreen={true}
                    allow="encrypted-media"
                />
            )}
        </div>
    )
}
export default CoursePlayer