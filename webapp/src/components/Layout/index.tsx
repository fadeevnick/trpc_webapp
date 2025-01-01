import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import { useAppContext } from '../../lib/ctx'

export const Layout = () => {
  const { me } = useAppContext()

  return (
    <div>
      <p>
        <b className="main_h1">IdeaNick</b>
      </p>
      <ul>
        <li>
          <Link to={routes.getAllIdeasRoute()}>All Ideas</Link>
        </li>
        {me ? (
          <>
            <li>
              <Link to={routes.getNewIdeaRoute()}>Add idea</Link>
            </li>
            <li>
              <Link to={routes.getSignOutRoute()}>Log Out ({me.nick})</Link>
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
