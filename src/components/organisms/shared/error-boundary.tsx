import PrimaryBtn from '@/components/atoms/primary-btn';
import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
    error,
    resetErrorBoundary,
}: FallbackProps) {
    return (
        <div
            role="alert"
            className="primary-px py-6 sm:py-12.5 border-y border-border bg-[#20232c] sm:flex items-center justify-between"
        >
            <div>
                <p className="mb-2">Что-то пошло не так:</p>
                <pre className="whitespace-pre-wrap text-sm">{error.message}</pre>
            </div>
            <div className='mt-6 sm:mt-0'>
                <PrimaryBtn onClick={resetErrorBoundary}>Перезагрузить</PrimaryBtn>
            </div>
        </div>
    );
}
