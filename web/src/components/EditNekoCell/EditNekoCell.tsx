import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import NekoForm from 'src/components/NekoForm'

export const QUERY = gql`
  query FIND_NEKO_BY_ID($id: Int!) {
    neko: neko(id: $id) {
      id
      url
      createdAt
    }
  }
`
const UPDATE_NEKO_MUTATION = gql`
  mutation UpdateNekoMutation($id: Int!, $input: UpdateNekoInput!) {
    updateNeko(id: $id, input: $input) {
      id
      url
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ neko }) => {
  const [updateNeko, { loading, error }] = useMutation(UPDATE_NEKO_MUTATION, {
    onCompleted: () => {
      toast.success('Neko updated')
      navigate(routes.nekos())
    },
  })

  const onSave = (input, id) => {
    updateNeko({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Neko {neko.id}</h2>
      </header>
      <div className="rw-segment-main">
        <NekoForm neko={neko} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
