import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

export default function StudentTable() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    // Pagination State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page

    // Fetch Students Data
    useEffect(() => {
        fetch("http://localhost:8000/students")
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((err) => console.log(err.message));
    }, []);

    // Pagination Logic
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page to first page when changing rows per page
    };

    // Navigation Functions
    const DisplayDetails = (id) => navigate("/student/view/" + id);
    const EditDetails = (id) => navigate("/student/edit/" + id);
    const RemoveDetails = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            fetch("http://localhost:8000/students/" + id, {
                method: "DELETE",
            })
                .then(() => {
                    alert("Student data Deleted successfully");
                    setStudents((prev) => prev.filter((student) => student.id !== id));
                })
                .catch((err) => console.log(err.message));
        }
    };

    return (
        <div className="container">
            <h2>Student Table Records</h2>
            <div className="table-container">
                <Link to="/student/create" className="btn btn-add">
                    Add New Student
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{page * rowsPerPage + index + 1}</td> {/* Sequential numbering */}
                                        <td>{item.name}</td>
                                        <td>{item.place}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button onClick={() => DisplayDetails(item.id)} className="btn btn-info">
                                                    View
                                                </button>
                                                <button onClick={() => EditDetails(item.id)} className="btn btn-primary">
                                                    Edit
                                                </button>
                                                <button onClick={() => RemoveDetails(item.id)} className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="5">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Component */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={students.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}

