const API_URL = "https://6af34a76d2377d6c3704d720.mockapi.io/channals";

const response = await fetch(API_URL);
const channels = await response.json();

for (const channel of channels) {
  const res = await fetch(`${API_URL}/${channel.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isFavorite: false, isBlacklisted: false }),
  });
  console.log(channel.name, "→", res.status);
  
}