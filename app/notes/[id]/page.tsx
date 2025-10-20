import NoteModal from '@/app/@modal/(.)notes/[id]/page'

type Props = {
  params: { id: string }
}

export default function NotesPage({ params }: Props) {
  return <NoteModal params={params} />
}
