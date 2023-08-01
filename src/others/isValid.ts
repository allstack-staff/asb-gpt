const Piii = require('piii');
class Message {
    body: string
    piii: typeof Piii;
    constructor(body: string) {
        this.body = body;
        this.piii = new Piii();
    }

    isValid() {
        // Verificar se a mensagem não está vazia e não contém palavrões
        return (
            this.body && this.body.trim().length > 0 && !this.piii.has(this.body)
        );
    }
}

export default Message