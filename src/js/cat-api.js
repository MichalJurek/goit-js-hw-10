const urlBreed = 'https://api.thecatapi.com/v1/breeds';
const urlImg = 'https://api.thecatapi.com/v1/images';

const API =
  'live_DUHL6U0C4HqaBKbTDszDIoy2BK3XmJTVQkl8CvbUWYbCzeT9mTVRShpfmo7XN42H';

const fetchBreeds = () => {
  return fetch(`${urlBreed}?api_key=${API}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

const fetchCatByBreed = breedId => {
  return fetch(`${urlImg}/${breedId}?api_key=${API}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export { fetchBreeds, fetchCatByBreed };
