'use client'

import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import Modal from '@/components/Modal/Modal'
import type { Note } from '@/types/note'

export default function NotePreviewModal({ id }: { id: string }) {
  const router = useRouter()

  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById({ noteId: id }),
    refetchOnMount: false,
  })

  return (
    <Modal open={true} onClose={() => router.back()}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0 }}>Note details</h3>
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p>
          Failed to load note:{' '}
          {String((error as Error)?.message || 'Unknown error')}
        </p>
      )}
      {data && (
        <>
          <h4 style={{ marginTop: 0 }}>{data.title}</h4>
          <p>{data.content}</p>
          <p>
            <strong>Tag:</strong> {data.tag}
          </p>
          {'createdAt' in data && data.createdAt && (
            <p>
              <strong>Created:</strong>{' '}
              {new Date(data.createdAt).toLocaleString()}
            </p>
          )}
        </>
      )}
    </Modal>
  )
}
