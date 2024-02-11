import { usePageLoader } from '@/app/pageLoader/pageLoaderSlice'
import { useEffect } from 'react'

export default function PageLoader() {
  const { isLoading } = usePageLoader()

  useEffect(() => {
    if (isLoading > 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isLoading])

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 z-page-loader w-screen h-screen bg-light/50 backdrop-blur-sm flex justify-center items-center animate-fade-in">
      <span className="spinner spinner-4xl spinner-prim"></span>
    </div>
  )
}
