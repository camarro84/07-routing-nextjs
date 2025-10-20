'use client'

import React, { ReactNode, useState } from 'react'

import css from './NotesPage.module.css'
import Button from '../Button/Button'
import SearchBox from '../SearchBox/SearchBox'
import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import NoteForm from '../NoteForm/NoteForm'
import { NoteListResponse } from '@/types/note'
import LayoutNotes from '../LayoutNotes/LayoutNotes'
import SidebarNotes from '../SidebarNotes/SidebarNotes'
import NoteList from '../NoteList/NoteList'

type Props = {
  data: NoteListResponse
  children: ReactNode
  setPage: (page: number) => void
  setSearch: (search: string) => void
}

const NotesPage = ({ data, setPage, setSearch }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={setSearch} />
        <Pagination totalPages={data.totalPages} onPageChange={setPage} />
        <Button
          className={css.button}
          value="Create note +"
          typeBtn="button"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <LayoutNotes sidebar={<SidebarNotes />}>
        {data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found.</p>
        )}
      </LayoutNotes>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  )
}

export default NotesPage
