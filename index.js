
import ReactDOM from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Login from './src/js/login'
import SignUp from './src/js/signup'
import Chatroom from "./src/js/chatroom";

class Root extends React.Component {
    constructor(props) {
        super(props);

        document.addEventListener('DOMContentLoaded', () => {
            if (!Notification) {
                alert('Desktop notifications not available in your browser. Try Chromium.');
                return;
            }
            if (Notification.permission !== 'granted')
                Notification.requestPermission();
        });

    }

    render() {
        return (
            <div>
                <Login/>
            </div>
            
        );
    }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
            
  },
  {
    path: "/main",
    element: <Chatroom/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <RouterProvider router={router} />
  
);



/*
import { BrowserRouter, Route, Links , Navigate, Routes} from 'react-router-dom';

import {
    TextField,
    LinearProgress
} from '@mui/material';

import Login from './src/js/login'

export class Root extends React.Component {
    constructor(props) {
        super(props);

        
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Login/>}/>
                        <Route path='/login' element={ <Login/> }/>
                        <Route path='/signup' element={<a>bbb</a>}/>
                        <Route path='/main' element={<a>aaa</a>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
*/
