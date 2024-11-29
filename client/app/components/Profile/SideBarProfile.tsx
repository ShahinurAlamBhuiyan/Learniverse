import Image from "next/image";
import { FC } from "react";

import avatarDefault from '../../../public/assests/avatar.png'
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logOutHandler: any;

}
const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
    const theme = document.documentElement.classList.contains('dark') ? "dark" : "light";

    return (
        <div className="w-full">
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "bg-gray-100 dark:bg-slate-800 " : "bg-transparent"}`}
                onClick={() => setActive(1)}
            >
                <Image
                    className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
                    src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
                    alt="avatar"
                    width={20}
                    height={20}
                />
                <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">My Account</h5>
            </div>

            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "bg-gray-100 dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine fill={theme === "dark" ? "#fff" : "#000"} size={20} />
                <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">Change Password</h5>
            </div>

            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "bg-gray-100 dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(3)}
            >
                <SiCoursera fill={theme === "dark" ? "#fff" : "#000"} size={20} />
                <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">Enrolled Courses</h5>
            </div>

            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "bg-gray-100 dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => logOutHandler()}
            >
                <AiOutlineLogout size={20} fill={theme === "dark" ? "#fff" : "#000"} />
                <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">Log Out</h5>
            </div>
        </div>
    )
}
export default SideBarProfile