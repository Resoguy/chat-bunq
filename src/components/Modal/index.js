import React from 'react';
import { Button, Card } from '..';
import s from './Modal.module.scss';


const Modal = ({children, isOpen = false, onClose}) => {

    return (
        <>
        {
            isOpen &&
            <div className={s.overlay}>

                <Button onClick={onClose} className={s.closeBtn}>
                    Close
                </Button>

                <div className={s.modalContent}>
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
