import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery()

  return (
    <div>
      <p>
        <b className="main_h1">IdeaNick</b>
      </p>
      <ul>
        <li>
          <Link to={routes.getAllIdeasRoute()}>All Ideas</Link>
        </li>
        {isLoading || isFetching || isError ? null : data.me ? (
          <>
            <li>
              <Link to={routes.getNewIdeaRoute()}>Add idea</Link>
            </li>
            <li>
              <Link to={routes.getSignOutRoute()}>Log Out ({data.me.nick})</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={routes.getSignUpRoute()}>Sign up</Link>
            </li>
            <li>
              <Link to={routes.getSignInRoute()}>Sign in</Link>
            </li>
          </>
        )}
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
