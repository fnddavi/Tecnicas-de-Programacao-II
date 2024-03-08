var Pessoa = /** @class */ (function () {
    function Pessoa(nome, email, nasc) {
        this.email = email;
        this.nome = nome;
        this.nasc = nasc;
    }
    Pessoa.prototype.imprimir = function () {
        console.log(this.nome);
        console.log(this.email);
        console.log(this.nasc);
    };
    return Pessoa;
}());
var cliente = new Pessoa("Fernando Davi", "fernando.ferreira32", "11/05/1989");
cliente.imprimir();
