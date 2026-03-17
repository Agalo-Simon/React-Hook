import React, { useCallback, useEffect, useMemo, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 200)))
      .catch((err) => console.log(err));
  }, []);

  const FilteredProduct = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(filterQuery.toLowerCase()),
    );
  }, [products, filterQuery]);

  const handleSearch = useCallback((e) => {
    setFilterQuery(e.target.value);
  }, []);

  return (
    <div>
      <h3>{filterQuery}</h3>
      <input type="text" value={filterQuery} onChange={handleSearch} />
      <ul>
        {FilteredProduct.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
