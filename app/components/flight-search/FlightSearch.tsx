'use client';

import styles from './FlightSearch.module.scss';

import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQueryState } from 'nuqs';
// import useSWR from 'swr';
import classNames from 'classnames';
import { ApiResponse } from '@/app/api/flights/route';
import Input from '../input/Input';
import Spinner from '../spinner/Spinner';
import SortableTable from '../sortable-table/SortableTable';

const DEBOUNCE_INTERVAL = 300;

type FlightSearchProps = {
    className?: string;
    limit?: number;
};

// const fetcher = (url: string) => fetch(url).then(res => res.json());

const sortableColumns = [
    { name: 'Flight number', field: 'flightNumber' },
    { name: 'Airport', field: 'airport' },
    { name: 'Date', field: 'date' },
    { name: 'Expected time', field: 'expectedTime' },
];

const FlightSearch: React.FC<FlightSearchProps> = ({ className, limit = 5 }) => {
    const [destination, setDestination] = useQueryState('destination', {
        defaultValue: '',
    });

    const debounceRef = useRef<number>();

    /**
     * this is an alternative SWR example for fetching data
     * */

    // const { data, error, isLoading } = useSWR<ApiResponse>(
    //     destination ? `/api/flights?destination=${destination}&limit=${limit}` : null,
    //     fetcher,
    // );

    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [inputValue, setInputValue] = useState(destination || '');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFetched, setIsFetched] = useState<boolean>(false);

    useEffect(() => {
        if (!destination) return;

        setIsLoading(true);

        fetch(`/api/flights?destination=${destination}&limit=${limit}`)
            .then(res => res.json())
            .then(
                (data: ApiResponse) => {
                    setData(data);
                },
                (error: Error) => {
                    setError(error);
                },
            )
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
                setIsFetched(true);
            });
    }, [destination, limit]);

    const sortableRows = useMemo(() => {
        if (data) {
            return data.flights.map(flight => ({
                flightNumber: flight.flightNumber,
                airport: flight.airport,
                date: flight.date,
                expectedTime: flight.expectedTime,
            }));
        }
    }, [data]);

    const inputChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);

            clearTimeout(debounceRef.current);

            if (e.target.value.length < 3) {
                setData(null);
                setDestination(''); // @TODO: this can be improved
                setError(null);
                setIsFetched(false);

                return;
            }

            debounceRef.current = window.setTimeout(() => {
                setDestination(e.target.value);
            }, DEBOUNCE_INTERVAL);
        },
        [setDestination],
    );

    return (
        <div className={classNames(className, styles['flight-search'])}>
            <div>
                Search for destination: <span className="text-secondary">{destination || ''}</span>
            </div>
            <form className={styles.form} onSubmit={e => e.preventDefault()}>
                <Input
                    aria-label="Search"
                    aria-autocomplete="list"
                    className={styles.input}
                    label="Enter your destination"
                    onChange={inputChangeHandler}
                    placeholder="Your destination"
                    role="searchbox"
                    type="text"
                    value={inputValue}
                />
            </form>
            {(isLoading && (
                <div className={styles.loader}>
                    <Spinner />
                </div>
            )) ||
                (isFetched && (
                    <div className="mt-4">
                        {error && <div className={styles.error}>An error has occured.</div>}
                        {(sortableRows && sortableRows.length !== 0 && <SortableTable columns={sortableColumns} rows={sortableRows} />) || <p>No data</p>}
                    </div>
                ))}
        </div>
    );
};

export default FlightSearch;
