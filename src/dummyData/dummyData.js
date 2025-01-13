import { FaBuilding, FaLeaf, FaHome, FaHandsHelping } from "react-icons/fa";
import { MdSupport, MdMedicalServices, MdOutlineInfo } from "react-icons/md";
import card1_Img from "../assets/images/navbar/card1_img.jpg";
import card2_Img from "../assets/images/navbar/card2_img.jpg";
import workImg1 from "../assets/images/home/proof1.jpg";
// import workImg2 from "../assets/images/home/proof1.jpg";
// import workImg3 from "../assets/images/home/proof1.jpg";
import workImg4 from "../assets/images/home/proof1.jpg";
import user1Img from "../assets/images/home/user1.jpg";

export const navItems = [
  {
    label: "Product",
    dropdown: true,
    items: [
      {
        icon: FaLeaf,
        title: "Ayurveda",
        links: [
          { label: "Corporate Hospitals", link: "/products/ayurveda" },
          { label: "Teaching Hospitals", link: "/products/ayurveda" },
          {
            label: "Clinic Chains",
            link: "/products/ayurveda",
          },
        ],
      },
      {
        icon: MdMedicalServices,
        title: "Homeopathy",
        links: [
          { label: "Corporate Hospitals", link: "/products/homeopathy" },
          { label: "Teaching Hospitals", link: "/products/homeopathy" },
        ],
      },
      {
        icon: MdOutlineInfo,
        title: "Allopathy",
        links: [{ label: "Corporate Hospitals", link: "/products/allopathy" }],
      },
    ],
  },
  {
    label: "Get Support",
    dropdown: true,
    items: [
      {
        icon: MdSupport,
        title: "Customer Support",
        links: [
          { label: "Help Page", link: "/support/help" },
          { label: "Site Map", link: "/support/site-map" },
          { label: "Contact Form", link: "/support/contact-us" },
        ],
      },
      {
        icon: FaHandsHelping,
        title: "Resources",
        links: [
          { label: "FAQs", link: "/support/faqs" },
          { label: "Documentation", link: "/support/docs" },
          { label: "Tutorials", link: "/support/tutorials" },
        ],
      },
    ],
  },
  {
    label: "Company",
    dropdown: true,
    items: [
      {
        icon: FaBuilding,
        title: "About Us",
        links: [
          { label: "Our Team", link: "/about-us" },
          { label: "Our Vision", link: "/about-us" },
          { label: "Careers", link: "/careers" },
        ],
      },
      {
        icon: FaHome,
        title: "Company Overview",
        links: [
          { label: "History", link: "/about-us" },
          { label: "Leadership", link: "/about-us" },
          { label: "Core Values", link: "/about-us" },
        ],
      },
    ],
  },
];

export const leftCards = [
  {
    title: "Platform Overview",
    description: "Discover the Intelligent HR Platform",
    image: card1_Img,
    link: "#",
  },
  {
    title: "What's New",
    description: "Check out our most recent product releases",
    image: card2_Img,
    link: "#",
  },
];

export const footerData = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about-us" },
      { name: "Blogs", path: "/blogs" },
      { name: "Careers", path: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "FAQs", path: "/support/faqs" },
      { name: "Docs", path: "/support/docs" },
      { name: "Tutorials", path: "/support/tutorials" },
      { name: "Contact Us", path: "/support/contact-us" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "Medapps Overview", path: "/products" },
      { name: "Ayurveda Version", path: "/products/ayurveda" },
      { name: "Homeopathy Version", path: "/products/homeopathy" },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    clientName: "Creative Buddy",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum perspiciatis laboriosam cum libero nostrum, autem aliquam quas, placeat illo minus ipsam voluptatibus rerum quo? Tenetur doloribus accusamus eum, natus veniam recusandae omnis at ea rerum eligendi quae laudantium distinctio quam vero, reiciendis, quisquam repudiandae totam! Officiis aliquam reprehenderit molestias enim!",
    image: workImg1,
    userImg: user1Img,
  },
  {
    id: 2,
    clientName: "FinProd",
    text: "Lorem ipsum dolor sit, amet consectetur libero nostrum, autem aliquam quas, placeat illo minus ipsam voluptatibus rerum quo? Tenetur doloribus accusamus eum, natus veniam recusandae omnis at ea rerum eligendi quae laudantium distinctio quam vero, reiciendis, quisquam repudiandae totam! Officiis aliquam reprehenderit molestias enim!",
    image: card1_Img,
    userImg: user1Img,
  },
  {
    id: 3,
    clientName: "Personio",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam reprehenderit molestias enim!",
    image: card2_Img,
    userImg: user1Img,
  },
  {
    id: 4,
    clientName: "HubSpot",
    text: "Lorem ipsum dolor sit, amet con. Dolorum perspiciatis laboriosam cum libero nostrum, autem aliquam quas, placeat illo minus ipsam voluptatibus rerum quo? Tenetur dm, natus veniam recusandae omnis at ea rerum eligendi quae laudantium distinrit molestias enim!",
    image: workImg4,
    userImg: user1Img,
  },
];
