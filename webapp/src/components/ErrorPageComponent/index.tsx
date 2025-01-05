import { Alert } from '../Alert'

export const ErrorPageComponent = ({
  title = 'Oops, error',
  message = 'Something went wrong',
}: {
  title?: string
  message?: string
}) => {
  return (
    <div>
      <div>{title}</div>
      <Alert color="red">{message}</Alert>
    </div>
  )
}
