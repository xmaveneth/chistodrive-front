import LoginBtn from '@/components/atoms/login-btn';
import Logo from '@/components/atoms/logo';
import CitySelector from '@/components/molecules/shared/city-selector';
import { useAuthContext } from '@/lib/hooks/context/use-auth-context';

export default function SearchHeader() {
    const { toggleLoginDialog } = useAuthContext();

    return (
        <header className="flex items-center justify-between mb-6 sm:mb-10 xl:mb-12">
            <CitySelector className="z-10 sm:w-80" />

            <Logo className="w-33.5 hidden md:block lg:w-80 xl:w-123.5" />

            <div className="sm:w-80 flex justify-end">
                <LoginBtn onClick={() => toggleLoginDialog(true)} />
            </div>
        </header>
    );
}
