# Diagramas C4 - Guía Completa

Esta aplicación genera automáticamente diagramas C4 interactivos utilizando React Flow para visualizar la arquitectura DDD de tu sistema.

## 📊 ¿Qué son los Diagramas C4?

El modelo C4 es un enfoque de documentación de arquitectura de software que utiliza diferentes niveles de zoom para mostrar distintos niveles de detalle:

1. **Context (Contexto)**: Vista de más alto nivel
2. **Container (Contenedor)**: Aplicaciones y almacenes de datos
3. **Component (Componente)**: Componentes dentro de un contenedor
4. **Code (Código)**: Clases y métodos (no implementado en esta versión)

## 🎨 Nivel 1: Diagrama de Contexto

### Propósito
Muestra el sistema en su entorno, incluyendo usuarios y sistemas externos con los que interactúa.

### En nuestra implementación
- **Bounded Contexts**: Representados como sistemas principales
- **Sistemas Externos**: Otros sistemas con los que interactúa
- **Relaciones**: Conexiones entre contextos con patrones de integración

### Colores
- 🔵 **Azul (#1168bd)**: Bounded Contexts principales
- ⚫ **Gris (#999999)**: Sistemas externos

### Características Interactivas
- Zoom in/out para ver detalles
- Pan para mover el diagrama
- Minimapa para navegación rápida
- Tooltips con información adicional

## 📦 Nivel 2: Diagrama de Contenedor

### Propósito
Muestra los contenedores de alto nivel (aplicaciones, servicios, bases de datos) que componen el sistema.

### En nuestra implementación
- **Agregados**: Contenedores principales de lógica de negocio
- **Entidades**: Componentes dentro de los agregados
- **Value Objects**: Objetos de valor inmutables
- **Repositorios**: Almacenes de datos para agregados

### Colores
- 🔵 **Azul oscuro (#1168bd)**: Agregados
- 🔵 **Azul claro (#63b3ed)**: Entidades
- 🟢 **Verde (#48bb78)**: Value Objects
- 🟠 **Naranja (#ed8936)**: Repositorios

### Relaciones
- Líneas sólidas con flechas muestran dependencias
- Líneas "persiste" conectan agregados con sus repositorios

## 🔧 Nivel 3: Diagrama de Componente

### Propósito
Muestra los componentes dentro de un contenedor y cómo interactúan entre sí.

### En nuestra implementación
- **Controllers**: Componentes de presentación
- **Services**: Servicios de aplicación y dominio
- **Repositories**: Implementaciones de repositorios
- **APIs**: Interfaces de programación
- **Databases**: Bases de datos

### Colores por Tipo
- ⚫ **Gris (#4a5568)**: Componentes generales
- 🟣 **Púrpura (#805ad5)**: Interfaces/APIs
- 🟠 **Naranja (#dd6b20)**: Databases/Repositorios
- ⚫ **Gris claro (#718096)**: Componentes externos

### Tipos de Conexiones
- **Líneas sólidas**: Dependencias directas ("usa")
- **Líneas punteadas**: Interacciones ("interactúa")

## 🎯 Características de React Flow

### Controles Disponibles
- **🔍 Zoom +/-**: Acercar o alejar el diagrama
- **🏠 Fit View**: Ajustar el diagrama a la vista
- **🔒 Lock**: Bloquear/desbloquear el movimiento de nodos
- **📱 Minimapa**: Vista general del diagrama completo

### Interacciones
1. **Click y arrastrar nodos**: Reorganizar elementos visualmente
2. **Scroll**: Hacer zoom in/out
3. **Click en fondo + arrastrar**: Pan del diagrama
4. **Hover sobre nodos**: Ver información adicional

### Layout Automático
Utilizamos el algoritmo **Dagre** para calcular automáticamente la posición óptima de los nodos:
- Minimiza cruces de líneas
- Optimiza el espacio vertical y horizontal
- Organiza jerárquicamente las dependencias

## 📐 Personalización

### Cambiar Dirección del Layout
En los archivos de componentes, puedes cambiar la dirección:

```javascript
// Vertical (de arriba a abajo)
getLayoutedElements(initialNodes, initialEdges, 'TB')

// Horizontal (de izquierda a derecha)
getLayoutedElements(initialNodes, initialEdges, 'LR')

// Otras opciones: 'BT' (bottom to top), 'RL' (right to left)
```

### Ajustar Espaciado
Modifica los parámetros en la configuración de Dagre:

```javascript
dagreGraph.setGraph({ 
    rankdir: direction, 
    ranksep: 120,  // Separación entre niveles
    nodesep: 80    // Separación entre nodos
});
```

### Cambiar Colores
Edita las constantes de color en cada componente:

```javascript
const COLORS = {
    system: '#1168bd',      // Color principal
    entity: '#63b3ed',      // Entidades
    valueObject: '#48bb78', // Value Objects
    // ... etc
};
```

## 🎨 Estilos CSS Personalizados

Los estilos se encuentran en `src/components/C4Diagrams.css`:

```css
/* Personalizar nodos */
.react-flow__node {
    font-family: 'Inter', sans-serif;
    cursor: grab;
}

/* Personalizar conexiones */
.react-flow__edge-path {
    stroke-width: 2;
}

/* Animaciones */
.react-flow__edge.animated path {
    animation: dashdraw 0.5s linear infinite;
}
```

## 🚀 Mejores Prácticas

### 1. Organización Visual
- Mantén los nodos relacionados cerca
- Usa el minimapa para navegación en diagramas grandes
- Aprovecha el zoom para ver detalles específicos

### 2. Claridad
- Los colores ayudan a identificar tipos de componentes
- Las etiquetas en las conexiones describen la relación
- Los iconos proporcionan pistas visuales rápidas

### 3. Performance
- React Flow está optimizado para cientos de nodos
- El layout automático se calcula una sola vez
- Los memos evitan re-renders innecesarios

## 🔍 Casos de Uso

### Presentaciones
- Exporta screenshots para documentación
- Usa el modo pantalla completa
- Ajusta el zoom para el nivel de detalle deseado

### Análisis de Arquitectura
- Identifica dependencias circulares
- Detecta componentes huérfanos
- Analiza complejidad de relaciones

### Comunicación con el Equipo
- Vista compartida de la arquitectura
- Facilita discusiones sobre diseño
- Documenta decisiones arquitectónicas

## 📚 Recursos Adicionales

- [React Flow Documentation](https://reactflow.dev/)
- [C4 Model](https://c4model.com/)
- [Domain-Driven Design](https://domainlanguage.com/ddd/)
- [Dagre Layout Algorithm](https://github.com/dagrejs/dagre)

## 🐛 Solución de Problemas

### El diagrama no se muestra
- Verifica que React Flow esté instalado: `npm install reactflow`
- Comprueba la consola del navegador para errores
- Asegúrate de que los datos tienen el formato correcto

### Los nodos se superponen
- Aumenta `ranksep` y `nodesep` en la configuración de Dagre
- Prueba diferentes direcciones de layout ('TB', 'LR', etc.)
- Ajusta manualmente los nodos arrastrándolos

### Performance lenta
- Reduce el número de nodos visibles
- Desactiva animaciones en conexiones
- Usa el modo de renderizado optimizado

## 💡 Tips Pro

1. **Combina vistas**: Usa los tres niveles C4 para contar una historia completa
2. **Exportación**: Captura screenshots en diferentes niveles de zoom
3. **Colaboración**: Comparte el enlace y deja que otros exploren
4. **Iteración**: Actualiza los casos de uso y regenera para ver la evolución
5. **Documentación viva**: Integra en tu pipeline CI/CD para mantener actualizado

---

**Nota**: Esta implementación de diagramas C4 está diseñada específicamente para arquitecturas DDD y puede necesitar adaptaciones para otros contextos.
