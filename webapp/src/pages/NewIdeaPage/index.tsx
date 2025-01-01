import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'
import { zCreateIndeaTrpcInput } from 'backend/src/router/createIdea/input'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { useForm } from '../../lib/form'

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateIndeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Idea created!',
    showValidationAlert: true,
  })

  return (
    <div>
      <h1>New Idea</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()

          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Create Idea</Button>
      </form>
    </div>
  )
}
