import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slice/cartSlice';
import style from './Search.module.scss'
import { Link } from 'react-router-dom';

const Search = () => {
    const dispatch = useDispatch();

      const handleAddToCart = (item: any) => {
        dispatch(addToCart({...item, quantity: 1}));
      }

  return (
    <div>
      <h1>wyników dla: </h1>
      {/* {filteredItems.map(item => (
        <div className={style.mainElement} key={item.id}>
          <h2>{item.title}</h2>
          <p>Cena: {item.price}</p>
          <img src={item.img} alt={item.title} />
            <div>
            <Link to={`/item/${item.id}`}>
            Zobacz szczegóły
          </Link>
              <button onClick={() => handleAddToCart(item)}>Dodaj do koszyka</button>
            </div>
        </div>
      ))} */}
    </div>
  )
}

export default Search
