const dummyData = {
  name: "Ash Ketchum",
  email: "ash@pokemon.com",
  favoritePokemon: "Pikachu",
  trainerType: "Elite Trainer",
  region: "Kanto",
  birthday: "10/01/1997",
  height: "5'7\"",
  weight: "135 lbs",
  badgeCount: 8,
  licenseID: "PKM-123-XYZ",
  trainerMotto: "Gotta Catch ‘Em All!",
  signatureMove: "Thunderbolt",
  favoriteItem: "Poké Ball",
  profileImage: "/assets/ash-profile.png", // Local image path
};

export const fetchTrainerData = async (uid) => {
  // Placeholder for future integration with AWS DynamoDB
  // For now, return dummy data after simulating a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData);
    }, 500); // Simulate network latency
  });
};
