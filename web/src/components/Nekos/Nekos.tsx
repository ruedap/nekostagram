import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/NekosCell'

const DELETE_NEKO_MUTATION = gql`
  mutation DeleteNekoMutation($id: Int!) {
    deleteNeko(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const NekosList = ({ nekos }) => {
  const [deleteNeko] = useMutation(DELETE_NEKO_MUTATION, {
    onCompleted: () => {
      toast.success('Neko deleted')
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete neko ' + id + '?')) {
      deleteNeko({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Url</th>
            <th>ImageFileName</th>
            <th>ImageFileNameOriginal</th>
            <th>ImageFileExt</th>
            <th>Updated at</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {nekos.map((neko) => (
            <tr key={neko.id}>
              <td>{truncate(neko.id)}</td>
              <td>{truncate(neko.url)}</td>
              <td>{truncate(neko.imageFileName)}</td>
              <td>{truncate(neko.imageFileNameOriginal)}</td>
              <td>{truncate(neko.imageFileExt)}</td>
              <td>{timeTag(neko.updatedAt)}</td>
              <td>{timeTag(neko.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.neko({ id: neko.id })}
                    title={'Show neko ' + neko.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editNeko({ id: neko.id })}
                    title={'Edit neko ' + neko.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <a
                    href="#"
                    title={'Delete neko ' + neko.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(neko.id)}
                  >
                    Delete
                  </a>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NekosList
