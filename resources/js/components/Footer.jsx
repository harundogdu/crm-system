import React from 'react';

function Footer() {
    return (
        <div className="bg-dark text-white">
            <p className="container flex items-center justify-center  p-2 font-bold">
                copyright &copy; {new Date().getFullYear()} - <a href={"https://github.com/harundogdu"}
                                                                 className="text-white" target="_blank"
                                                                 rel="noreferrer">Source Code</a>
            </p>
        </div>
    );
}

export default Footer;
