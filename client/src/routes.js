import App from './components/App'
import Profile from './components/Profile'
import Search from './components/Search'
import Reviews from './components/Reviews'
import Home from './components/Home'


import { createBrowserRouter } from 'react-router-dom'
import UserProfile from './components/UserProfile'

const routes = [
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: 'search',
                element: <Search/>
            },
            {
                path: 'artists/:id',
                element: <Profile/>
            },
            {
                path: 'artists/:id/reviews',
                element: <Reviews/>
            },
            {
                path: 'users/:id',
                element: <UserProfile/>
            }
        ]
    }
]

export const router = createBrowserRouter(routes)