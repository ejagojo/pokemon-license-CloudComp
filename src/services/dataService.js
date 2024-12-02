import testHead from "../assets/test/test_head.png";

const dummyData = {
  name: "Ash Ketchum",
  email: "ash@pokemon.com",
  pokemon1: "Pikachu",
  pokemon2: "Charizard",
  pokemon3: "Squirtle",
  trainerType: "Elite Trainer",
  region: "Kanto",
  birthday: "10/01/1997",
  badgeCount: 8,
  licenseID: "PKM-123-XYZ",
  signatureMove: "Thunderbolt",
  profileImage: testHead 
};

export const fetchTrainerData = async (uid) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData);
    }, 500);
  });
};
