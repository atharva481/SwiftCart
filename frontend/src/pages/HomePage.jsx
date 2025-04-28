import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import AddProductModal from "../components/AddProductModal";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [fetchProducts, user, navigate]);

  return (
    <main className="max-w-6xl mx-auto px-4 pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent -mx-4 mb-12">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to SwiftCart</h1>
          <p className="text-lg text-base-content/80 max-w-xl mb-8">Discover amazing products at great prices. Your one-stop shop for all your needs.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        {isAdmin() && (
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById("add_product_modal").showModal()}
          >
            <PlusCircleIcon className="size-5 mr-2" />
            Add Product
          </button>
        )}
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      {isAdmin() && <AddProductModal />}

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="transform hover:-translate-y-1 transition-transform duration-300">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
export default HomePage;