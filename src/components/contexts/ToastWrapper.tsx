import { ReactNode } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {}

const ToastWrapper = ({ ...children }: { children: ReactNode }) => {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}

export default ToastWrapper