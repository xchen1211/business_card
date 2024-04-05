import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function Home() {
	let history = useNavigate();

	let [data, setData] = useState([]);
    const [sortField, setSortField] = useState(null);
	const [sortDirection, setSortDirection] = useState(null);
	

	// Function to fetch data from Lambda function
    async function fetchData() {
        try {
            const response = await axios.get('https://ozb6kyfiy4.execute-api.us-east-2.amazonaws.com/items');
			setData(response.data); // Set the fetched data to state
			console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
		}
	}

	// You may skip this part if you're
	// using react-context api or redux
	function setID(id, name, age, birthday, job, employer, city, email, phone, picture) {
		localStorage.setItem("id", id);
		localStorage.setItem("name", name);
        localStorage.setItem("age", age);
		localStorage.setItem("birthday", birthday);
		localStorage.setItem("job", job);
        localStorage.setItem("employer", employer);
        localStorage.setItem("city", city);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("picture", picture);
	}

	// Deleted function - functionality
	// for deleting the entry
	async function deleted(id) { 
		let index = data
			.map(function (e) {
				return e.id;
			})
			.indexOf(id);

		// deleting the entry with index
		let newData = [...data];
		newData.splice(index, 1);
		setData(newData);

        try {
            // Make a PUT request to your Lambda function
            const response = await axios.delete('https://ozb6kyfiy4.execute-api.us-east-2.amazonaws.com/items/'+id);
            // console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle errors as needed
        }

		// We need to re-render the page for getting
		// the results so redirect to same page.
		history("/");
	}

	function isNumeric(value) {
		return /^-?\d+$/.test(value);
	}

	function handleSort(field) {
        let direction = 'asc';
        if (sortField === field && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortField(field);
		setSortDirection(direction);
		
		// field = field.toLowerCase();

        setData([...data].sort((a, b) => {
            // Compare the values of the specified field
			const valueA = a[field];
			const valueB = b[field];

			// Handle sorting for strings or numbers
			if (!(isNumeric(valueA) && isNumeric(valueB))) {
				return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
			} else {
				console.log('int sort')
				return direction === 'asc' ? valueA - valueB : valueB - valueA;
			}
        }));
	}
	
	 // Fetch data on component mount
	useEffect(() => {
    	fetchData();
	}, []);

	data = data.flatMap(e => e)
	// console.log(data)

	return (
		<div style={{ margin: "1rem" }}>
		<h1 style={{ marginTop: '25px' }} className="headline">All Users' Profiles </h1>
		<h3>Click on the header of Age, Job Title, Employer, or City to sort </h3>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
					<th>Name</th>
					<th onClick={() => handleSort('age')}>Age {sortField === 'age' ? (sortDirection === 'desc' ? '↑' : '↓') : ''}</th>
					<th>Birthday</th>
					<th onClick={() => handleSort('job')}>Job Title {sortField === 'job' ? (sortDirection === 'desc' ? '↑' : '↓') : ''}</th>
					<th onClick={() => handleSort('employer')}>Employer  {sortField === 'employer' ? (sortDirection === 'desc' ? '↑' : '↓') : ''}</th>
					<th onClick={() => handleSort('city')}>City  {sortField === 'city' ? (sortDirection === 'desc' ? '↑' : '↓') : ''}</th>
					<th>Email</th>
					<th>Phone Number</th>
					<th>Profile Picture</th>
					</tr>
				</thead>
				<tbody>
					{/* Mapping though every element 
						data 
						data in the form of table */}
					{data.map((item) => {
						return (
							<tr key={item.id}>
								<td>{item.name}</td>
								<td>{item.age}</td>
                                <td>{item.birthday}</td>
                                <td>{item.job}</td>
                                <td>{item.employer}</td>
                                <td>{item.city}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
								<td>
								{item.picture && 
									(<img src={item.picture} alt="Item Picture" width={120} height={120} />)}
								</td>

								{/* getting the id, name, and 
									age for storing these
									value in the jsx with 
									onclick event */}
								<td>
									<Link to={`/edit`}>
										<Button
											onClick={(e) =>
												setID(
													item.id,
													item.name,
                                                    item.age,
													item.birthday,
													item.job,
													item.employer,
													item.city,
													item.email,
													item.phone,
													item.picture
											
												)
											}
											variant="info"
										>
											Update
										</Button>
									</Link>
								</td>

								{/* Using thr deleted function passing
									the id of an entry */}
								<td>
									<Button
										onClick={(e) =>
											deleted(item.id)
										}
										variant="danger"
									>
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>

			{/* Button for redirecting to create page for
				insertion of values */}
			<Link className="d-grid gap-2" to="/create">
				<Button variant="warning" size="lg">
					Create
				</Button>
			</Link>
		</div>
	);
}

export default Home;
