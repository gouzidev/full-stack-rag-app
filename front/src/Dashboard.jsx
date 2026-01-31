import { useState } from "react"
import { getEmptyChar } from "./App"
import { Link } from "react-router"
import axios from "axios";

export const Dashboard = () =>
{
	const [selectedFile, setSelectedFile] = useState(null);
	const onFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const onFileUpload = async () => {
		try
		{
			const formData = new FormData();
			formData.append(
				"file",
				selectedFile,
				selectedFile.name
			);
			console.log(selectedFile);

			const res = await fetch('http://localhost:3000/file-upload',
			{
				method: 'POST',
				body: formData,
			})
			console.log(res)
			if (res.ok)
			{
				let data = await res.json();
			}
			else
				throw new Error("Upload failed");

			const data = await res.json();
			console.log("Uploaded:", data);
		}
		 catch (err) {
			console.error(err);
		}
		
	};
	const fileData = () => {
		if (selectedFile) {
			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {selectedFile.name}</p>
					<p>File Type: {selectedFile.type}</p>
					<p>
						Last Modified: {selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	};

	return (
	    <div className="
			flex sm:flex-row flex-col
			font-funnel 
			sm:items-start items-center justify-center">

			<div className="flex flex-col gap-4 sm:mt-20">
				<div className="flex flex-col gap-1">
					<h2 className='sm:text-3xl text-xl font-bold'>Upload and navigate your documents,</h2>
					<h3 className='sm:text-xl text-sm font-semibold'>search for whatever you desire.</h3>
				</div>

				<div className="flex flex-col gap-2">
					<p className='sm:text-xs text-xs font-light italic'>one touch.</p>

					<input type="file" onChange={onFileChange} 
					to="/dashboard"
					className='border-zinc-700 border-2 
					
					flex items-center justify-center
					cursor-pointer  
					text-zinc-200 w-1/4 rounded-xs '/>

					<button onClick={onFileUpload}>upload</button>
					{fileData()}

				</div>

			</div>
		</div>
	
	);
};




