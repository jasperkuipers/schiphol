import { NextRequest, NextResponse } from 'next/server';

import data from '../../assets/json/flights.json';

export type Flight = {
    flightIdentifier: string;
    flightNumber: string;
    airport: string;
    date: string;
    expectedTime: string;
    originalTime: string;
    url: string;
    score: string;
};

export type ApiResponse = {
    flights: Flight[];
};

export async function GET(request: NextRequest) {
    if (!data?.flights) {
        return NextResponse.json({ error: 'No flights found' }, { status: 500 });
    }

    let response: NextResponse = NextResponse.json(data);

    const destination = request.nextUrl.searchParams.get('destination');
    const limit = request.nextUrl.searchParams.get('limit');

    if (destination) {
        // get all flights that match the destination
        const flights = data.flights.reduce((acc: Flight[], flight: Flight) => {
            if (flight.airport.toLowerCase().includes(destination.toLowerCase())) {
                acc.push(flight);
            }

            return acc;
        }, []);

        // limit the number of flights
        flights.splice(limit ? parseInt(limit) : 5);

        // order by date and expectedTime
        flights.sort((a: Flight, b: Flight) => {
            return (
                new Date(a.date + ' ' + a.expectedTime).getTime() - new Date(b.date + ' ' + b.expectedTime).getTime()
            );
        });

        response = NextResponse.json({ flights });
    }

    // add a delay to simulate a slow API
    await new Promise(resolve => setTimeout(resolve, 1000));

    return response;
}
