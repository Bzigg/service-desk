import { memo, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginForm } from 'features/AuthByUsername';
import logoIcon from 'shared/icons/Logo.png';
import cls from './AuthPage.module.scss';

interface AuthLocationState {
    from?: {
        pathname?: string;
    };
}

const AuthPage = memo(() => {
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();
    const location = useLocation() as { state?: AuthLocationState };

    const onSuccess = useCallback(() => {
        const from = location.state?.from?.pathname;
        navigate(from || RoutePath.main, { replace: true });
    }, [location.state, navigate]);

    const onOpenRegistrationModal = useCallback(() => {
        navigate(RoutePath.registration);
    }, [navigate]);

    if (authData) {
        return <Navigate to={RoutePath.main} replace />;
    }

    return (
        <div className={cls.AuthPage}>
            <div className={cls.AuthCard}>
                <div className={cls.Brand}>
                    <img
                        className={cls.LogoIcon}
                        src={logoIcon}
                        alt="БГПУ Поддержка"
                    />
                    <span className={cls.BrandText}>БГПУ Поддержка</span>
                </div>
                <Suspense fallback={<Loader />}>
                    <LoginForm
                        onSuccess={onSuccess}
                        onRegistrationClick={onOpenRegistrationModal}
                    />
                </Suspense>
            </div>
        </div>
    );
});

export default AuthPage;
