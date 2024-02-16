export const getOutsideClickHandler = (
  targetElemSelector: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (e: MouseEvent) => {
    if (e.target instanceof Element && !e.target.closest(targetElemSelector)) {
      setIsOpen(false)
    }
  }
}
