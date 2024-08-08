import "swiper/css";
import 'swiper/css/pagination';

import { createPortal } from 'react-dom';
import style from './Box.module.css'
import React, { FC, HTMLAttributes, MouseEvent, PropsWithChildren, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

export const Box: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, className }) => {
  const lg = useRef<HTMLDivElement>(null)
  const indexSlideRef = useRef(0)
  const [isShow, setShow] = useState(false)

  const handleImageClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const target = event.target as HTMLElement
    
    const element = target.closest('div')
    if (element === null) return
    
    const indexSlide = element.getAttribute('data-id');
    if (indexSlide === null) return

    indexSlideRef.current = parseInt(indexSlide) - 1
    console.log(indexSlideRef.current)
    if ( isShow !== true) {
      setShow(true)
    }
  }

  const closePreview = () => setShow(false)

  if (children === null || children === undefined) {
    console.log('error: children')
    return
  }

  const childrenArray = React.Children.toArray(children);

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
            initialSlide={indexSlideRef.current}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination]}
            className={style.containerBox}
          >
            <div className={style.bar}>
              <button onClick={closePreview}>close</button>
              <button>lol</button>
            </div>
            {
              childrenArray.map(child => {
                if (!React.isValidElement(child)) {
                  console.log('error: child is not a valid React element')
                  return null
                }

                const url = child.props.children[0].props.src
                const name = child.props.children[0].props.alt

                return (
                  <SwiperSlide key={child.key}>
                    <div className={style.containerImage}>
                      <img src={url} alt={name} loading="lazy" />
                      <p>{name}</p>
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
