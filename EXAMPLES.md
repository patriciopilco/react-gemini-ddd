# Ejemplos de Casos de Uso

Este documento contiene ejemplos de casos de uso que puedes usar con la aplicación para generar arquitecturas DDD.

## 📦 Ejemplo 1: Sistema de E-Commerce

### Casos de Uso:

**Gestión de Usuarios:**
- Un usuario puede registrarse en el sistema con email y contraseña
- Un usuario puede iniciar sesión en el sistema
- Un usuario puede actualizar su perfil (nombre, dirección, teléfono)
- Un usuario puede restablecer su contraseña

**Catálogo de Productos:**
- Un administrador puede agregar nuevos productos al catálogo
- Un administrador puede actualizar información de productos
- Un cliente puede buscar productos por categoría, nombre o precio
- Un cliente puede ver detalles de un producto

**Carrito de Compras:**
- Un cliente puede agregar productos a su carrito
- Un cliente puede actualizar cantidades en el carrito
- Un cliente puede eliminar productos del carrito
- El sistema calcula el total del carrito incluyendo impuestos

**Procesamiento de Pedidos:**
- Un cliente puede crear un pedido a partir de su carrito
- El sistema valida disponibilidad de inventario
- Un cliente puede seleccionar método de envío
- Un cliente puede aplicar cupones de descuento
- El sistema genera un número de pedido único

**Gestión de Pagos:**
- Un cliente puede pagar con tarjeta de crédito
- El sistema procesa pagos a través de pasarela de pago
- El sistema envía confirmación de pago por email
- Un cliente puede ver historial de pagos

**Inventario:**
- El sistema actualiza inventario automáticamente al crear pedido
- Un administrador puede agregar stock a productos
- El sistema notifica cuando productos tienen bajo inventario
- Un administrador puede ver reportes de inventario

**Envíos:**
- El sistema genera etiquetas de envío
- Un administrador puede actualizar estado de envío
- Un cliente puede rastrear su pedido
- El sistema notifica al cliente sobre cambios en el envío

---

## 🏥 Ejemplo 2: Sistema de Gestión Hospitalaria

### Casos de Uso:

**Gestión de Pacientes:**
- Un paciente puede registrarse con sus datos personales y médicos
- Un administrativo puede actualizar información del paciente
- El sistema asigna un número de historia clínica único
- Un médico puede ver el historial médico del paciente

**Citas Médicas:**
- Un paciente puede solicitar una cita con un especialista
- El sistema verifica disponibilidad de horarios
- Un administrativo puede confirmar o rechazar citas
- El sistema envía recordatorios de citas por SMS y email
- Un paciente puede cancelar o reprogramar su cita

**Consultas Médicas:**
- Un médico puede registrar diagnóstico durante la consulta
- Un médico puede prescribir medicamentos
- Un médico puede solicitar exámenes de laboratorio
- El sistema registra signos vitales del paciente
- Un médico puede referir al paciente a un especialista

**Gestión de Medicamentos:**
- Una enfermera puede registrar administración de medicamentos
- El sistema verifica alergias del paciente antes de administrar
- La farmacia puede ver recetas pendientes
- El sistema notifica interacciones medicamentosas peligrosas

**Laboratorio:**
- Un técnico puede registrar resultados de exámenes
- Un médico puede ver resultados de laboratorio
- El sistema notifica resultados críticos automáticamente
- Un paciente puede acceder a sus resultados por portal web

**Facturación:**
- El sistema genera factura automática después de cada consulta
- Un administrativo puede aplicar seguros médicos
- Un paciente puede ver y pagar sus facturas pendientes
- El sistema genera reportes financieros mensuales

---

## 🎓 Ejemplo 3: Sistema de Gestión Universitaria

### Casos de Uso:

**Gestión de Estudiantes:**
- Un estudiante puede registrarse al sistema
- Un estudiante puede actualizar su información personal
- El sistema asigna un código de estudiante único
- Un estudiante puede ver su expediente académico

**Inscripción de Cursos:**
- Un estudiante puede ver catálogo de cursos disponibles
- Un estudiante puede inscribirse en cursos
- El sistema valida prerrequisitos antes de inscripción
- El sistema verifica límite de créditos por semestre
- Un estudiante puede retirarse de un curso

**Gestión de Cursos:**
- Un profesor puede crear contenido del curso
- Un profesor puede publicar horarios de clases
- Un profesor puede establecer criterios de evaluación
- Un coordinador puede asignar profesores a cursos

**Evaluaciones:**
- Un profesor puede crear exámenes y tareas
- Un profesor puede registrar calificaciones
- El sistema calcula promedios automáticamente
- Un estudiante puede ver sus calificaciones
- El sistema notifica calificaciones por email

**Biblioteca:**
- Un estudiante puede buscar libros en el catálogo
- Un estudiante puede reservar libros
- El sistema registra préstamos de libros
- El sistema envía recordatorios de devolución
- Un bibliotecario puede gestionar inventario de libros

**Pagos y Finanzas:**
- Un estudiante puede ver sus cuotas pendientes
- Un estudiante puede pagar matrícula y cuotas online
- El sistema genera recibos de pago
- El sistema aplica becas y descuentos automáticamente

---

## 🏦 Ejemplo 4: Sistema Bancario

### Casos de Uso:

**Gestión de Clientes:**
- Un cliente puede abrir una cuenta bancaria
- El sistema valida identidad del cliente
- Un cliente puede actualizar información de contacto
- El sistema asigna número de cuenta único

**Cuentas Bancarias:**
- Un cliente puede ver saldo de su cuenta
- Un cliente puede ver historial de transacciones
- El sistema genera estados de cuenta mensuales
- Un cliente puede descargar certificados bancarios

**Transferencias:**
- Un cliente puede transferir dinero a otra cuenta
- El sistema valida fondos disponibles
- Un cliente puede programar transferencias recurrentes
- El sistema notifica transferencias exitosas
- Un cliente puede transferir a cuentas de otros bancos

**Tarjetas:**
- Un cliente puede solicitar tarjeta de débito/crédito
- Un cliente puede bloquear/desbloquear tarjeta
- El sistema procesa pagos con tarjeta
- Un cliente puede ver movimientos de tarjeta
- El sistema detecta transacciones sospechosas

**Préstamos:**
- Un cliente puede solicitar un préstamo
- El sistema evalúa capacidad crediticia
- Un oficial de crédito puede aprobar/rechazar préstamos
- El sistema calcula cuotas de pago
- Un cliente puede pagar cuotas de préstamo

**Notificaciones:**
- El sistema envía alertas de transacciones por SMS
- El sistema notifica pagos vencidos
- Un cliente puede configurar límites de alerta
- El sistema envía notificaciones de seguridad

---

## 💡 Tips para Escribir Buenos Casos de Uso

1. **Sé específico:** Describe claramente qué hace cada actor
2. **Incluye validaciones:** Menciona reglas de negocio importantes
3. **Define actores:** Usuario, Administrador, Cliente, etc.
4. **Describe flujos:** Qué pasa después de cada acción
5. **Menciona integraciones:** Pagos externos, emails, SMS, etc.
6. **Incluye restricciones:** Límites, validaciones, permisos
7. **Considera excepciones:** Qué pasa cuando algo falla

## 📝 Formato Recomendado

```
**Módulo/Área:**
- [Actor] puede [acción] [objeto] [condiciones opcionales]
- El sistema [acción automática]
- [Actor] puede ver/actualizar/eliminar [información]
```

---

¡Usa estos ejemplos como inspiración para tus propios casos de uso!
