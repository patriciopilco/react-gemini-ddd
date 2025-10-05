#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function safeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function writeIfNotExists(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log(`skip (exists): ${filePath}`);
    return;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`created: ${filePath}`);
}

function generateService(baseDir, svc) {
  const name = safeName(svc.name || svc.id || 'service');
  const svcDir = path.join(baseDir, name);
  const presentationDir = path.join(svcDir, 'presentation');
  const applicationDir = path.join(svcDir, 'application');
  const domainDir = path.join(svcDir, 'domain');
  const infraDir = path.join(svcDir, 'infrastructure');

  fs.mkdirSync(presentationDir, { recursive: true });
  fs.mkdirSync(applicationDir, { recursive: true });
  fs.mkdirSync(domainDir, { recursive: true });
  fs.mkdirSync(infraDir, { recursive: true });

  // Presentation: simple Express example (API)
  writeIfNotExists(path.join(presentationDir, 'api.js'), `// Presentation layer - simple Express server for ${svc.name}\nconst express = require('express');\nconst app = express();\napp.use(express.json());\n\n// Example endpoints\napp.get('/health', (req, res) => res.json({ status: 'ok' }));\n\n// TODO: replace with real endpoints derived from microservice spec\napp.listen(process.env.PORT || 3000, () => console.log('Server running on port', process.env.PORT || 3000));\n`);

  // Application: use cases placeholder
  writeIfNotExists(path.join(applicationDir, 'useCases.js'), `// Application layer - use cases for ${svc.name}\n// Implement orchestration of domain operations here\nmodule.exports = {\n  // example: createOrder: async (dto) => { /* ... */ }\n};\n`);

  // Domain: entities and repositories interfaces
  const entitiesContent = `// Domain layer - entities for ${svc.name}\n// Define aggregates, entities and value objects here\n\n// Example entity\nclass ExampleEntity {\n  constructor(props) {\n    this.id = props.id;\n  }\n}\n\nmodule.exports = { ExampleEntity };\n`;
  writeIfNotExists(path.join(domainDir, 'entities.js'), entitiesContent);
  writeIfNotExists(path.join(domainDir, 'repositories.js'), `// Domain layer - repository interfaces for ${svc.name}\n// Define repository interfaces to be implemented by infrastructure adapters\n\nclass ExampleRepository {\n  async save(entity) { throw new Error('not implemented'); }\n}\n\nmodule.exports = { ExampleRepository };\n`);

  // Infrastructure: repository implementation and events adapter
  writeIfNotExists(path.join(infraDir, 'repository.js'), `// Infrastructure - repository implementation for ${svc.name}\n// Replace with actual DB adapter (ORM / raw queries)\nmodule.exports = {\n  async save(entity) {\n    // persist entity\n    return entity;\n  }\n};\n`);
  writeIfNotExists(path.join(infraDir, 'events.js'), `// Infrastructure - events publisher/subscriber for ${svc.name}\nmodule.exports = {\n  publish(event) {\n    console.log('publish', event);\n  }\n};\n`);

  // README
  writeIfNotExists(path.join(svcDir, 'README.md'), `# ${svc.name}\n\nResponsabilidades:\n${(svc.responsibilities || []).map(r => `- ${r}`).join('\n') || '- (sin especificar)'}\n\nPropiedad de datos:\n${(svc.dataOwnership || []).map(d => `- ${d}`).join('\n') || '- (sin especificar)'}\n\nAPIs sugeridas:\n${(svc.publicAPIs || []).map(a => `- ${a.method} ${a.path} — ${a.description}`).join('\n') || '- (sin especificar)'}\n`);
}

function main() {
  const inputPath = process.argv[2] || './microservices.json';
  if (!fs.existsSync(inputPath)) {
    console.error('Input file not found:', inputPath);
    process.exit(2);
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error('Invalid JSON in', inputPath, err.message);
    process.exit(2);
  }

  const services = Array.isArray(data) ? data : data.microservices || [];
  if (!services || services.length === 0) {
    console.error('No microservices defined in', inputPath);
    process.exit(1);
  }

  const outDir = path.resolve(process.cwd(), 'services');
  fs.mkdirSync(outDir, { recursive: true });

  services.forEach(svc => generateService(outDir, svc));
  console.log('Done. Created services in', outDir);
}

if (require.main === module) main();
