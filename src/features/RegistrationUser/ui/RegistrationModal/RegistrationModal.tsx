import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
// import { RegistrationFormAsync } from '../RegistrationForm/RegistrationForm.async';

interface RegistrationModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RegistrationModal = ({ className, isOpen, onClose }: RegistrationModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            123
            {/*<RegistrationFormAsync onSuccess={onClose} />*/}
        </Suspense>
    </Modal>
);
