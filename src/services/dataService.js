const dummyData = {
  name: "Ash Ketchum",
  email: "ash@pokemon.com",
  favoritePokemon: "Pikachu",
  trainerType: "Elite Trainer",
  region: "Kanto",
  birthday: "10/01/1997",
  badgeCount: 8,
  licenseID: "PKM-123-XYZ",
  signatureMove: "Thunderbolt",
  profileImage: "../assets/test/test_head.png", 
};

export const fetchTrainerData = async (uid) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData);
    }, 500);
  });
};
