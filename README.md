# Currículo Online - Rafael Berçam

## Como Atualizar o Currículo

Este currículo é totalmente dinâmico e controlado por arquivos JSON. Você **não precisa editar o HTML** para atualizar as informações!

### 📁 Arquivos de Dados

- **`data-pt.json`** - Conteúdo em Português (padrão)
- **`data-en.json`** - Conteúdo em Inglês

## 📝 Estrutura dos JSONs

Cada arquivo JSON contém:

```json
{
  "personal": { /* Informações Pessoais */ },
  "experience": [ /* Array de Experiências */ ],
  "education": [ /* Array de Educação */ ],
  "certifications": [ /* Array de Certificações */ ],
  "skills": [ /* Array de Habilidades Técnicas */ ],
  "languages": [ /* Array de Idiomas */ ],
  "volunteer": [ /* Array de Experiência Voluntária */ ],
  "sections": { /* Nomes das Seções */ }
}
```

## ✏️ Como Adicionar uma Nova Experiência

1. Abra `data-pt.json` (para português) ou `data-en.json` (para inglês)
2. Localize o array `"experience"`
3. Adicione um novo objeto no final (antes do último `}`):

```json
{
  "title": "Seu Título",
  "company": "Sua Empresa, Cidade, MG, País",
  "period": "Mês Ano – Mês Ano",
  "responsibilities": [
    "Responsabilidade 1",
    "Responsabilidade 2",
    "Responsabilidade 3"
  ]
}
```

**Lembre-se:** Sempre adicione a mesma experiência em AMBOS os arquivos (PT e EN)!

## ✏️ Como Adicionar uma Nova Certificação

1. Localize o array `"certifications"`
2. Adicione um novo objeto:

```json
{
  "name": "Nome da Certificação",
  "year": "YYYY"
}
```

## ✏️ Como Adicionar uma Nova Habilidade Técnica

1. Localize o array `"skills"`
2. Adicione um novo objeto:

```json
{
  "category": "Nome da Categoria",
  "description": "Ferramentas e tecnologias"
}
```

## ✏️ Como Adicionar Educação

1. Localize o array `"education"`
2. Adicione um novo objeto:

```json
{
  "degree": "Nome do Grau/Certificado",
  "institution": "Nome da Instituição",
  "period": "Ano – Ano"
}
```

## ✏️ Como Adicionar Idiomas

1. Localize o array `"languages"`
2. Adicione um novo objeto:

```json
{
  "language": "Nome do Idioma",
  "level": "Nível (Basic, Intermediate, Advanced, Native)"
}
```

## ✏️ Como Adicionar Experiência Voluntária

1. Localize o array `"volunteer"`
2. Adicione um novo objeto:

```json
{
  "title": "Seu Título",
  "organization": "Organização, Tipo",
  "period": "Mês Ano – Mês Ano",
  "description": "Descrição do que você fez"
}
```

## 🎨 Características

✅ Alternância de idiomas (PT/EN)  
✅ Dados carregados dinamicamente do JSON  
✅ Design profissional - Padrão internacional  
✅ Fundo branco com letras pretas  
✅ Otimizado para impressão em PDF  
✅ Responsivo e mobile-friendly  
✅ Preferência de idioma salva no navegador  

## 🖨️ Como Baixar em PDF

1. Clique no botão "📥 Baixar PDF" (ou "📥 Download PDF" em inglês)
2. Use Cmd+P (Mac) ou Ctrl+P (Windows/Linux) para imprimir
3. Selecione "Salvar como PDF"
4. O currículo será salvo com toda a formatação

## ⚙️ Estrutura do Projeto

```
.
├── index.html          # Página principal (não editar)
├── style.css           # Estilos (não editar)
├── data-pt.json        # Dados em Português (EDITE AQUI)
├── data-en.json        # Dados em Inglês (EDITE AQUI)
└── README.md           # Este arquivo
```

## ⚠️ Importante

- **Sempre mantenha o JSON válido** - Use um validador JSON se necessário
- **Sempre atualize AMBOS os arquivos** (PT e EN) com as mesmas mudanças
- **Use escape characters** se precisar incluir aspas dentro de strings:
  - Em vez de: `"description": "Desenvolvimento de APIs"REST""`
  - Use: `"description": "Desenvolvimento de APIs \"REST\""`

## 🚀 Próximas Atualizações

Quando quiser fazer mudanças, basta editar os arquivos JSON e recarregar a página!
