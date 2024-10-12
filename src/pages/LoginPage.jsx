import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import users from '../db/users.json'

const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ email: '', password: '' })

	const navigate = useNavigate()

	const onSubmit = (e) => {
		e.preventDefault()
		let hasError = false
		const newErrors = { email: '', password: '' }

		if (!email) {
			newErrors.email = 'Email is required'
			hasError = true
		} else if (email !== users.user.email) {
			newErrors.email = 'This email does not exist in our db'
			hasError = true
		}

		if (!password) {
			newErrors.password = 'Password is required'
			hasError = true
		} else if (password.length < 6) {
			newErrors.password = 'The password must contain at least 6 characters'
			hasError = true
		} else if (password && password !== users.user.password) {
			newErrors.password = 'The password is incorrect'
			hasError = true
		}

		setErrors(newErrors)

		if (!hasError) {
			localStorage.setItem('isLoggedIn', true)
			navigate('/')
		}
	}

	return (
		<>
			<div className='flex items-center justify-center flex-col min-h-screen bg-gray-100'>
				<img
					src='../../public/outbuild-logo.svg'
					width='280px'
					alt='Outbuild Logo'
					className='mb-10'
				/>
				<div className='w-full max-w-sm p-6 bg-white rounded-lg shadow-md '>
					<h2 className='mb-6 text-2xl font-bold text-center text-gray-700'>Login</h2>
					<form onSubmit={onSubmit}>
						<div className='mb-4'>
							<label className='block text-sm font-medium text-gray-700'>Email</label>
							<input
								type='email'
								value={email}
								minLength={6}
								onChange={(e) => setEmail(e.target.value)}
								className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  sm:text-sm ${
									errors.email ? 'border-red-500' : 'border-gray-300'
								}`}
								placeholder='Ingrese su email'
							/>
							{errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email}</p>}
						</div>

						<div className='mb-6'>
							<label className='block text-sm font-medium text-gray-700'>Password</label>
							<input
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
									errors.password ? 'border-red-500' : 'border-gray-300'
								}`}
								placeholder='Ingrese su contraseña'
							/>
							{errors.password && <p className='mt-2 text-sm text-red-600'>{errors.password}</p>}
						</div>

						<button
							type='submit'
							className='w-full px-4 py-2 text-black bg-[#7DFF8A] rounded-md hover:bg-[#CCE2D7] '
						>
							Iniciar sesión
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default LoginPage
