import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Pages
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
// Utils
import PrivateRoute from './utils/PrivateRoute'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<PrivateRoute>
								<HomePage />
							</PrivateRoute>
						}
					/>
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
