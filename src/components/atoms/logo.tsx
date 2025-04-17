import logo from '@/assets/images/home/logo.webp';
import { Link } from 'react-router-dom';

type LogoProps = {
    className?: string;
    isHeading?: boolean;
};

export default function Logo({ className, isHeading = true }: LogoProps) {
    return isHeading ? (
        <h1 className={className}>
            <img
                src={logo}
                alt="Chisto.drive логотип"
                className="object-contain"
            />
            <span className="sr-only">Chisto.drive</span>
        </h1>
    ) : (
        <div className={className}>
            <Link to="/" className="block">
                <img
                    src={logo}
                    alt="Chisto.drive логотип"
                    className="object-contain"
                />
            </Link>
        </div>
    );
}
