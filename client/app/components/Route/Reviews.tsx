import Image from "next/image"

type Props = {}

const data = [
    {
        "name": "Shahin Bhuiyan",
        "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
        "profession": "Software Engineer",
        "comment": "This platform is amazing! It helped me improve my skills and connect with experts."
    },
    {
        "name": "Michael Smith",
        "avatar": "https://randomuser.me/api/portraits/men/2.jpg",
        "profession": "Digital Marketer",
        "comment": "Great user experience! The features are well-designed and easy to use."
    },
    {
        "name": "Sophia Lee",
        "avatar": "https://randomuser.me/api/portraits/women/3.jpg",
        "profession": "UI/UX Designer",
        "comment": "I love the intuitive design and smooth navigation. Highly recommended!"
    },
    {
        "name": "James Brown",
        "avatar": "https://randomuser.me/api/portraits/men/4.jpg",
        "profession": "Entrepreneur",
        "comment": "This service has truly exceeded my expectations. Keep up the great work!"
    },
    {
        "name": "Emily Davis",
        "avatar": "https://randomuser.me/api/portraits/women/5.jpg",
        "profession": "Product Manager",
        "comment": "A well-structured platform with useful insights. It has been a game-changer for me."
    }
]

const Reviews = (props: Props) => {
    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] w-full">
                    <Image
                        src={require('/assests/business-img.png')}
                        alt="business"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    )
}
export default Reviews