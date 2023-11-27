import yup from 'yup'

export const userValidation = yup.object().shape({
    email: yup.string().email().min(3).max(50).required(),
    password: yup.string().min(3).max(50).required(),
})
