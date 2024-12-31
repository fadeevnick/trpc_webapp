import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'

export const Layout = () => {
  return (
    <div>
      <p>
        <b className="main_h1">IdeaNick</b>
      </p>
      <ul>
        <li>
          <Link to={routes.getAllIdeasRoute()}>All Ideas</Link>
        </li>
        <li>
          <Link to={routes.getNewIdeaRoute()}>Add idea</Link>
        </li>
        <li>
          <Link to={routes.getSignUpRoute()}>Sign up</Link>
        </li>
        <li>
          <Link to={routes.getSignInRoute()}>Sign in</Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
