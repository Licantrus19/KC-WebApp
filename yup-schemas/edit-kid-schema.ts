import * as yup from 'yup'

export const editKidSchema = yup
    .object({
        firstName: yup.string().required('Nombres son obligatorios'),
        lastName: yup.string().required('Apellidos son obligatorios'),
        dni: yup
            .string()
            .min(8, 'Se requiere 8 caracteres')
            .max(8, 'Se requiere 8 caracteres')
            .required('DNI es obligatorio'),
        gender: yup.string().required('Género es obligatorio'),
        relationship: yup.string().required('Parentesco es obligatorio'),
    })
    .required()