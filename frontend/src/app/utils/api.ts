const API_URL = "https://e-commerce-store-two-fawn.vercel.app";

export async function signup(
  username: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products/`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

export const fetchCart = async (id: number) => {
  const response = await fetch(`${API_URL}/cart/${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  return response.json();
};

export const fetchCheckout = async (id: number) => {
  const response = await fetch(`${API_URL}/checkout/${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch checkout");
  }
  return response.json();
};
