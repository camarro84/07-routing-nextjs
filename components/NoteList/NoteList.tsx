import css from './NoteList.module.css'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Note } from '@/types/note'
import Link from 'next/link'
import Button from '../Button/Button'
import { deleteNote } from '@/lib/api'

type Props = {
  notes: Note[]
}

const NoteList = ({ notes }: Props) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<void, unknown, string>({
    mutationFn: (noteId) => deleteNote({ noteId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
  const handleDelteNotes = (noteId: string) => {
    mutation.mutate(noteId)
  }
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <Link href={`/notes/${note.id}`} className={css.content}>
            <p className={css.title}>{note.title}</p>
          </Link>
          <div className={css.footer}>
            <p className={css.tag}>{note.tag}</p>
            <Button
              typeBtn="button"
              className={css.button}
              onClick={() => handleDelteNotes(note.id)}
              value="Delete"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NoteList
