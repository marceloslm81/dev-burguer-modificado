import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Hamburgueres', image: '/cate4.jpg' },
  { id: 2, name: 'Bebidas', image: '/cate3.jpg' },
  { id: 3, name: 'Sobremesas', image: '/cate2.jpg' },
  { id: 4, name: 'Entradas', image: '/cate1.jpg' },
];

export const PRODUCTS: Product[] = [
  // HAMBURGUERES
  { 
    id: 1, 
    name: 'X-Tudo Duplo Frango', 
    price: 35.90, 
    image: '/burguer1.png',
    category: 'Hamburgueres',
    description: 'Feito com pão, filé de frango, queijo, presunto, alface, tomate, ovo, salsicha e molho especial da casa.'
  },
  { 
    id: 2, 
    name: 'X-Bacon com molho da casa', 
    price: 35.90, 
    image: '/burguer2.png',
    category: 'Hamburgueres',
    description: 'Feito com pão, hamburguer, queijo, presunto, alface, bacon, tomate, ovo, salsicha e molho especial da casa.'
  },
  { 
    id: 3, 
    name: 'Duplo X-Salada Picante', 
    price: 35.90, 
    image: '/burguer3.png',
    category: 'Hamburgueres',
    description: 'Feito com pão, hamburguer, queijo, presunto, alface, tomate, ovo, salsicha e molho picante especial da casa.'
  },
  { 
    id: 4, 
    name: 'X-Salada', 
    price: 35.90, 
    image: '/burguer4.png',
    category: 'Hamburgueres',
    description: 'Feito com pão, hamburguer, queijo, presunto, alface, tomate, ovo, salsicha e molho especial da casa.'
  },
  { 
    id: 5, 
    name: 'X-Especial da casa com Nuggets', 
    price: 35.90, 
    image: '/burguer5.png',
    category: 'Hamburgueres',
    description: 'Feito com pão, hamburguer, queijo, presunto, alface, tomate, ovo, salsicha e molho especial da casa + nuggets.'
  },
  { 
    id: 6, 
    name: 'Duplo X-salada com molho especial', 
    price: 35.90, 
    image: '/burguer6.png',
    category: 'Hamburgueres',
    description: 'Feito com pão, hamburguer duplo, queijo, presunto, alface, tomate, ovo, salsicha e molho especial da casa.'
  },

  { 
    id: 7, 
    name: 'X-Burguer Clássico', 
    price: 29.90, 
    image: '/burguer7.png',
    category: 'Hamburgueres',
    description: 'Hamburguer clássico com queijo, alface, tomate e molho da casa.'
  },
  { 
    id: 8, 
    name: 'X-Cheddar', 
    price: 32.90, 
    image: '/burguer8.png',
    category: 'Hamburgueres',
    description: 'Hamburguer com cheddar cremoso, cebola caramelizada e molho especial.'
  },
  { 
    id: 9, 
    name: 'X-Picanha', 
    price: 39.90, 
    image: '/burguer9.png',
    category: 'Hamburgueres',
    description: 'Hamburguer de picanha, queijo, alface, tomate e maionese da casa.'
  },
  { 
    id: 40, 
    name: 'X-Frango Crispy', 
    price: 34.90, 
    image: '/burguer10.png',
    category: 'Hamburgueres',
    description: 'Frango empanado crocante, queijo, alface, tomate e molho especial.'
  },
  { 
    id: 41, 
    name: 'X-Veggie', 
    price: 31.90, 
    image: '/burguer11.png',
    category: 'Hamburgueres',
    description: 'Hamburguer vegetal, queijo, alface, tomate e maionese temperada.'
  },
  { 
    id: 42, 
    name: 'X-BBQ', 
    price: 36.90, 
    image: '/burguer12.png',
    category: 'Hamburgueres',
    description: 'Hamburguer com barbecue, bacon, queijo e cebola crispy.'
  },
  { 
    id: 43, 
    name: 'X-Duplo Cheddar', 
    price: 42.90, 
    image: '/burguer13.png',
    category: 'Hamburgueres',
    description: 'Hamburguer duplo com muito cheddar e cebola caramelizada.'
  },
  { 
    id: 44, 
    name: 'X-Burguer Premium', 
    price: 45.90, 
    image: '/burguer14.png',
    category: 'Hamburgueres',
    description: 'Blend premium, queijo especial, rúcula e molho da casa.'
  },
  { 
    id: 45, 
    name: 'X-Burguer Bacon', 
    price: 37.90, 
    image: '/burguer15.png',
    category: 'Hamburgueres',
    description: 'Hamburguer com bacon crocante, queijo e maionese defumada.'
  },
  { 
    id: 46, 
    name: 'Combo Dev Burguer', 
    price: 49.90, 
    image: '/burguer combo.png',
    category: 'Hamburgueres',
    description: 'Hamburguer + batata + bebida. Combo perfeito para matar a fome.'
  },

  // ENTRADAS
  { 
    id: 10, 
    name: 'Saladas', 
    price: 9.00, 
    image: '/entrada1.png',
    category: 'Entradas',
    description: 'Frescas e coloridas, perfeitas para iniciar sua refeição com um toque saudável e saboroso.'
  },
  { 
    id: 11, 
    name: 'Bruschettas', 
    price: 35.00, 
    image: '/entrada2.png',
    category: 'Entradas',
    description: 'Simplicidade e a elegância da Itália em cada mordida, crocantes por fora, recheadas de sabores por dentro.'
  },
  { 
    id: 12, 
    name: 'Carpaccios', 
    price: 39.90, 
    image: '/entrada3.png',
    category: 'Entradas',
    description: 'Fatias finas de carne ou peixe, marinadas em temperos frescos e servidas com queijo parmesão, rúcula e azeite.'
  },
  { 
    id: 13, 
    name: 'Ceviches', 
    price: 45.00, 
    image: '/entrada4.png',
    category: 'Entradas',
    description: 'Peixe marinado em suco cítrico, temperado com pimenta, cebola roxa e coentro. Servido com chips.'
  },
  { 
    id: 14, 
    name: 'Tábua de Queijos e Frios', 
    price: 58.90, 
    image: '/entrada5.png',
    category: 'Entradas',
    description: 'Queijos e embutidos artesanais, uma celebração dos melhores sabores da culinária regional.'
  },
  { 
    id: 15, 
    name: 'Croquetes', 
    price: 23.90, 
    image: '/entrada6.png',
    category: 'Entradas',
    description: 'Crocantes, recheados com uma variedade de sabores tentadores, como carne, frango ou queijo.'
  },
  { 
    id: 16, 
    name: 'Pastéis', 
    price: 35.90, 
    image: '/entrada7.png',
    category: 'Entradas',
    description: 'Recheados com uma variedade de ingredientes suculentos, como carne, queijo ou palmito.'
  },
  { 
    id: 17, 
    name: 'Tartines', 
    price: 25.90, 
    image: '/entrada8.png',
    category: 'Entradas',
    description: 'Fatias de pão cobertas com ingredientes como abacate, salmão defumado, ovos pochê e queijo.'
  },
  { 
    id: 18, 
    name: 'Bolinhos de Bacalhau', 
    price: 45.00, 
    image: '/entrada9.png',
    category: 'Entradas',
    description: 'Bolinhos fritos de purê de batata e bacalhau desfiado, uma entrada clássica da culinária portuguesa.'
  },

  // SOBREMESAS
  { 
    id: 20, 
    name: 'Bolos', 
    price: 15.00, 
    image: '/sobremesa1.png',
    category: 'Sobremesas',
    description: 'Delicie-se com camadas macias e sabores variados, desde o clássico bolo de chocolate até criações sofisticadas.'
  },
  { 
    id: 21, 
    name: 'Sorvetes', 
    price: 15.90, 
    image: '/sobremesa2.png',
    category: 'Sobremesas',
    description: 'Feitos com ingredientes frescos e naturais, com combinações de ingredientes premium.'
  },
  { 
    id: 22, 
    name: 'Pudins', 
    price: 9.00, 
    image: '/sobremesa3.png',
    category: 'Sobremesas',
    description: 'Cremosos e suaves, são uma delícia reconfortante. Variedades populares incluem pudim de leite e chocolate.'
  },
  { 
    id: 23, 
    name: 'Mousses', 
    price: 14.90, 
    image: '/sobremesa4.png',
    category: 'Sobremesas',
    description: 'Experiência única: leves, elegantes e deliciosas, em sabores irresistíveis como chocolate e maracujá.'
  },
  { 
    id: 24, 
    name: 'Gelatinas', 
    price: 5.00, 
    image: '/sobremesa5.png',
    category: 'Sobremesas',
    description: 'Coloridas e versáteis, servidas simples ou combinadas com frutas e cremes. Uma opção leve e refrescante.'
  },
  { 
    id: 25, 
    name: 'Tortas', 
    price: 23.90, 
    image: '/sobremesa6.png',
    category: 'Sobremesas',
    description: 'Crocantes por fora, cremosas por dentro. Variedade de recheios, de frutas frescas a mousses decadentes.'
  },
  { 
    id: 26, 
    name: 'Doces Tradicionais', 
    price: 4.90, 
    image: '/sobremesa7.png',
    category: 'Sobremesas',
    description: 'Celebre a cultura com doces típicos, como brigadeiro, quindim e cocada. Sabor e tradição em cada mordida.'
  },
  { 
    id: 27, 
    name: 'Pavês', 
    price: 15.90, 
    image: '/sobremesa8.png',
    category: 'Sobremesas',
    description: 'Uma combinação sofisticada de biscoitos embebidos em várias camadas de sabores marcantes.'
  },
  { 
    id: 28, 
    name: 'Cheesecake', 
    price: 25.90, 
    image: '/sobremesa9.png',
    category: 'Sobremesas',
    description: 'Feita com uma base de biscoito e uma camada espessa de creme de queijo, muitas vezes coberta com frutas.'
  },

  // BEBIDAS
  { 
    id: 30, 
    name: 'Coca-Cola', 
    price: 5.90, 
    image: '/bebida1.png',
    category: 'Bebidas',
    description: 'Escolha entre o sabor autêntico da Coca-Cola clássica ou a versão refrescante sem açúcar.'
  },
  { 
    id: 31, 
    name: 'Água com Gás', 
    price: 4.90, 
    image: '/bebida2.png',
    category: 'Bebidas',
    description: 'Refrescante e com sabor puro. Uma escolha saudável e sem calorias para qualquer momento.'
  },
  { 
    id: 32, 
    name: 'Suco Natural', 
    price: 10.00, 
    image: '/bebida3.png',
    category: 'Bebidas',
    description: 'Desfrute da nossa seleção de sucos naturais, preparados com as frutas mais frescas da estação.'
  },
  { 
    id: 33, 
    name: 'Café Espresso', 
    price: 7.00, 
    image: '/bebida4.png',
    category: 'Bebidas',
    description: 'Um clássico atemporal, uma dose concentrada de sabor e energia, com crema dourada.'
  },
  { 
    id: 34, 
    name: 'Chás', 
    price: 5.00, 
    image: '/bebida5.png',
    category: 'Bebidas',
    description: 'Desfrute da serenidade e da versatilidade, tanto em um chá quente quanto gelado.'
  },
  { 
    id: 35, 
    name: 'Bebidas lácteas', 
    price: 12.00, 
    image: '/bebida6.png',
    category: 'Bebidas',
    description: 'Cremosidade irresistível das nossas bebidas lácteas, uma combinação perfeita de frescor e sabor.'
  },
  { 
    id: 36, 
    name: 'Coquetéis', 
    price: 15.00, 
    image: '/bebida7.png',
    category: 'Bebidas',
    description: 'Cada coquetel é uma explosão de sabores e uma experiência sensorial única.'
  },
  { 
    id: 37, 
    name: 'Bebidas alcoólicas', 
    price: 50.00, 
    image: '/bebida8.png',
    category: 'Bebidas',
    description: 'Explore uma variedade de champanhes, vinhos e uísques para uma experiência sensorial completa.'
  },
  { 
    id: 38, 
    name: 'Energético', 
    price: 9.00, 
    image: '/bebida9.png',
    category: 'Bebidas',
    description: 'Uma explosão de vitalidade e alerta para manter você ativo e focado durante todo o dia.'
  },
];

export const OFFERS = PRODUCTS.slice(0, 4);
