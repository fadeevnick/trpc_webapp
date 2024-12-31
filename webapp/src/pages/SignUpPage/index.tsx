import { z } from 'zod'
import { useState } from 'react'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { zSignUpTrpcInput } from 'backend/src/router/signUp/input'
import { Input } from '../../components/Input'
import { Alert } from '../../components/Alert'

export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
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
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await signUp.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error: any) {
        setSubmittingError(error.message)
      }
    },
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
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Some fields are invalid</div>
        )}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        {successMessageVisible && <Alert color="green">Thanks for sign up!</Alert>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting' : 'Sign up'}
        </button>
      </form>
    </div>
  )
}
