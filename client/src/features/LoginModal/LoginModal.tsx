import { ChangeEvent, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Modal } from 'antd';
import { useThrottle } from 'hooks/useThrottle';
import { useBoundStore } from 'store/store';

interface LoginModalProps {
    className?: string;
}

export const LoginModal = memo((props: LoginModalProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [validationError, setValidationError] = useState(false);

    const setUsername = useBoundStore((state) => state.setUsername);
    const setIsAuth = useBoundStore((state) => state.setIsAuth);
    const username = useBoundStore((state) => state.username);

    const onConnectionHandler = () => {
        if (!username) {
            setValidationError(true);
            return;
        }
        setIsAuth(true);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onUsernameChange = useThrottle<ChangeEvent<HTMLInputElement>>(
        (e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
        },
        350,
    );

    return (
        <Modal
            title="Введите ваш псевдоним"
            open={isModalOpen}
            onOk={onConnectionHandler}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={onConnectionHandler}
                >
                    Войти
                </Button>,
            ]}
        >
            <Input
                onChange={onUsernameChange}
                status={validationError ? 'error' : undefined}
            />
        </Modal>
    );
});
