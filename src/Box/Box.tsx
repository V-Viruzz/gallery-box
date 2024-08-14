import "swiper/css";
// import 'swiper/css/pagination';
import "swiper/css/thumbs";
import style from './Box.module.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from 'swiper/modules';

import { createPortal } from 'react-dom';
import React, { FC, HTMLAttributes, MouseEvent, PropsWithChildren, useRef, useState } from 'react'
import CloseIcon from "../Icons/CloseIcon";

export const Box: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, className }) => {
  const childrenArray = React.Children.toArray(children)
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [isShow, setShow] = useState(false)

  const indexSlideRef = useRef(0)
  const lg = useRef<HTMLDivElement>(null)

  const handleImageClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const target = event.target as HTMLElement

    const element = target.closest('div')
    if (element === null) return

    const indexSlide = element.getAttribute('data-url');
    if (indexSlide === null) return

    const resultIndex = childrenArray.findIndex(item => {
      if (!React.isValidElement(item)) {
        console.log('error: item is not a valid React element')
        return null
      }
      return item.props['data-url'] === indexSlide
    })

    indexSlideRef.current = resultIndex

    if (isShow !== true) {
      setShow(true)
    }
  }

  const closePreview = () => setShow(false)

  if (children === null || children === undefined) {
    console.log('error: children')
    return
  }

  return (
    <div
      className={`${className}`}
      onClick={handleImageClick}
      ref={lg}
    >
      {children}
      {
        isShow && createPortal(
          <div className={style.galleryBoxContainer}>
            <Swiper
              // lazy={true}
              className={style.containerBox}
              initialSlide={indexSlideRef.current}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Thumbs]}
            // pagination={{
            //   clickable: true,
            // }}
            >
              <div className={style.toolbar}>
                <button onClick={closePreview}>
                  <CloseIcon />
                </button>
              </div>
              {
                childrenArray.map(child => {
                  if (!React.isValidElement(child)) {
                    console.log('error: child is not a valid React element')
                    return null
                  }

                  const url = child.props['data-url']
                  const name = child.props['data-name']

                  return (
                    <SwiperSlide key={child.key}>
                      <div className={style.containerLayout}>
                        <div className={style.containerImagePreview}>
                          <img src={url} alt={name} />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                }
                )
              }

            </Swiper>
            <div className={style.thumbContainer}>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={'auto'}
                freeMode={true}
                modules={[Thumbs]}
                watchSlidesProgress={true}
              >
                {
                  childrenArray.map(child => {
                    if (!React.isValidElement(child)) {
                      console.log('error: child is not a valid React element')
                      return null
                    }

                    const url = child.props['data-url']
                    const name = child.props['data-name']

                    return (
                      <SwiperSlide
                        key={child.key}
                        className='thumb-item'
                      >
                        {/* <div className={style.thumbItemImage}> */}
                        <img src={url} alt={name} />
                        {/* </div> */}
                      </SwiperSlide>
                    )
                  }
                  )
                }
              </Swiper>
            </div>
          </div>
          ,
          document.body
        )

      }
    </div>
  )
}
