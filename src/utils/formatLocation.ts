type Location = {
  city?: string | null;
  state?: string | null;
  country?: string | null;
};

export function formatLocation({ city, state, country }: Location): string {
  const parts = [];

  if (city) {
    parts.push(city.trim());
  }

  if (state) {
    parts.push(state.trim());
  }

  if (country) {
    parts.push(country.trim());
  }

  return parts.join(', ');
}
