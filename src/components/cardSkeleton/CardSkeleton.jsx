import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './CardSkeleton.scss'

const CardSkeleton = ({cards}) => {
    return (
      Array(cards).fill(0).map((card, i) => 
      <div key={i} className='card-skeleton'>
      <div className="card-skeleton__image">
          <Skeleton />
      </div>
      <div className="card-skeleton__details">
          <Skeleton count={2}/>
      </div>
  </div>
    
        )
  )
}

export default CardSkeleton