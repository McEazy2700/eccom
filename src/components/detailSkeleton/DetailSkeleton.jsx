import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './DetailSkeleton.scss'

const DetailSkeleton = () => {
  return (
    <div className='detailSkeleton'>
        <div className="detailSkeleton__image">
            <Skeleton />
        </div>
        <div className="detailSkeleton__details">
            <div className="detailSkeleton__details-title">
                <Skeleton />
            </div>
            <div className="detialSkeleton__detail-info">
                <Skeleton count={5}/>
            </div>
            <div className="detailSkeleton__details-price">
                <div className="detailSkeleton__details-price_1">
                    <Skeleton />
                </div>
                <div className="detailSkeleton__details-price_1">
                    <Skeleton />
                </div>
            </div>
            <div className="detailSkeleton__detail-cta">
                <div className="detailSkeleton__detail-cta_1">
                    <Skeleton />
                </div>
                <div className="detailSkeleton__detail-cta_1">
                    <Skeleton />
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailSkeleton