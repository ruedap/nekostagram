import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const NekosLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.nekos()} className="rw-link">
            Nekos
          </Link>
        </h1>
        <Link to={routes.newNeko()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Neko
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default NekosLayout
