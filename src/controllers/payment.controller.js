import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configurar la instancia de Mercado Pago
const client = new MercadoPagoConfig({
    accessToken: "TEST-6250303031696982-030523-81b1772839c4e848b7700c37972d9b91-723544943",
});

export const postPayment = async (req, res) => {
    
    try {
        const { amount, description } = req.body;
        if (!amount || !description) {
            return res.status(400).send({ error: "Faltan campos obligatorios: monto o descripcion"});
        }
        const body = {
            items: [
                {
                    title: description,
                    unit_price: Number(amount),
                    quantity: 1,
                    currency_id: "COP"
                },
            ],
            back_urls: {
                success: "https://github.com/santiethan27/patitasfelices_final",
                failure: "http://localhost:5173/donations",
                pending: "https://mail.google.com", 
            },
            auto_return: 'approved',
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.status(200).json({ id: result.id , init_point: result.init_point });
    } catch (error) {
        console.error('Error al crear el pago:', error);
        return res.status(500).send({ error: 'Ocurrió un error inesperado' });
    }
};
