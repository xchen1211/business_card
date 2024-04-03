import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import array from "./array";
import { Link, useNavigate } from "react-router-dom";

function Home() {
	let history = useNavigate();

	const [data, setData] = useState(array);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);

	// You may skip this part if you're
	// using react-context api or redux
	function setID(id, name, age, birthday, job, employer, city, email, phone, picture) {
		localStorage.setItem("id", id);
		localStorage.setItem("Name", name);
        localStorage.setItem("Age", age);
		localStorage.setItem("Birthday", birthday);
		localStorage.setItem("Job", job);
        localStorage.setItem("Employer", employer);
        localStorage.setItem("City", city);
        localStorage.setItem("Email", email);
        localStorage.setItem("Phone", phone);
        localStorage.setItem("Picture", picture);
	}

	// Deleted function - functionality
	// for deleting the entry
	function deleted(id) {
		let index = array
			.map(function (e) {
				return e.id;
			})
			.indexOf(id);

		// deleting the entry with index
		let newArray = [...data];
		newArray.splice(index, 1);
		setData(newArray);

		// We need to re-render the page for getting
		// the results so redirect to same page.
		history("/");
	}

	function handleSort(field) {
        let direction = 'asc';
        if (sortField === field && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortField(field);
        setSortDirection(direction);

        setData([...data].sort((a, b) => {
            if (a[field] < b[field]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        }));
    }

	return (
		<div style={{ margin: "1rem" }}>
		<h1 style={{ marginTop: '25px' }} className="headline">All Users' Profiles </h1>
		<h3>Click on the header of Age, Job Title, Employer, or City to sort </h3>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
					<th>Name</th>
					<th onClick={() => handleSort('Age')}>Age {sortField === 'Age' ? (sortDirection === 'desc' ? '↑' : '↓') : ''}</th>
					<th>Birthday</th>
					<th onClick={() => handleSort('Job')}>Job Title {sortField === 'Job' ? (sortDirection === 'desc' ? '↑' : '↓') : ''}</th>
					<th onClick={() => handleSort('Employer')}>Employer  {sortField === 'Employer' ? (sortDirection === 'desc' ? '↑' : '↓') : ''}</th>
					<th onClick={() => handleSort('City')}>City  {sortField === 'City' ? (sortDirection === 'desc' ? '↑' : '↓') : ''}</th>
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
							<tr>
								<td>{item.Name}</td>
								<td>{item.Age}</td>
                                <td>{item.Birthday}</td>
                                <td>{item.Job}</td>
                                <td>{item.Employer}</td>
                                <td>{item.City}</td>
                                <td>{item.Email}</td>
                                <td>{item.Phone}</td>
								<td>
								{item.Picture && 
									(<img src={item.Picture} alt="Item Picture" width={120} height={120} />)}
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
													item.Name,
                                                    item.Age,
													item.Birthday,
													item.Job,
													item.Employer,
													item.City,
													item.Email,
													item.Phone,
													item.Picture
											
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
