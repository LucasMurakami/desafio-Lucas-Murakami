class CaixaDaLanchonete {

    //DATA
    menu = {
        "cafe": {description: 'Café', price: 3.00},
        "chantily": {description: 'Chantily (extra do café)', price: 1.50},
        "suco": {description: 'Suco Natural', price: 6.20},
        "sanduiche": {description: 'Sanduíche', price: 6.50},
        "queijo": {description: 'Queijo (extra do Sanduíche)', price: 2.00},
        "salgado": {description: 'Salgado', price: 7.25},
        "combo1": {description: '1 Suco e 1 Sanduíche', price: 9.25},
        "combo2": {description: '1 Café e 1 Sanduíche', price: 7.50},
    }

    //TAXA OU DESCONTO
    calcularTaxaOuDesconto(metodoDePagamento, itensPrice) {
        switch(metodoDePagamento){
            case 'dinheiro':

                return (itensPrice - (itensPrice * 0.05)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});     

            case 'debito':

                return itensPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 

            case 'credito':

                return (itensPrice + (itensPrice * 0.03)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});                
            
            default:
                return 'Forma de pagamento inválida!';
        }
    }

    calcularTotalDeItens(itens) {
        let itensPrice = 0;
        //let pedidoPrincipal = 0;
        
        for (let index = 0; index < itens.length; index++) {
            const item = itens[index];
            const itemName = item.split(",")[0];
            const quantity = item.split(",")[1];

            if(quantity < 1) {return 'Quantidade inválida!';}
                        
            if(itemName in this.menu){
                itensPrice += (this.menu[itemName].price * quantity);
            }else{
                return 'Item inválido!';
            }
            
        }
        return itensPrice;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {     
        if(itens.length == 0){return 'Não há itens no carrinho de compra!';}

        let itensPrice = this.calcularTotalDeItens(itens);   
        //console.log(itensPrice);   
        if(typeof itensPrice === "string") {return itensPrice}

        let price = this.calcularTaxaOuDesconto(metodoDePagamento, itensPrice);
                    
        return price;
    }

}

export { CaixaDaLanchonete };
