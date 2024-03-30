

interface Product {
    name: string,
    image: string,
    description: string,
    price: number,
    quantitySale: number,
    sellSaleProduct: number,
    isHot: boolean,
    isSale: boolean,
    category: {
        name: string,
        _id: string
    }
}

export type { Product }

