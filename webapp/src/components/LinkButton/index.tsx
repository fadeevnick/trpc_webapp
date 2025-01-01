import { Link } from 'react-router-dom'

export const LinkButton = ({
  children,
  to,
}: {
  children: React.ReactNode
  to: string
}) => {
  return <Link to={to}>{children}</Link>
}
