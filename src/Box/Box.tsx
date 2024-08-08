import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { createPortal } from 'react-dom';
import style from './Box.module.css'
import React, {  FC, HTMLAttributes, MouseEvent, PropsWithChildren, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';

export const Box: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({ children, className }) => {
  const lg = useRef<HTMLDivElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>('')

  const handleImageClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    const img = target.closest('img')
    if (img) {
      setPreviewUrl(img.src)
    }
  }

  const closePreview = () => setPreviewUrl(null)

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
        previewUrl && createPortal(
          <Swiper
            // lazy={true}
            initialSlide={1}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Navigation, Pagination]}
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
