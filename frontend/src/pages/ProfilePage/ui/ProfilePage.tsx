import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { ProfileForm } from 'features/Profile';
import { useParams } from 'react-router-dom';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page className={classNames('', {}, [className])}>
            <ProfileForm id={id || ''} />
        </Page>
    );
};

export default ProfilePage;
