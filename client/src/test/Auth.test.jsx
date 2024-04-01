import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect, vi } from "vitest";
import Donations from './../pages/Donations/Donations';
import { PaymentProvider } from "../contexts/PaymentContext";

vi.mock('@mercadopago/sdk-react', () => ({
    initMercadoPago: vi.fn(),
}));

vi.mock('../../contexts/PaymentContext', () => ({
    usePayment: () => ({
        _postPayment: vi.fn(),
    }),
}));

describe('Donations', () => {
    afterEach(cleanup);

    it('renders donation buttons', () => {
        render(
            <PaymentProvider>
                <Donations />
            </PaymentProvider>
        );

        const donationButtons = screen.getAllByRole('button', { name: /Donar/i });
        expect(donationButtons).toHaveLength(9);
    });

    it('calls _postPayment when a donation button is clicked', () => {
        const _postPaymentMock = vi.fn();
        _postPaymentMock.mockResolvedValue({ init_point: 'test-init-point' });

        render(
            <PaymentProvider>
                <Donations />
            </PaymentProvider>
        );

        // Simular un click en un botón de donación
        const donationButton = screen.getByRole('button', { name: /Donar/i });
        donationButton[0].click();

        // Verificar que _postPayment se haya llamado correctamente
        expect(_postPaymentMock).toHaveBeenCalledWith(expect.any(Number), expect.any(String));
    });

    it('redirects to payment page when _postPayment resolves', async () => {
        const _postPaymentMock = vi.fn();
        _postPaymentMock.mockResolvedValue({ init_point: 'test-init-point' });

        render(
            <PaymentProvider>
                <Donations />
            </PaymentProvider>
        );

        // Simular un click en un botón de donación
        const donationButton = screen.getByRole('button', { name: /Donar/i });
        donationButton.click();

        // Esperar a que se resuelva _postPayment
        await expect(_postPaymentMock).resolves.toBeDefined();

        // Verificar que se redirige a la URL de pago
        expect(window.location.href).toEqual('test-init-point');
    });
});
