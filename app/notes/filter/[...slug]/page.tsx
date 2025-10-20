import { GetNotesParams } from '@/lib/api'
import Notes from './Notes.client'

const allowed = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const
type AllowedTag = (typeof allowed)[number]

type Props = {
  params: Promise<{ slug?: string[] }>
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params
  const raw = slug?.[0]

  const tag: GetNotesParams['tag'] =
    raw && (allowed as readonly string[]).includes(raw)
      ? (raw as AllowedTag)
      : undefined

  return <Notes tag={tag} />
}
