# 🏛️ DDD Xpert - Enfoque Híbrido

## 📋 Resumen

DDD Xpert ahora combina **dos modos complementarios** para ayudarte a dominar Domain-Driven Design:

### 1. 📊 **Análisis Estructurado** (Original)
- Análisis profundo y estructurado de arquitecturas DDD
- Genera JSON validado con esquema fijo
- Visualiza diagramas C4 (Contexto, Contenedor, Componentes)
- Muestra agregados, entidades y value objects interactivamente
- Genera scaffolds de microservicios automáticamente
- **Ideal para**: Análisis técnicos rigurosos, documentación precisa

### 2. 💬 **Asistente Conversacional** (Nuevo)
- Chat interactivo con experto en DDD
- Conversación natural y flexible
- Plantillas descargables (Bounded Context, Agregado, Context Map)
- Exporta conversaciones completas como Markdown
- Sistema de prompts sugeridos
- **Ideal para**: Aprendizaje, exploración, diseño iterativo

---

## 🎯 Ventajas del Enfoque Híbrido

| Necesidad | Mejor Opción | Razón |
|-----------|-------------|-------|
| Análisis técnico riguroso | 📊 Análisis Estructurado | JSON validado, esquema fijo |
| Aprender DDD | 💬 Conversacional | Chat educativo, flexible |
| Documentación precisa | 📊 Análisis Estructurado | Resultados consistentes |
| Exploración creativa | 💬 Conversacional | Sin limitaciones de schema |
| Visualizar arquitectura | 📊 Análisis Estructurado | Diagramas C4 interactivos |
| Iterar rápidamente | 💬 Conversacional | Feedback inmediato |

---

## 🚀 Cómo Usar

### Modo 📊 Análisis Estructurado
1. Selecciona **Análisis Estructurado** en el selector superior
2. Describe tus casos de uso
3. Recibe análisis DDD completo con:
   - Bounded Contexts
   - Agregados y sus entidades
   - Context Maps
   - Diagramas de componentes
   - Scaffolds de microservicios

### Modo 💬 Conversacional
1. Selecciona **Asistente Conversacional** en el selector superior
2. Inicia conversación con el agente DDD
3. Explora temas como:
   - Identificación de subdominios
   - Diseño de bounded contexts
   - Modelado de agregados
   - Patrones de integración
4. Descarga conversación o plantillas en cualquier momento

---

## 📦 Configuración

### Variables de Entorno Necesarias

Copia `.env.example` a `.env` y configura:

```bash
# Gemini (Análisis Estructurado)
REACT_APP_GEMINI_API_KEY=tu_clave_gemini

# Claude (Asistente Conversacional)
REACT_APP_CLAUDE_API_KEY=tu_clave_claude
```

### Obtener las Claves

- **Gemini**: https://ai.google.dev/
- **Claude**: https://console.anthropic.com/

---

## 🏗️ Arquitectura Técnica

```
App.js (Controlador principal)
├── Mode Selector (Botones para cambiar modo)
├── Mode === 'analysis'
│   └── Original App.js (Análisis Estructurado)
│       ├── API: Gemini 2.0 Flash
│       ├── Output: JSON estructurado
│       └── Componentes: C4Diagrams, DiagramLegend
│
└── Mode === 'agent'
    └── ArquitectoDDDAgent.js (Conversacional)
        ├── API: Claude Sonnet 3.5
        ├── Output: Chat + Markdown
        └── Características: Templates, Download
```

---

## 🔄 Flujo de Datos

### Análisis Estructurado
```
Casos de Uso → Gemini API → JSON Validado → Visualización C4 + Agregados
```

### Asistente Conversacional
```
Pregunta Usuario → Claude API → Respuesta Markdown → Chat + Plantillas
```

---

## 📝 Comparativa Detallada

### Rendimiento
| Aspecto | Análisis | Conversacional |
|---------|---------|----------------|
| Latencia | ~3-5s | ~2-4s |
| Consistencia | ✅ Alta | ⚠️ Variable |
| Formato | JSON | Markdown |

### Costo (aproximado por 1000 solicitudes)
| Modelo | Costo |
|--------|-------|
| Gemini 2.0 Flash | $0.075 |
| Claude Sonnet 3.5 | $3.00 |

*Nota: Gemini es más económico para análisis masivos*

---

## 🎓 Recomendaciones de Uso

### Fase 1: Aprendizaje
```
💬 Conversacional → Chat con agente
   • Aprende conceptos básicos DDD
   • Explora patrones
   • Haz preguntas iterativas
```

### Fase 2: Análisis
```
📊 Análisis → Describe tu sistema
   • Genera arquitectura completa
   • Visualiza diagramas
   • Exporta JSON para integraciones
```

### Fase 3: Refinamiento
```
💬 Conversacional → Valida decisiones
   • Cuestiona assumptions
   • Refina diseños
   • Documenta decisiones
```

---

## 🛠️ Desarrollo

### Agregar nuevas funcionalidades

**En Análisis Estructurado:**
- Edita el schema JSON en `App.js`
- Actualiza los prompts al API
- Agranda los componentes de visualización

**En Conversacional:**
- Edita `ArquitectoDDDAgent.js`
- Modifica templates
- Personaliza system prompt

### Extensiones Futuras
- [ ] Exportar a PlantUML
- [ ] Sincronización en tiempo real
- [ ] Historial de versiones
- [ ] Validación de invariantes
- [ ] Generación de código (Java/TypeScript)

---

## 🐛 Solución de Problemas

### Error: "API Key not found"
```
✓ Verifica .env está en raíz del proyecto
✓ Usa el prefijo REACT_APP_ en nombres
✓ Reinicia el servidor (npm start)
```

### Error: "Invalid JSON response"
```
✓ El modelo puede no seguir el schema perfectamente
✓ Intenta con descripción más clara de casos de uso
✓ Para Conversacional, esto no es problema
```

### Lentitud
```
✓ Gemini: Reduce complejidad de casos de uso
✓ Claude: Normal para respuestas largas (espera ~5s)
✓ Ambas: Verifica velocidad de internet
```

---

## 📚 Recursos

### Documentación DDD
- [Eric Evans - Domain-Driven Design](https://www.domainlanguage.com/ddd/)
- [Vaughn Vernon - Implementing DDD](https://vaughnvernon.com/)
- [Patterns of Enterprise Application Architecture](https://martinfowler.com/articles/patterns-of-eaa.html)

### Nuestros Guides
- `DDD_PATTERNS_GUIDE.md` - Patrones DDD explicados
- `C4_DIAGRAMS_GUIDE.md` - Cómo usar diagrams C4
- `COMPONENT_DIAGRAM_GUIDE.md` - Componentes técnicos

---

## 📞 Soporte

¿Problemas o sugerencias?
- 📝 Abre un issue en GitHub
- 💬 Usa el Asistente para consultas sobre DDD
- 📊 Usa Análisis para validar arquitecturas

---

**Última actualización**: Diciembre 2024
**Versión**: 2.0 - Enfoque Híbrido
