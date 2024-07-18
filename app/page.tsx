import { Suspense } from 'react';
import FlightSearch from './components/flight-search/FlightSearch';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
            <div className="w-full max-w-screen-md">
                <h1 className="max-w-3/4">Flight Search</h1>
                <h2 className="mb-0">Find your flight by destination</h2>
                <Suspense fallback={<div>Loading...</div>}>
                    <FlightSearch className="w-full mt-4" limit={5} />
                </Suspense>
            </div>
        </main>
    );
}
