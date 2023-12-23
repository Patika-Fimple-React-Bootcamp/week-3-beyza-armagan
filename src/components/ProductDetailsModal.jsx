import PropTypes from "prop-types";
import styles from "./styles.module.css";

function ProductDetailsModal({ selectedProduct, onClose }) {
  if (!selectedProduct) {
    return null;
  }

  const { title, image, description, price, category, rating } =
    selectedProduct;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
        </div>
        <img src={image} alt={title} className={styles.productImg} />
        <p>{description}</p>
        <p style={{ fontSize: 25, fontWeight: 600 }}> ${price}</p>
        <p>Category: {category}</p>
        <p>Rate: {rating.rate}</p>
        <p>Rate Count {rating.count}</p>

        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

ProductDetailsModal.propTypes = {
  selectedProduct: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
  }),
  onClose: PropTypes.func.isRequired,
};

export default ProductDetailsModal;
