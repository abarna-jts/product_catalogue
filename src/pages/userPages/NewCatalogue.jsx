import React, { useState } from 'react';

const NewCatalogue = () => {
  const [catalogueName, setCatalogueName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [logo, setLogo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [companyAddress, setCompanyAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // Function to add new category
  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  // Function to add new product
  const addProduct = () => {
    if (selectedCategory && productName && productDescription && productPrice && discountPercentage) {
      const newProduct = {
        category: selectedCategory,
        name: productName,
        description: productDescription,
        price: productPrice,
        discount: discountPercentage,
        image: productImage
      };
      setProducts([...products, newProduct]);
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setDiscountPercentage("");
      setProductImage(null);
    }
    console.log(products);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle files and text data
    const formData = new FormData();
    formData.append('catalogueName', catalogueName);
    formData.append('companyName', companyName);
    formData.append('aboutCompany', aboutCompany);
    formData.append('logo', logo);
    formData.append('categories', JSON.stringify(categories));
    formData.append('companyAddress', companyAddress);
    formData.append('emailAddress', emailAddress);
    formData.append('contactNumber', contactNumber);

    // Add products to FormData
    products.forEach((product, index) => {
      formData.append(`products[${index}][category]`, product.category);
      formData.append(`products[${index}][name]`, product.name);
      formData.append(`products[${index}][description]`, product.description);
      formData.append(`products[${index}][price]`, product.price);
      formData.append(`products[${index}][discount]`, product.discount);
      formData.append(`products[${index}][image]`, product.image);
    });

    try {
      const response = await fetch('/api/catalog', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit catalog');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting catalog');
    }
  };

  return (
    <main className='p-8 mt-10 sm:mt-14'>
      <h2 className='text-3xl font-bold text-gray-600'>New Product Catalogue Creation</h2>
      <div className='p-5 my-4 border border-gray-300 rounded-lg'>
        <form action="" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className='flex flex-col space-y-4'>
            <div>
              <label htmlFor="catalogue_name">Catalogue Name</label>
              <input
                type="text"
                name='catalogue_name'
                value={catalogueName}
                onChange={(e) => setCatalogueName(e.target.value)}
                required
                className='border p-2 w-full'
              />
            </div>
            <div>
              <label htmlFor="company_name">Company Name</label>
              <input
                type="text"
                name='company_name'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className='border p-2 w-full'
              />
            </div>
            <div>
              <label htmlFor="about_company">About Company</label>
              <textarea
                name='about_company'
                value={aboutCompany}
                onChange={(e) => setAboutCompany(e.target.value)}
                className='border p-2 w-full'
              />
            </div>
            <div>
              <label htmlFor="logo">Logo</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
                className='border p-2 w-full'
              />
            </div>
          </div>

          {/* Categories Section */}
          <div className='my-4'>
            <label htmlFor="product_category">Product Category</label>
            <div className='flex space-x-2'>
              <input
                type="text"
                name='product_category'
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className='border p-2 flex-1'
              />
              <button type="button" onClick={addCategory} className='bg-blue-500 text-white p-2 rounded'>Create Category</button>
            </div>
          </div>

          {/* Category Dropdown */}
          {categories.length > 0 && (
            <div className='my-4'>
              <label htmlFor="category_select">Select Category</label>
              <select
                name="category_select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='border p-2 w-full'
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          )}

          {/* Product Form (Nested) */}
          {selectedCategory && (
            <div className='border border-gray-300 p-4 rounded-lg my-4'>
              <h3 className='text-xl font-semibold mb-2'>Add Product under {selectedCategory}</h3>
              <div className='flex flex-col space-y-2'>
                <div>
                  <label htmlFor="product_name">Product Name</label>
                  <input
                    type="text"
                    name="product_name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className='border p-2 w-full'
                  />
                </div>
                <div>
                  <label htmlFor="product_description">Product Description</label>
                  <textarea
                    name="product_description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className='border p-2 w-full'
                  />
                </div>
                <div>
                  <label htmlFor="product_price">Product Price</label>
                  <input
                    type="number"
                    name="product_price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className='border p-2 w-full'
                  />
                </div>
                <div>
                  <label htmlFor="discount_percentage">Discount Percentage</label>
                  <input
                    type="number"
                    name="discount_percentage"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    className='border p-2 w-full'
                  />
                </div>
                <div>
                  <label htmlFor="product_image">Product Image</label>
                  <input
                    type="file"
                    name="product_image"
                    accept="image/*"
                    onChange={(e) => setProductImage(e.target.files[0])}
                    className='border p-2 w-full'
                  />
                </div>
                <button type="button" onClick={addProduct} className='bg-green-500 text-white p-2 mt-2 rounded'>Add Product</button>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className='flex flex-col space-y-4 mt-4'>
            <div>
              <label htmlFor="company_address">Company Address</label>
              <textarea
                name='company_address'
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                className='border p-2 w-full'
              />
            </div>
            <div>
              <label htmlFor="email_address">Email Address</label>
              <input
                type="email"
                name='email_address'
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className='border p-2 w-full'
              />
            </div>
            <div>
              <label htmlFor="contact_number">Contact Number</label>
              <input
                type="tel"
                name='contact_number'
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className='border p-2 w-full'
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewCatalogue;
