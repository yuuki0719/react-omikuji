import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Button from './components/Button';
import Result from './components/Result';
import './App.css';
const query = `
{
  omikujiCollection {
    items {
      title
      description
    }
  }
}
`

