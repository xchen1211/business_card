import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AWS from 'aws-sdk';
import { v4 as uuid } from "uuid";

function Edit({user}) {
	// Here usestate has been used in order
	// to set and get values from the jsx
	const [picture, setpicture] = useState("");
	const [phone, setphone] = useState("");
	const [email, setemail] = useState("");
	const [city, setcity] = useState("");
	const [employer, setemployer] = useState("");
	const [job, setjob] = useState("");
	const [birthday, setbirthday] = useState("");
	const [name, setname] = useState("");
	const [age, setage] = useState("");
	const [id, setid] = useState("");
	const [picturePath, setpicturePath] = useState("");

	// Used for navigation with logic in javascript
	let history = useNavigate();
	
	// upload image function
	function uploadimage(e) {
		const file = e.target.files[0];
        console.log(file);
		setpicture(URL.createObjectURL(file));
		setpicturePath(file);
    }

	// Function for handling the edit and
	// pushing changes of editing/updating
	const handleSubmit = async (e) => {
		// Preventing from reload
		e.preventDefault();
		if (name == "" || age == "" || birthday == "" || job == "" || employer == "" || city == "" || email == "" || phone == "" || picture == "") {
			alert("invalid input");
			return;
		}
		
		let uni = user.username
		if (user.username === "61cb5560-a061-7010-fbb4-0a572b200dfc"){
			const ids = uuid(); // Creating unique id
			uni = ids.slice(0, 8); // Slicing unique id
		}

		let pictureS3Key = uni + "_" + picturePath.name
		if (!picturePath.name) {
			pictureS3Key = '0'
		}

		// Form a payload with the data
        const payload = {
			'id': id,
            'name': name,
			'age': age,
			'birthday': birthday,
			'job': job,
			'employer': employer,
			'city': city,
			'email': email,
			'phone': phone,
			'picture': pictureS3Key,
        };

        try {
            // Make a PUT request to Lambda function
            const response = await axios.put('https://ozb6kyfiy4.execute-api.us-east-2.amazonaws.com/items', payload);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle errors as needed
		}
		
		if (picturePath.name){
		const S3_BUCKET = "business.picture";
		const REGION = "us-east-2";
		
		//TODO: save to another place
		AWS.config.update({
			accessKeyId: "enter your own accessKeyId",
			secretAccessKey: "enter your own secretAccessKey",
		});
		const s3 = new AWS.S3({
			params: { Bucket: S3_BUCKET },
			region: REGION,
		});

		const params = {
			Bucket: S3_BUCKET,
			Key: pictureS3Key,
			Body: picturePath,
		};
	
		var upload = s3
			.putObject(params)
			.on("httpUploadProgress", (e) => {
			console.log(
				"Uploading " + parseInt((e.loaded * 100) / e.total) + "%"
			);
		})
			.promise();
	
		await upload.then((err, d) => {
			console.log(err);
			alert("File uploaded successfully.");
		});
	}
		
	

		// Redirecting to main page
		history("/");
	};

	// Useeffect take care that page will
	// be rendered only once
	useEffect(() => {
		// setpicturePath(localStorage.getItem("picturePath"));
		setpicture(localStorage.getItem("picture"));
		setphone(localStorage.getItem("phone"));
		setemail(localStorage.getItem("email"));
		setcity(localStorage.getItem("city"));
		setemployer(localStorage.getItem("employer"));
		setjob(localStorage.getItem("job"));
		setbirthday(localStorage.getItem("birthday"));
		setname(localStorage.getItem("name"));
		setage(localStorage.getItem("age"));
		setid(localStorage.getItem("id"));

	}, []);

	return (
		<div>
			<Form
				className="d-grid gap-2"
				style={{ margin: "5rem" }}
			>
				{/* setting a name from the 
					input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicEmail"
				>
					<Form.Control
						value={name}
						onChange={(e) =>
							setname(e.target.value)
						}
						type="text"
						placeholder="Enter Name"
					/>
				</Form.Group>

				{/* setting a age from the input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				>
					<Form.Control
						value={age}
						onChange={(e) =>
							setage(e.target.value)
						}
						type="number"
						placeholder="Age"
					/>
				</Form.Group>

				{/* setting birthday from the input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				>
					<Form.Control
						value={birthday}
						onChange={(e) =>
							setbirthday(e.target.value)
						}
						type="text"
						placeholder="Birthday"
					/>
				</Form.Group>

				{/* setting job from the input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				>
					<Form.Control
						value={job}
						onChange={(e) =>
							setjob(e.target.value)
						}
						type="text"
						placeholder="Job Title"
					/>
				</Form.Group>


				{/* setting Employer from the input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				>
					<Form.Control
						value={employer}
						onChange={(e) =>
							setemployer(e.target.value)
						}
						type="text"
						placeholder="Empolyer"
					/>
				</Form.Group>

				{/* setting city from the input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				>
					<Form.Control
						value={city}
						onChange={(e) =>
							setcity(e.target.value)
						}
						type="text"
						placeholder="City"
					/>
				</Form.Group>

				{/* setting Email from the input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				>
					<Form.Control
						value={email}
						onChange={(e) =>
							setemail(e.target.value)
						}
						type="text"
						placeholder="Email"
					/>
				</Form.Group>

				{/* setting phone from the input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				>
					<Form.Control
						value={phone}
						onChange={(e) =>
							setphone(e.target.value)
						}
						type="number"
						placeholder="Phone number"
					/>
				</Form.Group>

				{/* setting profile picture from the input */}
					<div>
					<h2>Upload Profile Picture:</h2>
					<input type="file" onChange={uploadimage} />
					{picture && (<img src={picture} width={120} height={120} />)}
				</div>
	

				{/* Handling an onclick event running an edit logic */}
				<Button
					onClick={(e) => handleSubmit(e)}
					variant="primary"
					type="submit"
					size="lg"
				>
					Update
				</Button>

				{/* Redirecting to main page after editing */}
				<Link className="d-grid gap-2" to="/">
					<Button variant="warning" size="lg">
						Home
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default Edit;
