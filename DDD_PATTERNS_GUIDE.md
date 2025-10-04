# Guía de Patrones DDD (Domain-Driven Design)

## 📘 Conceptos Fundamentales

### 1. Bounded Context (Contexto Delimitado)

Un **Bounded Context** es un límite explícito dentro del cual un modelo de dominio particular es válido y aplicable. Cada Bounded Context tiene su propio lenguaje ubicuo y modelo.

**Características:**
- Define límites claros de responsabilidad
- Contiene un modelo de dominio coherente
- Tiene su propio lenguaje ubicuo
- Puede implementarse como un microservicio

**Ejemplo:**
En un sistema de e-commerce:
- Contexto de **Catálogo**: gestiona productos, categorías, inventario
- Contexto de **Ventas**: gestiona pedidos, carritos, checkout
- Contexto de **Facturación**: gestiona facturas, pagos, impuestos

### 2. Aggregate (Agregado)

Un **Aggregate** es un cluster de objetos de dominio (entidades y value objects) que se tratan como una unidad para propósitos de cambios de datos.

**Características:**
- Tiene una entidad raíz (Aggregate Root)
- Garantiza la consistencia de los datos
- Define límites transaccionales
- Solo se accede externamente a través de la raíz

**Componentes:**
- **Root Entity**: Punto de entrada del agregado
- **Entities**: Objetos con identidad única
- **Value Objects**: Objetos inmutables sin identidad
- **Repository**: Persiste y recupera el agregado completo

### 3. Entity (Entidad)

Una **Entity** es un objeto que tiene identidad única y continuidad a través del tiempo.

**Características:**
- Tiene un identificador único (ID)
- Puede cambiar sus atributos sin perder identidad
- Se compara por identidad, no por atributos

**Ejemplo:**
```javascript
// Usuario es una Entity porque tiene ID único
class Usuario {
    constructor(id, nombre, email) {
        this.id = id;           // Identidad única
        this.nombre = nombre;
        this.email = email;
    }
}
```

### 4. Value Object (Objeto de Valor)

Un **Value Object** es un objeto inmutable que describe características pero no tiene identidad conceptual.

**Características:**
- Inmutable (no cambia después de crearse)
- No tiene ID único
- Se compara por valor, no por identidad
- Puede ser reemplazado, no modificado

**Ejemplo:**
```javascript
// Dirección es un Value Object
class Direccion {
    constructor(calle, ciudad, codigoPostal) {
        this.calle = calle;
        this.ciudad = ciudad;
        this.codigoPostal = codigoPostal;
        Object.freeze(this); // Inmutable
    }
}
```

### 5. Repository (Repositorio)

Un **Repository** es un mecanismo para encapsular el almacenamiento, recuperación y búsqueda de agregados.

**Características:**
- Abstrae la persistencia de datos
- Trabaja con agregados completos
- Proporciona una interfaz de colección
- Separa la lógica de dominio de la infraestructura

**Ejemplo:**
```javascript
class PedidoRepository {
    async save(pedido) { /* ... */ }
    async findById(id) { /* ... */ }
    async findByCliente(clienteId) { /* ... */ }
    async delete(pedido) { /* ... */ }
}
```

## 🗺️ Patrones de Context Maps

Los **Context Maps** documentan las relaciones entre Bounded Contexts y ayudan a definir estrategias de integración.

### 1. Shared Kernel (Kernel Compartido) 🤝

**Descripción:** Dos contextos comparten un subconjunto común del modelo de dominio y código.

**Cuándo usar:**
- Equipos muy coordinados
- Modelo común bien definido
- Cambios frecuentes en ambos contextos

**Ventajas:** Menor duplicación de código
**Desventajas:** Alto acoplamiento, requiere coordinación

**Ejemplo:**
```
[Contexto Ventas] ←→ [Modelo Cliente Compartido] ←→ [Contexto Marketing]
```

### 2. Customer-Supplier (Cliente-Proveedor) 👥

**Descripción:** El contexto upstream (proveedor) define la API y el downstream (cliente) la consume.

**Cuándo usar:**
- Relación clara de dependencia
- El upstream tiene prioridad
- Se requiere planificación conjunta

**Ventajas:** Comunicación clara, responsabilidades definidas
**Desventajas:** El downstream depende del upstream

**Ejemplo:**
```
[Contexto Inventario] (Supplier) → [Contexto Ventas] (Customer)
```

### 3. Conformist (Conformista) 🙇

**Descripción:** El downstream acepta completamente el modelo del upstream sin traducción.

**Cuándo usar:**
- No hay poder de negociación con el upstream
- El modelo upstream es suficientemente bueno
- Recursos limitados para adaptación

**Ventajas:** Simplicidad, bajo esfuerzo
**Desventajas:** Acoplamiento fuerte, pérdida de autonomía

**Ejemplo:**
```
[Sistema Externo] → [Nuestro Contexto] (acepta modelo tal cual)
```

### 4. Anticorruption Layer (Capa Anticorrupción) 🛡️

**Descripción:** Una capa de traducción protege el modelo downstream de conceptos del upstream.

**Cuándo usar:**
- El modelo upstream no se ajusta bien
- Sistemas legacy
- Necesidad de proteger el modelo propio

**Ventajas:** Autonomía, protección del modelo
**Desventajas:** Complejidad adicional, sobrecarga

**Ejemplo:**
```
[Sistema Legacy] → [ACL: Traducción] → [Nuestro Contexto Moderno]
```

### 5. Open Host Service (Servicio de Host Abierto) 🌐

**Descripción:** Define un protocolo o interfaz que da acceso al contexto como un conjunto de servicios.

**Cuándo usar:**
- Múltiples consumidores
- API pública
- Integración estandarizada

**Ventajas:** Reusabilidad, estandarización
**Desventajas:** Requiere mantenimiento de API

**Ejemplo:**
```
[Contexto Pagos] → [REST API Pública] → [Múltiples Clientes]
```

### 6. Published Language (Lenguaje Publicado) 📝

**Descripción:** Un lenguaje bien documentado y compartido para la integración (JSON Schema, XML Schema, etc.).

**Cuándo usar:**
- Integración con múltiples sistemas
- Necesidad de documentación formal
- Estándares de la industria

**Ventajas:** Claridad, interoperabilidad
**Desventajas:** Rigidez, versioning complejo

**Ejemplo:**
```
[Contexto A] ←→ [JSON Schema Publicado] ←→ [Contexto B]
```

### 7. Separate Ways (Caminos Separados) ↔️

**Descripción:** No hay conexión entre los contextos; cada uno resuelve sus problemas independientemente.

**Cuándo usar:**
- Funcionalidades completamente independientes
- Costo de integración muy alto
- Duplicación aceptable

**Ventajas:** Independencia total
**Desventajas:** Posible duplicación

**Ejemplo:**
```
[Contexto Reportes] ⟷ [Contexto Notificaciones]
(Sin integración)
```

### 8. Partnership (Asociación) 🤜🤛

**Descripción:** Dos contextos trabajan juntos para alcanzar un objetivo común con desarrollo coordinado.

**Cuándo usar:**
- Equipos en la misma organización
- Objetivos compartidos
- Comunicación frecuente posible

**Ventajas:** Colaboración estrecha, evolución conjunta
**Desventajas:** Requiere coordinación continua

**Ejemplo:**
```
[Contexto Pedidos] ←→ [Contexto Envíos]
(Desarrollo coordinado)
```

## 🎯 Mejores Prácticas

### Para Bounded Contexts:
1. Mantén los contextos pequeños y enfocados
2. Define límites claros de responsabilidad
3. Usa un lenguaje ubicuo consistente
4. Evita dependencias circulares

### Para Agregados:
1. Mantén los agregados pequeños
2. Referencia otros agregados solo por ID
3. Usa consistencia eventual entre agregados
4. La raíz del agregado debe ser el único punto de entrada

### Para Entities y Value Objects:
1. Usa Value Objects siempre que sea posible
2. Haz los Value Objects inmutables
3. Las Entities deben tener validación en su constructor
4. Implementa métodos de negocio en las entidades, no solo getters/setters

### Para Repositories:
1. Un repositorio por agregado raíz
2. Abstrae completamente la persistencia
3. Devuelve objetos de dominio completamente hidratados
4. No expongas detalles de la base de datos

### Para Context Maps:
1. Documenta todas las relaciones entre contextos
2. Revisa y actualiza regularmente
3. Considera el costo de cada patrón de integración
4. Usa múltiples patrones según necesidades

## 📚 Recursos Adicionales

- **Libro:** "Domain-Driven Design" por Eric Evans
- **Libro:** "Implementing Domain-Driven Design" por Vaughn Vernon
- **Web:** https://domainlanguage.com/
- **Comunidad:** DDD Community

---

Esta guía te ayudará a comprender mejor los patrones y conceptos generados por la aplicación.
