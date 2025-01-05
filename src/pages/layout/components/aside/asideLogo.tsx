import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function AsideLogo({
  isShow,
  setIsShow,
}: {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className="flex items-center gap-32">
      <div className="flex flex-1 items-center gap-16">
        <img
          src="/logo.png"
          className="h-[6rem] w-[6rem]"
          alt="Kyros"
          loading="eager"
        />
        <p
          className="font-montserrat text-[3.2rem] font-semibold"
          style={{ letterSpacing: '0.2rem' }}
        >
          Cryp<span className="text-accent">Town</span>
        </p>
      </div>
      <span
        onClick={() => setIsShow(!isShow)} // Toggle the state on click
        className="bg-accent text-primary z-10 transform cursor-pointer rounded-lg transition-all duration-300"
      >
        {/* Conditionally render ChevronLeft or ChevronRight based on isShow */}
        {isShow ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </span>
    </div>
  )
}
