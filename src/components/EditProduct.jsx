import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditField from "./EditField";

export default function EditProduct({ data, setData, productId, onCancel }) {
  const editProduct = data.find((product) => product.id === productId);
  const [editedProduct, setEditedProduct] = useState(editProduct);
  /*
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
*/
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // check if the prop is nested
    if (name.includes(".")) {
      const [nestedProp, nestedKey] = name.split(".");
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [nestedProp]: {
          ...prevProduct[nestedProp],
          [nestedKey]: value,
        },
      }));
    } else {
      // if not nested directly update
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleCancel = () => {
    // TODO: close modal
    onCancel();
  };

  const handleSave = () => {
    try {
      setData((prevData) =>
        prevData.map((product) =>
          product.id === productId ? editedProduct : product
        )
      );
      toast.success("Product saved successfully!", {
        autoClose: 3000,
        onClose: onCancel,
      });
    } catch (error) {
      toast.error(`Save failed: ${error.message}`);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Product</h2>
        <EditField
          name="title"
          label="Title:"
          defaultValue={editProduct.title}
          onChange={handleInputChange}
          styleName={styles.editProductField}
          type="input"
        />
        <EditField
          name="price"
          label="Price:"
          defaultValue={editProduct.price}
          onChange={handleInputChange}
          styleName={styles.editProductField}
          type="input"
        />
        <EditField
          name="description"
          label="Description:"
          defaultValue={editProduct.description}
          onChange={handleInputChange}
          styleName={styles.editProductField}
          type="textarea"
        />
        <EditField
          name="category"
          label="Category:"
          defaultValue={editProduct.category}
          onChange={handleInputChange}
          styleName={styles.editProductField}
          type="input"
        />
        <EditField
          name="image"
          label="Image URL:"
          defaultValue={editProduct.image}
          onChange={handleInputChange}
          styleName={styles.editProductField}
          type="input"
        />
        <EditField
          name="rating.rate"
          label="Rate:"
          defaultValue={editProduct.rating.rate}
          onChange={handleInputChange}
          styleName={styles.editProductField}
          type="input"
        />
        <EditField
          name="rating.count"
          label="Rate Count:"
          defaultValue={editProduct.rating.count}
          onChange={handleInputChange}
          styleName={styles.editProductField}
          type="input"
        />
        <div className={styles.editProductButtons}>
          <button className={styles.button} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.button} onClick={handleSave}>
            Save
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

EditProduct.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.string,
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
  productId: PropTypes.number,
  onCancel: PropTypes.func,
};
