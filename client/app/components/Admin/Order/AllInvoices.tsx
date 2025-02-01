import { FC, useEffect, useState } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Box } from "@mui/material"
import { useTheme } from "next-themes"
import Loader from "../../Loader/Loader"
import { format } from "timeago.js"
import { AiOutlineMail } from "react-icons/ai"
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi"
import { useGetAllUsersQuery } from "@/redux/features/user/userApi"
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi"


type Props = {
    isDashboard?: boolean;
}
const AllInvoices: FC<Props> = ({ isDashboard }) => {
    const { theme, setTheme } = useTheme();
    const { data, isLoading } = useGetAllOrdersQuery({});
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: coursesData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any>([]);
    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => {
                const user = usersData?.users.find(
                    (user: any) => user._id === item.userId
                )
                const course = coursesData?.courses.find(
                    (course: any) => course._id === item.courseId
                )

                return {
                    ...item,
                    userName: user?.name,
                    userEmail: user?.email,
                    title: course?.name,
                    price: "$" + course?.price
                }
            });
            setOrderData(temp)
        }
    }, [data, usersData, coursesData]);

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "userName", headerName: "Name", flex: isDashboard ? .6 : .5 },
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashboard ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }] : [
            { field: "userEmail", headerName: "Email", flex: 1 },
            { field: "title", headerName: "Course Title", flex: 1 },
            {
                field: " ",
                headerName: "Email",
                flex: 0.2,
                renderCell: (params: any) => (
                    <a href={`mailto:${params.row.userEmail}`}>
                        <AiOutlineMail className="dark:text-white text-black" size={20} />
                    </a>
                )
            }
        ])
    ];


    const rows: any = [
        {
            id: "234567890987",
            userName: "Shahinur Alam Bhuiyan",
            userEmail: "shahinur.alam.bhuiyan01@gmail.com",
            title: "React JS Course",
            price: "$500",
            created_at: "2 days ago"
        },
        {
            id: "987654321234",
            userName: "John Doe",
            userEmail: "johndoe@example.com",
            title: "Next.js Mastery",
            price: "$450",
            created_at: "5 days ago"
        },
        {
            id: "567890123456",
            userName: "Alice Smith",
            userEmail: "alice@example.com",
            title: "TypeScript Essentials",
            price: "$400",
            created_at: "1 week ago"
        },
        {
            id: "123456789012",
            userName: "Bob Johnson",
            userEmail: "bob@example.com",
            title: "Fullstack Web Dev",
            price: "$700",
            created_at: "3 weeks ago"
        },
        {
            id: "876543210987",
            userName: "Emma Brown",
            userEmail: "emma@example.com",
            title: "Node.js Fundamentals",
            price: "$350",
            created_at: "2 days ago"
        },
        {
            id: "234123567890",
            userName: "Michael Scott",
            userEmail: "michael@example.com",
            title: "UI/UX Design",
            price: "$600",
            created_at: "4 days ago"
        },
        {
            id: "432109876543",
            userName: "David Miller",
            userEmail: "david@example.com",
            title: "Python for Beginners",
            price: "$300",
            created_at: "6 days ago"
        },
        {
            id: "321098765432",
            userName: "Sophia Wilson",
            userEmail: "sophia@example.com",
            title: "Machine Learning Basics",
            price: "$800",
            created_at: "1 month ago"
        },
        {
            id: "543210987654",
            userName: "Oliver Martinez",
            userEmail: "oliver@example.com",
            title: "JavaScript Deep Dive",
            price: "$500",
            created_at: "3 weeks ago"
        },
        {
            id: "654321098765",
            userName: "Ava Davis",
            userEmail: "ava@example.com",
            title: "Data Structures & Algorithms",
            price: "$550",
            created_at: "2 months ago"
        },
        {
            id: "789012345678",
            userName: "William Thompson",
            userEmail: "william@example.com",
            title: "Angular Crash Course",
            price: "$480",
            created_at: "1 week ago"
        },
        {
            id: "890123456789",
            userName: "Charlotte Garcia",
            userEmail: "charlotte@example.com",
            title: "Django for Web Development",
            price: "$650",
            created_at: "5 days ago"
        },
        {
            id: "901234567890",
            userName: "Liam Martinez",
            userEmail: "liam@example.com",
            title: "Vue.js for Beginners",
            price: "$420",
            created_at: "4 weeks ago"
        },
        {
            id: "012345678901",
            userName: "Isabella Anderson",
            userEmail: "isabella@example.com",
            title: "Tailwind CSS in Action",
            price: "$360",
            created_at: "1 week ago"
        },
        {
            id: "567890123457",
            userName: "James White",
            userEmail: "james@example.com",
            title: "Cybersecurity Essentials",
            price: "$900",
            created_at: "3 months ago"
        }
    ];


    return (
        <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
            {isLoading ? (
                <Loader />
            ) : (
                <Box m={isDashboard ? "0" : "40px"}>
                    <Box
                        m={isDashboard ? "0" : "40px 0 0 0"}
                        height={isDashboard ? "35vh" : "90vh"}
                        overflow={"hidden"}
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none",
                            },
                            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-sortIcon": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-row": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderBottom:
                                    theme === "dark"
                                        ? "1px solid #ffffff30!important"
                                        : "1px solid #ccc!important",
                            },
                            "& .MuiTablePagination-root": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none!important",
                                "&:focus": {
                                    outline: "none !important",
                                },
                                "&:focus-within": {
                                    outline: "none !important",
                                },
                            },
                            "& .name-column--cell": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-columnHeader": {
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                borderBottom: "none",
                                color: theme === "dark" ? "#fff" : "#000",
                                "&:focus": {
                                    outline: "none !important",
                                },
                                "&:focus-within": {
                                    outline: "none !important",
                                },
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderTop: "none",
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                            },
                            "& .MuiCheckbox-root": {
                                color:
                                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `#fff !important`,
                            },
                        }}
                    >
                        <DataGrid
                            checkboxSelection={!isDashboard}
                            rows={orderData.length ? orderData : rows}
                            columns={columns}
                            slots={isDashboard ? {} : { toolbar: GridToolbar }}
                        />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default AllInvoices;