import multer from "multer"

const upload = multer({dest:'uploads/'})

export { upload }

// import multer from "multer"

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './uploads')
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.originalname)
// 	}
// })

// const fileFilter = (req:any, file:any, cb:any) => {
// 	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
// 		cb(null, true)
// 	} else {
// 		//reject file
// 		cb({
// 			message: 'Unsupported file format'
// 		}, false)
// 	}
// }

// const upload = multer({storage})
// export { upload }

// // export const upload = multer({
// //   storage: storage,
// //   limits: {
// //     fileSize: 1024 * 1024
// //   },
// //   fileFilter: fileFilter
// // })

