import yup from 'yup'

export const newsValidation = yup.object().shape({
    title: yup.string().min(3).max(100).required(),
    content: yup.string().min(100).max(3000).required(),
})