import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { Trash2Icon, ShoppingCartIcon } from "lucide-react";

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  const { isAdmin } = useAuthStore();
  const { addToCart } = useCartStore();

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl group relative overflow-hidden transition-all duration-300">
      <figure className="h-56 bg-base-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </figure>

      <div className="card-body p-6">
        <Link to={`/product/₹{product.id}`}>
          <h2 className="card-title text-lg font-semibold hover:text-primary transition-colors">{product.name}</h2>
        </Link>
        <p className="text-2xl font-bold text-primary mt-2">₹{product.price}</p>

        {!isAdmin() && (
          <button
            className="btn btn-primary w-full gap-2 mt-4 hover:brightness-110 transition-all"
            onClick={() => addToCart(product)}
          >
            <ShoppingCartIcon className="size-4" />
            Add to Cart
          </button>
        )}

        {isAdmin() && (
          <button
            className="btn btn-circle btn-sm btn-error absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;