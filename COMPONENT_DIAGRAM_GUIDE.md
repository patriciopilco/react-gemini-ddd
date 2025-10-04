# Guía del Diagrama de Componentes

## ¿Qué es un Diagrama de Componentes?

El diagrama de componentes es una representación visual de la arquitectura técnica de tu sistema, organizada en capas según los principios de arquitectura limpia y DDD.

## Capas de la Arquitectura

### 🖥️ Capa de Presentación
**Propósito**: Gestionar la interfaz de usuario y las interacciones con el usuario.

**Componentes típicos**:
- **Controllers**: Manejan las peticiones HTTP y las respuestas
- **Views**: Plantillas y componentes de interfaz
- **DTOs (Data Transfer Objects)**: Objetos para transferir datos entre capas
- **Validators**: Validación de entrada del usuario

**Ejemplo**:
```
ProductController
├── Responsabilidades:
│   ├── Recibir peticiones HTTP
│   ├── Validar entrada del usuario
│   └── Retornar respuestas formateadas
└── Dependencias:
    ├── ProductApplicationService
    └── ProductValidator
```

### ⚙️ Capa de Aplicación
**Propósito**: Orquestar el flujo de trabajo y coordinar las operaciones entre diferentes componentes del dominio.

**Componentes típicos**:
- **Application Services**: Coordinan casos de uso
- **Command Handlers**: Procesan comandos
- **Query Handlers**: Procesan consultas
- **Event Handlers**: Manejan eventos de dominio

**Ejemplo**:
```
CreateOrderApplicationService
├── Responsabilidades:
│   ├── Coordinar creación de pedido
│   ├── Validar reglas de negocio
│   ├── Publicar eventos de dominio
│   └── Gestionar transacciones
└── Dependencias:
    ├── OrderRepository
    ├── InventoryDomainService
    └── PaymentGateway
```

### 🏛️ Capa de Dominio
**Propósito**: Contener la lógica de negocio central y las reglas del dominio.

**Componentes típicos**:
- **Aggregates**: Agrupaciones de entidades relacionadas
- **Entities**: Objetos con identidad única
- **Value Objects**: Objetos inmutables sin identidad
- **Domain Services**: Servicios con lógica de dominio compleja
- **Domain Events**: Eventos que representan cambios en el dominio
- **Specifications**: Reglas de negocio reutilizables

**Ejemplo**:
```
Order (Aggregate Root)
├── Responsabilidades:
│   ├── Validar total del pedido
│   ├── Aplicar descuentos
│   ├── Calcular impuestos
│   └── Gestionar estado del pedido
└── Dependencias:
    ├── OrderLine (Entity)
    ├── Money (Value Object)
    └── OrderStatus (Value Object)
```

### 🗄️ Capa de Infraestructura
**Propósito**: Proporcionar implementaciones técnicas y acceso a recursos externos.

**Componentes típicos**:
- **Repositories**: Persistencia y recuperación de agregados
- **External APIs**: Integración con servicios externos
- **Database Context**: Acceso a base de datos
- **Message Queues**: Sistemas de mensajería
- **Email Services**: Servicios de correo
- **File Storage**: Almacenamiento de archivos

**Ejemplo**:
```
OrderRepository
├── Responsabilidades:
│   ├── Persistir agregados de Order
│   ├── Recuperar agregados por ID
│   ├── Consultar pedidos por filtros
│   └── Mapear entre dominio y persistencia
└── Dependencias:
    ├── DatabaseContext
    └── OrderMapper
```

## Flujo de Dependencias

En una arquitectura limpia, las dependencias fluyen hacia adentro:

```
Presentación → Aplicación → Dominio ← Infraestructura
```

**Reglas importantes**:
1. La capa de Dominio NO debe depender de ninguna otra capa
2. La capa de Aplicación solo depende del Dominio
3. La capa de Presentación depende de Aplicación (no directamente de Dominio)
4. La capa de Infraestructura implementa interfaces definidas en el Dominio

## Patrones Comunes

### Dependency Inversion
Las capas superiores dependen de abstracciones (interfaces) definidas en capas inferiores:

```
Application Layer:
  CreateOrderService → IOrderRepository (interface)
  
Infrastructure Layer:
  SqlOrderRepository implements IOrderRepository
```

### Separation of Concerns
Cada componente tiene una responsabilidad única y bien definida:

```
UserController:
  - Solo maneja HTTP
  - No contiene lógica de negocio
  - Delega a Application Services

UserApplicationService:
  - Coordina operaciones
  - No conoce HTTP
  - Usa servicios de dominio

UserDomainService:
  - Lógica de negocio pura
  - No conoce persistencia
  - No conoce HTTP
```

## Ejemplo Completo: Sistema de Pedidos

### Capa de Presentación
```
OrderController
├── Responsabilidades:
│   ├── POST /orders - Crear nuevo pedido
│   ├── GET /orders/{id} - Obtener pedido
│   └── PUT /orders/{id}/status - Actualizar estado
└── Dependencias:
    └── CreateOrderApplicationService
    └── GetOrderApplicationService
    └── UpdateOrderStatusApplicationService
```

### Capa de Aplicación
```
CreateOrderApplicationService
├── Responsabilidades:
│   ├── Validar datos del pedido
│   ├── Verificar disponibilidad de inventario
│   ├── Crear agregado Order
│   ├── Procesar pago
│   └── Publicar OrderCreatedEvent
└── Dependencias:
    ├── IOrderRepository
    ├── IInventoryService
    ├── IPaymentGateway
    └── IEventPublisher
```

### Capa de Dominio
```
Order (Aggregate)
├── Responsabilidades:
│   ├── Validar reglas de negocio
│   ├── Calcular totales
│   ├── Aplicar descuentos
│   └── Gestionar estado del ciclo de vida
└── Componentes internos:
    ├── OrderId (Value Object)
    ├── OrderLine (Entity)
    ├── Money (Value Object)
    └── OrderStatus (Value Object)

PricingDomainService
├── Responsabilidades:
│   ├── Calcular precio con descuentos
│   ├── Aplicar reglas de promociones
│   └── Calcular impuestos
└── Dependencias:
    └── PromotionPolicy (Domain Model)
```

### Capa de Infraestructura
```
SqlOrderRepository
├── Responsabilidades:
│   ├── Persistir en SQL Server
│   ├── Mapear dominio a tablas
│   └── Ejecutar consultas optimizadas
└── Dependencias:
    └── DbContext

StripePaymentGateway
├── Responsabilidades:
│   ├── Integrar con Stripe API
│   ├── Procesar pagos
│   └── Manejar webhooks
└── Dependencias:
    └── StripeClient
```

## Beneficios del Diagrama de Componentes

1. **Claridad**: Visualiza cómo se organiza el código
2. **Mantenibilidad**: Identifica responsabilidades claras
3. **Escalabilidad**: Facilita agregar nuevas funcionalidades
4. **Testabilidad**: Componentes desacoplados son más fáciles de probar
5. **Comunicación**: Facilita discusiones técnicas en el equipo
6. **Onboarding**: Ayuda a nuevos desarrolladores a entender el sistema

## Buenas Prácticas

1. **Un componente, una responsabilidad**: Cada componente debe tener un propósito claro
2. **Dependencias mínimas**: Reduce el acoplamiento entre componentes
3. **Interfaces sobre implementaciones**: Usa abstracciones para mayor flexibilidad
4. **Nombramiento consistente**: Usa convenciones claras (Controller, Service, Repository)
5. **Documentación**: Describe responsabilidades y dependencias claramente
6. **Testing**: Cada componente debe ser testeable de forma aislada

## Relación con Bounded Contexts

Cada Bounded Context puede tener su propia arquitectura de componentes:

```
Order Context:
  ├── Presentation: OrderController
  ├── Application: OrderApplicationService
  ├── Domain: Order Aggregate
  └── Infrastructure: OrderRepository

Inventory Context:
  ├── Presentation: InventoryController
  ├── Application: InventoryApplicationService
  ├── Domain: Product Aggregate
  └── Infrastructure: ProductRepository
```

Los contextos se comunican a través de:
- **APIs REST**: Controllers exponen endpoints
- **Message Queues**: Events publicados entre contextos
- **Shared Kernel**: Código compartido (con cuidado)

## Conclusión

El diagrama de componentes es esencial para:
- Entender la estructura técnica del sistema
- Planificar la implementación
- Identificar dependencias y puntos de integración
- Asegurar una arquitectura limpia y mantenible
- Facilitar la evolución del sistema

Úsalo junto con los otros diagramas de DDD (Bounded Contexts, Context Maps, Agregados) para tener una visión completa de tu arquitectura.
