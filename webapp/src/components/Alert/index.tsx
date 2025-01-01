export type AlertProps = {
  color: 'red' | 'green'
  hidden?: boolean
  children: React.ReactNode
}
export const Alert = ({ color, hidden, children }: AlertProps) => {
  if (hidden) {
    return null
  }
  const cn = `alert ${color === 'red' ? 'red_alert' : 'green_alert'}`

  return <div className={cn}>{children}</div>
}
