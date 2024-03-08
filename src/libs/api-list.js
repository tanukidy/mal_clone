export const getAnimeResponse = async(resource, query) => {
  try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const anime = await response.json()
  return anime
}catch (error) {
  console.error('Error fetching anime:', error.message);
  return null;
}
};

export const getNestedAnimeResponse = async (resource, objectProperty) => {
 const response = await getAnimeResponse(resource)
 if (response && response.data) {
  return response.data.flatMap(item => item[objectProperty]);
} else {
  // Handle null response or return an empty array
  return [];
}
}

export const reproduce = (data, gap) => {
  const first = ~~(Math.random() * (data.length - gap) + 1)
  const last = first + gap

  const response = {
    data: data.slice(first, last)
  }

  return response
}


