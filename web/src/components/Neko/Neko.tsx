import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/NekosCell'

const DELETE_NEKO_MUTATION = gql`
  mutation DeleteNekoMutation($id: Int!) {
    deleteNeko(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Neko = ({ neko }) => {
  const [deleteNeko] = useMutation(DELETE_NEKO_MUTATION, {
    onCompleted: () => {
      toast.success('Neko deleted')
      navigate(routes.nekos())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete neko ' + id + '?')) {
      deleteNeko({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Neko {neko.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{neko.id}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{neko.url}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(neko.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editNeko({ id: neko.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(neko.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Neko
