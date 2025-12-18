import React from 'react';

const Widget = ({ title, data, color }) => {
    return (
        <div className={`p-3 
                ${color === 'blue' && 'bg-blue-100 border-blue-300'} 
                ${color === 'red' && 'bg-red-100 border-red-300'} 
                ${color === 'green' && 'bg-green-100 border-green-300'} 
                ${color === 'violet' && 'bg-violet-100 border-violet-300'} 
                ${color === 'orange' && 'bg-orange-100 border-orange-300'} 
                ${color === 'purple' && 'bg-purple-100 border-purple-300'} 
                ${color === 'yellow' && 'bg-yellow-100 border-yellow-300'} 
                border rounded-md flex flex-col gap-3`}>
            <h2 className={`text-base text-primary font-bold`}>{title}</h2>
            <span className='text-2xl text-secondary font-bold'>{data}</span>
        </div>
    );
};

export default Widget;