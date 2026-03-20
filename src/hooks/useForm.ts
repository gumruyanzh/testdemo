import { useState, ChangeEvent, FormEvent } from 'react'
import { ZodSchema, ZodError } from 'zod'

interface UseFormOptions<T> {
  initialValues: T
  validationSchema: ZodSchema<T>
  onSubmit: (data: T) => void
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormOptions<T>) {
  const [formData, setFormData] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof T]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof T]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})

    try {
      const validatedData = validationSchema.parse(formData)
      onSubmit(validatedData)
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof T, string>> = {}
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof T
            fieldErrors[field] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  const resetForm = () => {
    setFormData(initialValues)
    setErrors({})
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
  }
}
