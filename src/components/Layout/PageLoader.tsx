import { useEffect } from 'react'
import { useAppDispatch } from '@/app/store'
import { bodyScrollbarActions } from '@/app/bodyScrollbar/bodyScrollbarSlice'
import { usePageLoader } from '@/app/pageLoader/pageLoaderSlice'

export default function PageLoader() {
  const dispatch = useAppDispatch()

  const { isLoading } = usePageLoader()

  useEffect(() => {
    if (isLoading) {
      dispatch(bodyScrollbarActions.hide())
    } else {
      dispatch(bodyScrollbarActions.show())
    }

    return () => {
      dispatch(bodyScrollbarActions.show())
    }
  }, [dispatch, isLoading])

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 z-page-loader w-screen h-screen bg-light/50 backdrop-blur-sm flex justify-center items-center animate-fade-in">
      <span className="spinner spinner-4xl spinner-prim"></span>
    </div>
  )
}
