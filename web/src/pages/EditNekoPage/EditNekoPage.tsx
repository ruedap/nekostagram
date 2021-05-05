import NekosLayout from 'src/layouts/NekosLayout'
import EditNekoCell from 'src/components/EditNekoCell'

const EditNekoPage = ({ id }) => {
  return (
    <NekosLayout>
      <EditNekoCell id={id} />
    </NekosLayout>
  )
}

export default EditNekoPage
