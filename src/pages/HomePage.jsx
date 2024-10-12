import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CommentsPage = () => {
	const [comments, setComments] = useState([])
	const [selectedComment, setSelectedComment] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const navigate = useNavigate()

	const fetchComments = async () => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/comments')
			const data = await response.json()
			setComments(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const userLogged = localStorage.getItem('isLoggedIn')
		if (!userLogged) {
			navigate('/login')
		}

		fetchComments()
	}, [])

	const handleViewMore = (comment) => {
		setSelectedComment(comment)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedComment(null)
	}

	const handleLogout = () => {
		localStorage.removeItem('isLoggedIn')
		navigate('/login')
	}

	return (
		<div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
			<div className='flex items-center justify-between w-full max-w-md mx-auto mb-4 mt-4'>
				<h1 className='text-2xl font-bold flex-grow text-center'>ProDashboard</h1>

				<button
					onClick={handleLogout}
					className='ml-auto px-4 py-2 bg-black text-white rounded-md hover:bg-[#CCE2D7] hover:text-black mr-4'
				>
					Logout
				</button>
			</div>

			<div className='w-full max-w-4xl p-4 bg-white rounded-lg shadow-md'>
				<div className='overflow-y-auto max-h-[800px]'>
					{comments.map((comment) => (
						<div
							key={comment.id}
							className='flex items-center justify-between p-4 border-b border-gray-200 m-10'
						>
							<div className='flex space-x-4 w-full'>
								<p className='text-lg font-semibold w-16'>ID: {comment.id}</p>
								<p className='text-lg font-semibold  w-1/3'>{comment.name}</p>
								<p className='text-gray-600 w-1/3 '>Email: {comment.email}</p>
							</div>

							<button
								onClick={() => handleViewMore(comment)}
								className='bg-[#7DFF8A] hover:bg-[#CCE2D7] text-black px-4 py-2 rounded flex items-center'
							>
								<svg viewBox='0 0 1024 1024' fill='currentColor' height='1em' width='1em'>
									<path d='M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z' />
								</svg>
							</button>
						</div>
					))}
				</div>
			</div>

			{/*  */}
			{/* Modal */}
			{isModalOpen && selectedComment && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center '>
					<div className='bg-white p-6 rounded-lg w-96 shadow-lg'>
						<div className='flex justify-end'>
							<button
								onClick={handleCloseModal}
								className='bg-red-500 hover:bg-red-400 text-white px-4 py-2  rounded'
							>
								x
							</button>
						</div>

						<h2 className='text-xl font-bold mb-4'>Comment Details</h2>
						<p className='mb-2'>
							<span className='font-semibold '>ID:</span> {selectedComment.id}
						</p>
						<p className='mb-2'>
							<span className='font-semibold mb-4'>Name:</span> {selectedComment.name}
						</p>
						<p className='mb-2'>
							<span className='font-semibold mb-4'>Email:</span> {selectedComment.email}
						</p>
						<p className='mb-2'>
							<span className='font-semibold mb-4'>Body:</span> {selectedComment.body}
						</p>
					</div>
				</div>
			)}
			{/*  */}
		</div>
	)
}

export default CommentsPage
