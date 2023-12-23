import PropTypes from "prop-types";
import EditProduct from "./EditProduct";
import styles from "./styles.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProductDetailsModal from "./ProductDetailsModal";

export default function ProductsList({ data, setData }) {
  const [editProductId, setEditProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (productId) => {
    setEditProductId(productId);
  };

  const handleEditCancel = () => {
    setEditProductId(null);
  };

  const handleDelete = (productId) => {
    const updatedData = data.filter((item) => item.id !== productId);
    setData(updatedData);
  };

  const handleDetailsClick = (productId) => {
    const product = data.find((item) => item.id === productId);
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return data ? (
    <ul>
      <div className={`productList ${styles.productList}`}>
        {data.map((item) => (
          <li key={item.id}>
            <div className={styles.productItem}>
              <div>
                <div className={styles.itemTitle}>
                  <p>{item.title}</p>
                  <div className={styles.ratingCircle}>
                    <FontAwesomeIcon icon={faStar} />
                    <span>{item.rating.rate}</span>
                  </div>
                </div>

                <img src={item.image} className={styles.productImg} />
              </div>

              <p style={{ fontSize: 25, fontWeight: 600 }}> ${item.price}</p>

              <div className={styles.mainPageButtons}>
                <button
                  className={styles.button}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleEditClick(item.id)}
                >
                  Edit
                </button>
                <button
                  className={styles.button}
                  onClick={() => handleDetailsClick(item.id)}
                >
                  Details
                </button>
              </div>
            </div>
            {editProductId === item.id && (
              <EditProduct
                data={data}
                setData={setData}
                productId={editProductId}
                onCancel={handleEditCancel}
              />
            )}
          </li>
        ))}
      </div>
      {selectedProduct !== null && (
        <ProductDetailsModal
          selectedProduct={selectedProduct}
          onClose={handleCloseDetails}
        />
      )}
    </ul>
  ) : (
    <p style={{ fontSize: 20, fontWeight: 600 }}>Loading...</p>
  );
}

ProductsList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      category: PropTypes.string,
      image: PropTypes.string,
      rating: PropTypes.shape({
        rate: PropTypes.number,
        count: PropTypes.number,
      }),
    })
  ),
  setData: PropTypes.func,
};
