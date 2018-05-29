import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import RenderPath from "./components/RenderPath/renderPath";

ReactDOM.render(<BrowserRouter forceRefresh={true}><RenderPath /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
