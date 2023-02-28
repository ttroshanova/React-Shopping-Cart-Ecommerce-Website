import React, { useEffect, useContext, useRef } from 'react'
import UserContext from './UserContext'
import * as Iolos from "react-icons/io"

const Cart = () => {
    const {items, setItems} = useContext(UserContext);
    const splide = useRef();
    const itemContainer = useRef();
    const cartItems = useRef();
    const incrementor = useRef(0);
    const cartItemsInnerContainer = useRef();


    const lastItem = items[items.length - 1];
    const disableButtonPrev = () => {
        cartItems.current.children[0].style.pointerEvents = 'none';
        cartItems.current.children[0].style.color = 'rgb(193, 193, 193)';
    }

    const disableButtonNext = () => {
        cartItems.current.children[2].style.pointerEvents = 'none';
        cartItems.current.children[2].style.color = 'rgb(193, 193, 193)';
    }

    const enableButtonPrev = () => {
        cartItems.current.children[0].style.pointerEvents = 'all';
        cartItems.current.children[0].style.color = 'rgb(27, 31, 35)';
    }

    const enableButtonNext = () => {
        cartItems.current.children[2].style.pointerEvents = 'all';
        cartItems.current.children[2].style.color = 'rgb(27, 31, 35)';
    }

    useEffect(() => {
        if(!itemContainer?.current) return
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(!lastItem && !entry.isIntersecting) {
                    enableButtonNext();
                } else if(lastItem && entry.isIntersecting) {
                    disableButtonNext();
                }
            })
        }, {
            root: cartItemsInnerContainer.current,
            threshold: 1
        })
        observer.observe(itemContainer.current)
    },[itemContainer, lastItem])


    useEffect(() => {
        if(items.length === 1){
            disableButtonNext();
        }
        if(splide.current.clientWidth < cartItemsInnerContainer.current.clientWidth) {
            disableButtonNext();
        } else {
            enableButtonNext();
        }
        console.log(splide.current.clientWidth)
    })
 
    const removeItem = (index) => {
        setItems(items.filter(item => item.index !== index))
        console.log( items.length)
    }

    const addContent = () => {
        if(items.length >= 1 || items.length === 0) {
            return <h2>You have {items.length} items in you cart</h2>
        }
    }

    const moveItemsLeft = () => {
            incrementor.current = incrementor.current - 1;
            enableButtonNext();
            console.log(incrementor)
            if(incrementor.current === 0 && splide.current.clientWidth < cartItemsInnerContainer.current.clientWidth){
                disableButtonPrev();
                disableButtonNext();
            }
            if(incrementor.current === 0){
                disableButtonPrev();
            }
            splide.current.style.transform = `translateX(-${(splide.current.children[0].clientWidth + 30) * incrementor.current}px)`;
        }
    const moveItemsRight = () => {
        incrementor.current = incrementor.current + 1;
           console.log(incrementor)
           enableButtonPrev();
            if(incrementor.current == items.length - 1){
                disableButtonNext();
            }
            splide.current.style.transform = `translateX(-${(splide.current.children[0].clientWidth + 30) * incrementor.current}px)`;
        }
  return (
    <div className='cart-content-wrapper'>
        <div className="cart-title">
            {addContent()}
        </div>
        <div className='cart-items' ref={cartItems}>
            <Iolos.IoIosArrowDropleft className='arrow-left arrow' onClick={moveItemsLeft}/>
            <div className="cart-items-inner-container" ref={cartItemsInnerContainer}>
                <div className="cart-items-inner">
                    <div className='cart-items-splide' ref={splide}>
                        {items.map((item, index) => (
                        <div className='item-container' key={index} ref={itemContainer}>
                            <div className='cart-img-container'>
                                <img src={item.source} alt='cart-image'/>
                            </div>
                            <div className="cart-content">
                                <div className="cart-info">
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-price">${item.price}</p>
                                </div>
                                <div className="btn-container">
                                    <button className="remove-item" onClick={() => removeItem(item.index)}>
                                        <span>Remove</span>
                                        <span>from cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <Iolos.IoIosArrowDropright className='arrow-right arrow' onClick={moveItemsRight}/>
        </div>
    </div>
  )
}

export default Cart
