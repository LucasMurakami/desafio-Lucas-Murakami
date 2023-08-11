class CaixaDaLanchonete {

    //DATA
    menu = {
        "cafe": {description: 'Café', principal: true, price: 3.00},
        "chantily": {description: 'Chantily (extra do café)', principal: false, price: 1.50},
        "suco": {description: 'Suco Natural', principal: true, price: 6.20},
        "sanduiche": {description: 'Sanduíche', principal: true, price: 6.50},
        "queijo": {description: 'Queijo (extra do Sanduíche)',principal: false, price: 2.00},
        "salgado": {description: 'Salgado', principal: true, price: 7.25},
        "combo1": {description: '1 Suco e 1 Sanduíche', principal: true, price: 9.25},
        "combo2": {description: '1 Café e 1 Sanduíche', principal: true, price: 7.50},
    }

    //TAXA OU DESCONTO
    calcularTaxaOuDesconto(metodoDePagamento, itensPrice) {
        switch(metodoDePagamento){
            case 'dinheiro':
                return (itensPrice - (itensPrice * 0.05)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});     

            case 'debito':
                return itensPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 

            case 'credito':
                return parseFloat((itensPrice + (itensPrice * 0.03)).toFixed(2)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});                
            
            default:
                return 'Forma de pagamento inválida!';
        }
    }
    

    checarPrincipais(pedidosPrincipais,pedidosExtras) {
        let cafe = 0; 
        let sanduiche = 0; 

        pedidosPrincipais.forEach(pedidoPrincipal => {
            switch(pedidoPrincipal) {
                case 'cafe': 
                    cafe += 1;
                    break;
                
                case 'sanduiche':
                    sanduiche += 1;
                    break;
                
                case 'combo1':
                    sanduiche +=1;
                    break;
                
                case 'combo2':
                    cafe += 1;
                    sanduiche += 1;
                    break;
            }
        });

       return this.checarExtras(pedidosExtras, cafe, sanduiche);
    }

    checarExtras(pedidosExtras, cafe, sanduiche) {
        let chantily = 0;
        let queijo = 0;

        if(pedidosExtras.length === 0) {return true;}

        pedidosExtras.forEach(pedidoExtra => {
            switch(pedidoExtra) {
                case 'chantily':
                    chantily += 1;
                    break;
                
                case 'queijo':
                    queijo += 1;
                    break;
            }
        });

        if(chantily >= 1 && cafe <= 0) {
            return false; 
        } else if (queijo >= 1 && sanduiche <= 0) {
            return false; 
        } else {
            return true; 
        }

    }

    calcularTotalDeItens(itens) {
        let itensPrice = 0;        
        let pedidosPrincipais = [];
        let pedidosExtras = [];
        
        
        for (let index = 0; index < itens.length; index++) {
            const item = itens[index];
            const itemName = item.split(",")[0];
            const quantity = item.split(",")[1];            

            if(quantity < 1) {return 'Quantidade inválida!';}
                        
            if(itemName in this.menu){
                itensPrice += (this.menu[itemName].price * quantity);
                this.menu[itemName].principal ? pedidosPrincipais.push(itemName) : pedidosExtras.push(itemName);          
            }else {
                return 'Item inválido!';}            
        }

        return this.checarPrincipais(pedidosPrincipais, pedidosExtras) ? itensPrice : 'Item extra não pode ser pedido sem o principal';                    
    }

    calcularValorDaCompra(metodoDePagamento, itens) {     
        if(itens.length == 0){return 'Não há itens no carrinho de compra!';}
        
        let itensPrice = this.calcularTotalDeItens(itens);             
        if(typeof itensPrice === "string") {return itensPrice}

        return this.calcularTaxaOuDesconto(metodoDePagamento, itensPrice);     
    }

}

export { CaixaDaLanchonete };
