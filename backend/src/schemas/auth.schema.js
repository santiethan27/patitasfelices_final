import {z} from "zod";

export const registerShema = z.object({
    name: z.string({
        required_error: 'El nombre es requerido'
    }),
    last_name: z.string({
        required_error: 'El apellido es requerido'
    }),
    phone: z.string({
        required_error: 'El numero de telefono es requerido'
    }).min(10, {
        message: 'El numero de telefono debe tener 10 numeros'
    }).max(10, {
        message: 'El numero de telefono debe tener 10 numeros'
    }),
    street: z.string({
        required_error: 'La direccion es requerida'
    }),
    state: z.string({
        required_error: 'La direccion es requerida'
    }),
    city: z.string({
        required_error: 'La direccion es requerida'
    }),
    postal_code: z.string({
        required_error: 'La direccion es requerida'
    }),
    yearbirth: z.string({
        required_error: 'La fecha es requerida'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Email es invalido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/), {
        message: 'La debe tener: una mayuscula, una minuscula y un numero'
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