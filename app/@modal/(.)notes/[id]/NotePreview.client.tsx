'use client'

import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal/Modal'

type NoteData = {
  id: string
  title: string
  content: string
  tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'
}

export default function NotePreviewModal({ data }: { data: NoteData }) {
  const router = useRouter()
  return (
    <Modal open={true} onClose={() => router.back()}>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
      <p>
        <strong>Tag:</strong> {data.tag}
      </p>
    </Modal>
  )
}
