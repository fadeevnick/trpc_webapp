import { useFormik } from 'formik'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'

export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {}
      if (!values.name) {
        errors.name = 'Name is required'
      }
      if (!values.nick) {
        errors.nick = 'Nick is required'
      }
      if (!values.description) {
        errors.description = 'Description is required'
      }
      if (!values.text) {
        errors.text = 'Text is required'
      }
      return errors
    },
    onSubmit: (values) => {
      console.log('Submitted', values)
    },
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
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Some fields are invalid</div>
        )}
        <button type="submit">Create Idea</button>
      </form>
    </div>
  )
}
