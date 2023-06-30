import AtomicSpinner from 'atomic-spinner';
import React from 'react';

interface LoadingProps {
    
}

const Loading: React.FC<LoadingProps> = () => {
    return (
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150'>
            <AtomicSpinner />
        </div>
    );
};

export default Loading;