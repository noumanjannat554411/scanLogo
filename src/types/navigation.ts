export interface Product {
  image: any;
  title: string;
  price: string;
  type: string;
  url: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Scanner: undefined;
  ProductDetails: {
    brand: string;
    products: Product[];
  };
};
