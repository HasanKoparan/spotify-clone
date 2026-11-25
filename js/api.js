class API {
  async getPopular() {
    return this.getSearchMusic("neffex");
  }

  async getSearchMusic(query) {
    const apiBaseUrl =
      window.location.hostname === "127.0.0.1"
        ? "http://127.0.0.1:3000"
        : "https://spotify-clone-qiyi.onrender.com";

    const url = new URL("/api/search", apiBaseUrl);
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
