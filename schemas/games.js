import yup from 'yup'

export const gameValidation = yup.object().shape({
    name: yup.string().min(3).max(50).required(),
    description: yup.string().min(3).max(2000).required(),
    publisher: yup.string().min(3).max(50).required(),
    image: yup.string().required(),
    release_date: yup.date().required(),
})
