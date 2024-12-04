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
    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    }

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
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
                />
            </div>
        </div>
    )
}
export default CourseData