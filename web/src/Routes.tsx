// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/nekos/new" page={NewNekoPage} name="newNeko" />
      <Route path="/nekos/{id:Int}/edit" page={EditNekoPage} name="editNeko" />
      <Route path="/nekos/{id:Int}" page={NekoPage} name="neko" />
      <Route path="/nekos" page={NekosPage} name="nekos" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
