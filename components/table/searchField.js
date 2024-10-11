'use client'

import * as React from 'react';
import { FaSearch } from 'react-icons/fa';




export default function SearchField({ searchField, handleChange }) {


  return (

    <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
      type="text"
      onChange={handleChange} 
      value={searchField}
      name="search"
      placeholder="fulltext" 
      style={{
        padding: '8px 12px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        outline: 'none',
        width: '100%',
        maxWidth: '300px',
      }}
    />
    <div style={{ marginLeft: '8px' }}>
      <FaSearch /> 
    </div>
  </div>
);
    
   

}
