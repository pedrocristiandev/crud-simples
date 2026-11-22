CRUD Simples - API REST

API REST desenvolvida com Node.js e Express para gerenciamento de usuários.

TECNOLOGIAS
- Node.js
- Express
- JavaScript
- Postman

FUNCIONALIDADES
- Cadastrar usuários
- Listar usuários
- Buscar usuário por ID
- Atualizar usuários
- Excluir usuários
- Validar dados enviados
- Tratar erros e respostas HTTP

ROTAS
GET /usuarios - Lista usuários
GET /usuarios/:id - Busca usuário por ID
POST /usuarios - Cadastra usuário
PUT /usuarios/:id - Atualiza todos os dados
PATCH /usuarios/:id - Atualiza dados específicos
DELETE /usuarios/:id - Exclui usuário

EXECUTAR LOCALMENTE
npm install
npm start

OBSERVAÇÃO
Os dados são armazenados em um array na memória e podem ser perdidos quando o servidor reiniciar.

AUTOR
Pedro Cristian