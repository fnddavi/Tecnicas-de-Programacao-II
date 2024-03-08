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
    console.log(this.nome);
    console.log(this.email);
    console.log(this.nasc);
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