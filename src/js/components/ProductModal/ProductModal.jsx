// import React from 'react';
// import enums from '../../utils/enums/enums';
// import './style.css'; 

// function ProductModal({ selectedProduct, onClose }) {
//     if (!selectedProduct) return null;

//     return (
//         <div className="products_modal-modal" onClick={onClose}>
//             <div className="products_modal-modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button className="products_modal-close" onClick={onClose}>关闭</button>
//                 <div className="products_modal-modal-body">
//                     <img
//                         src={enums.urlEnums.defineUrl('image') + selectedProduct.category + '/' + selectedProduct.imageUrl}
//                         alt={selectedProduct.name}
//                         className="products_modal-modal-image"
//                     />
//                     <div className="products_modal-modal-details">
//                         <h2 className="products_modal-modal-title">{selectedProduct.name}</h2>
//                         <p className="products_modal-modal-price">价格：¥{selectedProduct.price}</p>
//                         <p className="products_modal-modal-description">{selectedProduct.description}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProductModal;
import React, { useState } from 'react';
import enums from '../../utils/enums/enums';
import './style.css'; 

function ProductModal({ selectedProduct, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Initialize outside conditional

    if (!selectedProduct) return null;

    const images = selectedProduct.imageUrl.split(','); // Assume image URLs are comma-separated

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="products_modal-modal" onClick={onClose}>
            <div className="products_modal-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="products_modal-close" onClick={onClose}>关闭</button>
                <div className="products_modal-modal-body">
                    <button
                        className="products_modal-left-button"
                        onClick={handlePreviousImage}
                        disabled={images.length <= 1} // Disable if there's only one image
                    >
                        &lt;
                    </button>
                    <img
                        src={enums.urlEnums.defineUrl('image') + selectedProduct.category + '/' + images[currentImageIndex]}
                        alt={`${selectedProduct.name} 图片`}
                        className="products_modal-modal-image"
                    />
                    <button
                        className="products_modal-right-button"
                        onClick={handleNextImage}
                        disabled={images.length <= 1} // Disable if there's only one image
                    >
                        &gt;
                    </button>
                    <div className="products_modal-modal-details">
                        <h2 className="products_modal-modal-title">{selectedProduct.name}</h2>
                        <p className="products_modal-modal-price">价格：¥{selectedProduct.price}</p>
                        <p className="products_modal-modal-description">{selectedProduct.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
