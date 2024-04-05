

//Productos:
const products = [
    {
        id: 1,
        name: "Banda exfoliante para espalda",
        description: "Exfolia tu espalda fácilmente con nuestra banda exfoliante. Disfruta de una piel suave y renovada.",
        img: "assets/product-images/banda_exfoliante_para_espalda.jpeg",
        product_type: "accesorios",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
    },
    {
        id: 2,
        name: "Jabonera aro",
        description: "Guarda y conserva tus jabones con estilo usando nuestra jabonera aro. ¡Mantén tus jabones frescos y listos para su uso!",
        img: "assets/product-images/jabonera_aro.jpeg",
        product_type: "accesorios",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [3],
        availability: true
    },
    {
        id: 3,
        name: "Jabonera guayubirá",
        description: "Organiza tus jabones con nuestra jabonera guayubirá. Dale a tu baño un toque natural y elegante.",
        img: "assets/product-images/jabonera_guayubira.jpeg",
        product_type: "accesorios",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [4],
        availability: true
    },
    {
        id: 4,
        name: "Jabonera nido",
        description: "Nuestra jabonera nido es perfecta para almacenar tus jabones de forma decorativa. Añade un toque único a tu espacio.",
        img: "assets/product-images/jabonera_nido.jpeg",
        product_type: "accesorios",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [3],
        availability: true
    },
    {
        id: 5,
        name: "Jabonera para shampoo sólido",
        description: "Almacena y seca tu shampoo sólido fácilmente con nuestra jabonera especial. ¡Haz que tu shampoo sólido dure más!",
        img: "assets/product-images/jabonera_para_shampoo_solido.jpeg",
        product_type: "accesorios",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [4],
        availability: true
    },
    {
        id: 6,
        name: "Jabón con indigo",
        description: "Descubre la frescura y suavidad de nuestro jabón con indigo. Limpia tu piel mientras disfrutas de su aroma relajante.",
        img: "assets/product-images/jabon_con_indigo.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
    },
    {
        id: 7,
        name: "Jabón de almendra",
        description: "Nutre tu piel con nuestro jabón de almendra. Disfruta de una limpieza suave y deja que el aroma te envuelva.",
        img: "assets/product-images/jabon_de_almendra.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
    },
    {
        id: 8,
        name: "Jabón de arcilla roja",
        description: "Experimenta la pureza de nuestro jabón de arcilla roja. Limpia y revitaliza tu piel con cada uso.",
        img: "assets/product-images/jabon_de_arcilla_roja.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 9,
        name: "Jabón de arcilla rosa",
        description: "Descubre la delicadeza de nuestro jabón de arcilla rosa. Mima tu piel y disfruta de un cuidado suave y natural.",
        img: "assets/product-images/jabon_de_arcilla_rosa.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 10,
        name: "Jabón de caléndula",
        description: "Calma tu piel con nuestro jabón de caléndula. Disfruta de propiedades suavizantes y restauradoras en cada lavado.",
        img: "assets/product-images/jabon_de_calendula.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 11,
        name: "Jabón de carbón vegetal",
        description: "Purifica tu piel con nuestro jabón de carbón vegetal. Elimina impurezas y disfruta de una limpieza profunda.",
        img: "assets/product-images/jabon_de_carbon_vegetal.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 12,
        name: "Jabón de chocolate",
        description: "Déjate envolver por la indulgencia de nuestro jabón de chocolate. Disfruta de una experiencia de limpieza deliciosa.",
        img: "assets/product-images/jabon_de_chocolate.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: false
        },
    {
        id: 13,
        name: "Jabón de coco",
        description: "Revitaliza tu piel con nuestro jabón de coco. Experimenta la frescura tropical en cada baño.",
        img: "assets/product-images/jabon_de_coco.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 14,
        name: "Jabón de enebro",
        description: "Eleva tu rutina de cuidado con nuestro jabón de enebro. Limpia y refresca tu piel con su aroma estimulante.",
        img: "assets/product-images/jabon_de_enebro.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 15,
        name: "Jabón de espirulina",
        description: "Revitaliza tu piel con nuestro jabón de espirulina. Experimenta los beneficios de este superalimento en tu rutina diaria.",
        img: "assets/product-images/jabon_de_espirulina.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 16,
        name: "Jabón de eucalipto y menta",
        description: "Refresca tus sentidos con nuestro jabón de eucalipto y menta. Disfruta de una limpieza vigorizante cada día.",
        img: "assets/product-images/jabon_de_eucalipto_y_menta.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 17,
        name: "Jabón de lavanda",
        description: "Relaja tu mente y cuerpo con nuestro jabón de lavanda. Sumérgete en la calma y disfruta de una piel suave.",
        img: "assets/product-images/jabon_de_lavanda.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 18,
        name: "Jabón de manzanilla",
        description: "Calma tu piel con nuestro jabón de manzanilla. Disfruta de propiedades suavizantes y un aroma reconfortante.",
        img: "assets/product-images/jabon_de_manzanilla.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 19,
        name: "Jabón de miel",
        description: "Nutre tu piel con nuestro jabón de miel. Disfruta de una hidratación intensa y un dulce aroma natural.",
        img: "assets/product-images/jabon_de_miel.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 20,
        name: "Jabón de ortiga",
        description: "Fortalece tu piel con nuestro jabón de ortiga. Experimenta una limpieza profunda y revitalizante.",
        img: "assets/product-images/jabon_de_ortiga.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 21,
        name: "Jabón de nardo",
        description: "Envuélvete en la suavidad de nuestro jabón de nardo. Descubre el lujo de una piel bien cuidada.",
        img: "assets/product-images/jabon_de_nardo.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 22,
        name: "Jabón de romero y aloe vera",
        description: "Revitaliza tu piel con nuestro jabón de romero y aloe vera. Disfruta de una limpieza refrescante y calmante.",
        img: "assets/product-images/jabon_de_romero_y_aloe_vera.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 23,
        name: "Jabón de rosa mosqueta",
        description: "Embellece tu piel con nuestro jabón de rosa mosqueta. Descubre la luminosidad natural de tu cutis.",
        img: "assets/product-images/jabon_de_rosa_mosqueta.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 24,
        name: "Jabón de tea tree",
        description: "Purifica tu piel con nuestro jabón de tea tree. Disfruta de una limpieza profunda y revitalizante.",
        img: "assets/product-images/jabon_de_tea_tree.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 25,
        name: "Jabón de zanahoria",
        description: "Revitaliza tu piel con nuestro jabón de zanahoria. Experimenta una limpieza nutritiva y restauradora.",
        img: "assets/product-images/jabon_de_zanahoria.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 26,
        name: "Jabón exfoliante de avena, miel y leche",
        description: "Exfolia suavemente con nuestro jabón exfoliante de avena, miel y leche. Logra una piel radiante y nutrida con ingredientes naturales.",
        img: "assets/product-images/jabon_exfoliante_avenaMielLeche.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
        },
    {
        id: 27,
        name: "Jabón facial",
        description: "Refresca tu rostro diariamente con nuestro jabón facial. Limpia y revitaliza tu piel para un cutis saludable.",
        img: "assets/product-images/jabon_facial.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [3],
        availability: true
        },
    {
        id: 28,
        name: "Jabón manos trabajadoras",
        description: "Cuida tus manos con nuestro jabón especial para manos trabajadoras. Elimina la suciedad y deja tus manos suaves y protegidas.",
        img: "assets/product-images/jabon_manos_trabajadoras.jpeg",
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
    },
    {
        id: 29,
        name: "Jabón para pies de arcilla volcánica",
        description: "Revitaliza tus pies con nuestro jabón de arcilla volcánica. Disfruta de un cuidado refrescante y restaurador para tus pies.",
        img: 'assets/product-images/jabon_pies_arcilla_volcanica.jpeg',
        product_type: "jabones",
        product_benefits: ["Activa", "Hidrata", "Repone"],
        price: [1,2],
        availability: true
    }
]

//Categorias de Productos:
const productCategories = new Set();
products.forEach(product => {
    productCategories.add(product.product_type)
});
const productCategoriesArray = [...productCategories];


//Precios y Formatos de Productos:
const precios = {
    jabones : [
        {
            id:1,
            formato: "Barra (130 gr. en bolsita de lienzo)", 
            precio: 3000
        },
        {
            id:2,
            formato: "Barra (130 gr. sin packaging)",
            precio: 2800
        },  
        {
            id:3,
            formato: "Barra (60 gr. aprox.)",
            precio: 2000
        }
    ],
    jaboneras : [
        {
            id:1,
            formato: "Hilo", 
            precio: 2500
        },
        {
            id:2,
            formato: "Madera", 
            precio: 2800
        }
    ],
    accesorios : [
        {
            id:1,
            formato:"Con barra de jabón",
            precio: 5500
        }, 
        {
            id:2,
            formato:"Sin barra de jabón",
            precio: 3500
        },
        {
            id:3,
            formato: "Hilo", 
            precio: 2500
        },
        {
            id:4,
            formato: "Madera", 
            precio: 2800
        }
    ]
};

export default {
        products, 
        productCategoriesArray,
        precios
};