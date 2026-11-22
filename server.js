
const express = require("express");
const bancodedados = require("./banco");

const app = express();

app.use(express.json());
app.set("json spaces", 3);

app.get("/", (req, res) => {
    res.send("<h1>API Funcionando - CRUD Simples</h1>");
});

app.get("/usuarios", (req, res) => {
    res.status(200).json(bancodedados);
});

app.get("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido"
        });
    }

    const usuario = bancodedados.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    res.status(200).json(usuario);
});

app.post("/usuarios", (req, res) => {
    const { nome, email, profissao } = req.body || {};

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({
            erro: "O nome não pode ficar vazio"
        });
    }

    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({
            erro: "O email não pode ficar vazio"
        });
    }

    if (typeof profissao !== "string" || profissao.trim() === "") {
        return res.status(400).json({
            erro: "A profissão não pode ficar vazia"
        });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const emailExiste = bancodedados.some(usuario =>
        usuario.email.toLowerCase() === emailNormalizado
    );

    if (emailExiste) {
        return res.status(409).json({
            erro: "Este email já está cadastrado"
        });
    }

    const novoId = bancodedados.length > 0
        ? Math.max(...bancodedados.map(usuario => usuario.id)) + 1
        : 1;

    const novoUsuario = {
        id: novoId,
        nome: nome.trim(),
        email: emailNormalizado,
        profissao: profissao.trim()
    };

    bancodedados.push(novoUsuario);

    res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso",
        usuario: novoUsuario
    });
});

app.put("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido"
        });
    }

    const usuario = bancodedados.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    const { nome, email, profissao } = req.body || {};

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({
            erro: "O nome não pode ficar vazio"
        });
    }

    if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({
            erro: "O email não pode ficar vazio"
        });
    }

    if (typeof profissao !== "string" || profissao.trim() === "") {
        return res.status(400).json({
            erro: "A profissão não pode ficar vazia"
        });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const emailExiste = bancodedados.some(usuario =>
        usuario.email.toLowerCase() === emailNormalizado &&
        usuario.id !== id
    );

    if (emailExiste) {
        return res.status(409).json({
            erro: "Este email já pertence a outro usuário"
        });
    }

    usuario.nome = nome.trim();
    usuario.email = emailNormalizado;
    usuario.profissao = profissao.trim();

    res.status(200).json({
        mensagem: "Usuário atualizado com sucesso",
        usuario
    });
});

app.patch("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido"
        });
    }

    const usuario = bancodedados.find(usuario => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    const dados = req.body || {};
    const camposPermitidos = ["nome", "email", "profissao"];
    const camposRecebidos = Object.keys(dados);

    if (camposRecebidos.length === 0) {
        return res.status(400).json({
            erro: "Informe pelo menos um campo para atualizar"
        });
    }

    const campoInvalido = camposRecebidos.some(campo =>
        !camposPermitidos.includes(campo)
    );

    if (campoInvalido) {
        return res.status(400).json({
            erro: "Você informou um campo inválido"
        });
    }

    if (dados.nome !== undefined) {
        if (typeof dados.nome !== "string" || dados.nome.trim() === "") {
            return res.status(400).json({
                erro: "Nome inválido"
            });
        }
    }

    if (dados.email !== undefined) {
        if (typeof dados.email !== "string" || dados.email.trim() === "") {
            return res.status(400).json({
                erro: "Email inválido"
            });
        }

        const emailNormalizado = dados.email.trim().toLowerCase();

        const emailExiste = bancodedados.some(usuario =>
            usuario.email.toLowerCase() === emailNormalizado &&
            usuario.id !== id
        );

        if (emailExiste) {
            return res.status(409).json({
                erro: "Este email já pertence a outro usuário"
            });
        }

        dados.email = emailNormalizado;
    }

    if (dados.profissao !== undefined) {
        if (typeof dados.profissao !== "string" || dados.profissao.trim() === "") {
            return res.status(400).json({
                erro: "Profissão inválida"
            });
        }
    }

    if (dados.nome !== undefined) {
        usuario.nome = dados.nome.trim();
    }

    if (dados.email !== undefined) {
        usuario.email = dados.email;
    }

    if (dados.profissao !== undefined) {
        usuario.profissao = dados.profissao.trim();
    }

    res.status(200).json({
        mensagem: "Usuário atualizado parcialmente com sucesso",
        usuario
    });
});

app.delete("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido"
        });
    }

    const indice = bancodedados.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Usuário não encontrado"
        });
    }

    const usuarioRemovido = bancodedados.splice(indice, 1);

    res.status(200).json({
        mensagem: "Usuário excluído com sucesso",
        usuario: usuarioRemovido[0]
    });
});

app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
