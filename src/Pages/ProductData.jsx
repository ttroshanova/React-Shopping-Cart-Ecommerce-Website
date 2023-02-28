import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Items } from './ProductsData'
import UserContext from './UserContext'
import { useContext } from 'react' 
import gsap from 'gsap'

const ProductData = () => {
  const { index } = useParams();
  const { addToCart } = useContext(UserContext);
  useEffect(() => {
    gsap.to('.descr-img', {opacity: 1, x: 0})
    gsap.to('.descr-item', {
      y: 0, 
      opacity: 1,
      stagger: 0.16
    })
  },[])

  return (
    <div className='product-data-container'>
      <div className="product-data-inner">
      <div className="img-container">
        <div className="img-container-inner">
          <img src={Items[index].src} className='descr-img'/>
        </div>
      </div>
      <div className="content">
        <div className="content-inner">
          <h2 className='descr-item'>{Items[index].name}</h2>
          <ul className='product-description'>
            {Items[index].description.map(item => (
              <li className='descr-item'><span className='dot'></span>{item}</li>
            ))}
          </ul>
          <button type='button' className='descr-item'
          onClick={() => addToCart(index, Items[index].name, Items[index].price, Items[index].src)}>
            Add to cart
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProductData