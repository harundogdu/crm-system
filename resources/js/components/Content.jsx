import React from 'react';

function Content({children}) {
    return (
        <div className="min-h-full flex-1 py-4 container-fluid">
            {children}
        </div>
    );
}

export default Content;
