import React from 'react'
import { CircleSpinner } from "react-spinners-kit";
const Loading = () => {
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <CircleSpinner size={30} color="#fb923c" loading={true} />
        </div>
    )
}

export default Loading
