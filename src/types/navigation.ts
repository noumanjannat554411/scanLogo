export interface Product {
  image: any;
  title: string;
  price: string;
  type: string;
  url: string;
  modelUrl?: string | number;
}

export type RootStackParamList = {
  Splash: undefined;
  MallList: undefined;
  BrandList: {
    mallName: string;
  };
  Scanner: undefined;
  ProductDetails: {
    brand: string;
    products: Product[];
  };
  ProductDetailFull: {
    product: Product;
    brand: string;
  };
};
