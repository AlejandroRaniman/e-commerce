const BASE_URL = 'http://127.0.0.1:5000';


// 登录函数
export const loginUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in loginUser:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
      const response = await fetch(`http://127.0.0.1:5000/auth/products/${category}`);
      if (!response.ok) {
          throw new Error('Failed to fetch products');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching products:', error);
  }
};


// 获取受保护数据的函数
export const fetchProtectedData = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};
