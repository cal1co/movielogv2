// import './UserResultsComponent.css'

import React, { useEffect, useState, useRef } from 'react';


// http://localhost:5173/search/film?query=spiderman

type QueryProps = {
  query: string
}

const UserResultsComponent: React.FC<QueryProps> = ({query}) => {
  

  return (
    <div className="UserResultsComponent">
        Search for users related to {query}
    </div>
  )
}


export default UserResultsComponent

