'use client'
import { FC, useState } from "react"
import Protected from "../hooks/useProtected"
import Heading from "../utils/Heading"
import Header from "../components/Header"

type Props = {}
const page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");
    return (
        <div>
            <Protected>
                <Heading
                    title="Learniverse"
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

            </Protected>
        </div>
    )
}
export default page