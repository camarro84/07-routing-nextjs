'use client'

import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getNotes } from '@/lib/api'
import type { NoteListResponse } from '@/types/note'
import NotesPage from '@/components/NotesPage/NotesPage'
import NoteList from '@/components/NoteList/NoteList'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'
import Loading from '@/app/loading'
import Error from './error'

export default function Notes() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const { data, isLoading, isError, error } = useQuery<NoteListResponse>({
    queryKey: ['notes', { page, perPage: 10, search }],
    queryFn: () => getNotes({ page, perPage: 10, search, sortBy: 'created' }),
    placeholderData: keepPreviousData,
  })

  if (isLoading) return <Loading />
  if (isError) return <Error error={error} />
  if (!data) return <p>No note found</p>

  return (
    <>
      <NotesPage
        data={data}
        currentPage={page - 1}
        onPageChange={(idx) => setPage(idx + 1)}
        onSearch={(v) => {
          setSearch(v)
          setPage(1)
        }}
        onOpenCreate={() => setOpen(true)}
      >
        <NoteList notes={data.notes ?? []} />
      </NotesPage>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>Create note</h3>
        <NoteForm onCancel={() => setOpen(false)} />
      </Modal>
    </>
  )
}
