import { z } from 'zod'
import { trpc } from '../../lib/trpc'
import { zSignUpTrpcInput } from 'backend/src/router/signUp/input'
import { Input } from '../../components/Input'
import { Alert } from '../../components/Alert'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getAllIdeasRoute } from '../../lib/routes'
import { Button } from '../../components/Button'
import { useForm } from '../../lib/form'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()

  const signUp = trpc.signUp.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['passwordAgain'],
          })
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      trpcUtils.invalidate()
      navigate(getAllIdeasRoute())
    },
    resetOnSuccess: false,
  })

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={formik.handleSubmit}>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Password" name="password" type="password" formik={formik} />
        <Input
          label="Password again"
          name="passwordAgain"
          type="password"
          formik={formik}
        />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Sign up</Button>
      </form>
    </div>
  )
}
