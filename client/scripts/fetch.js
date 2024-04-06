const worksURL = "http://localhost:5678/api/works";
const categoriesURL = "http://localhost:5678/api/categories";
/**
 * Fetches works.
 * @returns {Promise<WorksDataType[]>}
 */
export const getWorks = async () => {
  const response = await fetch(worksURL);
  return await response.json();
};

/**
 * Fetches categories.
 * @returns {Promise<CategoryType[]>}
 */
export const getCategories = async () => {
  const response = await fetch(categoriesURL);
  return await response.json();
};

export { getWorks, getCategories };
