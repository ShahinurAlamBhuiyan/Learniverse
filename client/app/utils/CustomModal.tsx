import { Box, Modal } from '@mui/material';
import React, { FC } from 'react'

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute?: (route: string) => void;
}

const CustomModal: FC<Props> = ({ open, setOpen, activeItem, component: Component, setRoute }) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"
            >
                <Component
                    setOpen={setOpen}
                    setRoute={setRoute}
                />
            </Box>
        </Modal>
    )
}

export default CustomModal