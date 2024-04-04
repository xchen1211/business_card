import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Edit() {
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

	// Used for navigation with logic in javascript
	let history = useNavigate();

	// Getting an index of an entry with an id
	let index = array
		.map(function (e) {
			return e.id;
		})
		.indexOf(id);
	
	// upload image function
	function uploadimage(e) {
        console.log(e.target.files);
        setpicture(URL.createObjectURL(e.target.files[0]));
    }

	// Function for handling the edit and
	// pushing changes of editing/updating
	const handelSubmit = async (e) => {
		// Preventing from reload
		e.preventDefault();
		if (name == "" || age == "" || birthday == "" || job == "" || employer == "" || city == "" || email == "" || phone == "") {
			alert("invalid input");
			return;
		}

		// Getting an index of an array
		let a = array[index];

		// Putting the value from the input
		// textfield and replacing it from
		// existing for updation
		a.name = name;
		a.age = age;
		a.birthday = birthday;
		a.job = job;
		a.employer = employer;
		a.city = city;
		a.email = email;
		a.phone = phone;
		a.picture = picture;

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
			'picture': picture,
        };

        try {
            // Make a PUT request to your Lambda function
            const response = await axios.put('https://ozb6kyfiy4.execute-api.us-east-2.amazonaws.com/items', payload);
			// const response = await axios.get('https://ozb6kyfiy4.execute-api.us-east-2.amazonaws.com/items');
            console.log(response.data); // Handle the response as needed
            // // Reset the form fields after successful submission
            // setname("");
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle errors as needed
        }
	

		// Redirecting to main page
		history("/");
	};

	// Useeffect take care that page will
	// be rendered only once
	useEffect(() => {
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

	// data = data.flatMap(e => e)

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
						type="text"
						placeholder="Phone number"
					/>
				</Form.Group>

				{/* setting profile picture from the input textfiled */}
				{/* <Form.Group
					className="mb-3"
					controlId="formBasicPassword"
				> */}
					<div>
					<h2>Upload Profile Picture:</h2>
					<input type="file" onChange={uploadimage} />
					{/* width={"250px"} height={"250px"} */}
					{picture && (<img src={picture} width={120} height={120} />)}
				</div>
				{/* </Form.Group> */}

				{/* Hadinling an onclick event 
					running an edit logic */}
				<Button
					onClick={(e) => handelSubmit(e)}
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