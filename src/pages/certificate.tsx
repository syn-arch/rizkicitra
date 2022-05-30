import CustomImage from '@/components/atoms/CustomImage'
import Hero from '@/components/mollecules/Hero'
import Layout from '@/components/templates/Layout'

import useMediaQuery from '@/hooks/useMediaQuery'
import ALBUMS from '@/libs/constants/certificate'
import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'

const meta = {
  title: 'Certificate',
  description:
    "A collection of certificates I've earned, most of them are from finishing a course, you might want to take a look, click the certificate to zoom in."
}

const CertificatePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currImage, setCurrImage] = useState(0)

  const isMatch = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement

      if (isOpen) html.classList.add('overflow-hidden')

      if (html.classList.contains('overflow-hidden') && !isOpen) {
        html.classList.remove('overflow-hidden')
      }
    }
  }, [isOpen])

  const handleClick = useCallback(
    (newValue: number) => {
      setIsOpen((prev) => !prev)
      setCurrImage(newValue)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currImage]
  )

  return (
    <Layout {...meta}>
      <Hero {...meta} />
      <section
        className={twclsx(
          'content-auto',
          'w-full grid grid-cols-1 md:grid-cols-2',
          'gap-4 flex-auto',
          'my-10 md:my-20'
        )}
      >
        {ALBUMS.map((prop, index) => (
          <figure key={prop.title} className='relative w-full h-56'>
            <CustomImage
              onClick={() => handleClick(index)}
              src={prop.src}
              alt={`${prop.title} certificate`}
              title={`${prop.title} certificate`}
              className={twclsx(
                'w-full h-full aspect-square object-cover',
                'cursor-pointer hover:brightness-75',
                'transition-all'
              )}
              display='responsive'
            />
          </figure>
        ))}
      </section>

      {isOpen && (
        <div className='relative w-full'>
          <Lightbox
            mainSrc={ALBUMS[currImage].src}
            onMovePrevRequest={() => setCurrImage((prev) => (prev === 0 ? ALBUMS.length - 1 : prev - 1))}
            onMoveNextRequest={() => setCurrImage((prev) => (prev === ALBUMS.length - 1 ? 0 : prev + 1))}
            prevSrc={ALBUMS[(currImage + ALBUMS.length - 1) % ALBUMS.length].src}
            nextSrc={ALBUMS[(currImage + 1) % ALBUMS.length].src}
            onCloseRequest={() => setIsOpen(false)}
            imageTitle={ALBUMS[currImage].title}
            imagePadding={isMatch ? 100 : 10}
            reactModalStyle={{
              maxWidth: '500px'
            }}
          />
        </div>
      )}
    </Layout>
  )
}

export default CertificatePage