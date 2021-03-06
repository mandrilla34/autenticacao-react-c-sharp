import { useEffect, useState } from "react";
import { getToken } from "../../services/auth.service";
import { getProducts } from "../../services/product.service";
import { Product } from "../../interfaces/Product";
import { Departamento } from "../../enums/departamento.enum";

export default function Products() {
    const [products, setProducts] = useState<Product[]>(null);
    useEffect(() => {
        let componentMounted = true;
        getProducts(getToken())
            .then((res) => {
                if (componentMounted) {
                    setProducts(res.data);

                }
            });
        return () => {
            componentMounted = true;
        };

    }, []);

    return (
        <>
            <p>Products</p>
            <ul>
                {
                    products ?
                        products.map((product, i) => {
                            return (
                                <li key={product.id_product}>
                                    {product.nome} |
                                    {
                                        Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)
                                    } |
                                    {Departamento[product.departamento]}

                                </li>
                            );
                        })
                        : null
                }
            </ul>
        </>
    );
}