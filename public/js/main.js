const form = document.querySelector("form");
const state = document.querySelector("#status");
const weather = document.querySelector("#weather");

const handleSubmit = async (event) => {
  event.preventDefault();

  state.textContent = "Loading ...";
  weather.textContent = "";

  const location = event.target.location.value;

  const result = await fetch(`/weather?address=${location}`);
  const data = await result.json();

  if (data.error) state.textContent = data.error;
  else {
    state.textContent = data.location;
    weather.textContent = data.weather;
  }
};

form.addEventListener("submit", (event) => handleSubmit(event));
