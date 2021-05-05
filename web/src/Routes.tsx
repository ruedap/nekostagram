// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import { FirebaseAuthProvider } from 'web/src/components/Auth'

const Routes = () => {
  return (
    <Router>
      <Set wrap={FirebaseAuthProvider}>
        <Route path="/nekos/new" page={NewNekoPage} name="newNeko" />
        <Route path="/nekos/{id:Int}/edit" page={EditNekoPage} name="editNeko" />
        <Route path="/nekos/{id:Int}" page={NekoPage} name="neko" />
        <Route path="/nekos" page={NekosPage} name="nekos" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
