import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AWS from 'aws-sdk';


function Create({user}) {
	// Making usestate for setting and
	// fetching a value in jsx
	const [name, setname] = useState("");
	const [age, setage] = useState("");
	const [birthday, setbirthday] = useState("");
	const [job, setjob] = useState("");
	const [employer, setemployer] = useState("");
	const [city, setcity] = useState("");
	const [email, setemail] = useState("");
	const [phone, setphone] = useState("");
	const [picture, setpicture] = useState("");
	const [picturePath, setpicturePath] = useState("");

	// upload image function
	function uploadimage(e) {
		const file = e.target.files[0];
        console.log(file);
		setpicture(URL.createObjectURL(file));
		setpicturePath(file);
    }

	// Using useNavigation for redirecting to pages
	let history = useNavigate();

	// Function for creating a post/entry
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent reload

		let uni = user.username
		if (user.username === "61cb5560-a061-7010-fbb4-0a572b200dfc"){
			const ids = uuid(); // Creating unique id
			uni = ids.slice(0, 8); // Slicing unique id
		}
		
		

		// const ids = uuid(); // Creating unique id
		// let uni = ids.slice(0, 8); // Slicing unique id

		if (name == "" || age == "" || birthday == "" || job == "" || employer == "" || city == "" || email == "" || phone == "" || picture == "" ) {
			alert("invalid input");
			return;
		}

		const pictureS3Key = uni + "_" + picturePath.name;

		// Form a payload with the data
        const payload = {
			'id': uni,
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
			console.log('pictureS3Key');
			console.log(pictureS3Key);
            // Make a PUT request to your Lambda function
            const response = await axios.put('https://ozb6kyfiy4.execute-api.us-east-2.amazonaws.com/items', payload);
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle errors as needed
		}
		
		
		const S3_BUCKET = "business.picture";
		const REGION = "us-east-2";
		
		//TODO: save to another place
		AWS.config.update({
			accessKeyId: "AKIATCKAOO5F4YUF4ITX",
			secretAccessKey: "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",
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
		

		// Redirecting to home page after creation done
		history("/");
	};




	return (
		<div>
			<Form
				className="d-grid gap-2"
				style={{ margin: "5rem" }}
			>
				{/* Fetching a value from input textfirld 
					in a setname using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicName"
				>
					<Form.Control
						onChange={(e) =>
							setname(e.target.value)
						}
						type="text"
						placeholder="Enter Name"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Control
						onChange={(e) =>
							setage(e.target.value)
						}
						type="number"
						placeholder="Age"
						required
					/>
				</Form.Group>

                {/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Control
						onChange={(e) =>
							setbirthday(e.target.value)
						}
						type="text"
						placeholder="Birthday"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Control
						onChange={(e) =>
							setjob(e.target.value)
						}
						type="text"
						placeholder="Job Title"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Control
						onChange={(e) =>
							setemployer(e.target.value)
						}
						type="text"
						placeholder="Employer"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Control
						onChange={(e) =>
							setcity(e.target.value)
						}
						type="text"
						placeholder="City"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Control
						onChange={(e) =>
							setemail(e.target.value)
						}
						type="text"
						placeholder="Email"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Control
						onChange={(e) =>
							setphone(e.target.value)
						}
						type="text"
						placeholder="Phone number"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				{/* <Form.Group
					className="mb-3"
					controlId="formBasicAge"
				> */}
				<div>
					<h2>Upload Profile Picture:</h2>
					<input type="file" onChange={uploadimage} />
					{/* width={"250px"} height={"250px"} */}
					{picture && (<img src={picture} width={120} height={120} />)}
				</div>
				{/* </Form.Group> */}



				{/* handing a onclick event in button for
					firing a function */}
				<Button
					onClick={(e) => handleSubmit(e)}
					variant="primary"
					type="submit"
				>
					Submit
				</Button>

				{/* Redirecting back to home page */}
				<Link className="d-grid gap-2" to="/">
					<Button variant="info" size="lg">
						Home
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default Create;
