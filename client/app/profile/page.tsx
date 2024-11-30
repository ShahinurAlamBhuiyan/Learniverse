'use client'
import { FC, useState } from "react"
import Protected from "../hooks/useProtected"
import Heading from "../utils/Heading"
import Header from "../components/Header"
import Profile from '../components/Profile/Profile'
import { useSelector } from "react-redux"

type Props = {}
const page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state: any) => state.auth);

    return (
        <div>
            <Protected>
                <Heading
                    title={`${user.name}'s profile - Learniverse`}
                    description="Learniverse is a platform for students to learn and get help from teachers."
                    keywords='Programming, MERN, Redux, Development, Machine Learning'
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    route={route}
                    setRoute={setRoute}
                />
                <Profile user={user} />
            </Protected>
        </div>
    )
}
export default page