'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import css from './NoteForm.module.css'
import Button from '../Button/Button'
import { useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/api'

type NoteFormValues = {
  title: string
  content: string
  tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'
}

type Props = {
  onSuccess: () => void
  onClose: () => void
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  tag: Yup.string()
    .oneOf(['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'])
    .required(),
})

const NoteForm = ({ onSuccess, onClose }: Props) => {
  const queryClient = useQueryClient()
  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  }

  const handleSubmit = async (
    values: NoteFormValues,
    { setSubmitting, resetForm }: FormikHelpers<NoteFormValues>,
  ) => {
    try {
      await createNote(values)
      await queryClient.invalidateQueries({ queryKey: ['notes'] })
      resetForm()
      onSuccess()
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" as="input" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field name="content" as="textarea" className={css.textarea} />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" as="select" className={css.select}>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
              <option value="Todo">Todo</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>
          <div className={css.btnGroup}>
            <Button
              typeBtn="button"
              className={css.cancelButton}
              value="Cancel"
              onClick={onClose}
            />
            <Button
              typeBtn="submit"
              disabled={isSubmitting}
              className={css.submitButton}
              value="Create"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default NoteForm
