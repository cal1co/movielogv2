import React, { useEffect, useState } from 'react';


interface LoadingBarProps {
    progress: number;
}


const LoadingBar: React.FC<LoadingBarProps> = ({progress}) => {
    return (
        <div className="LoadingBar">
            <div className="loading-bar" style={{width: `${progress}%`}}></div>
        </div>
    )
}


export default LoadingBar;