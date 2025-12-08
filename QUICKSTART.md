# 🚀 Guía Rápida - Primeros Pasos

## ⚡ Instalación en 5 Minutos

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/patriciopilco/react-gemini-ddd.git
cd react-gemini-ddd
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

Edita `.env` y agrega tus claves:
```env
REACT_APP_GEMINI_API_KEY=your-key-here
REACT_APP_CLAUDE_API_KEY=your-key-here
```

### 4️⃣ Obtener las Claves de API

#### Google Gemini
1. Ve a https://ai.google.dev/
2. Click en "Get API Key"
3. Crea nuevo proyecto o usa existente
4. Copia la clave y pégala en `.env`

#### Anthropic Claude
1. Ve a https://console.anthropic.com/
2. Login/Signup
3. Ve a "API Keys"
4. Create new key
5. Copia la clave y pégala en `.env`

### 5️⃣ Iniciar la Aplicación
```bash
npm start
```

Abre http://localhost:3000 en tu navegador

---

## 🎯 Uso Básico

### Primera Vez: Aprende con Chat
1. Haz click en **💬 Asistente Conversacional**
2. Escribe una pregunta, ej: "¿Qué es un Bounded Context?"
3. Lee la respuesta del experto
4. Haz más preguntas para explorar DDD
5. Descarga conversación como referencia

### Segunda Vez: Analiza tu Sistema
1. Haz click en **📊 Análisis Estructurado**
2. Describe tus casos de uso:
   ```
   - Un usuario puede registrarse
   - Un cliente puede crear órdenes
   - El sistema procesa pagos
   - Un admin gestiona productos
   ```
3. Haz click en "Generar Arquitectura DDD"
4. Espera 3-5 segundos
5. Visualiza los diagramas C4 y resultados

### Tercera Vez: Valida y Refina
1. Vuelve a **💬 Conversacional**
2. Pregunta sobre lo generado:
   ```
   "¿Es correcto este agregado Order?
    ¿Cuáles serían las invariantes?"
   ```
3. Refina tus ideas
4. Vuelve a **📊 Análisis** si necesitas regenerar

---

## 💡 Ejemplos de Prompts

### Para Análisis Estructurado
**Pegmatario completamente especificado:**
```
- Sistema de blog: usuarios publican posts, dejan comentarios
- Posts tienen títulos, contenido, fecha de creación
- Comentarios vinculados a posts, con texto y autor
- Usuarios pueden tener roles (admin, moderador, lector)
- Posts se pueden categorizar
- Sistema de notificaciones para nuevos comentarios
```

**Resultado esperado**: 
✅ 3-4 Bounded Contexts  
✅ 7-10 Agregados  
✅ 3 diagramas C4  
✅ Scaffolds de microservicios  

---

### Para Asistente Conversacional
**Buenas preguntas:**
```
1. "¿Cuál es la diferencia entre Agregado y Entidad?"
2. "¿Cómo defino los límites de un Bounded Context?"
3. "¿Qué son los Value Objects y cuándo usarlos?"
4. "¿Cuáles son los patrones de integración entre contextos?"
5. "Dame un ejemplo de una Invariante bien definida"
```

**Características de buen resultado:**
✅ Respuesta educativa  
✅ Ejemplos prácticos  
✅ Referencias a DDD  
✅ Plantillas disponibles  

---

## 📊 Comparativa Rápida

```
¿QUIÉN SOY?           → ¿QUÉ HAGO PRIMERO?

Principiante en DDD   → 💬 Conversacional
                        (Aprende 30 min)
                        ↓
                        📊 Análisis
                        (Genera arquitectura)

Arquitecto            → 📊 Análisis
                        (Genera rápido)
                        ↓
                        💬 Conversacional
                        (Valida decisiones)

Product Owner         → 💬 Conversacional
                        (Explora opciones)
                        ↓
                        📊 Análisis
                        (Presenta resultados)

Team Lead             → Ambos
                        (Enseña y guía)
```

---

## 🎓 Tutorial Paso a Paso

### Escenario: Diseñar un Sistema de Reservas

#### PASO 1: Explorar (5 min)
```
💬 Chat: "¿Cómo sería un sistema de reservas hoteleras en DDD?"

Aprenderás:
• Bounded Contexts (Reservas, Pagos, Inventario)
• Agregados (Reserva, Huésped, Propiedad)
• Patrones de integración
```

#### PASO 2: Generar (5 min)
```
📊 Análisis:

Describe:
- Huéspedes pueden buscar y reservar habitaciones
- Sistema maneja múltiples propiedades
- Pagos se procesan al confirmar reserva
- Admin gestiona disponibilidad de habitaciones
- Notificaciones por email de confirmación

Resultado:
✅ Arquitectura DDD completa
✅ 4-5 Bounded Contexts
✅ Diagramas C4
✅ Scaffolds de servicios
```

#### PASO 3: Refinar (5 min)
```
💬 Chat:

Preguntas:
- "¿Cuáles son las invariantes del agregado Reserva?"
- "¿Qué Ubiquitous Language usamos?"
- "¿Cómo integramos el contexto de Pagos?"

Resultado:
✅ Definiciones claras
✅ Plantillas descargables
✅ Documento para el equipo
```

---

## 🐛 Solución de Problemas

### ❌ "No funciona el análisis"
```
✓ Verifica que REACT_APP_GEMINI_API_KEY esté en .env
✓ Asegúrate que la clave sea válida
✓ Reinicia con: npm start
✓ Revisa console (F12) para errores específicos
```

### ❌ "No funciona el chat"
```
✓ Verifica que REACT_APP_CLAUDE_API_KEY esté en .env
✓ Asegúrate que la clave sea válida
✓ Claude requiere de 2-4 segundos de respuesta
✓ Revisa console para errores de API
```

### ❌ "Las respuestas son inconsistentes"
```
✓ En Análisis: Normal, recarga para nueva arquitectura
✓ En Chat: Normal, es creativo
✓ En Chat: Intenta con prompt más específico
```

### ❌ "Demasiado lento"
```
✓ Análisis: Reduce complejidad de entrada
✓ Chat: Es normal 2-4 segundos de espera
✓ Ambas: Verifica conexión a internet
```

---

## 🔧 Configuración Avanzada

### Customizar System Prompts
**Análisis**: Edita `src/App.js` línea ~70 (prompt variable)

**Conversacional**: Edita `src/components/ArquitectoDDDAgent.js` línea ~20 (systemPrompt variable)

### Agregar Plantillas Nuevas
En `ArquitectoDDDAgent.js`, agrega a array `templates`:
```javascript
{
  title: 'Mi Plantilla',
  content: `# Contenido aquí...`
}
```

### Personalizar Prompts Sugeridos
En `ArquitectoDDDAgent.js`, edita array `prompts`:
```javascript
const prompts = [
  "Tu prompt aquí",
  // ...
];
```

---

## 📚 Documentación Disponible

Después de instalar, revisa estos archivos:

```
📄 README.md
   → Descripción general del proyecto

📄 HYBRID_ARCHITECTURE.md
   → Cómo funciona el enfoque híbrido

📄 TECHNICAL_COMPARISON.md
   → Análisis técnico profundo

📄 IMPLEMENTATION_SUMMARY.md
   → Cambios realizados en v2.0

📄 VISUAL_SUMMARY.md
   → Resumen visual de mejoras

📄 DDD_PATTERNS_GUIDE.md
   → Patrones DDD explicados

📄 C4_DIAGRAMS_GUIDE.md
   → Cómo leer diagramas C4
```

---

## 🚀 Próximos Pasos

1. **Instala** según instrucciones arriba
2. **Explora** ambos modos
3. **Aprende** con el chat conversacional
4. **Crea** una arquitectura de prueba
5. **Comparte** feedback y sugerencias

---

## 💬 Preguntas Frecuentes

### P: ¿Necesito ambas claves de API?
**R**: No obligatoriamente. Puedes usar solo una:
- Solo Gemini: Solo Análisis disponible
- Solo Claude: Solo Chat disponible
- Ambas: Funcionalidad completa ✅

### P: ¿Cuánto cuesta?
**R**: Depende de uso:
- Gemini: ~$0.075 por 1000 solicitudes
- Claude: ~$3.00 por 1000 solicitudes
- Ver `TECHNICAL_COMPARISON.md` para detalles

### P: ¿Puedo guardar mis resultados?
**R**: 
- Análisis: Exporta JSON
- Chat: Descarga como Markdown
- Próxima versión: Guardado automático

### P: ¿Funciona offline?
**R**: No. Requiere conexión a internet (APIs externas)

### P: ¿Puedo usar otro modelo de IA?
**R**: En futuro sí. Actualmente solo Gemini + Claude

---

## ✅ Checklist Instalación

```
□ Clonar repo
□ npm install
□ cp .env.example .env
□ Obtener Gemini API key
□ Obtener Claude API key
□ Actualizar .env con claves
□ npm start
□ Verificar http://localhost:3000
□ Seleccionar modo de prueba
□ Probar Análisis
□ Probar Chat
□ Leer documentación
```

---

## 🎉 ¡Estás Listo!

Ahora puedes:
- ✅ Diseñar arquitecturas DDD
- ✅ Aprender Domain-Driven Design
- ✅ Visualizar sistemas complejos
- ✅ Explorar patrones tácticos
- ✅ Documentar decisiones

**¡Que disfrutes usando DDD Xpert!** 🏛️

---

**¿Tienes problemas?**
- 📝 Abre un issue en GitHub
- 💬 Usa el Chat para preguntas sobre DDD
- 📊 Usa Análisis para validar arquitectura

**¿Sugerencias de mejora?**
- 🌟 Star el repositorio
- 🔀 Contribuye con PR
- 💭 Feedback bienvenido

---

**Última actualización**: Diciembre 2024
**Versión**: 2.0.0
