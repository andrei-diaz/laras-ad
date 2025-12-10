# Sistema de Pedidos para Recoger - PENDIENTE

## Configuración decidida
- **Pasarela de pagos:** MercadoPago
- **Notificaciones:** Email solamente
- **País:** México (MXN)

---

## Backend - Nuevas entidades

### Customer (cliente)
- id, email, password, nombre, teléfono
- emailVerified, createdAt
- órdenes (relación)

### Order (pedido)
- id, orderNumber, customer
- items[], subtotal, total
- status (PENDING → PAID → PREPARING → READY → COMPLETED)
- pickupTime, paymentId
- createdAt

### OrderItem (item del pedido)
- id, order, dish
- quantity, unitPrice, subtotal
- notes (instrucciones especiales)

---

## Backend - Nuevos endpoints

```
/api/customer/auth
├── POST /register
├── POST /login
├── POST /forgot-password
└── GET  /me

/api/customer/profile
├── GET  /
├── PUT  /
└── PUT  /password

/api/customer/orders
├── GET  /
├── GET  /{id}
└── POST /

/api/payments
├── POST /create-preference
└── POST /webhook

/api/admin/orders
├── GET  /
├── GET  /pending
└── PATCH /{id}/status
```

---

## Frontend - Nuevas páginas

```
/registro
/login
/menu (con carrito)
/checkout
/mi-cuenta/perfil
/mi-cuenta/pedidos
/mi-cuenta/pedidos/{id}
/mi-cuenta/configuracion
/admin/pedidos (cola)
```

---

## Orden de implementación
1. Auth de clientes (registro/login)
2. Carrito y creación de pedidos
3. Integración MercadoPago
4. Panel del cliente
5. Cola de pedidos (admin)
6. Notificaciones por email
