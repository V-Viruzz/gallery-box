import "swiper/css";
import 'swiper/css/pagination';

import { createPortal } from 'react-dom';
import style from './Box.module.css'
import React, { FC, HTMLAttributes, MouseEvent, PropsWithChildren, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import CloseIcon from "../Icons/CloseIcon";

export const Box: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, className }) => {
  const childrenArray = React.Children.toArray(children);
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
          <Swiper
            // lazy={true}
            className={style.containerBox}
            initialSlide={indexSlideRef.current}
            navigation={true}
            modules={[Pagination]}
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
                      {/* <div className={style.toolbarLayout}/> */}
                      <div className={style.containerImagePreview}>
                        <img src={url} alt={name} />
                      </div>
                      {/* <div className={style.barPaginationLayout}/> */}
                      {/* <p>{name}</p> */}
                    </div>
                  </SwiperSlide>
                )
              }
              )
            }

          </Swiper>,
          document.body
        )

      }
    </div>
  )
}
