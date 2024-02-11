import { Link as RouterLink } from 'react-router-dom'
import cn from 'classnames'

export interface LinkProps extends React.ComponentProps<typeof RouterLink> {
  disabled?: boolean
}

export default function Link({ disabled, className, ...props }: LinkProps) {
  if (disabled) {
    return <span className={cn(className, 'disabled')} role="link" aria-disabled {...props} />
  }

  return <RouterLink {...props} className={className} />
}
