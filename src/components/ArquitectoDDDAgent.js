import React, { useState, useRef, useEffect } from 'react';

const ArquitectoDDDAgent = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu **ArquitectoDDD-Agent**, especializado en Domain-Driven Design. Puedo ayudarte a:\n\n• Analizar y diseñar arquitecturas DDD\n• Identificar Bounded Contexts\n• Definir Agregados, Entidades y Value Objects\n• Crear Context Maps\n• Documentar Domain Events\n• Establecer el Ubiquitous Language\n\n¿En qué proyecto estás trabajando? Cuéntame sobre tu dominio de negocio.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = `Eres un arquitecto de software experto especializado en Domain-Driven Design (DDD). Tu rol es ayudar a diseñar, documentar y analizar arquitecturas siguiendo los principios y patrones de DDD.

Tus especialidades incluyen:
- Identificación de subdominios (Core, Supporting, Generic)
- Definición de Bounded Contexts y sus relaciones
- Diseño de Agregados con sus invariantes
- Modelado de Entidades, Value Objects y Domain Events
- Creación de Context Maps y patrones de integración
- Establecimiento del Ubiquitous Language
- Aplicación de patrones tácticos y estratégicos de DDD
- Arquitectura hexagonal y clean architecture

Cuando analices un proyecto:
1. Haz preguntas clarificadoras sobre el dominio de negocio
2. Identifica los subdominios principales
3. Propón Bounded Contexts apropiados
4. Define agregados con sus límites transaccionales
5. Sugiere el Ubiquitous Language
6. Crea especificaciones técnicas claras

Usa formato Markdown para estructurar tus respuestas. Sé práctico, claro y proporciona ejemplos concretos.`;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          system: systemPrompt,
          messages: conversationHistory
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0]) {
        const assistantMessage = {
          role: 'assistant',
          content: data.content[0].text
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else if (data.error) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Error al conectar con el agente. Por favor, intenta nuevamente.\n\n*Asegúrate de tener la variable de entorno REACT_APP_CLAUDE_API_KEY configurada.*'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        role: 'assistant',
        content: '¡Hola! Soy tu **ArquitectoDDD-Agent**, especializado en Domain-Driven Design. Puedo ayudarte a:\n\n• Analizar y diseñar arquitecturas DDD\n• Identificar Bounded Contexts\n• Definir Agregados, Entidades y Value Objects\n• Crear Context Maps\n• Documentar Domain Events\n• Establecer el Ubiquitous Language\n\n¿En qué proyecto estás trabajando? Cuéntame sobre tu dominio de negocio.'
      }
    ]);
  };

  const downloadConversation = () => {
    const markdown = messages.map(msg => {
      const role = msg.role === 'user' ? '**Usuario**' : '**ArquitectoDDD-Agent**';
      return `${role}:\n${msg.content}\n\n---\n`;
    }).join('\n');

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arquitectura-ddd-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const templates = [
    {
      title: 'Bounded Context Template',
      content: `# Bounded Context: [Nombre]

## Responsabilidad
[Descripción de la responsabilidad principal de este contexto]

## Ubiquitous Language
- **Término 1**: Definición
- **Término 2**: Definición

## Agregados Principales
### [Nombre del Agregado]
- **Raíz**: [Entidad raíz]
- **Entidades**: [Lista]
- **Value Objects**: [Lista]
- **Invariantes**: 
  - Regla 1
  - Regla 2

## Domain Events
- **[NombreEvento]**: Se dispara cuando...

## Integraciones
- **Upstream**: [Contextos proveedores]
- **Downstream**: [Contextos consumidores]
- **Patrón**: [Shared Kernel, Customer-Supplier, etc.]`
    },
    {
      title: 'Agregado Template',
      content: `# Agregado: [Nombre]

## Raíz del Agregado
**Entidad**: [Nombre]
**ID**: [Tipo de identificador]

## Límite Transaccional
[Descripción de qué incluye el agregado]

## Invariantes
1. [Regla de negocio que debe cumplirse siempre]
2. [Otra regla]

## Entidades Internas
- **[Entidad 1]**: [Descripción]
- **[Entidad 2]**: [Descripción]

## Value Objects
- **[VO 1]**: [Atributos y validaciones]
- **[VO 2]**: [Atributos y validaciones]

## Comandos (Métodos públicos)
- \`crear[Nombre](params)\`: [Descripción]
- \`actualizar[Atributo](params)\`: [Descripción]

## Domain Events
- **[Nombre]Created**: Se emite cuando...
- **[Nombre]Updated**: Se emite cuando...

## Reglas de Negocio
1. [Regla detallada]
2. [Otra regla]`
    },
    {
      title: 'Context Map Template',
      content: `# Context Map: [Nombre del Sistema]

## Bounded Contexts

### [Contexto 1]
**Tipo**: Core Domain
**Responsabilidad**: [Descripción]

### [Contexto 2]
**Tipo**: Supporting Domain
**Responsabilidad**: [Descripción]

### [Contexto 3]
**Tipo**: Generic Domain
**Responsabilidad**: [Descripción]

## Relaciones

### [Contexto 1] → [Contexto 2]
- **Patrón**: Customer-Supplier
- **Tipo**: Downstream
- **Integración**: REST API / Events
- **Datos compartidos**: [Lista]

### [Contexto 2] ↔ [Contexto 3]
- **Patrón**: Shared Kernel
- **Compartido**: [Modelos o conceptos compartidos]

## Anti-Corruption Layer (ACL)
- **Entre**: [Contexto X] y [Contexto Y]
- **Propósito**: [Proteger de cambios externos]
- **Traducción**: [Cómo se traducen los conceptos]`
    }
  ];

  const prompts = [
    "Analiza un sistema de e-commerce y define sus Bounded Contexts",
    "Diseña el agregado Order con sus invariantes",
    "Crea un Context Map para un sistema bancario",
    "Define el Ubiquitous Language para gestión de proyectos"
  ];

  const renderMarkdown = (text) => {
    const elements = [];
    const lines = text.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-2xl font-bold mt-4 mb-2 text-white">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-xl font-bold mt-4 mb-2 text-blue-300">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-lg font-bold mt-3 mb-1 text-blue-200">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('- ') || line.startsWith('• ')) {
        elements.push(
          <li key={i} className="ml-4 text-slate-200">
            {line.slice(2)}
          </li>
        );
      } else if (line.match(/^\d+\./)) {
        elements.push(
          <li key={i} className="ml-4 text-slate-200">
            {line.replace(/^\d+\. /, '')}
          </li>
        );
      } else if (line.includes('**')) {
        const parts = line.split(/\*\*(.+?)\*\*/);
        elements.push(
          <p key={i} className="mb-2 text-slate-100">
            {parts.map((part, j) => 
              j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part
            )}
          </p>
        );
      } else if (line.trim()) {
        elements.push(
          <p key={i} className="mb-2 text-slate-200">{line}</p>
        );
      } else {
        elements.push(<br key={i} />);
      }
      i++;
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 mb-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏛️</span>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ArquitectoDDD-Agent
            </h1>
          </div>
          <p className="text-slate-300">Agente de IA especializado en Domain-Driven Design</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            💬 Chat con Agente
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'templates'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            📋 Plantillas DDD
          </button>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg border border-blue-500/20 flex flex-col h-[600px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700/50 text-slate-100'
                        }`}
                      >
                        <div className="prose prose-invert max-w-none text-sm">
                          {renderMarkdown(msg.content)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-slate-700 p-4">
                  <div className="flex gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Describe tu proyecto o pregunta sobre DDD..."
                      className="flex-1 bg-slate-700/50 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-slate-400"
                      rows="2"
                      disabled={loading}
                    />
                    <button
                      onClick={handleSend}
                      disabled={loading || !input.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed px-6 rounded-lg transition-colors"
                    >
                      ➤
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={downloadConversation}
                  className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  ⬇️ Descargar
                </button>
                <button
                  onClick={clearConversation}
                  className="flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  🗑️ Limpiar
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 border border-blue-500/20">
                <h3 className="font-bold mb-3 text-blue-400">💡 Prompts Sugeridos</h3>
                <div className="space-y-2">
                  {prompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(prompt)}
                      className="w-full text-left text-sm bg-slate-700/50 hover:bg-slate-600/50 p-3 rounded-lg transition-colors text-slate-300"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 border border-blue-500/20">
                <h3 className="font-bold mb-3 text-blue-400">⚡ Capacidades</h3>
                <ul className="text-sm space-y-2 text-slate-300">
                  <li>✓ Análisis de dominios</li>
                  <li>✓ Diseño de Bounded Contexts</li>
                  <li>✓ Modelado de agregados</li>
                  <li>✓ Context Maps</li>
                  <li>✓ Ubiquitous Language</li>
                  <li>✓ Patrones tácticos DDD</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400 text-xl">
                    📄
                  </div>
                  <h3 className="font-bold text-lg">{template.title}</h3>
                </div>
                <pre className="bg-slate-900/50 p-4 rounded-lg text-xs overflow-x-auto mb-4 text-slate-300 max-h-60 overflow-y-auto font-mono">
                  {template.content}
                </pre>
                <button
                  onClick={() => {
                    const blob = new Blob([template.content], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${template.title.toLowerCase().replace(/ /g, '-')}.md`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  ⬇️ Descargar Template
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArquitectoDDDAgent;
