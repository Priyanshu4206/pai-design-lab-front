import { FaBuilding, FaLeaf, FaHome, FaHandsHelping } from "react-icons/fa";
import { MdSupport, MdMedicalServices, MdOutlineInfo } from "react-icons/md";
import workImg1 from "../assets/images/home/proof1.jpg";
// import workImg2 from "../assets/images/home/proof1.jpg";
// import workImg3 from "../assets/images/home/proof1.jpg";
import workImg4 from "../assets/images/home/proof1.jpg";
import user1Img from "../assets/images/home/user1.jpg";

import banquetImg1 from "../assets/images/BANQUET_HALL_ENGLAND/IMG_9793.jpg";
import banquetImg2 from "../assets/images/BANQUET_HALL_ENGLAND/IMG_9794.jpg";
import banquetImg3 from "../assets/images/BANQUET_HALL_ENGLAND/IMG_9795.jpg";
import banquetImg4 from "../assets/images/BANQUET_HALL_ENGLAND/IMG_9796.jpg";

import mukeshResidenceImg1 from "../assets/images/MUKESH_RESIDENCE/C-11_VIEW.jpg";
import mukeshResidenceImg2 from "../assets/images/MUKESH_RESIDENCE/C-11_VIEW1.jpg";

import rajdeepOfficeimg1 from "../assets/images/RAJDEEP_OFFICE_LUCKNOW/L6.jpg";
import rajdeepOfficeimg2 from "../assets/images/RAJDEEP_OFFICE_LUCKNOW/L9.jpg";
import rajdeepOfficeimg3 from "../assets/images/RAJDEEP_OFFICE_LUCKNOW/L11.jpg";
import rajdeepOfficeimg4 from "../assets/images/RAJDEEP_OFFICE_LUCKNOW/L12.jpg";
import rajdeepOfficeimg5 from "../assets/images/RAJDEEP_OFFICE_LUCKNOW/L14.jpg";
import rajdeepOfficeimg6 from "../assets/images/RAJDEEP_OFFICE_LUCKNOW/L17.jpg";

import nkvHomesImg1 from "../assets/images/NKV_HOMES_GURUGRAM/87A1BF93-84FA-4510-AAE2-B4BFF6AB19B7.jpg";
import nkvHomesImg2 from "../assets/images/NKV_HOMES_GURUGRAM/89979CAB-F0F3-493F-95FF-53B8D620CABD.jpg";
import nkvHomesImg3 from "../assets/images/NKV_HOMES_GURUGRAM/61155787-7152-49DE-B060-0A1DE45D1B8C.jpg";
import nkvHomesImg4 from "../assets/images/NKV_HOMES_GURUGRAM/FDD15AB3-662E-4D65-9F21-2D1107751BF9.jpg";
import nkvHomesImg5 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_8032.jpg";
import nkvHomesImg6 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_8035.jpg";
import nkvHomesImg7 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_8036.jpg";
import nkvHomesImg8 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_8223.jpg";
import nkvHomesImg9 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_8224.jpg";
import nkvHomesImg10 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_8225.jpg";
import nkvHomesImg11 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_8226.jpg";
import nkvHomesImg12 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_9290.jpg";
import nkvHomesImg13 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_9291.jpg";
import nkvHomesImg14 from "../assets/images/NKV_HOMES_GURUGRAM/IMG_9292.jpg";

import pradeepResidenceImg1 from "../assets/images/PRADEEP_RESIDENCE,_MIRZAPUR/IMG_9247.jpeg";
import pradeepResidenceImg2 from "../assets/images/PRADEEP_RESIDENCE,_MIRZAPUR/IMG_9248.jpeg";
import pradeepResidenceImg3 from "../assets/images/PRADEEP_RESIDENCE,_MIRZAPUR/IMG_9249.jpeg";

import omkarResidenceimg1 from "../assets/images/OMKAR_RESIDENCE_BULANDSHAHR/s29.jpg";
import omkarResidenceimg2 from "../assets/images/OMKAR_RESIDENCE_BULANDSHAHR/s31.jpg";

import prasantResidenceimg1 from "../assets/images/PRASANT_RESIDENCE/G-59-VIEW-2.jpg";

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
    clientName: "Mr. Mukesh",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum perspiciatis laboriosam cum libero nostrum, autem aliquam quas, placeat illo minus ipsam voluptatibus rerum quo? Tenetur doloribus accusamus eum, natus veniam recusandae omnis at ea rerum eligendi quae laudantium distinctio quam vero, reiciendis, quisquam repudiandae totam! Officiis aliquam reprehenderit molestias enim!",
    image: mukeshResidenceImg1,
    userImg: user1Img,
  },
  {
    id: 2,
    clientName: "Mr. Omkar",
    text: "Lorem ipsum dolor sit, amet consectetur libero nostrum, autem aliquam quas, placeat illo minus ipsam voluptatibus rerum quo? Tenetur doloribus accusamus eum, natus veniam recusandae omnis at ea rerum eligendi quae laudantium distinctio quam vero, reiciendis, quisquam repudiandae totam! Officiis aliquam reprehenderit molestias enim!",
    image: omkarResidenceimg1,
    userImg: user1Img,
  },
  {
    id: 3,
    clientName: "Mr. Rajdeep",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam reprehenderit molestias enim!",
    image: rajdeepOfficeimg1,
    userImg: user1Img,
  },
  {
    id: 4,
    clientName: "Mr. Pradeep",
    text: "Lorem ipsum dolor sit, amet con. Dolorum perspiciatis laboriosam cum libero nostrum, autem aliquam quas, placeat illo minus ipsam voluptatibus rerum quo? Tenetur dm, natus veniam recusandae omnis at ea rerum eligendi quae laudantium distinrit molestias enim!",
    image: pradeepResidenceImg1,
    userImg: user1Img,
  },
];

export const images = [
  {
    id: 1,
    src: banquetImg1,
    title: "Mountain Resort",
    tag: "Interiors",
    category: "Interiors",
  },
  {
    id: 2,
    src: banquetImg2,
    title: "Banquet Hall",
    tag: "Interiors",
    category: "Interiors",
  },
  {
    id: 3,
    src: banquetImg3,
    title: "Alpine Venue",
    tag: "Interiors",
    category: "Interiors",
  },
  {
    id: 4,
    src: banquetImg4,
    title: "Event Space",
    tag: "Interiors",
    category: "Interiors",
  },
  {
    id: 5,
    src: mukeshResidenceImg1,
    title: "Mukesh Residence",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 6,
    src: mukeshResidenceImg2,
    title: "Mukesh Residence",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 7,
    src: pradeepResidenceImg1,
    title: "Pradeep Residence",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 8,
    src: pradeepResidenceImg2,
    title: "Pradeep Residence",
    tag: "Residential",
    category: "Concept Designs",
  },
  {
    id: 9,
    src: pradeepResidenceImg3,
    title: "Pradeep Residence",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 10,
    src: omkarResidenceimg1,
    title: "Omkar Residence",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 11,
    src: omkarResidenceimg2,
    title: "Omkar Residence",
    tag: "Residential",
    category: "Concept Designs",
  },
  {
    id: 12,
    src: prasantResidenceimg1,
    title: "Prasant Residence",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 13,
    src: rajdeepOfficeimg1,
    title: "Rajdeep Office",
    tag: "Commercial",
    category: "Interiors",
  },
  {
    id: 14,
    src: rajdeepOfficeimg2,
    title: "Rajdeep Office",
    tag: "Commercial",
    category: "Interiors",
  },
  {
    id: 15,
    src: rajdeepOfficeimg3,
    title: "Rajdeep Office",
    tag: "Commercial",
    category: "Exteriors",
  },
  {
    id: 16,
    src: rajdeepOfficeimg4,
    title: "Rajdeep Office",
    tag: "Commercial",
    category: "Exteriors",
  },
  {
    id: 17,
    src: rajdeepOfficeimg5,
    title: "Rajdeep Office",
    tag: "Commercial",
    category: "Interiors",
  },
  {
    id: 18,
    src: rajdeepOfficeimg6,
    title: "Rajdeep Office",
    tag: "Commercial",
    category: "Exteriors",
  },
  {
    id: 19,
    src: nkvHomesImg1,
    title: "NKV Homes",
    tag: "Residential",
    category: "Concept Designs",
  },
  {
    id: 20,
    src: nkvHomesImg2,
    title: "NKV Homes",
    tag: "Residential",
    category: "Concept Designs",
  },
  {
    id: 21,
    src: nkvHomesImg3,
    title: "NKV Homes",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 22,
    src: nkvHomesImg4,
    title: "NKV Homes",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 23,
    src: nkvHomesImg5,
    title: "NKV Homes",
    tag: "Residential",
    category: "Exteriors",
  },
  {
    id: 24,
    src: nkvHomesImg6,
    title: "NKV Homes",
    tag: "Residential",
    category: "Exteriors",
  },
  {
    id: 25,
    src: nkvHomesImg7,
    title: "NKV Homes",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 26,
    src: nkvHomesImg8,
    title: "NKV Homes",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 27,
    src: nkvHomesImg9,
    title: "NKV Homes",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 28,
    src: nkvHomesImg10,
    title: "NKV Homes",
    tag: "Residential",
    category: "Concept Designs",
  },
  {
    id: 29,
    src: nkvHomesImg11,
    title: "NKV Homes",
    tag: "Residential",
    category: "Concept Designs",
  },
  {
    id: 30,
    src: nkvHomesImg12,
    title: "NKV Homes",
    tag: "Residential",
    category: "Interiors",
  },
  {
    id: 31,
    src: nkvHomesImg13,
    title: "NKV Homes",
    tag: "Residential",
    category: "Exteriors",
  },
  {
    id: 32,
    src: nkvHomesImg14,
    title: "NKV Homes",
    tag: "Residential",
    category: "Concept Designs",
  },
];
