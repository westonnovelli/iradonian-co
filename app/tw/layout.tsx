import React from 'react';

import { SortProvider } from './sort/SortContext';
import './tw-responsive.css';
import './tw.css';

const TW = ({ children }: { children: React.ReactNode }) => {
    return (
        <SortProvider>
            <div className="tw">
                {children}
            </div>
        </SortProvider>
    );
};

export default TW;
