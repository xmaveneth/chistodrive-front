import LoginBtn from '@/components/atoms/login-btn';
import Logo from '@/components/atoms/logo';
import CitySelector from '@/components/molecules/shared/city-selector';
import { useAuthContext } from '@/lib/hooks/useAuthContext';

export default function SearchHeader() {
    const { toggleLoginDialog } = useAuthContext();

    return (
        <header className="flex items-center justify-between mb-6 sm:mb-10 xl:mb-12">
            <CitySelector className="z-10" />

            <Logo className="w-33.5 hidden sm:block md:w-80 xl:w-123.5" />

            <LoginBtn onClick={() => toggleLoginDialog(true)} />
        </header>
    );
}
