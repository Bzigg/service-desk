import RegistrationForm from 'features/RegistrationUser/ui/RegistrationForm/RegistrationForm';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import logoIcon from 'shared/icons/Logo.png';
import cls from './RegistrationPage.module.scss';

const RegistrationPage = memo(() => {
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();

    const onSuccess = useCallback(() => {
        navigate(RoutePath.auth, { replace: true });
    }, [navigate]);

    if (authData) {
        return <Navigate to={RoutePath.main} replace />;
    }

    return (
        <div className={cls.RegistrationPage}>
            <div className={cls.RegistrationCard}>
                <div className={cls.Brand}>
                    <img className={cls.LogoIcon} src={logoIcon} alt="БГПУ Поддержка" />
                    <span className={cls.BrandText}>БГПУ Поддержка</span>
                </div>
                <RegistrationForm onSuccess={onSuccess} />
            </div>
        </div>
    );
});

export default RegistrationPage;
