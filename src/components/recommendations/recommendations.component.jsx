import React from 'react';
import './recommendations.style.scss';

import FilterCard from '../filterCard/filter-card.component';


const Recommendations = ({recommendationsData, removeItem}) => (
  <div className="recommendations">
    {recommendationsData.map((item) => {
      return (
        <FilterCard
          key={item.id}
          item={item}
          removeItem={removeItem}
        />
      );
    })}
  </div>
);

export default Recommendations;