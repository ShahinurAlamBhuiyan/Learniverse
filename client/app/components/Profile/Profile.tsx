'use client'
import { FC, useState } from "react"

import SideBarProfile from "./SideBarProfile"
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import UserProfile from './UserProfile'


type Props = {
    user: any;
}
const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = useState(false)
    const [active, setActive] = useState(1)
    const [avatar, setAvatar] = useState(null)
    const [logout, setLogout] = useState(false)


    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false,
    });

    const logOutHandler = async () => {
        setLogout(true);
        await signOut();
    }

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setScroll(true);
            } else {
                setScroll(false)
            }
        })
    }
    return (
        <div className="w-[85%] flex mx-auto">
            <div className={`w-[60px] 800px:w-[310px] h-[450px] bg-white dark:bg-slate-900 bg-opacity-90 border border-[#00000016] dark:border-[#ffffff1d] rounded-[5px] dark:shadow-sm  mt-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"}  left-[30px]`}>
                <SideBarProfile
                    user={user}
                    active={active}
                    avatar={avatar}
                    setActive={setActive}
                    logOutHandler={logOutHandler}
                />

            </div>
            {
                active === 1 &&
                <div className="w-full h-full bg-transparent mt-[80px]">
                    <UserProfile avatar={avatar} user={user} />
                </div>
            }
        </div>
    )
}
export default Profile