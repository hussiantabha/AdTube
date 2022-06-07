import { v4 as uuid } from "uuid";
/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */

export const videos = [
  {
    _id: "74b6d67f-a94b-4286-b3af-9e6a703dc08a",
    title: "TATA vs Reliance Business War",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    creator: "Think School",
    avatar_url: "../assets/think-school.jpg",
    video_url: "https://www.youtube.com/embed/eLT1To94V-Q",
    thumbnail: "../assets/reliance.jpg",
    views: "300K",
    uploaded: "2 days ago",
    uploadedDate: "12-04-2022",
    duration: "13:31",
  },
  {
    _id: "6a88e77f-4ade-432f-ba42-e41c9b0bf83b",
    title: "The Full Story of MrBeast",
    creator: "Colin and Samir",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    uploaded: "6 months ago",
    uploadedDate: "29-09-2021",
    avatar_url: "../assets/colin.jpg",
    video_url: "https://www.youtube.com/embed/c8VcUnz3nVc",
    thumbnail: "../assets/beast.jpg",
    views: "9.7M",
    duration: "1:55:32",
  },
  {
    _id: "58753c90-b05d-48e9-973a-edc013863bf6",
    title: "Joe Rogan Experience #1309 - Naval Ravikant",
    uploadedDate: "23-11-2020",
    creator: "PowerfulJRE",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    views: "7.7M views",
    uploaded: "2 Years ago",
    avatar_url: "../assets/joe.jpg",
    video_url: "https://www.youtube.com/embed/3qHkcs3kG44",
    thumbnail: "../assets/sddefault.jpg",
    duration: "2:11:57",
  },
  {
    _id: "40d68dad-8890-48e3-ba1e-5c1319d717e4",
    title: "Joe Rogan Experience #1169 - Elon Musk",
    creator: "PowerfulJRE",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    views: "54M views",
    uploaded: "3 Years ago",
    uploadedDate: "07-09-2018",
    avatar_url: "../assets/joe.jpg",
    video_url: "https://www.youtube.com/embed/ycPr5-27vSI",
    thumbnail: "../assets/elon.jpg",
    duration: "2:37:03",
  },
  {
    _id: "a6bb4757-26a5-4275-98f0-dd74ef7ed1f8",
    title:
      "Kunal Shah Of Indian Unicorn - CRED On Start-Ups & Productivity Hacks",
    creator: "BeerBiceps",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    views: "485K views",
    uploaded: "8 months ago",
    uploadedDate: "18-08-2018",
    avatar_url: "../assets/beerbiceps.jpg",
    video_url: "https://www.youtube.com/embed/xgY1AfUL55k",
    thumbnail: "../assets/kunal.jpg",
    duration: "1:21:42",
  },
  {
    _id: "f91181d4-2feb-4355-9961-7e0cc0eb829a",
    title: "Students Se Pange Mat Lo | Stand Up Comedy | Tanmay Bhat",
    creator: "Tanmay Bhat",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    views: "7M views",
    uploaded: "2 Years ago",
    uploadedDate: "27-12-2018",
    avatar_url: "../assets/tanmay.jpg",
    video_url: "https://www.youtube.com/embed/4H5dtevdkEY",
    thumbnail: "../assets/standup-tanmay.jpg",
    duration: "7:04",
  },
  {
    _id: "a09e7c90-892a-4666-bfde-3a3b01bd15fe",
    title:
      "Sarojini Nagar | Excuse Me Brother | Stand-Up Comedy by Aakash Gupta",
    creator: "Akash Gupta",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    views: "24M views",
    uploaded: "1 Years ago",
    uploadedDate: "02-07-2020",
    avatar_url: "../assets/akash.jpg",
    video_url: "https://www.youtube.com/embed/KBZfnt80s54",
    thumbnail: "../assets/standup-akash.jpg",
    duration: "10:31",
  },
];
