import Hero from '@/components/organisms/home/hero';
import Intro from '@/components/organisms/home/intro';
import Slider from '@/components/organisms/home/slider';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import { ErrorBoundary } from 'react-error-boundary';

export default function Home() {
    return (
        <div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Hero />
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Intro />
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Slider />
            </ErrorBoundary>
        </div>
    );
}
