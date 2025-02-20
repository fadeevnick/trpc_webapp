import { useParams } from 'react-router-dom'
import { getEditIdeaRoute, ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { LinkButton } from '../../components/Button'
import { useAppContext } from '../../lib/ctx'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  })

  const { me } = useAppContext()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea

  return (
    <div>
      <h1>{idea.name}</h1>
      <p>{idea.description}</p>
      <div className="created_at">Created At: {idea.createdAt}</div>
      <div className="author">Author: {idea.author.nick}</div>
      <div dangerouslySetInnerHTML={{ __html: idea.text }}></div>
      {me?.id === idea.authorId && (
        <div>
          <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>
            Edit Idea
          </LinkButton>
        </div>
      )}
    </div>
  )
}
