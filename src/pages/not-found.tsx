import image from '@/assets/images/404/404.webp';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    function handleGoHome() {
        navigate('/');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="mx-auto w-3/5 max-w-93.5 mb-5 sm:mb-8">
                <img
                    src={image}
                    alt="404"
                    className="w-full object-contain object-center"
                />
            </div>
            <p className="text-xl mb-5 sm:mb-8 font-medium sm:text-3xl">Страница не найдена</p>
            <p className="mb-8 sm:mb-10 mx-auto w-4/5 sm:w-3/5 text-white/70 text-balance sm:text-xl">К сожалению, запрашиваемая вами страница не найдена</p>
            <PrimaryBtn className='py-4 px-8' onClick={handleGoHome}>На главную</PrimaryBtn>
        </div>
    );
}
