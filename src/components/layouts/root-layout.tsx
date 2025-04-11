import Footer from '@/components/organisms/shared/footer';
import { Link, Outlet, ScrollRestoration } from 'react-router-dom';

export function RootLayout() {
    return (
        <>
            <ScrollRestoration />
            <div className="max-w-360 mx-auto">
                <header className='flex items-center gap-6 my-2'>
                    <Link to='/' className='underline underline-offset-2'>Home</Link>
                    <Link to='/account' className='underline underline-offset-2'>Account</Link>
                </header>
                <Outlet />

                <Footer />
            </div>
        </>
    );
}
