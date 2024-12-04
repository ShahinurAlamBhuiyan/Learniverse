import { styles } from "@/app/styles/style";
import { FC } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle'

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}
const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

    // Benefits
    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    }
    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
    }

    // Prerequisites
    const handlePrerequisiteChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    }
    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    }
    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label className={`${styles.label} text-[20px]`}>
                    What are the benefits for students in this course?
                </label>
                <br />
                {
                    benefits.map((benefit: any, index: number) => (
                        <input
                            className={`${styles.input} my-2`}
                            type="text"
                            key={index}
                            name="Benefit"
                            required
                            value={benefit.title}
                            placeholder="You will be able to build a full stack LMS platform..."
                            onChange={(e: any) => handleBenefitChange(index, e.target.value)}

                        />
                    ))
                }
                <AddCircleIcon
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddBenefit}
                    className="dark:text-white text-black"
                />
            </div>
            <div>
                <label className={`${styles.label} text-[20px]`}>
                    What are the prerequisites for students in this course?
                </label>
                <br />
                {
                    prerequisites.map((prerequisite: any, index: number) => (
                        <input
                            className={`${styles.input} my-2`}
                            type="text"
                            key={index}
                            name="Prerequisite"
                            required
                            value={prerequisite.title}
                            placeholder="You need basic knowledge of MERN stack"
                            onChange={(e: any) => handlePrerequisiteChange(index, e.target.value)}

                        />
                    ))
                }
                <AddCircleIcon
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddPrerequisite}
                    className="dark:text-white text-black"
                />
            </div>
        </div>
    )
}
export default CourseData