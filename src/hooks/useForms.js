import { useState, useCallback } from 'react'

const useForms = () => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  function handleChange(evt) {
    const input = evt.target
    const valueInput = input.value
    const nameInput = input.name

    setValues({ ...values, [nameInput]: valueInput })
    setErrors({ ...errors, [nameInput]: input.validationMessage })
    setIsValid(input.closest('form').checkValidity())
    if (nameInput === 'email' && !valueInput.includes('.')) {
      setErrors({ ...errors, [nameInput]: 'Не корректный email' })
    }
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return {
    isValid,
    errors,
    values,
    resetForm,
    handleChange,
    setIsValid,
    setErrors,
    setValues,
  }
}

export default useForms
