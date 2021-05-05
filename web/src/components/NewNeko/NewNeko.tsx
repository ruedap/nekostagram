import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import NekoForm from 'src/components/NekoForm'

import { QUERY } from 'src/components/NekosCell'

const CREATE_NEKO_MUTATION = gql`
  mutation CreateNekoMutation($input: CreateNekoInput!) {
    createNeko(input: $input) {
      id
    }
  }
`

const NewNeko = () => {
  const [createNeko, { loading, error }] = useMutation(CREATE_NEKO_MUTATION, {
    onCompleted: () => {
      toast.success('Neko created')
      navigate(routes.nekos())
    },
  })

  const onSave = (input) => {
    createNeko({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Neko</h2>
      </header>
      <div className="rw-segment-main">
        <NekoForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewNeko
