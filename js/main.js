import API from "./api.js";
import UI from "./ui.js";

// Olusturulan class´larin örnegini al
const api = new API();
const ui = new UI();

// ! Sayfa yüklendigin de api istegi at
document.addEventListener("DOMContentLoaded", async () => {
  // loader render et
  ui.renderLoader();

  // Api istegi at
  const songs = await api.getPopular();

  ui.renderCards(songs);
});

// ! Formun gönderilmesini izle

ui.form.addEventListener("submit", async (e) => {
  // Sayfa yenilenmesini engelle
  e.preventDefault();

  // Input icerisindeki degere eris ve icerisindeki bosluklari kaldir
  const query = e.target[0].value.trim();

  // Eger query degeri yoksa uyari ver

  if (!query) {
    alert("Lütfen gecerli bir arama islemi gerceklestiriniz!!");

    return; // Fonksiyonu durdur
  }

  // Loader render et
  ui.renderLoader();

  // Arama sonucunda title´i güncelle
  ui.sectionTitle.textContent = `${query} icin sonuclar`;

  //  Aratilan kelime ile api istegi at
  const songs = await api.getSearchMusic(query);

  // Api´dan gelen veri ile arayüzu renderla

  ui.renderCards(songs);
});

// ! musicList kismindaki tiklanmalari izle

ui.musicList.addEventListener("click", (e) => {
  // play ikonuna tiklandi mi ?
  if (e.target.closest(".play")) {
    // Tiklanilan elemaninin kapsayicisi olan card elemaninina eris
    const card = e.target.closest(".card");

    // Card´a atanan data özelliklerine eris
    const songData = card.dataset;

    // Player kismini render et
    ui.renderPlayer(songData);
  }
});
