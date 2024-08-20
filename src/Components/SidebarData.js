import React from 'react';
import { FaHome, FaUser, FaStar, FaBoxOpen, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path:'/Profile',
    icon: <FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path:'/History',
    icon: <FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'Contact us',
    icon: <FaEnvelope />,
    path:'/Contact', // Updated icon for "Contact us"
    cName: 'nav-text'
  },
  {
    title: 'About',
    icon: <FaInfoCircle />,
    path:'/JoinPage',
    cName: 'nav-text'
  }
];