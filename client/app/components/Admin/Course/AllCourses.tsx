import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit2 } from 'react-icons/fi'
import { format } from 'timeago.js'

import { useDeleteCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { useEffect, useState } from 'react';
import { styles } from '../../../../app/styles/style';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Props = {}
const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "title", headerName: "Course Title", flex: 1 },
        { field: 'ratings', headerName: "Ratings", flex: 0.5 },
        { field: 'purchased', headerName: "Purchased", flex: 0.5 },
        { field: 'created_at', headerName: "Created At", flex: 0.5 },
        {
            field: "  ",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link href={`/admin/edit-course/${params.row.id}`}>
                            <FiEdit2
                                className='dark:text-white text-black mt-3'
                                size={20}
                            />
                        </Link>
                    </>
                )
            }
        },
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                setOpen(!open);
                                setCourseId(params.row.id);
                            }}
                        >
                            <AiOutlineDelete
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </Button>
                    </>
                )
            }
        }
    ]


    const rows: any = []
    {
        data && data.courses.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.name,
                purchased: item.purchased,
                ratings: item.ratings,
                created_at: format(item.createdAt)
            })
        });
    }


    // showing toast
    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            refetch();
            toast.success("Course deleted successfully!");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error])

    // hitting delete api when clicked
    const handleDelete = async () => {
        const id = courseId;
        await deleteCourse(id);
    }
    return (
        <div className='mt-[120px]'>
            <Box m='20px'>
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <Box m='20px'>

                            <Box
                                m='40px 0 0 0'
                                height='80vh'
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
                                    checkboxSelection
                                    rows={rows}
                                    columns={columns}
                                />
                            </Box>
                            {open && (
                                <Modal
                                    open={open}
                                    onClose={() => {
                                        setOpen(!open);
                                        setCourseId("");
                                    }}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    disableScrollLock
                                    sx={{
                                        "&.MuiModal-root": {
                                            zIndex: "2147483647!important",
                                        },
                                    }}
                                >
                                    <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                        <h1 className={`${styles.title}`}>
                                            Are you sure you want to remove this course?
                                        </h1>
                                        <div className="flex w-full items-center justify-between mb-6 mt-4">
                                            <div
                                                className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3] cursor-pointer`}
                                                onClick={() => setOpen(!open)}
                                            >
                                                Cancel
                                            </div>
                                            <div
                                                className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f] cursor-pointer`}
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </div>
                                        </div>
                                    </Box>
                                </Modal>
                            )}
                        </Box>
                    )}
            </Box>
        </div>
    )
}
export default AllCourses