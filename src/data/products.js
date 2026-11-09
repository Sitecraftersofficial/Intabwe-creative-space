import img1 from "../assets/media/PE_1011208_4bb8009ec7.jpg";
import img2 from "../assets/media/PH_208267_7706f9c2d0.jpg";
import img3 from "../assets/media/PH_209046_081770bec8.jpg";
import img4 from "../assets/media/PH_209273_9fe60ccd35.jpg";
import img5 from "../assets/media/PH_209274_28dc7fb7a6.jpg";
import img6 from "../assets/media/PH_210082_3b5094b6b6.jpg";
import img7 from "../assets/media/PH_210111_cca4f68015.jpg";
import img8 from "../assets/media/PH_210613_85be68e8ec.jpg";
import img9 from "../assets/media/PH_300363_f50a239561.jpg";

export const PRODUCTS = [
  { id: "sample-01", name: "Product 01", category: "Furniture", image: img1 },
  { id: "sample-02", name: "Product 02", category: "Furniture", image: img2 },
  { id: "sample-03", name: "Product 03", category: "Storage", image: img3 },
  { id: "sample-04", name: "Product 04", category: "Home accessories", image: img4 },
  { id: "sample-05", name: "Product 05", category: "Furniture", image: img5 },
  { id: "sample-06", name: "Product 06", category: "Lighting", image: img6 },
  { id: "sample-07", name: "Product 07", category: "Home accessories", image: img7 },
  { id: "sample-08", name: "Product 08", category: "Textiles", image: img8 },
  { id: "sample-09", name: "Product 09", category: "Furniture", image: img9 },
];

export const PRODUCT_CATEGORIES = [
  "All products",
  ...new Set(PRODUCTS.map((product) => product.category)),
];
