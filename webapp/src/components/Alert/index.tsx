export const Alert = ({
  color,
  children,
}: {
  color: 'red' | 'green'
  children: React.ReactNode
}) => {
  const cn = `alert ${color === 'red' ? 'red_alert' : 'green_alert'}`

  return <div className={cn}>{children}</div>
}
