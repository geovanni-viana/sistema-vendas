/*
 * app.js
 * Logica da interface: cadastro de produto, venda e renderizacaoo do estoque.
 * Toda a persistencia passa pela camada Storage (storage.js).
 */

// Permite digitar apenas digitos no campo (usado nos IDs e nas quantidades)
function permitirSomenteNumeros(input) {
    input.addEventListener("input", () => {
        const limpo = input.value.replace(/\D/g, "");
        if (limpo !== input.value) {
            input.value = limpo;
        }
    });
    // bloqueia "e", "+", "-", "," e "." no teclado (afeta inputs type="number")
    input.addEventListener("keydown", (ev) => {
        if (["e", "E", "+", "-", ",", "."].includes(ev.key)) {
            ev.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    ["pId", "vId", "pQtd", "vQtd"].forEach((id) => {
        const campo = document.getElementById(id);
        if (campo) permitirSomenteNumeros(campo);
    });
});

function mostrarAviso(mensagem, tipo = "ok") {
    const toast = document.getElementById("toast");
    toast.textContent = mensagem;
    toast.className = "toast show" + (tipo === "erro" ? " error" : "");
    clearTimeout(mostrarAviso._t);
    mostrarAviso._t = setTimeout(() => {
        toast.className = "toast";
    }, 2600);
}

function cadastrar() {
    const id = document.getElementById("pId").value.trim();
    const nome = document.getElementById("pNome").value.trim();
    const qtd = parseInt(document.getElementById("pQtd").value, 10);
    const preco = parseFloat(document.getElementById("pPreco").value);

    if (!/^\d+$/.test(id)) {
        mostrarAviso("O ID do produto deve conter somente números.", "erro");
        return;
    }
    if (!nome || !Number.isInteger(qtd) || qtd < 0 || isNaN(preco) || preco < 0) {
        mostrarAviso("Preencha todos os campos corretamente.", "erro");
        return;
    }
    if (Storage.buscarPorId(id)) {
        mostrarAviso("Já existe um produto com este ID.", "erro");
        return;
    }

    Storage.adicionar({ id, nome, qtd, preco });
    document.getElementById("formCadastro").reset();
    mostrarAviso("Produto cadastrado com sucesso!");
    atualizarTabela();
}

function vender() {
    const id = document.getElementById("vId").value.trim();
    const qtd = parseInt(document.getElementById("vQtd").value, 10);

    if (!/^\d+$/.test(id)) {
        mostrarAviso("O ID do produto deve conter somente números.", "erro");
        return;
    }
    if (!Number.isInteger(qtd) || qtd <= 0) {
        mostrarAviso("Informe uma quantidade válida.", "erro");
        return;
    }

    const produto = Storage.buscarPorId(id);

    if (produto && qtd > 0 && produto.qtd >= qtd) {
        Storage.atualizar(id, { qtd: produto.qtd - qtd });
        document.getElementById("formVenda").reset();
        mostrarAviso("Venda realizada com sucesso!");
        atualizarTabela();
    } else {
        mostrarAviso("Produto não encontrado ou estoque insuficiente.", "erro");
    }
}

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function atualizarTabela() {
    const corpo = document.getElementById("corpoEstoque");
    const produtos = Storage.listar();

    if (produtos.length === 0) {
        corpo.innerHTML = '<tr class="empty-row"><td colspan="4">Nenhum produto cadastrado ainda.</td></tr>';
        return;
    }

    corpo.innerHTML = produtos.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.qtd}</td>
            <td>${formatarPreco(p.preco)}</td>
        </tr>
    `).join("");
}

// Registro do Service Worker (habilita instalação e uso offline)
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch(() => {
            /* falha silenciosa: app continua funcionando sem SW */
        });
    });
}

document.addEventListener("DOMContentLoaded", atualizarTabela);
