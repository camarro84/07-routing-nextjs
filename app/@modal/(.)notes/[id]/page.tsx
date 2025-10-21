import { fetchNoteById } from '@/lib/api'
import NotePreviewDetails from './NotePreview.client'

type Props = { params: Promise<{ id: string }> }

export default async function NoteModal({ params }: Props) {
  const { id } = await params
  const data = await fetchNoteById({ noteId: id })
  return <NotePreviewDetails data={data} />
}
