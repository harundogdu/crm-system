import React from 'react';

function Content({children}) {
    return (
        <div className="container flex-1 py-4">
            {children}
        </div>
    );
}

export default Content;
