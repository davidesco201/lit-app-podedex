import { capitalize } from "../utils/capitalize";

const typeColors: { [key: string]: string } = {
  normal: "#A8A77A",
  fighting: "#C22E28",
  flying: "#A98FF3",
  poison: "#A33EA1",
  ground: "#E2BF65",
  rock: "#B6A136",
  bug: "#A6B91A",
  ghost: "#735797",
  steel: "#B7B7CE",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  psychic: "#F95587",
  ice: "#96D9D6",
  dragon: "#6F35FC",
  dark: "#705746",
  fairy: "#D685AD",
  stellar: "#FFD700",
  unknown: "#68A090",
  shadow: "#3B3B98",
};

export default function getColorByType(type: string): string {
  return typeColors[type.toLocaleLowerCase()] || "#000000";
}

export const capitalizedTypes = Object.keys(typeColors).map((type) =>
  capitalize(type)
);
