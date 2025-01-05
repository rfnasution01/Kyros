import { useMobile } from '@/hooks/useMobile'
import { useMode } from '@/hooks/useMode'
import clsx from 'clsx'
import { AsideLogo } from './components'
import { useState } from 'react'

// Poppins: A modern sans-serif font that is great for plain text. It has a very clean and easy-to-read look, ideal for use in descriptions, headlines, or long-form content.

// Inter: A very popular sans-serif font for modern interfaces and web applications. It is suitable for small to medium-sized text, such as labels, icons, or descriptions that are not too large.

// Montserrat: A stronger sans-serif font that is often used for headlines or titles. It gives a strong and professional impression.

export default function MainLayout() {
  const { mode } = useMode()
  const { isMobile } = useMobile()
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div
      style={{ lineHeight: '130%' }}
      className={clsx(
        'scrollbar font-poppins text-primary flex h-screen w-full overflow-auto text-[2rem] phones:text-[2.4rem]',
        {
          'bg-light': mode !== 'DARK',
          'bg-dark': mode === 'DARK',
        },
      )}
    >
      {isMobile ? (
        <div className="">Mobile App</div>
      ) : (
        <>
          <div className="scrollbar bg-primary flex h-full w-1/5 flex-col gap-32 overflow-auto p-32 text-white">
            <AsideLogo setIsShow={setIsShow} isShow={isShow} />
          </div>
          <div className="h-full w-4/5 overflow-scroll">;</div>
        </>
      )}
    </div>
  )
}
