const posts = [
  {
    id: 800,
    title: "This is 💩",
    status: "published",
  },
  {
    id: 801,
    title: "Pooing is a natural thing.",
    status: "published",
  },
  {
    id: 802,
    title: "Poo jokes are getting irritating",
    status: "published",
  },
];

const [firstItem, secondItem] = posts;
const {
  id,
  title: content,
  description = "nothing is better than leaving the description empty",
} = firstItem;

console.log(description);
