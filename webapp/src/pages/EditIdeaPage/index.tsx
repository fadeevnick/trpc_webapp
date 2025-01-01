import type { TrpcRouterOutput } from 'backend/src/router'
import { zUpdateIdeaTrpcInput } from 'backend/src/router/updateIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditIdeaComponent = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>
}) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateIdea = trpc.updateIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: idea.name,
      nick: idea.nick,
      description: idea.description,
      text: idea.text,
    },
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
        navigate(getViewIdeaRoute({ ideaNick: values.nick }))
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })
  return (
    <div title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Description" name="description" formik={formik} />
        <Textarea label="Text" name="text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red">Some fields are invalid</Alert>
        )}
        {submittingError && <Alert color="red">{submittingError}</Alert>}
        <button disabled={formik.isSubmitting}>Update Idea</button>
      </form>
    </div>
  )
}

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams
  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (
    getIdeaResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data.me
  if (!me) {
    return <span>Only for authorized</span>
  }
  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>
  }

  return <EditIdeaComponent idea={idea} />
}
