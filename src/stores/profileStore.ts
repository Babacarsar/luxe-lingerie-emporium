import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Civilite = "Mme" | "M." | "";

export interface Profile {
  civilite: Civilite;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  adresse: string;
}

export const emptyProfile: Profile = {
  civilite: "",
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  ville: "",
  adresse: "",
};

interface ProfileStore {
  profile: Profile;
  save: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: emptyProfile,
      save: (profile) => set({ profile }),
    }),
    { name: "jofa-profile", storage: createJSONStorage(() => localStorage) }
  )
);
