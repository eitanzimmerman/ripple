import React from 'react';
import { ReactComponent as Cross } from '../../assets/cross.svg'
import './filter-card.styles.scss';

const FilterCard = ({item, removeItem}) => (
  <div className="filter-card">
    <span className="filter-card-text">
      {item.name}
    </span>
    <Cross id="cross-icon" onClick={() => removeItem(item.id)}/>
  </div>
);

export default FilterCard;