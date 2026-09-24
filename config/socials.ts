import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@namanbarkiya",
    icon: Icons.gitHub,
    link: "https://github.com/AminodinAkbari",
  },
  {
    name: "LinkedIn",
    username: "Amin Akbari",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/aminodin-akbari/",
  },
  // {
  //   name: "Twitter",
  //   username: "@aminodinakbari",
  //   icon: Icons.twitter,
  //   link: "https://twitter.com/aminodinakbari",
  // },
  {
    name: "Gmail",
    username: "naman.barkiya02",
    icon: Icons.gmail,
    link: "mailto:Aminoddinakbari.young2021@gmail.com",
  },
];
