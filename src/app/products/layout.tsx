import { LayoutProps } from "@/config/types";
import ProductsLayout from "@/modules/layouts/products-layout";

const ProductsLayoutMain = ({ children }: LayoutProps) => {
  return <ProductsLayout>{children}</ProductsLayout>;
};
export default ProductsLayoutMain;
