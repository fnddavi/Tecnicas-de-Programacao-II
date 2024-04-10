class Pessoa {
  nome: String;
  email: String;
  nasc: String;

  constructor(nome: string, email: string, nasc: String) {
    this.email = email;
    this.nome = nome;
    this.nasc = nasc;
  }
  imprimir(): void {
    console.log("Nome: "+this.nome);
    console.log("e-mail: "+this.email);
    console.log("Data nasc.: "+this.nasc);
  }
}

const cliente = new Pessoa(
  "Fernando Davi",
  "fernando.ferreira32",
  "11/05/1989"
);

cliente.imprimir();

/*
idade(nasc: string): number {
        const dataNasc = Number(nasc.split("/")[2]);
        return 2024 - dataNasc;
    }
*/
