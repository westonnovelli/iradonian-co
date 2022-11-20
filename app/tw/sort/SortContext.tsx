'use client';

import React from 'react';
import { SORTS } from './sort';

export interface Sort {
    sortingDimension: keyof typeof SORTS;
    setSortingDimension: React.Dispatch<React.SetStateAction<keyof typeof SORTS>>;
}

export const SortContext = React.createContext<Sort>({
    sortingDimension: Object.keys(SORTS)[0],
    setSortingDimension: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const SortProvider: React.FC<Props> = ({children}) => {
    const [sortingDimension, setSortingDimension] = React.useState(Object.keys(SORTS)[0]);
    return (
        <SortContext.Provider value={{ sortingDimension, setSortingDimension }}>
            {children}
        </SortContext.Provider>);
};

export const useSort = () => {
    const context = React.useContext(SortContext);

    if (context === undefined) {
        throw new Error(
            'useSort must be used within SortProvider'
        );
    }

    return context;
};
