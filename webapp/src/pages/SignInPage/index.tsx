import { trpc } from '../../lib/trpc'
import { Input } from '../../components/Input'
import { Alert } from '../../components/Alert'
import { zSignInTrpcInput } from 'backend/src/router/signIn/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'
import { Button } from '../../components/Button'
import { useForm } from '../../lib/form'

export const SignInPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()

  const signIn = trpc.signIn.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      trpcUtils.invalidate()
      navigate(getAllIdeasRoute())
    },
    resetOnSuccess: false,
  })

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Password" name="password" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Sign in</Button>
      </form>
    </div>
  )
}
