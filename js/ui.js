// UI js ile arayüzdeki elemanlari renderlamak icin yine arayüzdeki elemanlari birarada tutmak icin kullanilir.

class UI {
  // Kurucu metod
  constructor() {
    // html´deki elemanlara eris
    this.musicList = document.querySelector("#music-list");
    this.form = document.querySelector("form");
    this.sectionTitle = document.querySelector("#section-title");
    this.player = document.querySelector(".player");
  }

  // Api´dan gelen veriler ile arayüzü renderlayan fonksiyon
  renderCards(songs) {
    // Arayüzü sifirla
    this.musicList.innerHTML = "";

    // Disaridan verilen sarki verisinin icerisindeki her eleman icin bir html olustur
    songs.forEach((song) => {
      // Bir tane card elemani olustur
      const card = document.createElement("div");

      // Olusturulan card elemanina class ata
      card.className = "card";

      // * card elemanina sarkiya ait resim, title, sarkici veya grup adi, mp3 bilgilerini ata
      card.dataset.title = song.name;
      card.dataset.subtitle = song.artistName;
      card.dataset.mp3 = song.previews?.[0]?.url ?? "";

      // Olusturulan, class atanan elemanin Html´ini belirle
      const coverUrl = song.artwork.url
        .replace("{w}", "400")
        .replace("{h}", "400");
      card.dataset.image = coverUrl;
      card.innerHTML = `<figure>
                <img
                  src="${coverUrl}"
                  alt="card-image"
                />
                <div class="play">
                  <i class="bi bi-play-fill"></i>
                </div>
              </figure>

              <div class="card-info">
                <h4>${song.name}</h4>
                <h4>${song.artistName}</h4>
              </div>`;

      // Olusturulan, class atanan, Html icerigi belirlenen elemani arayüze ekle
      this.musicList.appendChild(card);
    });
  }

  // Loader render eden fonksiyon
  renderLoader() {
    this.musicList.innerHTML = `
<div class="loader">
  <div class="cell d-0"></div>
  <div class="cell d-1"></div>
  <div class="cell d-2"></div>

  <div class="cell d-1"></div>
  <div class="cell d-2"></div>
  
  
  <div class="cell d-2"></div>
  <div class="cell d-3"></div>
  
  
  <div class="cell d-3"></div>
  <div class="cell d-4"></div>
  
  
</div>`;
  }

  // Player kismini dinamik sekilde renderlayan fonksiyon
  renderPlayer(data) {
    // Arayüzdeki player kismini dinamik sekilde renderla
    this.player.innerHTML = `    <div class="info">
        <img
          src="${data.image}"
          alt="music-image"
          id="music-image"
        />
        <div>
          <h5 id="music-title">${data.title}</h5>
          <p id="artist-title">${data.subtitle}</p>
        </div>
      </div>

      <audio
        src="${data.mp3}"
        id="music-sound"
        controls
        autoplay
      ></audio>

      <div class="icons">
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-boombox"></i>
        <i class="bi bi-pc-display"></i>
      </div>`;

    // Audio elemanina eris

    const audioElement = document.querySelector("#music-sound");

    // Audio elemanin oynatilma ve durdurulma olayini takip et
    audioElement.addEventListener("play", () => {
      // Animasyon eklenecek elemana eris
      const image = document.querySelector("#music-image");

      // Erisilen resim´e animasyon ekle-cikar
      image.classList.add("animate");
    });

    audioElement.addEventListener("pause", () => {
      const image = document.querySelector("#music-image");

      // Erisilen resim´e animasyon ekle-cikar
      image.classList.remove("animate");
    });
  }
}

export default UI;
