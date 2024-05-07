import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt, faHatCowboy, faShoppingBag, faPaintBrush, faUtensils, faGlasses } from '@fortawesome/free-solid-svg-icons';
import './PopularCategories.css';

const CategoryIcon = ({ icon, label }) => (
  <div className="category-icon">
    <FontAwesomeIcon icon={icon} size="2x" />
    <div>{label}</div>
  </div>
);

const PopularCategories = () => {
  const icons = [
    { icon: faTshirt, label: 'T-Shirts' },
    { icon: faHatCowboy, label: 'Hats' },
    { icon: faShoppingBag, label: 'Bags' },
    { icon: faGlasses, label: 'Glasses' }
  ];

  return (
    <div className="popular-categories">
      <div className="header">
        <div className="title">Popular Categories</div>
        <button className="view-all">View All</button>
      </div>
      <div className="icons">
        {icons.map((item, index) => (
          <CategoryIcon key={index} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;