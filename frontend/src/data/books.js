import aws from "../assets/books/aws.png";
import docker from "../assets/books/docker.png";
import kubernetes from "../assets/books/kubernetes.png";
import react from "../assets/books/react.png";

const books = [
  {
    id: 1,
    title: "AWS for Beginners",
    author: "John Carter",
    category: "Cloud",
    description: "Learn AWS from scratch with hands-on projects.",
    price: 499,
    originalPrice: 799,
    rating: 4.8,
    reviews: 248,
    bestseller: true,
    stock: 15,
    image: aws,
  },
  {
    id: 2,
    title: "Docker Mastery",
    author: "James Miller",
    category: "DevOps",
    description: "Master Docker containers and DevOps workflow.",
    price: 799,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 186,
    bestseller: true,
    stock: 12,
    image: docker,
  },
  {
    id: 3,
    title: "Kubernetes Guide",
    author: "David Wilson",
    category: "Cloud",
    description: "Deploy scalable cloud-native applications.",
    price: 999,
    originalPrice: 1399,
    rating: 4.9,
    reviews: 322,
    bestseller: false,
    stock: 10,
    image: kubernetes,
  },
  {
    id: 4,
    title: "React Complete Guide",
    author: "Andrew Clark",
    category: "Frontend",
    description: "Become a React developer from beginner to advanced.",
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    reviews: 271,
    bestseller: true,
    stock: 20,
    image: react,
  },
];

export default books;