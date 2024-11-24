export const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.API_KEY}`,
};

class MoviesAPIHandler {
  getTrending = () =>
    fetch(`${process.env.BASE_URL}/trending/all/week?language=en-EG`, {
      headers: defaultHeaders,
    })
    .then(res => res.json());
}

export default new MoviesAPIHandler();