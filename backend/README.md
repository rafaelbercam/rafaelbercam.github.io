# Resume JSON API

API simples para gerenciar os arquivos JSON do currículo em Português e Inglês.

## Estrutura

- `server.js` - inicializa o servidor Express
- `routes/curriculum.js` - endpoints CRUD para `data-pt.json` e `data-en.json`
- `middleware/auth.js` - validação JWT simples
- `.env.example` - variáveis de ambiente recomendadas

## Instalação

```bash
cd backend
npm install
cp .env.example .env
```

Edite `.env` se desejar mudar usuário/senha ou a chave JWT.

## Executar

```bash
npm start
```

ou em desenvolvimento:

```bash
npm run dev
```

A documentação Swagger está disponível em:

```bash
http://localhost:4000/api-docs
```

## Autenticação

Endpoint de login:

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

Resposta:

```json
{
  "token": "..."
}
```

Inclua o token no cabeçalho `Authorization`:

```
Authorization: Bearer <token>
```

## Endpoints Principais

- `GET /api/curriculum/:lang` - obtém o JSON completo (`lang` = `pt` ou `en`)
- `GET /api/curriculum/:lang/:section` - obtém uma seção específica
- `PATCH /api/curriculum/:lang/personal` - atualiza apenas os dados pessoais
- `POST /api/curriculum/:lang/:section` - adiciona um item a uma seção de array
- `PUT /api/curriculum/:lang/:section/:index` - atualiza um item de seção por índice
- `DELETE /api/curriculum/:lang/:section/:index` - remove um item de seção por índice

## Exemplos de uso

Adicionar uma experiência em inglês:

```bash
curl -X POST http://localhost:4000/api/curriculum/en/experience \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New QA Role",
    "company": "Example Corp, Belo Horizonte, Brazil",
    "period": "May 2026 – Present",
    "responsibilities": [
      "Developing AI-powered test cases",
      "Improving test reliability with generative tooling"
    ]
  }'
```

Atualizar dados pessoais em português:

```bash
curl -X PATCH http://localhost:4000/api/curriculum/pt/personal \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Belo Horizonte, MG, Brasil"
  }'
```

Apagar um item da seção `skills`:

```bash
curl -X DELETE http://localhost:4000/api/curriculum/pt/skills/2 \
  -H "Authorization: Bearer <token>"
```

## Observações

- A API altera diretamente `data-pt.json` e `data-en.json` existentes na raiz do projeto.
- Use apenas em um ambiente de confiança, pois o CRUD atua diretamente nos arquivos JSON.
