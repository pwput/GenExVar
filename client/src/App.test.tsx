import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Gene from "./pages/gene/gene";
import Footer from "./components/Footer/Footer";

test('renders learn react link', () => {
  render(
      <Footer/>,
  );
  // const linkElement = screen.getByText(/GenExVar/);
  // expect(linkElement).toBeInTheDocument();
});
