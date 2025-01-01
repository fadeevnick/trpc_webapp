import { Link } from 'react-router-dom'

export type ButtonProps = { children: React.ReactNode; loading?: boolean }
export const Button = ({ children, loading = false }: ButtonProps) => {
  return (
    <button type="submit" disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  )
}

export const LinkButton = ({
  children,
  to,
}: {
  children: React.ReactNode
  to: string
}) => {
  return <Link to={to}>{children}</Link>
}
