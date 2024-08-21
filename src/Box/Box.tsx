import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import style from './Box.module.css'
import CloseIcon from "../Icons/CloseIcon";

import React, { FC, HTMLAttributes, MouseEvent, PropsWithChildren, useRef, useState } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from 'swiper/modules';
import { createPortal } from 'react-dom';


export const Box: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, className }) => {
  const childrenArray = React.Children.toArray(children)
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()
  const [isShow, setShow] = useState(false)

  const indexSlideRef = useRef(0)
  const lg = useRef<HTMLDivElement>(null)

  const getClickedIndex = (target: HTMLElement): number | null => {
    const closestSlice = target.closest('div')
    if (closestSlice === null) {
      console.log('error: closestSlice is null')
      return null
    }

    const sliceUrl = closestSlice.getAttribute('data-url');
    if (sliceUrl === null) {
      console.log('error: sliceUrl is null')
      return null
    }

    const resultIndex = childrenArray.findIndex(item => {
      if (!React.isValidElement(item)) {
        console.log('error: item is not a valid React element')
        return null
      }
      return item.props['data-url'] === sliceUrl
    })

    return resultIndex
  }

  const handleClickSlice = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const target = event.target as HTMLElement

    const sliceIndex = getClickedIndex(target)
    if (sliceIndex === null) {
      return
    }

    indexSlideRef.current = sliceIndex

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
      onClick={handleClickSlice}
      ref={lg}
    >
      {children}
      {
        createPortal(
          <div className={`${style.galleryBoxContainer} ${isShow ? style.visible : style.hidden}`}>
            <Swiper
              // lazy={true}
              className={style.containerBox}
              initialSlide={indexSlideRef.current}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Thumbs]}
              pagination={{
                clickable: true,
              }}
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
            <div className={style['box-thumb-container']}>
              <Swiper
                onSwiper={(swiper) => {
                  setThumbsSwiper(swiper)
                }}
                className={style['box-thumb-swiper']}
                spaceBetween={10}
                slidesPerView={'auto'}
                freeMode={true}
                modules={[FreeMode, Thumbs]}
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
                        <img src={url} alt={name} />
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
