import './App.css'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { EditIdeaPage } from './pages/EditIdeaPage'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOut'
import { SignUpPage } from './pages/SignUpPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
              <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
              <Route
                path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)}
                element={<ViewIdeaPage />}
              />
              <Route
                path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)}
                element={<EditIdeaPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}

export default App
