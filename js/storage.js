/*
 * storage.js
 * Camada de abstração de dados.
 * Hoje grava em localStorage; no futuro, basta trocar a implementação
 * dos métodos abaixo por chamadas ao Firebase (Firestore) sem alterar
 * o restante do aplicativo (app.js só conhece esta interface).
 */

const STORAGE_KEY = "sv_produtos";

const Storage = {
    listar() {
        const dados = localStorage.getItem(STORAGE_KEY);
        return dados ? JSON.parse(dados) : [];
    },

    salvarTodos(produtos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
    },

    adicionar(produto) {
        const produtos = this.listar();
        produtos.push(produto);
        this.salvarTodos(produtos);
        return produtos;
    },

    atualizar(id, dadosAtualizados) {
        const produtos = this.listar();
        const idx = produtos.findIndex(p => p.id === id);
        if (idx === -1) return null;
        produtos[idx] = { ...produtos[idx], ...dadosAtualizados };
        this.salvarTodos(produtos);
        return produtos[idx];
    },

    buscarPorId(id) {
        return this.listar().find(p => p.id === id) || null;
    }
};
