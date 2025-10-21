import { fetchNoteById } from '@/lib/api'
import NotePreviewDetails from '../../@modal/(.)notes/[id]/NotePreview.client'

type Props = { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params
  const data = await fetchNoteById({ noteId: id })
  return <NotePreviewDetails data={data} />
}
