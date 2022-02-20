import React from 'react';

function Footer() {
    return (
        <div className="flex items-center justify-center bg-orange-400 p-2 text-white font-bold">
            copyright &copy; {new Date().getFullYear()} - <a href={"https://github.com/harundogdu"} className="text-white" target="_blank" rel="noreferrer">Source Code</a>
        </div>
    );
}

export default Footer;
