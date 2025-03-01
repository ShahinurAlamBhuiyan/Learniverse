import { styles } from "../../..//app/styles/style"
import Image from "next/image"
import ReviewCard from '../Review/ReviewCard'

type Props = {}

const reviews = [
    {
        "name": "Catelin Farendas",
        "avatar": "https://randomuser.me/api/portraits/women/1.jpg",
        "profession": "Software Engineer",
        "comment": "This platform has completely transformed the way I learn new technologies. The courses are well-structured, and the hands-on projects make it easy to apply theoretical knowledge in real-world scenarios. The mentorship program is also a great addition, as I could interact with industry experts who provided valuable insights. I highly recommend it to anyone looking to upskill in tech!",
        "rating": 5
    },
    {
        "name": "Michael Smith",
        "avatar": "https://randomuser.me/api/portraits/men/2.jpg",
        "profession": "Digital Marketer",
        "comment": "As a digital marketer, I always need to stay ahead with the latest trends and strategies. This platform offers well-researched, up-to-date content that has helped me refine my marketing skills. The interactive quizzes and real-world case studies make learning more engaging. I especially love the personalized course recommendations based on my progress!",
        "rating": 4.5
    },
    {
        "name": "Sophia Lee",
        "avatar": "https://randomuser.me/api/portraits/women/3.jpg",
        "profession": "UI/UX Designer",
        "comment": "I have taken several design courses on this platform, and I must say they are some of the best out there. The emphasis on user experience, combined with practical assignments, helped me create better designs. The ability to get feedback from professionals and interact with peers in discussion forums made the learning process even more valuable. This platform truly understands the needs of creative professionals.",
        "rating": 5
    },
    {
        "name": "James Brown",
        "avatar": "https://randomuser.me/api/portraits/men/4.jpg",
        "profession": "Entrepreneur",
        "comment": "I was looking for a reliable e-learning platform to expand my business knowledge, and I am glad I found this one. The courses on entrepreneurship, finance, and marketing have provided me with actionable insights that I could immediately apply to my startup. The live webinars with industry leaders were particularly helpful, offering real-world perspectives on running a successful business.",
        "rating": 4
    },
    {
        "name": "Emily Davis",
        "avatar": "https://randomuser.me/api/portraits/women/5.jpg",
        "profession": "Product Manager",
        "comment": "This platform has been a game-changer for me as a product manager. The structured learning paths helped me build expertise in agile methodologies, customer research, and product roadmaps. I love how the platform blends theory with practice through hands-on exercises, case studies, and peer discussions. The flexibility of learning at my own pace while still getting support from mentors is what makes this platform stand out.",
        "rating": 5
    }
]


const Reviews = (props: Props) => {
    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] w-full">
                    <Image
                        src={require('../../../public/assets/business-img.png')}
                        alt="business"
                        width={700}
                        height={700}
                    />
                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students Are <span className="dark:text-[#46e256] text-[crimson]">Our Strength</span>{" "}
                        <br /> See What They Say About Us
                    </h3>
                    <br />
                    <p className={`${styles.label}`}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla quidem enim vero quod mollitia neque qui nostrum necessitatibus placeat facere. Cumque at deleniti, velit, molestiae fugit quisquam optio nobis possimus praesentium qui impedit. Nostrum id, dolore corrupti nemo eligendi maxime!
                    </p>
                </div>
            </div>
            <br /><br />
            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(6)]:!mt-[-40px]">
                {reviews &&
                    reviews.map((i, index) => <ReviewCard item={i} key={index} />)
                }

            </div>
        </div>
    )
}
export default Reviews