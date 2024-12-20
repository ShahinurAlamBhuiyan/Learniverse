'use client'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Modal } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'
import { useTheme } from 'next-themes';
import { format } from 'timeago.js'

import Loader from '../../Loader/Loader';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '../../../../redux/features/user/userApi';
import { FC, useEffect, useState } from 'react';
import { styles } from '@/app/styles/style';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

type Props = {
    isTeam: boolean;
}
const AllUsers: FC<Props> = ({ isTeam }) => {
    const { user } = useSelector((state: any) => state.auth);
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");
    const { theme, setTheme } = useTheme();
    const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
    const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
    const [deleteUser, { error: deleteError, isSuccess: deleteSuccess }] = useDeleteUserMutation({});


    const handleDelete = async () => {
        const id = userId;
        await deleteUser(id);
    };
    const handleSubmit = async () => {
        await updateUserRole({ email, role });
    };

    useEffect(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message);
            }
        }

        if (isSuccess) {
            refetch();
            toast.success("User role updated successfully");
            setActive(false);
            setEmail("");
            setRole("admin");
        }
        if (deleteSuccess) {
            refetch();
            toast.success("Delete user successfully!");
            setOpen(false);
            setUserId("");
        }
        if (deleteError) {
            if ("data" in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [updateError, isSuccess, deleteSuccess, deleteError]);


    const columns = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: 'email', headerName: "Email", flex: 0.5 },
        { field: 'role', headerName: "Role", flex: 0.4 },
        { field: 'courses', headerName: "Purchased Courses", flex: 0.3 },
        { field: 'created_at', headerName: "Joined At", flex: 0.5 },
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                const isCurrentUser = user._id === params.row.id;

                return (
                    <>
                        <Button onClick={() => {
                            setOpen(!open);
                            setUserId(params.row.id);
                        }} disabled={isCurrentUser}>
                            {
                                isCurrentUser ? (
                                    <TiDeleteOutline
                                        className={`dark:text-white text-black`}
                                        size={20}
                                    />
                                ) : (
                                    <AiOutlineDelete
                                        className={`dark:text-white text-black`}
                                        size={20}
                                    />
                                )
                            }
                        </Button>
                    </>
                )
            }
        },
        {
            field: "  ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <div className='flex justify-center items-center'>
                        <a
                            href={`mailto:${params.row.email}`}
                            className='mt-4'
                        >
                            <AiOutlineMail
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </a>
                    </div>
                )
            }
        },
    ]


    const rows: any = []

    if (isTeam && user.role === 'admin') {
        const newData = data && data.users.filter((item: any) => item.role === 'admin');
        newData && newData.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt)
            })
        });
    } else {
        data && data.users.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt)
            })
        });
    }

    return (
        <div className='mt-[120px]'>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box m='20px'>
                        {
                            isTeam &&
                            (
                                <div
                                    className="w-full flex justify-end"
                                    onClick={() => setActive(!active)}
                                >
                                    {/* <div className={`${styles.button} !h-[35px] !w-[220px] !bg-[#57c7a3] !font-[400]`}>
                                Add New Member
                            </div> */}
                                    <div
                                        className={`w-[200px] h-[40px] bg-transparent border border-[#37a39a] dark:text-[#fff] text-black rounded-[3px] flex justify-center items-center cursor-pointer hover:bg-[#37a39a] hover:text-white`}
                                    >
                                        Add New Member
                                    </div>
                                </div>
                            )}
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
                        {active && (
                            <Modal
                                open={active}
                                onClose={() => {
                                    setActive(!active);
                                    setEmail("");
                                    setRole("admin");
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
                                    <h1 className={`${styles.title}`}>Add New Member</h1>
                                    <div className="mt-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email..."
                                            className={`${styles.input}`}
                                        />
                                        <select
                                            name=""
                                            id=""
                                            className={`${styles.input} !mt-6`}
                                            onChange={(e: any) => setRole(e.target.value)}
                                        >
                                            <option
                                                className="dark:bg-[#000] text-[#fff]"
                                                value="admin"
                                            >
                                                Admin
                                            </option>
                                            <option className="dark:bg-[#000] text-[#fff]" value="user">
                                                User
                                            </option>
                                        </select>
                                        <br />
                                        <div
                                            className={`${styles.button} my-6 !h-[30px] cursor-pointer`}
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}
                        {open && (
                            <Modal
                                open={open}
                                onClose={() => { setOpen(!open); setUserId(""); }}
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
                                        Are you sure you want to delete this user?
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
                )
            }
        </div>
    )
}

export default AllUsers