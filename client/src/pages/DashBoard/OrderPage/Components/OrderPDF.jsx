import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

// Define la fuente a utilizar (opcional)
Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        fontFamily: 'Roboto',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginBottom: 10,
        border: '1px solid black',
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableCell: {
        margin: 'auto',
        padding: 5,
        fontSize: 10,
    },
});

const OrderPDF = ({ orders }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Lista de Órdenes</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Producto</Text>
                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Precio</Text>
                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Nombre de usuario</Text>
                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Correo electrónico</Text>
                        <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Teléfono</Text>
                    </View>
                    {orders.map((order, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{index}.</Text>
                            <Text style={styles.tableCell}>{order.product_name}</Text>
                            <Text style={styles.tableCell}>{order.product_price}</Text>
                            <Text style={styles.tableCell}>{order.user_name}</Text>
                            <Text style={styles.tableCell}>{order.user_email}</Text>
                            <Text style={styles.tableCell}>{order.user_phone}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default OrderPDF;