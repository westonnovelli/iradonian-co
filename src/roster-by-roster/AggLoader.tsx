import React from 'react';
import ContentLoader from 'react-content-loader';

const AggLoader = () => (
    <ContentLoader
        height={16}
        width="80%"
        speed={1}
        backgroundColor="#a1a5a5"
        foregroundColor="#dde3e5"
    >
        <rect x={0} y={0} width="100%" height={16} rx={8} ry={8}/>
    </ContentLoader>
);

export default AggLoader;
