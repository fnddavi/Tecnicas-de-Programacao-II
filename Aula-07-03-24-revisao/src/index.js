var Pessoa = /** @class */ (function () {
    function Pessoa(nome, email, nasc) {
        this.email = email;
        this.nome = nome;
        this.nasc = nasc;
    }
    Pessoa.prototype.imprimir = function () {
        console.log("Nome: " + this.nome);
        console.log("e-mail: " + this.email);
        console.log("Data nasc.: " + this.nasc);
    };
    return Pessoa;
}());
var cliente = new Pessoa("Fernando Davi", "fernando.ferreira32", "11/05/1989");
cliente.imprimir();
/*
idade(nasc: string): number {
        const dataNasc = Number(nasc.split("/")[2]);
        return 2024 - dataNasc;
    }
*/
