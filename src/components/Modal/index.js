import React, {useEffect, useRef} from 'react';
import { Button, Card } from '..';
import s from './Modal.module.scss';


const Modal = ({children, isOpen = false, onClose}) => {
    const wrapperRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onClose()
            }
        }        

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [wrapperRef, onClose, isOpen]);

    return (
        <>
        {
            isOpen &&
            <div className={s.overlay}>

                <Button onClick={onClose} className={s.closeBtn}>
                    Close
                </Button>

                <div className={s.modalContent} ref={wrapperRef}>
                    <Card>
                        {children}
                    </Card>
                </div>
            </div>
        }
        </>
    )
}

export default Modal;
