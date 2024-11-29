'use client'
import { styles } from "@/app/styles/style"
import { FC, useState } from "react"

type Props = {}
const ChangePassword: FC<Props> = (props) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const passwordChangeHandler = (e: any) => {

    }

    return (
        <div className="w-full pl-7 800px:px-5 800px:pl-0">
            <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] dark:text-[#fff] text-black pb-2">
                Change Password
            </h1>
            <div className="w-full">
                <form
                    aria-required
                    onSubmit={passwordChangeHandler}
                    className="flex flex-col items-center"
                >
                    <div className="w-[100%] 800px:w-[60%] mt-5">
                        <label className="block pb-2 dark:text-[#fff] text-black">
                            Enter your old password
                        </label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-[#fff] text-black`}
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="w-[100%] 800px:w-[60%] mt-2">
                        <label className="block pb-2 dark:text-[#fff] text-black">
                            Enter your new password
                        </label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-[#fff] text-black`}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="w-[100%] 800px:w-[60%] mt-2">
                        <label className="block pb-2 dark:text-[#fff] text-black">
                            Enter your confirm password
                        </label>
                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-[#fff] text-black`}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input
                            className={`w-[95%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                            type="submit"
                            required
                            value="Update"
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}
export default ChangePassword