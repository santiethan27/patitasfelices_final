import {z} from "zod";

export const registerShema = z.object({
    name: z.string({
        required_error: 'Nombre de usuario es requerido'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Email es invalido'
    }),
    password: z.string({
        required_error: 'Email es requerido'
    }).min(8, {
        message: 'La contraseña debe tener minimo 8 caracteres'
    })
})

export const loginShema = z.object({
    email: z.string({
        required_error: 'El Email es requerido',
    }).email({
        message: 'El Email es invalido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    })
})