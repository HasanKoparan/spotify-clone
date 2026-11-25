class API {
  async getPopular() {
    return this.getSearchMusic("neffex");
  }

  async getSearchMusic(query) {
    const url = new URL("http://127.0.0.1:3000/api/search");
    url.searchParams.set("q", query);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Arama isteği başarısız (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      alert(error.message);
      return [];
    }
  }
}

export default API;
